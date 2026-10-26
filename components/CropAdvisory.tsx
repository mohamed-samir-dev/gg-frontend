import React from 'react';
import Link from 'next/link';
import { Sprout, Sun, Droplets, Sparkles, ArrowLeft } from 'lucide-react';

export default function CropAdvisory() {
  const stages = [
    {
      step: 'المرحلة 01',
      title: 'تأسيس الجذور والإنبات',
      desc: 'بناء شبكة جذور قوية ومعالجة ملوحة التربة لتحفيز انطلاق الشتلات والبذور.',
      fertilizer: 'هيوميك روت 85% + نيترو ستارت',
      icon: Droplets,
      color: 'border-amber-400 bg-amber-50/50 text-amber-800',
    },
    {
      step: 'المرحلة 02',
      title: 'النمو الخضري والتفريع',
      desc: 'تنشيط بناء المجموع الخضري والتمثيل الضوئي وعلاج نقص الكلوروفيل والاصفرار.',
      fertilizer: 'جرين جرو المتوازن NPK 20-20-20 + فيرو بلانت',
      icon: Sprout,
      color: 'border-emerald-500 bg-emerald-50/50 text-emerald-800',
    },
    {
      step: 'المرحلة 03',
      title: 'التزهير وتثبيت العقد',
      desc: 'منع تساقط الأزهار وتثبيت العقد وتقوية الجدر الخلوية للثمار ومقاومة التشوهات.',
      fertilizer: 'كالسيوم برو (كالسيوم + بورون سائل)',
      icon: Sun,
      color: 'border-blue-500 bg-blue-50/50 text-blue-800',
    },
    {
      step: 'المرحلة 04',
      title: 'التحجيم والتلوين والتبكير',
      desc: 'نقل السكريات والكربوهيدرات لزيادة حجم وصلابة الثمار والوصول لأعلى وزن وجودة تصديرية.',
      fertilizer: 'بوتاسيوم باور NPK 12-12-36 + جرين ماكس',
      icon: Sparkles,
      color: 'border-orange-500 bg-orange-50/50 text-orange-800',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-3.5 py-1.5 rounded-full inline-block mb-3">
            دليل التسميد الذكي من جرين لاين
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            برنامج تغذية المحاصيل خطوة بخطوة
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            تمت صياغة أسمدة جرين لاين لتغطي احتياجات المحصول الدقيقة في كل مرحلة فسيولوجية، لضمان إنتاجية استثنائية ونوعية ثمار فائقة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-3xl p-6 border-2 border-stone-100 hover:border-emerald-400 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      {stage.step}
                    </span>
                    <div className="p-2.5 bg-stone-50 rounded-xl text-stone-700">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-stone-900 mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {stage.desc}
                  </p>
                </div>

                <div className={`p-3 rounded-2xl border text-xs font-bold ${stage.color}`}>
                  <span className="block text-[10px] text-stone-500 mb-0.5">السماد الموصى به:</span>
                  <span>{stage.fertilizer}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://wa.me/201012345678?text=مرحبا،%20أحتاج%20برنامج%20تسميد%20مخصص%20لمزرعتي"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl transition"
          >
            <span>اطلب برنامج تسميد مخصص لمحصولك مجاناً</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </a>
        </div>
      </div>
    </section>
  );
}
