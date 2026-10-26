import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Sprout, ShoppingBag, ExternalLink } from 'lucide-react';
import { verifyAdminToken } from '@/lib/admin-auth';
import LogoutButton from './LogoutButton';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side authentication check
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  const admin = verifyAdminToken(token);

  if (!admin) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans" dir="rtl">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-xs">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg text-emerald-950">جرين <span className="text-emerald-600">لاين</span></span>
                  <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                    لوحة الإدارة
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 font-medium hidden sm:block">
                  نظام إدارة ومتابعة الطلبات والفواتير الزراعية
                </p>
              </div>
            </div>

            {/* Navigation Menu - ONLY ONE PAGE: الطلبات */}
            <nav className="flex items-center gap-2">
              <Link
                href="/admin/orders"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-emerald-700 text-white shadow-xs hover:bg-emerald-800 transition active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>الطلبات</span>
              </Link>
            </nav>

            {/* Actions: View Store & Logout */}
            <div className="flex items-center gap-2.5">
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 bg-white hover:bg-stone-50 transition"
              >
                <span>زيارة المتجر</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </Link>

              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
