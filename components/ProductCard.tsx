'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductType } from '@/lib/products-data';
import { useCart } from '@/lib/cart-context';
import { ShoppingCart, Eye, Check, Leaf, Sparkles, Scale } from 'lucide-react';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedRecently, setAddedRecently] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAddedRecently(true);
    setTimeout(() => setAddedRecently(false), 2000);
  };

  const price = product.priceEGP || product.price || 0;

  return (
    <>
      <div className="group bg-white rounded-3xl border border-emerald-100 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
        {/* Top Badges */}
        <div className="absolute top-3 right-3 left-3 flex items-center justify-between z-10 pointer-events-none">
          {product.tag ? (
            <span className="bg-amber-500/90 backdrop-blur-xs text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {product.tag}
            </span>
          ) : <span />}
          <span className="bg-emerald-950/70 backdrop-blur-xs text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
            {product.category}
          </span>
        </div>

        {/* Product Image */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="relative h-64 w-full bg-gradient-to-b from-stone-50 to-emerald-50/40 p-6 flex items-center justify-center cursor-pointer overflow-hidden"
        >
          <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-300">
            <Image
              src={product.image?.url || '/fertilizer.png'}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Quick view button overlay */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="absolute bottom-3 bg-white/95 text-stone-800 text-xs font-bold py-1.5 px-3.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5 hover:bg-emerald-600 hover:text-white"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>نظرة سريعة</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Formula & Weight */}
            <div className="flex items-center justify-between text-xs text-emerald-800 font-bold mb-1.5">
              <span className="bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 flex items-center gap-1">
                <Leaf className="w-3 h-3 text-emerald-600" />
                {product.formula}
              </span>
              <span className="text-stone-500 flex items-center gap-1 font-semibold">
                <Scale className="w-3 h-3" />
                {product.weight}
              </span>
            </div>

            {/* Name */}
            <Link
              href={`/products/${product.id}`}
              className="block group-hover:text-emerald-700 transition"
            >
              <h3 className="text-lg font-black text-stone-900 mt-1 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
                {product.nameEn}
              </p>
            </Link>

            {/* Description */}
            <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
              {product.description}
            </p>
          </div>

          {/* Price & Action */}
          <div className="pt-3 border-t border-stone-100">
            <div className="flex items-end justify-between mb-3">
              <div>
                <span className="text-[10px] text-stone-400 block font-semibold">السعر للعبوة</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-emerald-700">
                    {price.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-stone-500">ج.م</span>
                </div>
              </div>
              <div className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-md">
                متوفر بالمستودع
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAddToCart}
                disabled={addedRecently}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                  addedRecently
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20'
                }`}
              >
                {addedRecently ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>تمت الإضافة</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>أضف للسلة</span>
                  </>
                )}
              </button>

              <Link
                href={`/products/${product.id}`}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center justify-center transition"
              >
                تفاصيل السماد
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {isModalOpen && (
        <ProductModal product={product} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
