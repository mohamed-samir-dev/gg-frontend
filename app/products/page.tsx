import React from 'react';
import type { Metadata } from 'next';
import FertilizerCatalog from '@/components/FertilizerCatalog';
import { getFertilizerProducts } from '@/lib/db';
import { Sprout, Award, Truck, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'كتالوج الأسمدة الزراعية | جرين لاين',
  description: 'تصفح قائمة الأسمدة الزراعية والمخصبات المعتمدة من شركة جرين لاين: أسمدة مركبة NPK، أسمدة عضوية، محسنات تربة وهيوميك، وعناصر صغرى مخلبية.',
};

export const revalidate = 60;

export default async function ProductsPage() {
  const products = await getFertilizerProducts();

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-stone-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-bold text-emerald-300 bg-emerald-800/80 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-emerald-600/40">
            كتالوج التغذية الزراعية المتكاملة
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            منتجات أسمدة جرين لاين المعتمدة
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            جميع المنتجات المعروضة أدناه مسجلة ومطابقة للمواصفات القياسية. اختر ما يناسب تربتك ومحصولك، مع إمكانية التوصيل السريع لكافة مزارع مصر.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-200">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              خامات نقية 100%
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-400" />
              شحن مباشر من المستودعات
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              ضمان التركيب والتحليل المعملي
            </span>
          </div>
        </div>
      </div>

      {/* Catalog Component */}
      <FertilizerCatalog
        initialProducts={products}
        title="جميع أنواع الأسمدة والمخصبات"
        subtitle="استخدم الفلاتر لتصفية الأسمدة حسب التصنيف أو ابحث عن تركيبة معينة"
      />
    </div>
  );
}
