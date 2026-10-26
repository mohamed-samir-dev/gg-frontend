'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle2, Sprout } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'البحيرة (النوبارية)',
    farmSize: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const msg = `مرحباً جرين لاين للأسمدة الزراعية،%0Aاسمي: ${encodeURIComponent(formData.name || 'عميل')}%0Aالمحافظة: ${encodeURIComponent(formData.city)}%0Aالرسالة: ${encodeURIComponent(formData.message || 'أريد استشارة بخصوص الأسمدة')}`;
    window.open(`https://wa.me/201552456445?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-stone-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-8">
          <Link href="/" className="hover:text-emerald-700">الرئيسية</Link>
          <span>/</span>
          <span className="text-emerald-800 font-bold">اتصل بنا</span>
        </div>

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
            تواصل مباشر مع الإدارة والمهندسين
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            تواصل مع شركة جرين لاين
          </h1>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            يسعدنا استقبال استفساراتكم بشأن طلبيات الأسمدة، الاستشارات التسميدية المجانية، وعروض الأسعار الخاصة بالمزارع الكبرى والمشاريع الاستثمارية.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Info cards (Left on RTL) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
              <h3 className="text-xl font-black text-stone-900 border-r-4 border-emerald-600 pr-3">
                بيانات الاتصال المباشر
              </h3>

              <div className="space-y-5">
                <a
                  href="tel:+201552456445"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 hover:bg-emerald-50 transition border border-stone-100 group"
                >
                  <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-stone-400 font-bold">الهاتف والمبيعات</h4>
                    <p className="text-sm font-black text-stone-800" dir="ltr">01552456445</p>
                    <span className="text-[11px] text-emerald-600 font-semibold">متاح للاتصال الفوري</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/201552456445"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 hover:bg-green-50 transition border border-stone-100 group"
                >
                  <div className="p-3 bg-green-100 text-green-700 rounded-xl group-hover:bg-green-600 group-hover:text-white transition">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-stone-400 font-bold">واتساب الاستشارات والطلبات</h4>
                    <p className="text-sm font-black text-stone-800" dir="ltr">01552456445</p>
                    <span className="text-[11px] text-green-600 font-semibold">رد سريع على مدار اليوم</span>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-stone-400 font-bold">البريد الإلكتروني</h4>
                    <a href="mailto:loutfallaasfora@gmail.com" className="text-sm font-black text-stone-800 hover:text-emerald-700 transition">loutfallaasfora@gmail.com</a>
                    <span className="text-[11px] text-stone-500 block">للمراسلات الرسمية والمناقصات</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="p-3 bg-amber-100 text-amber-700 rounded-xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-stone-400 font-bold">المستودعات المركزية</h4>
                    <p className="text-sm font-bold text-stone-800">طريق مصر الإسكندرية الصحراوي / الدلتا</p>
                    <span className="text-[11px] text-stone-500">شحن مباشر للمزارع</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="p-3 bg-purple-100 text-purple-700 rounded-xl">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-stone-400 font-bold">مواعيد العمل والشحن</h4>
                    <p className="text-sm font-bold text-stone-800">السبت - الخميس: 8:00 ص - 8:00 م</p>
                    <span className="text-[11px] text-stone-500">الجمعة: استقبال رسائل الواتساب والطلبات العاجلة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Right on RTL) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/80 shadow-xs">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-2">تم إرسال رسالتك بنجاح!</h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto mb-6">
                    شكراً لتواصلك مع شركة جرين لاين للأسمدة الزراعية. سيقوم أحد مهندسينا بالتواصل معك في أقرب وقت.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition"
                  >
                    إرسال استفسار آخر
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-xl font-black text-stone-900 mb-1">
                      أرسل استفسارك أو اطلب استشارة زراعية
                    </h3>
                    <p className="text-xs text-stone-500 mb-6">
                      املأ البيانات وسيقوم مهندس التغذية بالتواصل معك مباشرة لمناقشة احتياجات أرضك.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">الاسم بالكامل *</label>
                      <input
                        type="text"
                        required
                        placeholder="اسم صاحب المزرعة أو الشركة"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">رقم الهاتف المحمول *</label>
                      <input
                        type="tel"
                        required
                        placeholder="01xxxxxxxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">المحافظة / موقع المزرعة</label>
                      <input
                        type="text"
                        placeholder="مثال: البحيرة - النوبارية"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">مساحة المزرعة أو المحصول</label>
                      <input
                        type="text"
                        placeholder="مثال: 20 فدان بطاطس وموالح"
                        value={formData.farmSize}
                        onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">تفاصيل الاستفسار أو الأسمدة المطلوبة *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="اذكر نوع السماد المطلوب، الكمية التقريبية، أو أي مشاكل في التربة تود استشارة مهندسنا بشأنها..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md shadow-emerald-700/20 transition flex items-center justify-center gap-2 text-sm"
                    >
                      <Send className="w-4 h-4" />
                      <span>إرسال الطلب</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="py-3.5 px-6 bg-green-50 hover:bg-green-100 text-green-700 font-bold border border-green-300 rounded-xl transition flex items-center justify-center gap-2 text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>إرسال فوري عبر واتساب</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
