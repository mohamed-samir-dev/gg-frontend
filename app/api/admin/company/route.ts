import { NextResponse } from 'next/server';

export async function GET() {
  const companyData = {
    nameAr: 'شركة جرين لاين للأسمدة الزراعية والمخصبات',
    nameEn: 'Green Line Fertilizers Company',
    taxNumber: '1010569266',
    commercialRegister: '1010569266',
    addressAr: 'طريق مصر الإسكندرية الصحراوي / المستودعات المركزية',
    addressEn: 'Cairo-Alex Desert Road, Central Warehouses',
    phone: '+20 155 245 6445',
    phoneSecondary: '0599171457',
    whatsapp: '+201552456445',
    email: 'loutfallaasfora@gmail.com',
    website: 'https://greenline-fertilizers.com',
    currencyAr: 'ر.س',
    header: '/company-header.svg',
    stamp: '/stamp.svg',
    logo: '/favicon.svg',
    footer: '',
    warrantyTerms: 'أسمدة ومخصبات زراعية مسجلة ومطابقة للمواصفات الفنية المعتمدة لدى وزارة الزراعة',
  };

  return NextResponse.json(companyData);
}
