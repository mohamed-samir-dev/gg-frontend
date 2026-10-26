'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductType } from '@/lib/products-data';
import { useCart } from '@/lib/cart-context';
import { X, ShoppingCart, Leaf, CheckCircle2, ShieldCheck, Scale, Send } from 'lucide-react';

interface ProductModalProps {
  product: ProductType;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const price = product.priceEGP || product.price || 0;

  const handleWhatsAppInquiry = () => {
    const msg = `مرحباً، أستفسر بخصوص سماد "${product.name}" (${product.formula}) - عبوة ${product.weight}. هل متوفر شحن لمزرعتي؟`;
    window.open(`https://wa.me/201012345678?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image & Badges */}
          <div className="relative bg-gradient-to-br from-emerald-50/60 to-stone-100 p-8 flex items-center justify-center min-h-[300px]">
            {product.tag && (
              <span className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {product.tag}
              </span>
            )}
            <div className="relative w-full h-64">
              <Image
                src={product.image?.url || '/fertilizer.png'}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-md">
                  {product.category}
                </span>
                <span className="text-xs font-semibold text-stone-500 flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5" />
                  {product.weight}
                </span>
              </div>

              <h2 className="text-2xl font-black text-stone-900 mb-1">{product.name}</h2>
              <p className="text-xs font-bold text-stone-400 mb-3">{product.nameEn} · {product.formula}</p>

              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {product.description}
              </p>

              <div className="space-y-2 mb-6 text-xs bg-stone-50 p-3 rounded-xl border border-stone-200/60">
                <div className="flex items-start gap-2">
                  <Leaf className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-800">المواصفات: </span>
                    <span className="text-stone-600">{product.spec}</span>
                  </div>
                </div>
                {product.usage && (
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-stone-800">طريقة الاستخدام: </span>
                      <span className="text-stone-600">{product.usage}</span>
                    </div>
                  </div>
                )}
                {product.dosage && (
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-stone-800">الجرعة الموصى بها: </span>
                      <span className="text-stone-600">{product.dosage}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-xs text-stone-400 block font-semibold">سعر الشيكارة / العبوة</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-emerald-700">{price.toLocaleString()}</span>
                    <span className="text-sm font-bold text-stone-500">ج.م</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  شحن لجميع المحافظات
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-lg shadow-emerald-700/20 transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>إضافة للسلة والطلب</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleWhatsAppInquiry}
                    className="py-2.5 bg-green-50 hover:bg-green-100 text-green-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-green-200 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    استفسار واتساب
                  </button>

                  <Link
                    href={`/products/${product.id}`}
                    onClick={onClose}
                    className="py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl text-xs flex items-center justify-center transition"
                  >
                    صفحة المنتج الكاملة
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
