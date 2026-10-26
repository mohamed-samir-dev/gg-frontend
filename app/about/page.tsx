import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Sprout, Award, ShieldCheck, Users, Target, Eye, CheckCircle2, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'من نحن | شركة جرين لاين للأسمدة الزراعية والمخصبات',
  description: 'تعرف على قصة شركة جرين لاين الرائدة في توريد وتصنيع الأسمدة المركبة NPK والمخصبات الزراعية ومحسنات التربة في جمهورية مصر العربية.',
};

export default function AboutPage() {
  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-stone-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="/farm.jpg" alt="مزارع جرين لاين" fill className="object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <span className="text-xs font-bold text-emerald-300 bg-emerald-800/80 px-4 py-1.5 rounded-full inline-block mb-4 border border-emerald-500/40">
            رواد تغذية النبات والمخصبات الزراعية
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            عن شركة جرين لاين للأسمدة الزراعية
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            انطلقنا برؤية هندسية واضحة تهدف إلى تقديم حلول تسميد متطورة ذات نقاوة استثنائية، تمكن المزارع المصري من تحقيق أعلى إنتاجية بأقل تكلفة ممكنة، مع الحفاظ على خصوبة التربة للأجيال القادمة.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              قصة نجاحنا
            </span>
            <h2 className="text-3xl font-black text-stone-900">
              شراكة حقيقية مع الأرض والمزارع
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              تأسست شركة <b>جرين لاين</b> ككيان متخصص في إنتاج وتوزيع الأسمدة المركبة NPK، الأسمدة العضوية، منشطات الجذور، ومخاليط العناصر الصغرى والمخلبيات. انطلقنا من واقع التحديات التي يواجهها القطاع الزراعي في مصر، بدءاً من ملوحة مياه الري والأراضي الصحراوية المستصلحة، وصولاً إلى الحاجة الملحة لثمار مطابقة للمواصفات التصديرية.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">
              نعمل مع نخبة من أساتذة تغذية النبات والمراكز البحثية لتركيب وتوريد أسمدة خالية تماماً من الصوديوم والكلور والشوائب غير الذائبة، مما يضمن كفاءة 100% في شبكات الري بالتنقيط والمحوري دون أي انسدادات.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-stone-200">
                <span className="text-2xl font-black text-emerald-700 block">+50,000</span>
                <span className="text-xs text-stone-500 font-semibold">فدان مخدوم بمنتجاتنا</span>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-stone-200">
                <span className="text-2xl font-black text-emerald-700 block">+1,200</span>
                <span className="text-xs text-stone-500 font-semibold">مزرعة ومشروع إنتاجي</span>
              </div>
            </div>
          </div>

          <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl border border-emerald-100">
            <Image
              src="/farm.jpg"
              alt="أراضي زراعية تم تسميدها بأسمدة جرين لاين"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8 text-white">
              <div>
                <p className="text-xs text-emerald-300 font-bold mb-1">ضمان الإنتاجية العالية</p>
                <h3 className="text-lg font-bold">مزارع النوبارية، الإسماعيلية، والدلتا تثق في جرين لاين</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-stone-900">رؤيتنا</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              أن نكون الاسم الأول والموثوق به في قطاع التغذية الزراعية في مصر والشرق الأوسط، بتوفير حلول مبتكرة ومستدامة تعزز الأمن الغذائي وترفع القدرة التنافسية للصادرات الزراعية.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-stone-900">رسالتنا</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              توفير أسمدة زراعية ومخصبات معتمدة ومطابقة لأعلى المواصفات القياسية، مصحوبة بدعم فني واستشارات هندسية ميدانية مجانية للمزارعين لتحقيق أعلى عائد استثماري للمحصول.
            </p>
          </div>
        </div>

        {/* Quality Standards & Registration */}
        <div id="certificates" className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 mb-20">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-emerald-300 bg-emerald-800/80 px-3 py-1 rounded-full inline-block mb-3">
              الاعتمادات والتراخيص
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              أسمدة مسجلة ومفحوصة معملياً
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-2 leading-relaxed">
              تخضع جميع منتجات جرين لاين لرقابة صارمة وفحص معملي دوري لنسب العناصر، لضمان مطابقة التركيبة المسجلة على الشيكارة لما يحتويه المنتج بالداخل دون أي تلاعب.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-emerald-900/60 border border-emerald-700/50 p-5 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mb-3" />
              <h4 className="font-bold text-sm text-white mb-1">تسجيل وزارة الزراعة</h4>
              <p className="text-xs text-emerald-200">مرخص ومسجل رسمياً بلجنة المخصبات والمبيدات.</p>
            </div>

            <div className="bg-emerald-900/60 border border-emerald-700/50 p-5 rounded-2xl">
              <Award className="w-8 h-8 text-emerald-400 mb-3" />
              <h4 className="font-bold text-sm text-white mb-1">شهادات تحليل الجودة</h4>
              <p className="text-xs text-emerald-200">تحليل معملي معتمد لكل تشغيلة إنتاجية قبل الطرح.</p>
            </div>

            <div className="bg-emerald-900/60 border border-emerald-700/50 p-5 rounded-2xl">
              <Users className="w-8 h-8 text-emerald-400 mb-3" />
              <h4 className="font-bold text-sm text-white mb-1">إشراف مهندسين معتمدين</h4>
              <p className="text-xs text-emerald-200">فريق ميداني يزور المزارع ويتابع كفاءة امتصاص السماد.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-white rounded-3xl p-8 sm:p-12 border border-stone-200">
          <h3 className="text-2xl font-black text-stone-900 mb-3">هل أنت مستعد لرفع إنتاجية محصولك هذا الموسم؟</h3>
          <p className="text-sm text-stone-600 max-w-xl mx-auto mb-6">
            تصفح كتالوج الأسمدة أو تواصل مع فريقنا الهندسي للحصول على برنامج تغذية مخصص لنوعية أرضك ومحصولك.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition text-sm flex items-center gap-2"
            >
              <span>استعراض الأسمدة الزراعية</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl transition text-sm"
            >
              تواصل مع فريق جرين لاين
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
