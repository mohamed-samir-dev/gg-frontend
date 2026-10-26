import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { OrderModel, generateInvoiceNumber } from '@/lib/order-model';

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const search = searchParams.get('search')?.trim() || '';
    const status = searchParams.get('status')?.trim() || 'all';

    const filter: any = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { orderId: { $regex: search, $options: 'i' } },
        { 'customer.name': { $regex: search, $options: 'i' } },
        { 'customer.phone': { $regex: search, $options: 'i' } },
        { 'customer.city': { $regex: search, $options: 'i' } },
        { 'invoice.invoiceNumber': { $regex: search, $options: 'i' } },
      ];
    }

    const total = await OrderModel.countDocuments(filter);
    const orders = await OrderModel.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Ensure all orders have an invoiceNumber
    const populatedOrders = orders.map((order: any) => {
      const invoiceNumber = order.invoice?.invoiceNumber || generateInvoiceNumber(order.orderId, order.createdAt);
      return {
        ...order,
        invoice: {
          ...order.invoice,
          invoiceNumber,
          isGenerated: true,
          generatedAt: order.invoice?.generatedAt || order.createdAt || new Date(),
        },
      };
    });

    return NextResponse.json({
      orders: populatedOrders,
      total,
      totalPages: Math.ceil(total / limit) || 1,
      currentPage: page,
    });
  } catch (error: any) {
    console.error('Error fetching admin orders:', error);
    return NextResponse.json({ error: 'خطأ في جلب الطلبات' }, { status: 500 });
  }
}
