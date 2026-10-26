import React from 'react';

export const metadata = {
  title: 'لوحة تحكم جرين لاين للأسمدة الزراعية',
  description: 'إدارة الطلبات والفواتير لشركة جرين لاين',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
