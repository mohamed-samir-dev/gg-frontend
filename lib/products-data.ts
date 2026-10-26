export interface ProductType {
  _id?: string;
  id: number;
  name: string;
  nameEn: string;
  formula: string;
  category: string;
  price: number;
  priceEGP: number;
  currency: string;
  isPriceVerified?: boolean;
  weight: string;
  tag: string;
  color: string;
  description: string;
  spec: string;
  image: {
    url: string;
    publicId?: string;
  };
  stock: number;
  isActive: boolean;
  usage?: string;
  dosage?: string;
}

export const FERTILIZER_CATEGORIES = [
  'الكل',
  'أسمدة مركبة',
  'أسمدة عضوية',
  'محسنات تربة',
  'عناصر صغرى'
];

export const FALLBACK_PRODUCTS: ProductType[] = [
  {
    id: 1,
    name: 'جرين جرو المتوازن',
    nameEn: 'BALANCED NUTRITION',
    formula: 'NPK 20-20-20',
    category: 'أسمدة مركبة',
    price: 1000,
    priceEGP: 1000,
    currency: 'EGP',
    isPriceVerified: true,
    weight: '25 كجم',
    tag: 'الأكثر مبيعاً',
    color: '#15803d',
    description: 'تركيبة سمادية متوازنة تجمع العناصر الكبرى (نيتروجين، فوسفور، بوتاسيوم) بنسب متساوية لدعم كافة مراحل نمو النبات وتحسين الإنتاجية.',
    spec: 'نيتروجين 20% · فوسفور 20% · بوتاسيوم 20%',
    image: {
      url: '/fertilizer.png',
      publicId: 'fertilizer-1'
    },
    stock: 100,
    isActive: true,
    usage: 'مناسب لجميع المحاصيل الحقلية والخضروات وأشجار الفاكهة في كافة مراحل النمو.',
    dosage: '2 - 3 كجم / فدان مع مياه الري أسبوعياً، أو 2.5 جم / لتر ماء رشا ورَقياً.'
  },
  {
    id: 2,
    name: 'أورجانيك بلس',
    nameEn: 'ORGANIC MATTER',
    formula: 'ORGANIC PLUS',
    category: 'أسمدة عضوية',
    price: 500,
    priceEGP: 500,
    currency: 'EGP',
    isPriceVerified: true,
    weight: '20 كجم',
    tag: 'عضوي 100%',
    color: '#854d0e',
    description: 'سماد عضوي نقي معالج حرارياً غني بالمادة العضوية والدبال لتحسين خصوبة التربة وقدرتها على الاحتفاظ بالماء والعناصر الغذائية.',
    spec: 'مادة عضوية مركزة · عناصر حيوية نشطة',
    image: {
      url: '/two.webp',
      publicId: 'fertilizer-2'
    },
    stock: 150,
    isActive: true,
    usage: 'يضاف أثناء خدمة الأرض وتجهيز التربة للزراعة أو في الخدمة الشتوية للأشجار.',
    dosage: '50 - 100 كجم / فدان عند تجهيز الأرض، أو 5 - 10 كجم للشجرة حسب العمر.'
  },
  {
    id: 3,
    name: 'بوتاسيوم باور',
    nameEn: 'FRUIT & FLOWER',
    formula: 'NPK 12-12-36',
    category: 'أسمدة مركبة',
    price: 1800,
    priceEGP: 1800,
    currency: 'EGP',
    isPriceVerified: true,
    weight: '25 كجم',
    tag: 'تحجيم وتلوين الثمار',
    color: '#b45309',
    description: 'تركيبة عالية البوتاسيوم مصممة خصيصاً لمراحل التزهير وعقد الثمار وتضخيمها وزيادة نسبة السكريات وتحسين جودة المحصول ولونه.',
    spec: 'نيتروجين 12% · فوسفور 12% · بوتاسيوم 36%',
    image: {
      url: '/three.webp',
      publicId: 'fertilizer-3'
    },
    stock: 80,
    isActive: true,
    usage: 'يستخدم من بداية مرحلة العقد وحتى اكتمال نضج الثمار لجميع محاصيل الفاكهة والخضر.',
    dosage: '3 - 5 كجم / فدان بالتنقيط كل 4-6 أيام في مرحلة التحجيم.'
  },
  {
    id: 4,
    name: 'هيوميك روت',
    nameEn: 'ROOT CARE',
    formula: 'HUMIC ACID 85%',
    category: 'محسنات تربة',
    price: 1500,
    priceEGP: 1500,
    currency: 'EGP',
    isPriceVerified: true,
    weight: '10 كجم',
    tag: 'منشط جذور قوي',
    color: '#3f2e1e',
    description: 'حمض هيوميك نقي عالي الذوبان مستخلص من أجود مصادر الليوناردايت، يعمل على تنشيط المجموع الجذري وتيسير امتصاص الفوسفور والعناصر الدقيقة.',
    spec: 'أحماض هيوميك وفولفيك 85% · بوتاسيوم 10%',
    image: {
      url: '/four.webp',
      publicId: 'fertilizer-4'
    },
    stock: 60,
    isActive: true,
    usage: 'يستخدم لمعالجة ملوحة التربة وتنشيط الجذور بعد الشتل ومقاومة الإجهاد.',
    dosage: '1 - 2 كجم / فدان حقناً مع مياه الري وتكرر كل أسبوعين.'
  },
  {
    id: 5,
    name: 'كالسيوم برو',
    nameEn: 'CALCIUM COMPLEX',
    formula: 'CALCIUM + BORON',
    category: 'عناصر صغرى',
    price: 2500,
    priceEGP: 2500,
    currency: 'EGP',
    isPriceVerified: true,
    weight: '20 لتر',
    tag: 'صلابة وجودة الثمار',
    color: '#0369a1',
    description: 'مركب سائل متطور يدمج الكالسيوم النقي مع البورون المحفز لتقوية الجدر الخلوية ومنع تشوه الثمار وعلاج ظاهرة عفن طرف القمة الزهري في الطماطم والبلح.',
    spec: 'كالسيوم 15% · بورون 2% سائل ذائب',
    image: {
      url: '/five.webp',
      publicId: 'fertilizer-5'
    },
    stock: 40,
    isActive: true,
    usage: 'يكافح تساقط الأزهار والثمار، ويزيد من الصلابة والقدرة التخزينية للمحاصيل.',
    dosage: '2 - 3 لتر / فدان حقناً بالري أو 2 سم / لتر رشا على الأوراق.'
  },
  {
    id: 6,
    name: 'جرين ماكس الاحترافي',
    nameEn: 'PROFESSIONAL SERIES',
    formula: 'NPK 15-5-30',
    category: 'أسمدة مركبة',
    price: 3500,
    priceEGP: 3500,
    currency: 'EGP',
    isPriceVerified: true,
    weight: '50 كجم',
    tag: 'شيكارة المزارع الكبرى',
    color: '#065f46',
    description: 'عبوة اقتصادية مخصصة للمزارع الكبيرة والمساحات المفتوحة، تركيبة احترافية سريعة الذوبان تغطي احتياجات التربة الرملية والصحراوية بكفاءة متناهية.',
    spec: 'نيتروجين 15% · فوسفور 5% · بوتاسيوم 30% + كبريت',
    image: {
      url: '/six.webp',
      publicId: 'fertilizer-6'
    },
    stock: 30,
    isActive: true,
    usage: 'مخصص للمزارع الإنتاجية ومشاريع الزراعة الحديثة والبيوت المحمية.',
    dosage: '5 - 8 كجم / فدان مع برامج الري بالتسميد (Fertigation).'
  },
  {
    id: 7,
    name: 'فيرو بلانت',
    nameEn: 'IRON & MICRONUTRIENTS',
    formula: 'Fe 6% EDDHA + Zn + Mn',
    category: 'عناصر صغرى',
    price: 1299,
    priceEGP: 1299,
    currency: 'EGP',
    isPriceVerified: true,
    weight: '5 كجم',
    tag: 'علاج الاصفرار والشحوب',
    color: '#6b21a8',
    description: 'مخلب حديد فائق الفاعلية مخلب على مادة EDDHA المقاومة لقلوبة التربة، معزز بالزنك والمنغنيز لمعالجة اصفرار الأوراق وتنشيط تكوين الكلوروفيل.',
    spec: 'حديد مخلبي 6% (أورثو-أورثو 4.8%) · زنك · منغنيز',
    image: {
      url: '/seven.webp',
      publicId: 'fertilizer-7'
    },
    stock: 70,
    isActive: true,
    usage: 'فعال جداً في الأراضي القلوية والكلسية لمعالجة نقص الحديد واصفرار القمم النامية.',
    dosage: '1 - 1.5 كجم / فدان حقناً بالتربة، أو 1 جم / لتر رشا ورَقياً.'
  },
  {
    id: 8,
    name: 'نيترو ستارت',
    nameEn: 'NITROGEN BOOSTER',
    formula: 'N 46% + Micro',
    category: 'أسمدة مركبة',
    price: 699,
    priceEGP: 699,
    currency: 'EGP',
    isPriceVerified: true,
    weight: '10 كجم',
    tag: 'دفعة نمو خضري قوية',
    color: '#166534',
    description: 'سماد نيتروجيني عالي التركيز مصمم لانطلاقة نمو قوية في المراحل الأولى لتكوين العرش الخضري وبناء مسطح ورقي كثيف قادر على التمثيل الضوئي.',
    spec: 'نيتروجين نقي 46% سريع التحرر والامتصاص',
    image: {
      url: '/eight.webp',
      publicId: 'fertilizer-8'
    },
    stock: 90,
    isActive: true,
    usage: 'في بداية عمر النبات ومرحلة التفريع وبناء الهيكل الخضري.',
    dosage: '2 - 4 كجم / فدان أسبوعياً حتى بداية التزهير.'
  }
];
