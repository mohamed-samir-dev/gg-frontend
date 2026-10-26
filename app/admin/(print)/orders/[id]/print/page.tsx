'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Sprout,
  CircleDollarSign,
  Banknote,
  FileText,
  CalendarDays,
  CalendarClock,
  ShieldCheck,
  PackageCheck,
  CreditCard,
  Hash,
} from 'lucide-react';

interface OrderItem {
  name: string;
  price: number;
  qty: number;
  weight?: string;
  color?: string;
  storage?: string;
}

interface Order {
  _id?: string;
  orderId: string;
  createdAt: string;
  customer: string;
  whatsapp: string;
  address: string;
  city?: string;
  country?: string;
  nationalId?: string;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  invoiceNumber: string;
  items: OrderItem[];
  notes?: string;
}

interface Company {
  header?: string;
  footer?: string;
  nameEn?: string;
  nameAr?: string;
  stamp?: string;
  taxNumber?: string;
  phone?: string;
  addressAr?: string;
  currencyAr?: string;
}

export default function PrintOrderPage() {
  const params = useParams();
  const id = params?.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [company, setCompany] = useState<Company>({});
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      fetch(`/api/admin/orders/${id}`).then((r) => r.json()),
      fetch('/api/admin/company').then((r) => r.json()).catch(() => ({})),
    ])
      .then(([o, c]) => {
        if (o && !o.error) {
          // Format order into consistent interface
          const totalVal = o.pricing?.totalSAR ?? o.pricing?.totalLocal ?? o.pricing?.totalEGP ?? o.totalAmount ?? o.total ?? 0;
          const currency = o.pricing?.currency === 'EGP' ? 'جنيه' : 'ريال';
          const formattedOrder: Order = {
            _id: o._id,
            orderId: o.orderId,
            createdAt: o.createdAt || new Date().toISOString(),
            customer: o.customer?.name || (typeof o.customer === 'string' ? o.customer : 'عميل غير مسجل'),
            whatsapp: o.customer?.phone || o.whatsapp || '',
            address: o.customer?.address || o.address || '',
            city: o.customer?.city || '',
            country: o.customer?.country || 'SA',
            nationalId: o.customer?.nationalId || '',
            total: totalVal,
            paymentMethod: o.payment?.method === 'kashier' ? 'بطاقة كاشير الإلكترونية' : 'الدفع عند الاستلام',
            paymentStatus: o.payment?.status === 'paid' ? 'مدفوع بالكامل' : 'مستحق عند الاستلام والتسليم',
            invoiceNumber: o.invoice?.invoiceNumber || `INV-${(o.orderId || '').slice(-8)}`,
            items: (o.items || []).map((it: any) => ({
              name: it.name || 'سماد زراعي',
              price: it.price || it.priceSAR || it.priceEGP || 0,
              qty: it.qty || it.quantity || 1,
              weight: it.weight || '',
            })),
            notes: o.notes || '',
          };
          setOrder(formattedOrder);
        }
        if (c && !c.error) {
          setCompany(c);
        }
      })
      .catch((err) => console.error('Fetch error:', err));
  }, [id]);

  // Auto trigger print after images are fully loaded
  useEffect(() => {
    if (!order) return;
    const imgs = document.querySelectorAll<HTMLImageElement>('img');
    const pending = Array.from(imgs).filter((img) => !img.complete);
    const printNow = () => window.print();

    if (pending.length === 0) {
      const timer = setTimeout(printNow, 300);
      return () => clearTimeout(timer);
    }
    let loaded = 0;
    pending.forEach((img) => {
      const done = () => {
        if (++loaded === pending.length) {
          setTimeout(printNow, 200);
        }
      };
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    });
  }, [order]);

  if (!order) {
    return (
      <div style={{ textAlign: 'center', padding: 60, fontFamily: "'Segoe UI', Tahoma, sans-serif", direction: 'rtl' }}>
        <div style={{ fontSize: 18, color: '#065f46', fontWeight: 'bold' }}>جاري تجهيز الفاتورة للطباعة...</div>
      </div>
    );
  }

  // Theme Colors for Green Line Fertilizers
  const C1 = '#065f46'; // Forest Emerald
  const C2 = '#161717'; // Text
  const C4 = '#059669'; // Accent Green
  const currencyLabel = company.currencyAr || 'ريال';

  // سعر الصرف: 1 ريال = 15.03 جنيه مصري
  const exchangeRate = 15.03;
  
  const formatDateArabic = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const deliveryDate = new Date(new Date(order.createdAt).getTime() + 48 * 3600 * 1000);
  const deliveryDay = deliveryDate.getDate();
  const deliveryMonthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  const deliveryMonth = deliveryMonthNames[deliveryDate.getMonth()];

  // تحويل الإجمالي من جنيه مصري إلى ريال سعودي
  const totalSAR = order.total / exchangeRate;

  const rows: [string, string, React.ReactNode][] = [
    [
      'إجمالي قيمة المنتجات',
      `${totalSAR.toLocaleString('ar-SA', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} ر.س`,
      <CircleDollarSign key="إجمالي الفاتورة" size={18} color={C4} />,
    ],
    [
      'طريقة السداد',
      order.paymentMethod,
      <CreditCard key="طريقة السداد" size={18} color={C4} />,
    ],
    [
      'حالة سداد الفاتورة',
      order.paymentStatus,
      <Banknote key="حالة السداد" size={18} color={C4} />,
    ],
    [
      'رقم الفاتورة الرسمية',
      order.invoiceNumber,
      <FileText key="رقم الفاتورة" size={18} color={C4} />,
    ],
    [
      'رقم أمر الطلب',
      order.orderId,
      <Hash key="رقم الطلب" size={18} color={C4} />,
    ],
    [
      'تاريخ إصدار الفاتورة',
      formatDateArabic(order.createdAt),
      <CalendarDays key="تاريخ الفاتورة" size={18} color={C4} />,
    ],
    [
      'موعد التوريد والتسليم',
      `${deliveryDay} ${deliveryMonth}`,
      <CalendarClock key="موعد التوريد" size={18} color={C4} />,
    ],
  ];

  return (
    <>
      <style>{`
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-sizing: border-box; }
        html, body { margin: 0; padding: 0; background: #fff; }
        @media print {
          @page { size: A4 portrait; margin: 0; }
          html, body { width: 210mm; height: 297mm; overflow: hidden; }
        }
        @media screen {
          body { background: #f0f0f0; display: flex; justify-content: center; padding: 20px 0; }
        }
      `}</style>

      <div
        ref={contentRef}
        style={{
          fontFamily: "'Segoe UI', Tahoma, sans-serif",
          padding: '6px 14px',
          width: '210mm',
          height: '297mm',
          overflow: 'hidden',
          position: 'relative',
          direction: 'rtl',
          background: '#ffffff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >


        {/* عنوان الفاتورة والعقد */}
        <div style={{ textAlign: 'center', marginBottom: 6 }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#064e3b', letterSpacing: 1.5 }}>
            فاتورة مبيعات وأمر توريد رسمي
          </div>
          <div style={{ fontSize: 12.5, color: '#065f46', marginTop: 2, fontWeight: 700 }}>
            بين شركة جرين لاين للأسمدة والمخصبات <span style={{ color: C4, fontWeight: 800 }}>(المورّد)</span>
            &nbsp;والعميل <span style={{ color: C4, fontWeight: 800 }}>(المستلم / المشتري)</span>
          </div>
        </div>

        {/* صندوقا البيانات + صورة الاتفاق والشعار بالمنتصف */}
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 8, marginBottom: 6, position: 'relative' }}>
          {/* بيانات العميل */}
          <div style={{ flex: 1, border: '1px solid #a7f3d0', borderRadius: 10, overflow: 'hidden' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #064e3b, #065f46)',
                color: 'white',
                textAlign: 'center',
                padding: '7px 0',
                fontWeight: 800,
                fontSize: 14.5,
              }}
            >
              بيانات العميل
            </div>
            <div
              style={{
                padding: '6px 14px 8px',
                fontSize: 12,
                color: C2,
                lineHeight: 1.85,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <div style={{ wordBreak: 'break-word' }}>
                <span style={{ color: C1, fontWeight: 700 }}>الاسم الكريم: </span>
                {order.customer}
              </div>
              <div style={{ wordBreak: 'break-word' }}>
                <span style={{ color: C1, fontWeight: 700 }}>رقم الجوال: </span>
                <span dir="ltr">{order.whatsapp}</span>
              </div>
              <div style={{ wordBreak: 'break-word' }}>
                <span style={{ color: C1, fontWeight: 700 }}>المدينة / المحافظة: </span>
                {order.city || 'الرياض'}
              </div>
              <div style={{ wordBreak: 'break-word' }}>
                <span style={{ color: C1, fontWeight: 700 }}>العنوان بالتفصيل: </span>
                {order.address}
              </div>
              <div style={{ wordBreak: 'break-word' }}>
                <span style={{ color: C1, fontWeight: 700 }}>رقم الطلب: </span>
                {order.orderId}
              </div>
            </div>
          </div>

          {/* صورة الشعار/الاتفاق فوق المربعين بالمنتصف */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '60%',
              transform: 'translate(-50%, -50%)',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          >
            <img
              src="/printo.webp"
              alt="اتفاق"
              style={{ width: 100, height: 100, objectFit: 'contain', opacity: 0.95 }}
            />
          </div>

          {/* بيانات المؤسسة / المورّد */}
          <div style={{ flex: 1, border: '1px solid #a7f3d0', borderRadius: 10, overflow: 'hidden' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #064e3b, #065f46)',
                color: 'white',
                textAlign: 'center',
                padding: '7px 0',
                fontWeight: 800,
                fontSize: 14.5,
              }}
            >
              بيانات المنشأة المورّدة
            </div>
            <div
              style={{
                padding: '6px 45px 8px 14px',
                fontSize: 12,
                color: C2,
                lineHeight: 1.85,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <div style={{ wordBreak: 'break-word' }}>
                <span style={{ color: C1, fontWeight: 700 }}>اسم المؤسسة: </span>
                {company.nameAr || 'شركة جرين لاين للأسمدة الزراعية'}
              </div>
              <div style={{ wordBreak: 'break-word' }}>
                <span style={{ color: C1, fontWeight: 700 }}>هاتف خدمة العملاء: </span>
                <span dir="ltr">{company.phone || '+20 155 245 6445'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* وصف الاتفاق وأمر التوريد */}
        <div
          style={{
            fontSize: 11,
            color: '#064e3b',
            fontWeight: 600,
            lineHeight: 1.5,
            marginTop: 4,
            marginBottom: 4,
            textAlign: 'center',
            padding: '0 50px',
          }}
        >
          تم الاتفاق وتحرير أمر التوريد بين الطرفين على أن تقوم شركة جرين لاين بتوريد منتجات التغذية النباتية والمخصبات الموضحة أدناه للعميل وفقاً لأعلى معايير الجودة والمواصفات القياسية والشروط التالية:
        </div>

        {/* قسمين بخط رأسي فاصل */}
        <div style={{ display: 'flex', gap: 0, alignItems: 'stretch', marginTop: 12 }}>
          {/* تفاصيل الفاتورة والمنتجات - يمين (50%) */}
          <div style={{ width: '50%', flexShrink: 0, padding: '0 4px 0 8px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 13,
                  color: 'white',
                  background: 'linear-gradient(135deg, #064e3b, #065f46)',
                  borderRadius: 20,
                  padding: '3px 18px',
                }}
              >
                تفاصيل الفاتورة والمنتجات
              </div>
            </div>

            <div style={{ fontSize: 11.5, color: C2, lineHeight: 1.65 }}>
              {/* قائمة الأصناف والكميات */}
              {order.items.map((item, i) => {
                // تحويل السعر من جنيه مصري إلى ريال سعودي
                const priceSAR = item.price / exchangeRate;
                const totalItemSAR = priceSAR * item.qty;
                
                return (
                  <React.Fragment key={i}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderBottom: '1px dashed #d1fae5',
                        paddingBottom: 4,
                        marginBottom: 4,
                        gap: 2,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Sprout size={16} color={C4} />
                        <span style={{ color: C1, fontWeight: 700, fontSize: 11 }}>
                          الصنف {order.items.length > 1 ? i + 1 : ''}:
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 600 }}>
                          {item.name}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, paddingRight: 20 }}>
                        <PackageCheck size={14} color={C4} />
                        <span style={{ color: C1, fontWeight: 700, fontSize: 10.5 }}>
                          الكمية:
                        </span>
                        <span style={{ fontSize: 10.5 }}>
                          {item.qty} {item.weight ? `(${item.weight})` : 'عبوة'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, paddingRight: 20 }}>
                        <span style={{ color: C1, fontWeight: 700, fontSize: 10.5 }}>
                          سعر الوحدة / الإجمالي:
                        </span>
                        <span style={{ fontSize: 10.5, direction: 'ltr' }}>
                          {priceSAR.toLocaleString('ar-SA', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} × {item.qty} = {totalItemSAR.toLocaleString('ar-SA', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} ر.س
                        </span>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}

              {/* صفوف الملخص المالي والفاتورة */}
              {rows.map(([label, val, icon]) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px dashed #d1fae5',
                    paddingBottom: 2,
                    marginBottom: 2,
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      color: C1,
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span style={{ display: 'inline-flex' }}>{icon}</span>
                    {label}:
                  </span>
                  <span style={{ fontWeight: 600 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* خط رأسي فاصل بلون أخضر زمردي */}
          <div style={{ width: 1.5, background: C4, alignSelf: 'stretch' }} />

          {/* شروط وأحكام العقد والتوريد الزراعي - شمال (50%) */}
          <div style={{ flex: 1, padding: '0 0 0 12px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 13,
                  color: 'white',
                  background: 'linear-gradient(135deg, #064e3b, #065f46)',
                  borderRadius: 20,
                  padding: '3px 18px',
                }}
              >
                شروط وأحكام وضمانات التوريد
              </div>
            </div>

            <div style={{ fontSize: 10.5, color: C2, lineHeight: 1.6 }}>
              {[
                'تقر شركة جرين لاين بأن جميع المركبات والأسمدة مطابقة للمواصفات القياسية والنسب السمادية الفعالة.',
                'يلتزم العميل بمعاينة وفحص سلامة العبوات وأرقام التشغيلات فور وصول الشحنة لموقع التسليم.',
                'تحفظ الأسمدة والمخصبات في مكان جاف ومظلل وجيد التهوية بعيداً عن الرطوبة المباشرة وأشعة الشمس.',
                'في حال اختيار الدفع عند الاستلام، يلتزم العميل بسداد كامل القيمة نقداً للمندوب فور استلام الطرد.',
                'يحق للعميل استبدال أو استرجاع العبوات السليمة غير المفتوحة خلال المدة المقررة طبقاً لسياسة الاسترجاع.',
                'تقع مسؤولية الالتزام بمعدلات التسميد والجرعات الموصى بها على المشتري أو بمتابعة المهندس المختص.',
                'يتم متابعة مسار الشحن والتواصل مع العميل عبر أرقام الاتصال والواتساب المسجلة بهذا الطلب.',
                'تعتبر هذه الفاتورة وأمر التوريد مستنداً رسمياً نهائياً لاستلام وتسليم المنتجات والكميات الموضحة بعاليه.',
                'يقدم مهندسو الدعم الفني لشركة جرين لاين استشارات مجانية حول برامج التسميد لضمان أعلى إنتاجية.',
                'أقر العميل بقراءة ومراجعة تفاصيل هذه الفاتورة والموافقة على جميع ما ورد بها من بنود وضمانات.',
              ].map((t, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 6,
                    alignItems: 'flex-start',
                    borderBottom: '1px dashed #d1fae5',
                    paddingBottom: 2,
                    marginBottom: 2,
                  }}
                >
                  <span
                    style={{
                      color: C4,
                      fontWeight: 800,
                      minWidth: 16,
                      fontSize: 11,
                      flexShrink: 0,
                      lineHeight: 1.45,
                    }}
                  >
                    {['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠'][i]}.
                  </span>
                  <span style={{ fontSize: 10.5, lineHeight: 1.45 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* نص الإقرار والموافقة */}
      </div>
    </>
  );
}
