import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { RotateCcw, CheckCircle2, AlertTriangle, ShieldCheck, Phone, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'سياسة الاسترجاع والاستبدال | شركة جرين لاين للأسمدة الزراعية',
  description: 'تعرف على سياسة وشروط استرجاع واستبدال الأسمدة الزراعية والمخصبات لدى شركة جرين لاين لحماية حقوق المزارعين وضمان سلامة المنتجات.',
};

export default function ReturnPolicyPage() {
  return (
    <div className="bg-stone-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <Link href="/" className="hover:text-emerald-700">الرئيسية</Link>
          <span>/</span>
          <span className="text-emerald-800 font-bold">سياسة الاسترجاع والاستبدال</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-xs mb-8">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
            <RotateCcw className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block mb-3">
            ضمان حقوق المزارعين وثقة التعامل
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight mb-4">
            سياسة الاسترجاع والاستبدال
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            في شركة <b>جرين لاين للأسمدة الزراعية والمخصبات</b>، نضع رضا وثقة شركائنا المزارعين في المقام الأول. تخضع سياسة الاسترجاع والاستبدال لقانون حماية المستهلك المصري والضوابط الفنية لسلامة الأسمدة والمخصبات الزراعية.
          </p>
        </div>

        {/* Details Content */}
        <div className="space-y-6">
          {/* Section 1 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              1. المدة الزمنية المسموح بها للاسترجاع والاستبدال
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              يحق للعميل طلب استرجاع أو استبدال الأسمدة والمخصبات الزراعية خلال مدة أقصاها <b>14 يوماً</b> من تاريخ استلام الشحنة في المزرعة أو المخزن، شريطة الالتزام بمعايير الحفظ الموضحة أدناه.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              2. شروط قبول استرجاع الأسمدة والمخصبات
            </h2>
            <ul className="space-y-3 text-sm text-stone-600">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                <span>أن تكون الشكائر أو العبوات البلاستيكية <b>بحالتها الأصلية محكمة الإغلاق</b>، مع سلامة شريط اللحام وبطاقة البيانات الملصقة عليها (Label).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                <span>عدم تعرض المنتج لأي رطوبة أو مياه أو حرارة شمس مباشرة قد تؤدي إلى تحجر السماد أو تغير خواصه الكيميائية.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                <span>عدم فتح العبوة أو استهلاك أي جزء منها لأغراض التجربة، حفاظاً على معايير الأمان والتسجيل الزراعي.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                <span>وجود الفاتورة أو إيصال الاستلام أو رقم الطلب الإلكتروني الصادر من جرين لاين.</span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              3. حالات التلف أو الخطأ في التوريد (استبدال مجاني فوري)
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              إذا استلم العميل شحنة بها أي تمزق في الشكائر أثناء الشحن، أو تم تسليم صنف سمادي يختلف عن الصنف المطلوب (مثلاً NPK 12-12-36 بدلاً من NPK 20-20-20)، تتحمل شركة جرين لاين <b>كامل تكاليف الشحن والاسترجاع</b> مع إرسال الشحنة البديلة الصحيحة فوراً دون أي رسوم إضافية.
            </p>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              4. آلية استرداد الأموال
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              بمجرد وصول الشحنة المسترجعة إلى مستودعات جرين لاين والتأكد من سلامة العبوات ومطابقتها للشروط، يتم رد كامل المبلغ للعميل خلال مدة تتراوح بين <b>3 إلى 5 أيام عمل</b> عبر التحويل البنكي أو المحفظة الإلكترونية أو نقداً حسب رغبة العميل.
            </p>
          </div>

          {/* Contact box for support */}
          <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold">هل تحتاج لمساعدة في استرجاع أو استبدال منتج؟</h3>
              <p className="text-xs text-emerald-200 mt-1">
                خدمة عملاء جرين لاين جاهزة لاستقبال طلبك يومياً من 8 صباحاً حتى 8 مساءً.
              </p>
            </div>
            <a
              href="https://wa.me/201552456445?text=مرحبا،%20أريد%20طلب%20استرجاع/استبدال%20شحنة%20أسمدة"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold rounded-xl text-xs sm:text-sm shrink-0 transition flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>تواصل مع قسم المرتجعات</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
