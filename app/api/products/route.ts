import { NextResponse } from 'next/server';
import { getFertilizerProducts } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let products = await getFertilizerProducts();

    if (category && category !== 'الكل' && category !== 'all') {
      products = products.filter(p => p.category === category);
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.formula.toLowerCase().includes(q) ||
        p.spec.toLowerCase().includes(q)
      );
    }

    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch products', message: error.message },
      { status: 500 }
    );
  }
}
