'use client';

import React, { useRef } from 'react';
import {
  Sprout,
  CircleDollarSign,
  Banknote,
  FileText,
  CalendarDays,
  CalendarClock,
  PackageCheck,
  CreditCard,
  Hash,
  Printer,
} from 'lucide-react';

export default function InvoicePreviewPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  // Theme Colors for Green Line Fertilizers
  const C1 = '#065f46'; // Forest Emerald
  const C2 = '#161717'; // Text
  const C4 = '#059669'; // Accent Green

  // سعر الصرف: 1 ريال = 14.68 جنيه مصري
  const exchangeRate = 14.68;

  // البيانات الثابتة
  const order = {
    orderId: '6ade182677603b844fa49db4',
    createdAt: new Date().toISOString(),
    customer: 'ahmed',
    whatsapp: '+966 50 123 4567',
    address: 'الرياض - حي النخيل - شارع الملك عبدالعزيز',
    invoiceNumber: 'INV-49db4',
    paymentMethod: 'الدفع عند الاستلام',
    paymentStatus: 'مستحق عند الاستلام والتسليم',
    items: [
      {
        name: 'جرين جرو المتوازن - BALANCED NUTRITION',
        priceEGP: 14680, // السعر بالجنيه المصري (1000 ريال × 14.68)
        qty: 1,
        weight: '',
      },
    ],
  };

  // حساب الإجمالي بالريال السعودي
  const totalEGP = order.items.reduce((sum, item) => sum + (item.priceEGP * item.qty), 0);
  const totalSAR = totalEGP / exchangeRate;

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

  const rows: [string, string, React.ReactNode][] = [
    [
      'إجمالي قيمة المنتجات',
      `${totalSAR.toLocaleString('ar-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ر.س`,
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
          .print-button { display: none !important; }
        }
        @media screen {
          body { background: #f0f0f0; display: flex; justify-content: center; padding: 20px 0; }
        }
      `}</style>

      {/* زر الطباعة */}
      <div className="print-button" style={{
        position: 'fixed',
        top: 20,
        left: 20,
        zIndex: 9999,
      }}>
        <button
          onClick={handlePrint}
          style={{
            padding: '12px 24px',
            backgroundColor: '#059669',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
          }}
        >
          <Printer size={20} />
          طباعة الفاتورة
        </button>
      </div>

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
                شركة جرين لاين للأسمدة الزراعية
              </div>
              <div style={{ wordBreak: 'break-word' }}>
                <span style={{ color: C1, fontWeight: 700 }}>هاتف خدمة العملاء: </span>
                <span dir="ltr">+20 155 245 6445</span>
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
                const priceSAR = item.priceEGP / exchangeRate;
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
                          {priceSAR.toLocaleString('ar-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} × {item.qty} = {totalItemSAR.toLocaleString('ar-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ر.س
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
      </div>
    </>
  );
}
