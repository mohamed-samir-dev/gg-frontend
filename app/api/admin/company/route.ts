import { NextResponse } from 'next/server';

export async function GET() {
  const companyData = {
    nameAr: 'شركة جرين لاين للأسمدة الزراعية والمخصبات',
    nameEn: 'Green Line Fertilizers Company',
    taxNumber: '',
    commercialRegister: '',
    addressAr: '',
    addressEn: '',
    phone: '+20 155 245 6445',
    phoneSecondary: '0599171457',
    whatsapp: '+201552456445',
    email: 'loutfallaasfora@gmail.com',
    website: 'https://greenline-fertilizers.com',
    currencyAr: 'ر.س',
    header: '/company-header.svg',
    stamp: '',
    logo: '/favicon.svg',
    footer: '',
    warrantyTerms: 'أسمدة ومخصبات زراعية مسجلة ومطابقة للمواصفات الفنية المعتمدة لدى وزارة الزراعة',
  };

  return NextResponse.json(companyData);
}
