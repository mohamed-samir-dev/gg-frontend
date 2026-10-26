import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import CartDrawer from '@/components/CartDrawer';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'جرين لاين للأسمدة الزراعية والمخصبات | Green Line Fertilizers',
  description: 'المتجر الرسمي لشركة جرين لاين للأسمدة الزراعية والمخصبات ومحسنات التربة في مصر. تركيبات متوازنة، أسمدة مركبة NPK، أسمدة عضوية، وعناصر صغرى معتمدة لزيادة إنتاجية المحاصيل.',
  keywords: 'أسمدة زراعية, جرين لاين, NPK, سماد مركب, سماد عضوي, هيوميك اسيد, كالسيوم بورون, شيكارة سماد, عناصر صغرى, مخصبات زراعية مصر',
  authors: [{ name: 'جرين لاين للأسمدة الزراعية' }],
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-sans antialiased bg-stone-50 text-stone-900 min-h-screen flex flex-col selection:bg-emerald-200 selection:text-emerald-900">
        <CartProvider>
          <main className="flex-1">
            {children}
          </main>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
