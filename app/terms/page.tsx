import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileCheck, ShieldAlert, Truck, DollarSign, Sprout } from 'lucide-react';

export const metadata: Metadata = {
  title: 'الشروط والأحكام | شركة جرين لاين للأسمدة الزراعية',
  description: 'الشروط والأحكام العامة للتعامل والشراء وطلب الأسمدة الزراعية من شركة جرين لاين.',
};

export default function TermsPage() {
  return (
    <div className="bg-stone-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <Link href="/" className="hover:text-emerald-700">الرئيسية</Link>
          <span>/</span>
          <span className="text-emerald-800 font-bold">الشروط والأحكام</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-xs mb-8">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
            <FileCheck className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block mb-3">
            اتفاقية الاستخدام والتعامل التجاري
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight mb-4">
            الشروط والأحكام العامة
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            مرحباً بكم في موقع <b>جرين لاين للأسمدة الزراعية والمخصبات</b>. تحدد هذه الشروط والأحكام القواعد واللوائح التنظيمية الخاصة بشراء منتجاتنا وتوريدها للمزارع والمشاريع الزراعية.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2.5">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              1. الأسعار والعملة والدفع
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              جميع الأسعار المعروضة على الموقع هي <b>بالجنيه المصري (EGP)</b> وتشمل العبوة أو الشيكارة المحددة. يحق لشركة جرين لاين تحديث الأسعار طبقاً لمتغيرات أسعار المواد الخام العالمية وتكاليف الشحن. يتم الدفع نقداً عند استلام الشحنة وفحصها بالمزرعة، أو عبر التحويلات البنكية المعتمدة للطلبيات الكبيرة.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-emerald-600" />
              2. التوصيل وشحن المزارع
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              نوفر خدمة الشحن لجميع محافظات جمهورية مصر العربية والمناطق الزراعية المستصلحة. يتطلب التوصيل وجود طريق ممهد يسمح بمرور سيارات النقل والتفريغ في مكان آمن ومحمي من الأمطار والشمس. يتحمل المشتري مسؤولية توفير عمالة التعتيق والتنزيل في الموقع إذا لم يتم الاتفاق على غير ذلك مسبقاً.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2.5">
              <Sprout className="w-5 h-5 text-emerald-600" />
              3. الجودة والتركيب الكيميائي
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              تضمن شركة جرين لاين مطابقة كافة الأسمدة المعروضة للنسب والمكونات المذكورة في بطاقة التحليل الفني. جميع المنتجات مسجلة رسمياً ومصنعة وفقاً للضوابط المعمول بها في وزارة الزراعة المصرية.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-emerald-600" />
              4. الاستشارات الزراعية والمسؤولية
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              الإرشادات والجرعات المقدمة على الموقع أو من خلال مهندسينا هي توصيات استرشادية مبنية على المتوسطات العامة. يتحمل المزارع مسؤولية مراعاة ظروف أرضه الخاصة، تحليل ملوحة مياه الري، واستشارة مهندس المزرعة قبل تطبيق أي برنامج تسميدي مكثف.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
