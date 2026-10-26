import React from 'react';
import { Phone, MessageCircle, Sprout, ShieldCheck } from 'lucide-react';

export default function ConsultationCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.2),transparent_70%)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900/60 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-emerald-500/30 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-4 max-w-2xl text-center lg:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold border border-emerald-500/30">
              <Sprout className="w-4 h-4 text-emerald-400" />
              <span>استشارة زراعية وتوريدات مزارع</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              هل تملك مزرعة أو مشروعاً زراعياً وتحتاج كميات خاصة؟
            </h3>
            <p className="text-sm text-stone-300 leading-relaxed">
              يقدم مهندسونا الزراعيون استشارات مجانية لتحديد البرنامج التسميدي الأنسب لطبيعة أرضك ونوعية المياه. يتوفر خصومات حصرية لطلبيات التوريد الكبيرة والشحن المباشر بالحمولات الكاملة.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-emerald-200 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                تحليل تربة وتوصية فنية
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                أسعار جملة وتسهيلات للمزارع
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
            <a
              href="https://wa.me/201552456445?text=مرحبا%20جرين%20لاين،%20أريد%20طلب%20عرض%20سعر%20واستشارة%20لمزرعتي"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black rounded-2xl shadow-lg transition flex items-center justify-center gap-2.5 text-sm"
            >
              <MessageCircle className="w-5 h-5" />
              <span>تواصل مع الإدارة الزراعية (واتساب)</span>
            </a>

            <a
              href="tel:+201552456445"
              className="px-6 py-3.5 bg-stone-800/80 hover:bg-stone-800 text-white font-bold rounded-2xl border border-stone-700 transition flex items-center justify-center gap-2.5 text-xs text-center"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>اتصال مباشر: 01552456445</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
