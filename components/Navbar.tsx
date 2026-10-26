'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { Sprout, ShoppingCart, Phone, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { totalCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'منتجات الأسمدة', href: '/products' },
    { name: 'من نحن', href: '/about' },
    { name: 'سياسة الاسترجاع', href: '/return-policy' },
    { name: 'سياسة الخصوصية', href: '/privacy-policy' },
    { name: 'اتصل بنا', href: '/contact' },
  ];

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top Banner */}
      <div className="bg-emerald-900 text-emerald-100 py-1.5 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>جرين لاين: أسمدة ومخصبات زراعية مسجلة ومعتمدة لدى وزارة الزراعة</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline">شحن مباشر للمزارع بجميع المحافظات</span>
            <a
              href="https://wa.me/201552456445"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-300 hover:text-white font-bold flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              واتساب المبيعات والاستشارات: 01552456445
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-gray-900">جرين</span>
                <span className="text-2xl font-black text-emerald-600">لاين</span>
              </div>
              <p className="text-[11px] font-bold text-gray-500 tracking-wide">
                للأسمدة الزراعية والمخصبات
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-gray-700 hover:text-emerald-700 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/201552456445?text=مرحبا%20جرين%20لاين،%20أريد%20استشارة%20زراعية%20بخصوص%20الأسمدة"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200 transition"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>استشارة زراعية</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-md shadow-emerald-700/20 transition flex items-center gap-2 cursor-pointer"
              aria-label="سلة المشتريات"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden md:inline text-xs font-bold">السلة</span>
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-500 text-white rounded-full text-xs font-black flex items-center justify-center border-2 border-white animate-bounce">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-emerald-700 hover:bg-gray-100 rounded-xl"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-900 font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <a
              href="https://wa.me/201552456445"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-emerald-600 text-white text-center rounded-xl font-bold text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              تواصل عبر واتساب: 01552456445
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
