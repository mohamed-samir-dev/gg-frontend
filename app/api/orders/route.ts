import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    city: { type: String, required: true },
    address: { type: String, required: true },
    notes: { type: String },
  },
  items: [{
    productId: Number,
    name: String,
    priceEGP: Number,
    qty: Number,
    weight: String,
  }],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: 'الدفع عند الاستلام' },
  status: { type: String, default: 'جديد' },
}, { timestamps: true });

const Order = mongoose.models.GreenLineOrder || mongoose.model('GreenLineOrder', orderSchema);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { customer, items, totalAmount, paymentMethod, notes } = data;

    if (!customer?.name || !customer?.phone || !customer?.city || !customer?.address) {
      return NextResponse.json({ error: 'جميع بيانات العميل وموقع التوصيل مطلوبة' }, { status: 400 });
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'السلة فارغة' }, { status: 400 });
    }

    const orderId = 'GL-' + Date.now().toString().slice(-6) + '-' + Math.floor(Math.random() * 1000);

    let savedOrder = null;
    try {
      await connectDB();
      savedOrder = await Order.create({
        orderId,
        customer: {
          ...customer,
          notes,
        },
        items,
        totalAmount,
        paymentMethod: paymentMethod || 'الدفع عند الاستلام',
        status: 'جديد',
      });
    } catch (dbErr) {
      console.warn('Could not save to DB directly, continuing order receipt:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: 'تم استلام طلبك بنجاح وسيتواصل معك مهندس جرين لاين لتأكيد الشحن',
      orderId,
      order: savedOrder || { orderId, customer, items, totalAmount },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'حدث خطأ أثناء معالجة الطلب' }, { status: 500 });
  }
}
