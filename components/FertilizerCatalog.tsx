'use client';

import React, { useState, useMemo } from 'react';
import { ProductType, FERTILIZER_CATEGORIES } from '@/lib/products-data';
import ProductCard from './ProductCard';
import { Search, Filter, Sprout, Sparkles } from 'lucide-react';

interface FertilizerCatalogProps {
  initialProducts: ProductType[];
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
}

export default function FertilizerCatalog({
  initialProducts,
  title = 'كتالوج الأسمدة والمخصبات الزراعية',
  subtitle = 'تشكيلة متكاملة من الأسمدة المعتمدة بأعلى معايير النقاوة لزيادة المحصول وتحسين خواص التربة',
  showFilters = true,
}: FertilizerCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((p) => {
      const matchCategory =
        selectedCategory === 'الكل' || p.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.formula.toLowerCase().includes(q) ||
        p.spec.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [initialProducts, selectedCategory, searchQuery]);

  return (
    <section id="products" className="py-16 sm:py-24 bg-stone-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold mb-4">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span>منتجات أصلية معتمدة من قاعدة البيانات</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Filter & Search Bar */}
        {showFilters && (
          <div className="mb-10 space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
                {FERTILIZER_CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 scale-105'
                          : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Search Input */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-3" />
                <input
                  type="text"
                  placeholder="ابحث بالاسم أو التركيبة (NPK...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute left-3 top-2.5 text-stone-400 hover:text-stone-600 text-xs font-bold"
                  >
                    مسح
                  </button>
                )}
              </div>
            </div>

            {/* Results count & active tags */}
            <div className="flex items-center justify-between text-xs text-stone-500 px-1">
              <span>
                عرض <b className="text-emerald-700">{filteredProducts.length}</b> من أصل {initialProducts.length} منتج سمادي
              </span>
              {(selectedCategory !== 'الكل' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('الكل');
                    setSearchQuery('');
                  }}
                  className="text-emerald-700 hover:underline font-bold"
                >
                  إعادة ضبط الفلاتر
                </button>
              )}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-1">لم يتم العثور على أسمدة مطابقة</h3>
            <p className="text-xs text-stone-500 mb-6">
              جرب تغيير كلمة البحث أو اختيار تصنيف مختلف لاستعراض بقية الأسمدة.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('الكل');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition"
            >
              عرض جميع الأسمدة
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
