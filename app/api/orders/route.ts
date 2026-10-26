import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { OrderModel, generateInvoiceNumber } from '@/lib/order-model';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      name,
      phone,
      city,
      address,
      country,
      currency = 'EGP',
      paymentMethod = 'cash_on_delivery',
      items,
      notes,
      nationalId,
    } = data;

    // Backward compatibility if customer object is sent
    const customerName = name || data.customer?.name;
    const customerPhone = phone || data.customer?.phone;
    const customerCity = city || data.customer?.city || 'القاهرة';
    const customerAddress = address || data.customer?.address;
    const customerCountry = country || data.customer?.country || (currency === 'SAR' ? 'SA' : 'EG');
    const customerNotes = notes || data.customer?.notes || data.notes || '';

    if (!customerName || !customerPhone || !customerAddress) {
      return NextResponse.json({ error: 'يرجى إدخال اسم العميل ورقم الهاتف والعنوان' }, { status: 400 });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'السلة فارغة، يرجى إضافة منتجات' }, { status: 400 });
    }

    await connectDB();

    // Calculate total
    let total = 0;
    const formattedItems = items.map((item: any) => {
      const unitPrice = Number(item.price || item.priceSAR || item.priceEGP || 0);
      const qty = Number(item.qty || item.quantity || 1);
      total += unitPrice * qty;
      return {
        name: item.name || 'منتج سمادي',
        price: unitPrice,
        priceSAR: unitPrice,
        priceEGP: unitPrice,
        qty: qty,
        weight: item.weight || '',
      };
    });

    const finalTotal = data.totalAmount ? Number(data.totalAmount) : total;

    // Generate unique order ID
    const orderId = `GL-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const invoiceNumber = generateInvoiceNumber(orderId, new Date());

    const idempotencyKey = request.headers.get('idempotency-key') || `order-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    // Create order document
    const newOrder = await OrderModel.create({
      orderId,
      customer: {
        name: customerName,
        phone: customerPhone,
        city: customerCity,
        address: customerAddress,
        country: customerCountry,
        nationalId: nationalId || '',
      },
      items: formattedItems,
      pricing: {
        totalEGP: finalTotal,
        totalSAR: finalTotal,
        totalLocal: finalTotal,
        currency: currency,
        exchangeRate: 1,
      },
      payment: {
        method: paymentMethod,
        status: 'pending',
        kashierCurrency: currency,
        kashierAmount: finalTotal,
      },
      invoice: {
        invoiceNumber,
        isGenerated: true,
        generatedAt: new Date(),
      },
      status: 'new',
      idempotencyKey,
      notes: customerNotes,
    });

    return NextResponse.json({
      success: true,
      message: 'تم استلام طلبك بنجاح وسيتواصل معك مهندس جرين لاين لتأكيد التوصيل',
      orderId: newOrder.orderId,
      invoiceNumber: newOrder.invoice.invoiceNumber,
      order: newOrder,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating order in Next API:', error);
    return NextResponse.json({ error: error.message || 'حدث خطأ أثناء حفظ الطلب' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const orders = await OrderModel.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(orders);
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'خطأ في جلب الطلبات' }, { status: 500 });
  }
}
