'use client';

import React, { useState } from 'react';
import { ProductType, formatProductPrice } from '@/lib/products-data';
import { useCart } from '@/lib/cart-context';
import { ShoppingCart, Check, Plus, Minus, Send, Truck, ShieldCheck } from 'lucide-react';

interface Props {
  product: ProductType;
}

export default function ProductDetailClient({ product }: Props) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isSAR = product.currency === 'SAR';
  const price = isSAR ? (product.priceSAR ?? product.price ?? 1) : (product.priceEGP ?? product.price ?? 0);
  const currencyLabel = isSAR ? 'ر.س' : 'ج.م';
  const currencyFull = isSAR ? 'ريال سعودي' : 'جنيه مصري';
  const totalPrice = price * quantity;

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsApp = () => {
    const msg = `مرحباً، أود طلب سماد "${product.name}" (${product.formula})%0Aالكمية المطلوبة: ${quantity} عبوة (${product.weight})%0Aالإجمالي: ${formatProductPrice(totalPrice)} ${currencyLabel}%0Aيرجى الإفادة بإمكانية الشحن للمزرعة.`;
    window.open(`https://wa.me/201552456445?text=${msg}`, '_blank');
  };

  return (
    <div className="pt-6 border-t border-stone-200">
      {/* Price row */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
        <div>
          <span className="text-xs text-stone-400 block font-semibold mb-1">
            سعر العبوة الواحدة ({product.weight})
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-emerald-800">
              {formatProductPrice(price)}
            </span>
            <span className="text-sm font-bold text-stone-600">{currencyFull}</span>
          </div>
        </div>

        {quantity > 1 && (
          <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 text-right">
            <span className="text-[11px] text-stone-500 block">إجمالي {quantity} عبوات:</span>
            <span className="text-lg font-black text-emerald-800">{formatProductPrice(totalPrice)} {currencyLabel}</span>
          </div>
        )}
      </div>

      {/* Quantity & Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        {/* Quantity selector */}
        <div className="flex items-center justify-between border-2 border-stone-200 rounded-2xl p-1 bg-stone-50 w-full sm:w-36">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-stone-600 hover:text-emerald-700 shadow-2xs font-bold transition"
            aria-label="تقليل الكمية"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-base font-black text-stone-800 px-3">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-stone-600 hover:text-emerald-700 shadow-2xs font-bold transition"
            aria-label="زيادة الكمية"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAdd}
          disabled={added}
          className={`flex-1 w-full py-4 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
            added
              ? 'bg-emerald-600 text-white'
              : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/25'
          }`}
        >
          {added ? (
            <>
              <Check className="w-5 h-5" />
              <span>تمت الإضافة للسلة</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>أضف إلى سلة المشتريات ({totalPrice.toLocaleString()} {currencyLabel})</span>
            </>
          )}
        </button>
      </div>

      {/* WhatsApp Quick Order */}
      <button
        onClick={handleWhatsApp}
        className="w-full py-3.5 px-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition"
      >
        <Send className="w-4 h-4 text-emerald-600" />
        <span>طلب فوري عبر واتساب / استشارة كميات المزارع</span>
      </button>

      {/* Trust reassurance */}
      <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-stone-100 text-[11px] text-stone-500">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>توصيل للموقع وفحص قبل الدفع</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>إمكانية الاسترجاع خلال 14 يوماً</span>
        </div>
      </div>
    </div>
  );
}
