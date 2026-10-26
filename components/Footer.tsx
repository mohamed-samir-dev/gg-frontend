import React from 'react';
import Link from 'next/link';
import { Sprout, Phone, Mail, MapPin, ShieldCheck, Truck, Headphones, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8 border-t-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 mb-12 border-b border-stone-800 text-stone-200">
          <div className="flex items-center gap-4 bg-stone-800/60 p-4 rounded-2xl border border-stone-700/50">
            <div className="p-3 bg-emerald-600/20 text-emerald-400 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">منتجات معتمدة ومسجلة</h4>
              <p className="text-xs text-stone-400">مطابقة للمواصفات القياسية الزراعية</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-stone-800/60 p-4 rounded-2xl border border-stone-700/50">
            <div className="p-3 bg-emerald-600/20 text-emerald-400 rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">شحن مباشر للمزارع</h4>
              <p className="text-xs text-stone-400">توصيل لكافة المحافظات والمشاريع</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-stone-800/60 p-4 rounded-2xl border border-stone-700/50">
            <div className="p-3 bg-emerald-600/20 text-emerald-400 rounded-xl">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">استشارات زراعية متخصصة</h4>
              <p className="text-xs text-stone-400">فريق مهندسين للإشراف على التسميد</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-stone-800/60 p-4 rounded-2xl border border-stone-700/50">
            <div className="p-3 bg-emerald-600/20 text-emerald-400 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">دفع آمن عند الاستلام</h4>
              <p className="text-xs text-stone-400">استلم وافحص شحنتك ثم ادفع</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white">جرين <span className="text-emerald-400">لاين</span></span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              شركة جرين لاين المتخصصة في تجارة وتوريد الأسمدة الزراعية والمخصبات ومحسنات التربة والعناصر الصغرى في مصر. نلتزم بأعلى معايير النقاوة لرفع إنتاجية المحاصيل وخدمة المزارع الاستثمارية والصغيرة.
            </p>
            <div className="pt-2 text-xs text-emerald-400 font-semibold">
              سجل تجاري وبطاقة ضريبية معتمدة · منتجات مرخصة
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 border-r-2 border-emerald-500 pr-2">صفحات الموقع</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-emerald-400 transition">الرئيسية</Link></li>
              <li><Link href="/products" className="hover:text-emerald-400 transition">كتالوج الأسمدة</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition">من نحن (عن جرين لاين)</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition">تواصل معنا</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 border-r-2 border-emerald-500 pr-2">السياسات والشروط</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/return-policy" className="hover:text-emerald-400 transition">سياسة الاسترجاع والاستبدال</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-emerald-400 transition">سياسة الخصوصية</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400 transition">الشروط والأحكام</Link></li>
              <li><Link href="/about#certificates" className="hover:text-emerald-400 transition">ضمان الجودة والسلامة</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 border-r-2 border-emerald-500 pr-2">التواصل والمستودعات</h3>
            <ul className="space-y-3 text-sm text-stone-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span className="text-xs">المستودعات المركزية: طريق مصر الإسكندرية الصحراوي / الدلتا</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs" dir="ltr">+20 101 234 5678</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs">sales@greenline-fertilizers.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} شركة جرين لاين للأسمدة والمخصبات الزراعية. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-stone-300">الخصوصية</Link>
            <span>·</span>
            <Link href="/return-policy" className="hover:text-stone-300">الاسترجاع</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-stone-300">الشروط</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
