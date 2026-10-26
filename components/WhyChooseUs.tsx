import React from 'react';
import { ShieldCheck, Zap, TrendingUp, Users, Star, Quote } from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      title: 'خامات نقية 100%',
      desc: 'أسمدة ومخصبات مصنعة من أنقى الخامات العالمية الخالية تماماً من الشوائب ومسببات انسداد النقاطات.',
      icon: ShieldCheck,
    },
    {
      title: 'ذوبان كامل وفوري',
      desc: 'ذوبانية سريعة ومثالية لكافة أنظمة الري الحديثة (التنقيط، الرش، والبيفوت المحوري) دون أي رواسب.',
      icon: Zap,
    },
    {
      title: 'زيادة العائد والمحصول',
      desc: 'تركيبات متوازنة تمتصها النباتات بكفاءة تتجاوز 90%، مما يحقق وفراً كبيراً في التكلفة ومضاعفة الإنتاج.',
      icon: TrendingUp,
    },
    {
      title: 'إشراف ومتابعة فنية',
      desc: 'فريق دعم فني متكامل من خبراء التغذية الزراعية لمتابعة مزرعتك وتقديم التوصيات طوال فترات الموسم.',
      icon: Users,
    },
  ];

  const testimonials = [
    {
      name: 'الحاج محمود عبد السلام',
      role: 'مزرعة موالح وبطاطس - النوبارية',
      comment: 'استخدمت بوتاسيوم باور وجرين جرو في موسم البطاطس الأخير، التحجيم والصلابة كانت ممتازة جداً والمحصول خرج تصدير درجة أولى.',
      rating: 5,
    },
    {
      name: 'المهندس كريم الشناوي',
      role: 'مشرف إنتاج زراعي - مزارع طريق الإسماعيلية',
      comment: 'أفضل ما يميز جرين لاين هو نقاوة الخامات. شبكات التنقيط لم تسد نهائياً، وكالسيوم برو منع تشققات الطماطم بالكامل.',
      rating: 5,
    },
    {
      name: 'أحمد البدري',
      role: 'مزارع فراولة وخضار - القليوبية',
      comment: 'توصيل سريع للمزرعة وأسعار منافسة جداً مقارنة بالسوق. التعامل مع فريق جرين لاين مريح واستشاراتهم وفرت علينا مبالغ كبيرة.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-stone-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Why choose us heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-200/60 px-3.5 py-1.5 rounded-full inline-block mb-3">
            معايير الجودة والاحترافية
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            لماذا يثق كبار المزارعين بشركة جرين لاين؟
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            نحن لا نبيع أسمدة زراعية فقط، بل نبني شراكة حقيقية تضمن لك حصاداً وفيراً وأرضاً خصبة مستدامة.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-stone-900 mb-2">{b.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="pt-12 border-t border-stone-200">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-black text-stone-900">آراء شركاء النجاح</h3>
            <p className="text-xs text-stone-500 mt-1">شهادات من أصحاب مزارع ومهندسين زراعيين يستخدمون منتجات جرين لاين</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80 flex flex-col justify-between relative"
              >
                <Quote className="w-8 h-8 text-emerald-100 absolute top-4 left-4 pointer-events-none" />
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating)].map((_, r) => (
                      <Star key={r} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed mb-6 font-medium">
                    &ldquo;{t.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <h4 className="text-sm font-black text-stone-900">{t.name}</h4>
                  <p className="text-[11px] text-emerald-700 font-semibold">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
