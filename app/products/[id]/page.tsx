import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getFertilizerProducts, getFertilizerProductById } from '@/lib/db';
import ProductDetailClient from './ProductDetailClient';
import { Sprout, ArrowRight, ShieldCheck, Truck, Scale, Leaf, CheckCircle2 } from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getFertilizerProductById(id);
  if (!product) {
    return { title: 'المنتج غير موجود | جرين لاين' };
  }
  return {
    title: `${product.name} (${product.formula}) | أسمدة جرين لاين`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getFertilizerProductById(id);

  if (!product) {
    notFound();
  }

  const allProducts = await getFertilizerProducts();
  const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="bg-stone-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-8">
          <Link href="/" className="hover:text-emerald-700">الرئيسية</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-emerald-700">الأسمدة الزراعية</Link>
          <span>/</span>
          <span className="text-emerald-800 font-bold">{product.name}</span>
        </div>

        {/* Product Main Card */}
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
            {/* Image Column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50/50 via-stone-50 to-stone-100 rounded-2xl p-8 relative">
              {product.tag && (
                <span className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-black px-3.5 py-1 rounded-full shadow-xs">
                  {product.tag}
                </span>
              )}
              <div className="relative w-full h-80 sm:h-96">
                <Image
                  src={product.image.url}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-800 bg-white/80 px-3 py-1.5 rounded-full border border-emerald-100 shadow-2xs">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>شيكارة أصلية محكمة الإغلاق - جودة مضمونة</span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg">
                    {product.category}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 bg-stone-100 text-stone-700 rounded-lg flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5" />
                    الوزن: {product.weight}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 bg-green-50 text-green-700 rounded-lg">
                    التركيبة: {product.formula}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black text-stone-900 mb-1">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm font-bold text-stone-400 mb-6 uppercase tracking-wider">
                  {product.nameEn} · {product.formula}
                </p>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-stone-400 uppercase mb-2">نبذة عن السماد ودوره</h3>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Chemical Specification */}
                <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 mb-6 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                    <Sprout className="w-4 h-4 text-emerald-600" />
                    <span>التحليل المعملي والمواصفات:</span>
                  </div>
                  <p className="text-xs text-stone-700 font-medium pr-6">
                    {product.spec}
                  </p>
                </div>

                {/* Usage & Dosage */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4">
                    <h4 className="text-xs font-bold text-stone-800 flex items-center gap-1.5 mb-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      طريقة الاستخدام والمحاصيل
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {product.usage || 'مناسب لجميع المحاصيل الحقلية والخضروات والفاكهة.'}
                    </p>
                  </div>

                  <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4">
                    <h4 className="text-xs font-bold text-stone-800 flex items-center gap-1.5 mb-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      معدلات الإضافة الموصى بها
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {product.dosage || 'حسب توصيات المهندس المشرف واحتياج التربة.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Client Interactive Buy & Cart Controls */}
              <ProductDetailClient product={product} />
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black text-stone-900">أسمدة زراعية أخرى قد تحتاجها</h3>
                <p className="text-xs text-stone-500 mt-1">منتجات متكاملة لاستكمال برنامج التسميد لمحصولك</p>
              </div>
              <Link
                href="/products"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>عرض الكل</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(rel => (
                <div key={rel.id} className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs flex items-center gap-4 hover:shadow-md transition">
                  <div className="relative w-20 h-20 bg-stone-50 rounded-xl overflow-hidden shrink-0 border border-stone-100">
                    <Image src={rel.image.url} alt={rel.name} fill className="object-contain p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {rel.category}
                    </span>
                    <h4 className="text-sm font-bold text-stone-900 truncate mt-1">{rel.name}</h4>
                    <p className="text-xs text-stone-500">{rel.formula}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-black text-emerald-700">
                        {(rel.currency === 'SAR' ? (rel.priceSAR ?? rel.price) : (rel.priceEGP ?? rel.price)).toLocaleString()} {rel.currency === 'SAR' ? 'ر.س' : 'ج.م'}
                      </span>
                      <Link href={`/products/${rel.id}`} className="text-xs text-stone-600 hover:text-emerald-700 font-bold underline">
                        التفاصيل
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
