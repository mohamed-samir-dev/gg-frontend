import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { OrderModel, generateInvoiceNumber } from '@/lib/order-model';


// ───────────────────────────────────────────────
// Kashier session helper (مباشرةً في Next.js API)
// ───────────────────────────────────────────────
async function createKashierSession(orderData: {
  orderId: string;
  amount: number;
  currency: string;
  customer?: { name?: string; phone?: string; email?: string };
}) {
  const merchantId = process.env.KASHIER_MERCHANT_ID;
  const apiKey     = process.env.KASHIER_API_KEY;
  const secretKey  = process.env.KASHIER_SECRET_KEY;
  const mode       = process.env.KASHIER_MODE || 'live';
  let   appUrl     = process.env.APP_URL || 'https://www.lamsa-smartt.com';

  if (appUrl.includes('localhost') || appUrl.includes('127.0.0.1')) {
    appUrl = 'https://www.lamsa-smartt.com';
  }

  if (!merchantId || !apiKey || !secretKey) {
    throw new Error('Kashier credentials not configured');
  }

  const gatewayCurrency = orderData.currency || 'EGP';
  const gatewayAmount   = orderData.amount.toFixed(2);
  const currencyLabel   = gatewayCurrency === 'SAR' ? 'ريال سعودي' : 'جنيه مصري';

  const apiUrl = mode === 'live'
    ? 'https://api.kashier.io/v3/payment/sessions'
    : 'https://test-api.kashier.io/v3/payment/sessions';

  const payload = {
    merchantId,
    amount: gatewayAmount,
    currency: gatewayCurrency,
    order: orderData.orderId,
    type: 'one-time',
    merchantRedirect: `${appUrl}/?paymentStatus=SUCCESS&orderId=${orderData.orderId}`,
    display: 'ar',
    allowedMethods: 'card,wallet',
    description: `طلب ${orderData.orderId} - جرين لاين (${gatewayAmount} ${currencyLabel})`,
    customer: {
      email: orderData.customer?.email ||
             `customer-${orderData.customer?.phone || Date.now()}@temp.kashier.local`,
      reference: orderData.customer?.phone || String(Date.now()),
    },
    metaData: {
      ...(orderData.customer?.name  && { customerName: orderData.customer.name }),
      ...(orderData.customer?.phone && { phone: orderData.customer.phone }),
      storeCurrency:   gatewayCurrency,
      storeAmount:     gatewayAmount,
      gatewayCurrency: gatewayCurrency,
      gatewayAmount:   gatewayAmount,
    },
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': secretKey,
      'api-key':        apiKey,
      'Content-Type':  'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errText = await response.text();
    let errData: any;
    try { errData = JSON.parse(errText); } catch { errData = { message: errText }; }
    throw new Error(errData.message || 'Kashier API error');
  }

  const sessionData = await response.json();
  return {
    sessionUrl: sessionData.sessionUrl as string,
    sessionId:  (sessionData._id || sessionData.sessionId) as string,
    currency:   gatewayCurrency,
    amount:     gatewayAmount,
  };
}

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

    // ── Kashier: إنشاء جلسة الدفع إذا اختار المستخدم الدفع بالبطاقة ──
    if (paymentMethod === 'kashier') {
      try {
        const kashierSession = await createKashierSession({
          orderId: newOrder.orderId,
          amount:  finalTotal,
          currency,
          customer: {
            name:  customerName,
            phone: customerPhone,
            email: `customer-${customerPhone}@temp.kashier.local`,
          },
        });

        if (kashierSession.sessionUrl) {
          // حفظ بيانات الجلسة في قاعدة البيانات
          await OrderModel.findOneAndUpdate(
            { orderId: newOrder.orderId },
            {
              'payment.kashierSessionId': kashierSession.sessionId,
              'payment.kashierCurrency': kashierSession.currency,
              'payment.kashierAmount':   parseFloat(kashierSession.amount),
            }
          );

          return NextResponse.json({
            success: true,
            status:  'pending_payment',
            orderId: newOrder.orderId,
            invoiceNumber: newOrder.invoice.invoiceNumber,
            order: newOrder,
            kashier: {
              sessionUrl: kashierSession.sessionUrl,
              sessionId:  kashierSession.sessionId,
              currency:   kashierSession.currency,
              amount:     kashierSession.amount,
            },
          }, { status: 201 });
        }
      } catch (kashierErr: any) {
        console.error('Kashier session creation error (Next.js API):', kashierErr);
        // إرجاع خطأ واضح بدل ما نكمل بصمت
        return NextResponse.json(
          { error: 'فشل إنشاء جلسة الدفع عبر كاشير: ' + (kashierErr.message || '') },
          { status: 500 }
        );
      }
    }

    // ── الدفع عند الاستلام أو أي طريقة أخرى ──
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
