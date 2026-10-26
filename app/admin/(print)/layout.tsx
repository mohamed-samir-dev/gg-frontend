import React from 'react';

export const metadata = {
  title: 'فاتورة رسمية للطباعة | شركة جرين لاين للأسمدة الزراعية',
};

export default function PrintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {children}
    </div>
  );
}
