'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { formatProductPrice } from '@/lib/products-data';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowLeft, CheckCircle2, Phone, MapPin, User, Send, CreditCard, Truck } from 'lucide-react';

// عنوان الـ Backend الحقيقي (Express) - من متغير البيئة
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export default function CartDrawer() {
  const pathname = usePathname();
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState<any>(null);
  // طريقة الدفع: 'cash_on_delivery' أو 'kashier'
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'kashier'>('cash_on_delivery');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'القاهرة',
    address: '',
    notes: '',
  });

  const isSAR = items.some(i => i.product.currency === 'SAR');
  const cartCurrency = isSAR ? 'SAR' : 'EGP';
  const currencyLabel = isSAR ? 'ر.س' : 'ج.م';

  if (pathname?.startsWith('/admin')) return null;
  if (!isCartOpen) return null;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('يرجى ملء الاسم ورقم الهاتف والعنوان لتوصيل الطلب');
      return;
    }

    setIsSubmitting(true);
    try {
      // مفتاح idempotency لمنع تكرار الطلب
      const idempotencyKey = `order-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

      // إعداد بيانات الطلب المتكاملة
      const orderPayload = {
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        address: formData.address,
        country: isSAR ? 'SA' : 'EG',
        currency: cartCurrency,
        paymentMethod,
        notes: formData.notes,
        totalAmount: totalPrice,
        items: items.map(i => ({
          id: i.product.id,
          name: i.product.name,
          price: i.product.currency === 'SAR' ? (i.product.priceSAR ?? i.product.price) : (i.product.priceEGP ?? i.product.price),
          weight: i.product.weight,
          qty: i.quantity,
        })),
      };

      let res: Response | null = null;
      let result: any = null;

      // محاولة الإرسال للـ Express Backend أولاً
      try {
        res = await fetch(`${BACKEND_URL}/api/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Idempotency-Key': idempotencyKey,
          },
          body: JSON.stringify(orderPayload),
        });
        if (res.ok) {
          result = await res.json();
        }
      } catch (backendErr) {
        console.warn('Backend unavailable, falling back to Next.js API route:', backendErr);
      }

      // إذا تعذر الوصول للـ Backend أو أعطى خطأ، استخدم Next.js API مباشرة
      if (!result) {
        const nextRes = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Idempotency-Key': idempotencyKey,
          },
          body: JSON.stringify(orderPayload),
        });
        result = await nextRes.json();
        if (!nextRes.ok) {
          alert(result.error || result.message || 'حدث خطأ أثناء إتمام الطلب، يرجى المحاولة لاحقاً');
          return;
        }
      }

      // إذا كانت طريقة الدفع كاشير وفيه رابط جلسة → وجّه المستخدم لصفحة الدفع
      if (paymentMethod === 'kashier' && result.kashier?.sessionUrl) {
        clearCart();
        localStorage.setItem('pendingKashierOrderId', result.orderId);
        window.location.href = result.kashier.sessionUrl;
        return;
      }

      // الدفع عند الاستلام أو اكتمال الحفظ بنجاح
      setOrderComplete(result);
      clearCart();
    } catch (err: any) {
      console.error('Submit order error:', err);
      alert('تعذر استلام الطلب، يرجى التأكد من الاتصال بالإنترنت والمحاولة مجدداً');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppOrder = () => {
    const itemsSummary = items
      .map(i => {
        const itemP = i.product.currency === 'SAR' ? (i.product.priceSAR ?? i.product.price) : (i.product.priceEGP ?? i.product.price);
        const itemCurr = i.product.currency === 'SAR' ? 'ر.س' : 'ج.م';
        return `• ${i.product.name} (${i.product.weight}) × ${i.quantity} = ${formatProductPrice(itemP * i.quantity)} ${itemCurr}`;
      })
      .join('%0A');
    const msg = `مرحباً جرين لاين للأسمدة الزراعية،%0Aأود تأكيد طلب الأسمدة التالي:%0A${itemsSummary}%0A%0A*الإجمالي:* ${formatProductPrice(totalPrice)} ${currencyLabel}%0Aالاسم: ${encodeURIComponent(formData.name || 'عميل جرين لاين')}%0Aالهاتف: ${encodeURIComponent(formData.phone || '')}%0Aالعنوان: ${encodeURIComponent(formData.address || '')}`;
    window.open(`https://wa.me/201552456445?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="absolute inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 bg-emerald-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-800 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <h2 className="text-lg font-bold">سلة الأسمدة الزراعية</h2>
                <p className="text-xs text-emerald-200">جرين لاين - حلول التغذية والمخصبات</p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckingOut(false);
                setOrderComplete(null);
              }}
              className="p-2 text-white/80 hover:text-white hover:bg-emerald-800/60 rounded-full transition"
              aria-label="إغلاق السلة"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {orderComplete ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">تم استلام طلبك بنجاح!</h3>
                <p className="text-emerald-700 font-semibold mb-3">رقم الطلب: {orderComplete.orderId}</p>
                <p className="text-sm text-gray-600 max-w-xs mb-6">
                  شكراً لثقتك في جرين لاين. سيتواصل معك أحد مهندسينا الزراعيين خلال دقائق لتأكيد موعد الشحن والاستفسار عن أي دعم فني مطلوب لمزرعتك.
                </p>
                <div className="flex flex-col w-full gap-3">
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition"
                  >
                    <Send className="w-5 h-5" />
                    متابعة الطلب عبر واتساب
                  </button>
                  <button
                    onClick={() => {
                      setOrderComplete(null);
                      setIsCheckingOut(false);
                      setIsCartOpen(false);
                    }}
                    className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition"
                  >
                    متابعة التسوق
                  </button>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">السلة فارغة حالياً</h3>
                <p className="text-sm text-gray-500 max-w-xs mb-6">
                  تصفح تشكيلة الأسمدة المركبة والعضوية وأضف ما يحتاجه محصولك.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-xl transition"
                >
                  استعراض المنتجات
                </button>
              </div>
            ) : isCheckingOut ? (
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 mb-2 cursor-pointer" onClick={() => setIsCheckingOut(false)}>
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                  <span className="text-sm font-semibold">العودة للسلة</span>
                </div>

                {/* اختيار طريقة الدفع */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-700">طريقة الدفع</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash_on_delivery')}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-xs font-semibold transition ${
                        paymentMethod === 'cash_on_delivery'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-emerald-300'
                      }`}
                    >
                      <Truck className="w-5 h-5" />
                      <span>الدفع عند الاستلام</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('kashier')}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-xs font-semibold transition ${
                        paymentMethod === 'kashier'
                          ? 'border-blue-600 bg-blue-50 text-blue-800'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>بطاقة بنكية / محفظة</span>
                    </button>
                  </div>
                  {paymentMethod === 'kashier' && (
                    <p className="text-xs text-blue-700 bg-blue-50 px-3 py-2 rounded-lg">
                      ✅ ستُحوَّل إلى صفحة الدفع الآمن عبر <strong>كاشير</strong> بعد تأكيد الطلب.
                    </p>
                  )}
                  {paymentMethod === 'cash_on_delivery' && (
                    <p className="text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg">
                      ✅ شحن لجميع مزارع ومحافظات مصر — الدفع عند استلام الشحنة وفحصها.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">الاسم الكامل *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="اسم صاحب المزرعة أو العميل"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pr-9 pl-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">رقم الهاتف (للتواصل والشحن) *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="01xxxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pr-9 pl-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">المحافظة / المدينة *</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      {/* مصر */}
                      <optgroup label="🇪🇬 مصر">
                        <option>القاهرة</option>
                        <option>الجيزة</option>
                        <option>البحيرة</option>
                        <option>الشرقية</option>
                        <option>الدقهلية</option>
                        <option>الإسكندرية</option>
                        <option>الإسماعيلية</option>
                        <option>النوبارية ووادى النطرون</option>
                        <option>المنيا</option>
                        <option>أسيوط</option>
                        <option>سوهاج</option>
                        <option>قنا والأقصر</option>
                        <option>محافظة مصرية أخرى</option>
                      </optgroup>
                      {/* السعودية */}
                      <optgroup label="🇸🇦 السعودية">
                        <option>الرياض</option>
                        <option>جدة</option>
                        <option>مكة المكرمة</option>
                        <option>المدينة المنورة</option>
                        <option>الدمام</option>
                        <option>الخبر</option>
                        <option>الظهران</option>
                        <option>أبها</option>
                        <option>تبوك</option>
                        <option>القصيم - بريدة</option>
                        <option>حائل</option>
                        <option>الطائف</option>
                        <option>الجوف - سكاكا</option>
                        <option>جازان</option>
                        <option>نجران</option>
                        <option>الباحة</option>
                        <option>ينبع</option>
                        <option>الأحساء - الهفوف</option>
                        <option>القطيف</option>
                        <option>عرعر</option>
                        <option>خميس مشيط</option>
                        <option>مدينة سعودية أخرى</option>
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">المنطقة / المركز *</label>
                    <input
                      type="text"
                      required
                      placeholder={isSAR ? "مثال: حي النخيل" : "مثال: كوم حمادة"}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">ملاحظات أو توصيات خاصة بالمزرعة</label>
                  <textarea
                    rows={2}
                    placeholder="أي تعليمات خاصة بالتسليم أو مساحة المزرعة ونوع المحصول..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <div className="flex justify-between items-center text-sm font-bold text-gray-800 mb-3">
                    <span>إجمالي القيمة:</span>
                    <span className="text-emerald-700 text-lg">{formatProductPrice(totalPrice)} {currencyLabel}</span>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 text-white font-bold rounded-xl shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 ${
                      paymentMethod === 'kashier'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-emerald-700 hover:bg-emerald-800'
                    }`}
                  >
                    {isSubmitting ? (
                      'جاري تأكيد الطلب...'
                    ) : paymentMethod === 'kashier' ? (
                      <><CreditCard className="w-4 h-4" /> الدفع الآن بالبطاقة عبر كاشير</>
                    ) : (
                      'تأكيد الطلب وشحن الأسمدة'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="w-full mt-2 py-2.5 bg-green-50 hover:bg-green-100 text-green-700 font-semibold border border-green-300 rounded-xl flex items-center justify-center gap-2 text-sm transition"
                  >
                    <Send className="w-4 h-4" />
                    أو اطلب فوراً عبر واتساب المبيعات
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200/80 items-center"
                  >
                    <div className="relative w-16 h-16 rounded-lg bg-white overflow-hidden shrink-0 border border-gray-200">
                      <Image
                        src={item.product.image.url}
                        alt={item.product.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 truncate">{item.product.name}</h4>
                      <p className="text-xs text-gray-500 truncate">{item.product.formula} · {item.product.weight}</p>
                      <div className="text-sm font-bold text-emerald-700 mt-1">
                        {formatProductPrice(item.product.currency === 'SAR' ? (item.product.priceSAR ?? item.product.price) : (item.product.priceEGP ?? item.product.price))} {item.product.currency === 'SAR' ? 'ر.س' : 'ج.م'}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition"
                        title="حذف من السلة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-emerald-700 text-xs font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-gray-800 w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-emerald-700 text-xs font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer of Drawer */}
          {!orderComplete && !isCheckingOut && items.length > 0 && (
            <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 space-y-3">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>إجمالي المنتجات ({items.reduce((s, i) => s + i.quantity, 0)} عبوة):</span>
                <span className="font-bold text-gray-900">{formatProductPrice(totalPrice)} {currencyLabel}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-emerald-700">
                <span>الشحن والتوصيل للمزرعة:</span>
                <span className="font-semibold">يحدد حسب الموقع والكمية</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-base font-extrabold text-gray-900">
                <span>الإجمالي التقريبي:</span>
                <span className="text-xl text-emerald-800">{formatProductPrice(totalPrice)} {currencyLabel}</span>
              </div>
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-lg shadow-emerald-700/20 transition flex items-center justify-center gap-2"
              >
                <span>متابعة إتمام الطلب</span>
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
