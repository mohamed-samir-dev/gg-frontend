import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Lock, Shield, Eye, Database, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية | شركة جرين لاين للأسمدة الزراعية',
  description: 'سياسة الخصوصية وسرية بيانات المزارعين والعملاء لدى شركة جرين لاين للأسمدة والمخصبات الزراعية.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-stone-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <Link href="/" className="hover:text-emerald-700">الرئيسية</Link>
          <span>/</span>
          <span className="text-emerald-800 font-bold">سياسة الخصوصية</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-xs mb-8">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block mb-3">
            حماية وأمان بياناتك
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight mb-4">
            سياسة الخصوصية وسرية المعلومات
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            تلتزم شركة <b>جرين لاين للأسمدة الزراعية</b> بحماية خصوصية جميع زوار ومزارعي وعملاء موقعنا الإلكتروني. توضح هذه الوثيقة نوعية المعلومات التي نجمعها وكيف نستخدمها ونحميها وفقاً لأعلى معايير الأمان الرقمي.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2.5">
              <Database className="w-5 h-5 text-emerald-600" />
              1. البيانات التي نقوم بجمعها
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              عند استخدامك لموقع جرين لاين أو طلبك للأسمدة، قد نجمع البيانات التالية:
            </p>
            <ul className="list-disc list-inside text-sm text-stone-600 space-y-2 pr-2">
              <li>الاسم واللقب الشخصي أو اسم المزرعة/الشركة الزراعية.</li>
              <li>رقم الهاتف المحمول أو الواتساب لتنسيق الشحن وتأكيد الطلب.</li>
              <li>المحافظة والمركز والعنوان الدقيق للمزرعة لتسليم الشحنة.</li>
              <li>تفاصيل المنتجات والكميات المطلوبة والملاحظات الفنية الخاصة بمحصولك.</li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2.5">
              <Eye className="w-5 h-5 text-emerald-600" />
              2. كيف نستخدم معلوماتك؟
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              تُستخدم المعلومات التي نجمعها فقط للأغراض المشروعة التالية:
            </p>
            <ul className="list-disc list-inside text-sm text-stone-600 space-y-2 pr-2">
              <li>تجهيز وشحن طلبيات الأسمدة الزراعية إلى موقع مزرعتك بكفاءة وسرعة.</li>
              <li>تواصل المهندس الزراعي المختص لتقديم التوصية الفنية وجرعات التسميد المناسبة.</li>
              <li>إصدار الفواتير الرسمية وسندات الاستلام وبوالص الشحن.</li>
              <li>إعلامك بأحدث العروض الموسمية وتخفيضات أسمدة التحضين والتحجيم.</li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-emerald-600" />
              3. عدم مشاركة البيانات مع أطراف خارجية
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              نتعهد بعدم بيع أو تأجير أو مشاركة أي بيانات شخصية أو معلومات خاصة بمزارعكم مع أي جهات تسويقية خارجية. تقتصر مشاركة بيانات العنوان ورقم الهاتف فقط مع سائقي أسطول الشحن المعتمد لدينا لغرض التوصيل الحصري.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-emerald-600" />
              4. حقوق العميل
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              يحق لك في أي وقت التواصل معنا لطلب تعديل أو حذف بياناتك من سجلاتنا، أو إيقاف تلقي الرسائل الترويجية، عن طريق الاتصال بفريق خدمة العملاء.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
