import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { OrderModel, generateInvoiceNumber } from '@/lib/order-model';
import mongoose from 'mongoose';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await connectDB();

    let query: any = { orderId: id };
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ _id: id }, { orderId: id }] };
    }

    const order = await OrderModel.findOne(query).lean();

    if (!order) {
      return NextResponse.json({ error: 'الطلب غير موجود' }, { status: 404 });
    }

    const invoiceNumber = order.invoice?.invoiceNumber || generateInvoiceNumber(order.orderId, order.createdAt);
    const populatedOrder = {
      ...order,
      invoice: {
        ...order.invoice,
        invoiceNumber,
        isGenerated: true,
        generatedAt: order.invoice?.generatedAt || order.createdAt || new Date(),
      },
    };

    return NextResponse.json(populatedOrder);
  } catch (error: any) {
    console.error('Error fetching admin order by id:', error);
    return NextResponse.json({ error: 'خطأ في جلب بيانات الطلب' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    await connectDB();

    let query: any = { orderId: id };
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ _id: id }, { orderId: id }] };
    }

    const updateFields: any = {};
    if (body.status !== undefined) updateFields.status = body.status;
    if (body.notes !== undefined) updateFields.notes = body.notes;
    if (body.paymentStatus !== undefined) updateFields['payment.status'] = body.paymentStatus;
    if (body.paymentMethod !== undefined) updateFields['payment.method'] = body.paymentMethod;

    const updatedOrder = await OrderModel.findOneAndUpdate(query, { $set: updateFields }, { new: true }).lean();

    if (!updatedOrder) {
      return NextResponse.json({ error: 'الطلب غير موجود' }, { status: 404 });
    }

    return NextResponse.json(updatedOrder);
  } catch (error: any) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'خطأ في تحديث الطلب' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await connectDB();

    let query: any = { orderId: id };
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ _id: id }, { orderId: id }] };
    }

    const deletedOrder = await OrderModel.findOneAndDelete(query).lean();

    if (!deletedOrder) {
      return NextResponse.json({ error: 'الطلب غير موجود' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'تم حذف الطلب بنجاح' });
  } catch (error: any) {
    console.error('Error deleting order:', error);
    return NextResponse.json({ error: 'خطأ في حذف الطلب' }, { status: 500 });
  }
}
