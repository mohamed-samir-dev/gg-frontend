import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sprout, ShieldCheck, Truck, Award, ArrowLeft, Phone, CheckCircle } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-stone-900 text-white pt-12 pb-20 lg:pt-20 lg:pb-32">
      {/* Background farm image with rich emerald overlay */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay">
        <Image
          src="/farm.jpg"
          alt="مزارع جرين لاين الخضراء"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Decorative gradient glow */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-48 w-96 h-96 bg-green-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Right Column: Hero Content (RTL) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm font-bold shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>جرين لاين للأسمدة الزراعية والمخصبات المعتمدة</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.25]">
              أسمدة زراعية متطورة لمضاعفة{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-300 to-amber-300">
                إنتاجية محصولك
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              نوفر للمزارع والمشاريع الاستثمارية أحدث تركيبات التسميد المركب NPK، الأسمدة العضوية، ومحسنات التربة، والعناصر الصغرى المصنعة بخامات نقية 100% لتحقيق أعلى مردود اقتصادي وجودة ثمار تصديرية.
            </p>

            {/* Bullet features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-emerald-200 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>خامات نقية سريعة الذوبان 100%</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>شحن وتوصيل فوري لكافة المزارع</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>خالية تماماً من الشوائب والكلور</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>استشارات زراعية وإشراف فني مجاني</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="#products"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black rounded-2xl shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 text-base group"
              >
                <span>استعرض كتالوج الأسمدة</span>
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform rotate-180" />
              </Link>

              <a
                href="https://wa.me/201552456445?text=مرحبا%20جرين%20لاين،%20أريد%20طلب%20أسمدة%20لمزرعتي"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 bg-stone-800/80 hover:bg-stone-800 text-white font-bold rounded-2xl border border-stone-700/80 transition flex items-center justify-center gap-2 text-sm"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>طلب كميات للمزارع عبر واتساب</span>
              </a>
            </div>
          </div>

          {/* Left Column: Hero Visual Feature Box */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Product Spotlight Card */}
              <div className="bg-stone-900/90 backdrop-blur-md border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                    أسمدة الموسم الأكثر طلباً
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <span>★ 4.9 تقييم المزارعين</span>
                  </div>
                </div>

                <div className="relative h-60 w-full mb-4">
                  <Image
                    src="/fertilizer.png"
                    alt="سماد جرين جرو المتوازن"
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-white">جرين جرو المتوازن</h3>
                    <span className="text-emerald-400 font-extrabold text-sm">NPK 20-20-20</span>
                  </div>
                  <p className="text-xs text-stone-300">
                    السماد الأساسي لتغذية كافة المحاصيل. نيتروجين، فوسفور، بوتاسيوم نقي وسريع الامتصاص.
                  </p>
                  <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-stone-400 block">شيكارة 25 كجم</span>
                      <span className="text-2xl font-black text-emerald-400">1,000 ج.م</span>
                    </div>
                    <Link
                      href="/products/1"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition"
                    >
                      طلب فوري
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white text-stone-900 p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-stone-100 hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-lg font-black text-stone-900 leading-none">+50,000</p>
                  <p className="text-[11px] text-stone-500 font-bold">فدان تم تسميدها بجرين لاين</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Stats Bar */}
        <div className="mt-16 pt-10 border-t border-emerald-800/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">8 أسمدة</div>
            <div className="text-xs text-emerald-300 font-semibold mt-1">تركيبات متخصصة ومسجلة</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
            <div className="text-xs text-emerald-300 font-semibold mt-1">نقاء تام وخلو من الشوائب</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">27 محافظة</div>
            <div className="text-xs text-emerald-300 font-semibold mt-1">تغطية وشحن لكافة المزارع</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">24/7</div>
            <div className="text-xs text-emerald-300 font-semibold mt-1">دعم مهندسين زراعيين</div>
          </div>
        </div>
      </div>
    </section>
  );
}
