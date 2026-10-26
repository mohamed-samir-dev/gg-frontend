import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import '../globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'فاتورة جرين لاين للأسمدة الزراعية',
  description: 'فاتورة طلب أسمدة زراعية من جرين لاين',
};

export default function InvoicePreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-sans antialiased bg-white text-stone-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
