import mongoose from 'mongoose';
import { FALLBACK_PRODUCTS, ProductType } from './products-data';

const MONGO_URI = process.env.MONGO_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose | null> {
  if (!MONGO_URI) {
    console.warn('MONGO_URI is not set in environment.');
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((m) => {
      return m;
    }).catch((err) => {
      console.error('Failed to connect to MongoDB:', err);
      cached.promise = null;
      return null;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    return null;
  }
}

// Product Schema in frontend
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  nameEn: { type: String },
  formula: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  priceSAR: { type: Number },
  priceEGP: { type: Number },
  currency: { type: String, default: 'EGP' },
  weight: { type: String },
  tag: { type: String },
  color: { type: String },
  description: { type: String },
  spec: { type: String },
  image: {
    url: { type: String },
    publicId: { type: String }
  },
  stock: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const ProductModel = mongoose.models.Product || mongoose.model('Product', productSchema);

const FERTILIZER_CATEGORIES = ['أسمدة مركبة', 'أسمدة عضوية', 'محسنات تربة', 'عناصر صغرى'];

export async function getFertilizerProducts(): Promise<ProductType[]> {
  try {
    // مؤقتاً: استخدام FALLBACK_PRODUCTS مباشرة للتيست
    return FALLBACK_PRODUCTS;
    
    /* تم تعطيل الداتا بيز مؤقتاً
    const conn = await connectDB();
    if (!conn) {
      return FALLBACK_PRODUCTS;
    }

    const dbProducts = await ProductModel.find({
      category: { $in: FERTILIZER_CATEGORIES },
      isActive: true,
    }).sort({ id: 1 }).lean();

    if (!dbProducts || dbProducts.length === 0) {
      return FALLBACK_PRODUCTS;
    }
    */

    /* تم تعطيل الداتا بيز مؤقتاً
    // Merge DB records with fallback rich details (usage, dosage, badges)
    return dbProducts.map((p: any) => {
      const match = FALLBACK_PRODUCTS.find(fb => fb.id === p.id || fb.name === p.name);
      const isSAR = (p.currency === 'SAR') || (match?.currency === 'SAR');
      const resolvedPrice = isSAR
        ? (p.priceSAR ?? p.price ?? match?.priceSAR ?? match?.price ?? 1)
        : (p.priceEGP ?? p.price ?? match?.priceEGP ?? match?.price ?? 0);

      return {
        _id: p._id?.toString(),
        id: p.id || match?.id || 1,
        name: p.name || match?.name || '',
        nameEn: p.nameEn || match?.nameEn || '',
        formula: p.formula || match?.formula || '',
        category: p.category || match?.category || 'أسمدة مركبة',
        price: resolvedPrice,
        priceSAR: p.priceSAR ?? match?.priceSAR ?? (isSAR ? resolvedPrice : undefined),
        priceEGP: p.priceEGP ?? match?.priceEGP ?? (!isSAR ? resolvedPrice : undefined),
        currency: p.currency || match?.currency || (isSAR ? 'SAR' : 'EGP'),
        weight: p.weight || match?.weight || '',
        tag: p.tag || match?.tag || '',
        color: p.color || match?.color || '#15803d',
        description: p.description || match?.description || '',
        spec: p.spec || match?.spec || '',
        image: {
          url: p.image?.url || match?.image?.url || '/fertilizer.png',
          publicId: p.image?.publicId || match?.image?.publicId,
        },
        stock: p.stock ?? match?.stock ?? 50,
        isActive: p.isActive ?? true,
        usage: match?.usage || 'يستخدم حسب إرشادات المهندس الزراعي ونوع التربة.',
        dosage: match?.dosage || 'حسب التوصيات المعتمدة للجرعة المحصولية.',
      };
    });
    */
  } catch (error) {
    console.error('Error fetching fertilizer products from DB:', error);
    return FALLBACK_PRODUCTS;
  }
}

export async function getFertilizerProductById(id: number | string): Promise<ProductType | null> {
  const products = await getFertilizerProducts();
  const numId = typeof id === 'string' ? parseInt(id, 10) : id;
  const found = products.find(p => p.id === numId || p._id === id);
  return found || null;
}
