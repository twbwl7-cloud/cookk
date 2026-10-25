import type { Collection, Product } from "@/types/commerce";

export const products: Product[] = [
  // —— עוגות יום הולדת (לשעבר גן / מסיבות) ——
  {
    id: "p-gan-roblox",
    slug: "roblox-10",
    title: "עוגת גן Roblox",
    shortDescription: "מלבנית עם דף אכיל של דמויות — מושלמת לכיתה.",
    description:
      "עוגת גן קלאסית בקופסה לבנה, מסגרת קרם צבעונית ודף אכיל בהתאמה אישית. מתאימה לחיתוך מהיר בגן ובמסיבה.",
    category: "yom_huledet",
    tags: ["kids", "bestseller"],
    image: "/cakes/gan/roblox-10.jpg",
    imageCredit: "real",
    featured: true,
    shape: "sheet",
    variants: [
      { id: "v-roblox-std", label: "סטנדרט גן", sku: "LB-GN-RB10", priceIls: 280, stock: 12 },
    ],
  },
  {
    id: "p-gan-libby",
    slug: "photo-libby-8",
    title: "עוגת גן עם תמונה",
    shortDescription: "תמונה אמיתית על דף אכיל · מסגרת ורודה עם פרפרים.",
    description:
      "שולחים תמונה בוואטסאפ — אנחנו מדפיסים ומעצבים מסגרת קרם לפי הצבעים שבחרתם.",
    category: "yom_huledet",
    tags: ["kids", "custom", "bestseller"],
    image: "/cakes/gan/photo-libby-8.jpg",
    imageCredit: "real",
    featured: true,
    shape: "sheet",
    variants: [
      { id: "v-libby-std", label: "עם תמונה", sku: "LB-GN-PH08", priceIls: 300, stock: 15 },
    ],
  },
  {
    id: "p-gan-yagel",
    slug: "mickey-yagel-1",
    title: "עוגת גן מיקי · בן שנה",
    shortDescription: "כחול-ירוק עם מיקי וספרה 1.",
    description: "עיצוב גן קלאסי לדמויות אהובות — טקסט בעברית לפי הזמנה.",
    category: "yom_huledet",
    tags: ["kids"],
    image: "/cakes/gan/mickey-yagel-1.jpg",
    imageCredit: "real",
    featured: false,
    shape: "sheet",
    variants: [
      { id: "v-yagel", label: "סטנדרט", sku: "LB-GN-MY01", priceIls: 270, stock: 10 },
    ],
  },
  {
    id: "p-gan-adam",
    slug: "mickey-adam-2",
    title: "עוגת גן מיקי · גיל 2",
    shortDescription: "אדום וצהוב · הדפס מיקי קלאסי.",
    description: "עוגת גן צבעונית עם דף אכיל וכפפות מיקי על הקרם.",
    category: "yom_huledet",
    tags: ["kids"],
    image: "/cakes/gan/mickey-adam-2.jpg",
    imageCredit: "real",
    featured: false,
    shape: "sheet",
    variants: [
      { id: "v-adam", label: "סטנדרט", sku: "LB-GN-MA02", priceIls: 270, stock: 10 },
    ],
  },
  {
    id: "p-gan-kuti",
    slug: "chesed-kuti",
    title: "עוגת גן מותאמת אישית",
    shortDescription: "קולאז׳ תמונות + מסגרת קרם מרובת טקסטורות.",
    description:
      "לאירועים אישיים וקהילתיים — הדפסה מלאה, צבעי קרם לפי בחירה, וטופר זהב.",
    category: "yom_huledet",
    tags: ["custom", "luxury"],
    image: "/cakes/gan/chesed-kuti.jpg",
    imageCredit: "real",
    featured: true,
    shape: "sheet",
    variants: [
      { id: "v-kuti", label: "פרימיום", sku: "LB-GN-CK01", priceIls: 350, stock: 8 },
    ],
  },
  {
    id: "p-gan-brawl",
    slug: "brawl-stars-7",
    title: "עוגת גן Brawl Stars",
    shortDescription: "דמויות המשחק · כחול נוצץ · גיל לפי הזמנה.",
    description: "עיצוב גיימינג לילדים — דמויות, כוכבים וספרה תלת־ממדית.",
    category: "yom_huledet",
    tags: ["kids", "new"],
    image: "/cakes/gan/brawl-stars-7.jpg",
    imageCredit: "real",
    featured: false,
    shape: "sheet",
    variants: [
      { id: "v-brawl", label: "סטנדרט", sku: "LB-GN-BS07", priceIls: 290, stock: 9 },
    ],
  },
  {
    id: "p-gan-bar",
    slug: "bar-mitzvah-13",
    title: "עוגת בר מצווה",
    shortDescription: "לבן־כחול־זהב · טלית ותפילין · גיל 13.",
    description: "עיצוב חגיגי לבר מצווה על בסיס עוגת גן גדולה עם אלמנטים מוזהבים.",
    category: "yom_huledet",
    tags: ["custom", "luxury"],
    image: "/cakes/gan/bar-mitzvah-13.jpg",
    imageCredit: "real",
    featured: true,
    shape: "sheet",
    variants: [
      { id: "v-bar", label: "חגיגית", sku: "LB-GN-BM13", priceIls: 380, stock: 6 },
    ],
  },

  // —— עוגות מספרים ——
  {
    id: "p-num-70",
    slug: "number-70-gold",
    title: "עוגת מספרים 70 · זהב",
    shortDescription: "ספרות עם קרם, מקרונים ופרחים · פלאקים בעברית.",
    description:
      "עוגת מספרים יוקרתית בקופסה לבנה — קישוטי זהב, שוקולדים ופלאקים כמו «מזל טוב» ו«אשת חיל».",
    category: "misparim",
    tags: ["luxury", "bestseller"],
    image: "/cakes/misparim/number-70-gold.jpg",
    imageCredit: "real",
    featured: true,
    shape: "number",
    variants: [
      { id: "v-n70", label: "זוג ספרות", sku: "LB-NM-70", priceIls: 420, stock: 7 },
    ],
  },
  {
    id: "p-num-40",
    slug: "number-40-fruit",
    title: "עוגת מספרים 40 · פרי ושוקולד",
    shortDescription: "חצי פירות טריים · חצי שוקולדים · לוחית אישית.",
    description:
      "שילוב מנצח: ספרה אחת עמוסה שוקולד והשנייה פירות טריים. מתאים לימי הולדת בוגרים.",
    category: "misparim",
    tags: ["bestseller", "custom"],
    image: "/cakes/misparim/number-40-fruit.jpg",
    imageCredit: "real",
    featured: true,
    shape: "number",
    variants: [
      { id: "v-n40", label: "זוג ספרות", sku: "LB-NM-40", priceIls: 390, stock: 8 },
    ],
  },
  {
    id: "p-num-22",
    slug: "number-22-chocolate",
    title: "עוגת מספרים 22 · שוקולד",
    shortDescription: "בסיס שוקולד כהה · קרם לבן · קינדר וכתר זהב.",
    description: "עוגת מספרים עשירה בממתקים — עם פלאקים בעברית וכתר קטן.",
    category: "misparim",
    tags: ["new", "luxury"],
    image: "/cakes/misparim/number-22-chocolate.jpg",
    imageCredit: "real",
    featured: false,
    shape: "number",
    variants: [
      { id: "v-n22", label: "זוג ספרות", sku: "LB-NM-22", priceIls: 380, stock: 7 },
    ],
  },

  // —— עוגות מעוצבות ——
  {
    id: "p-des-king",
    slug: "gold-crown-king",
    title: "עוגה מעוצבת · כתר זהב",
    shortDescription: "עגולה לבנה · כתר זהב · «מזל טוב למלך של הבית».",
    description:
      "העוגה שסוגרת רגע גדול — קרם חלק, עלי זהב אכילים, וכתר זהב במרכז. מושלמת לגיבור של הבית.",
    category: "meutzavot",
    tags: ["luxury", "bestseller"],
    image: "/cakes/meutzavot/gold-crown-king.jpg",
    imageCredit: "real",
    featured: true,
    shape: "round",
    variants: [
      { id: "v-king", label: "קוטר סטנדרט", sku: "LB-MZ-GK01", priceIls: 450, stock: 5 },
      { id: "v-king-lg", label: "קוטר גדול", sku: "LB-MZ-GK02", priceIls: 520, stock: 3 },
    ],
  },
  {
    id: "p-des-topaz",
    slug: "topaz-15",
    title: "עוגה מעוצבת · טופז 15",
    shortDescription: "לבן־שחור · סרטי סאטן · מראה מינימליסטי יוקרתי.",
    description: "עיצוב נקי עם סרטים שחורים ואותיות כהות — ליום הולדת 15 ומעלה.",
    category: "meutzavot",
    tags: ["luxury"],
    image: "/cakes/meutzavot/topaz-15.jpg",
    imageCredit: "real",
    featured: false,
    shape: "round",
    variants: [
      { id: "v-topaz", label: "גבוהה", sku: "LB-MZ-TP15", priceIls: 480, stock: 4 },
    ],
  },
  {
    id: "p-des-tamar",
    slug: "tamar-18",
    title: "עוגה מעוצבת · תמר 18",
    shortDescription: "וינטג׳ לבן · סרטים ירוקים · טקסט ירוק.",
    description: "עיצוב אלגנטי לבת מצווה / 18 עם פייפינג קלאסי וסרטי בד.",
    category: "meutzavot",
    tags: ["luxury", "custom"],
    image: "/cakes/meutzavot/tamar-18.jpg",
    imageCredit: "real",
    featured: false,
    shape: "round",
    variants: [
      { id: "v-tamar", label: "שתי שכבות", sku: "LB-MZ-TM18", priceIls: 490, stock: 4 },
    ],
  },
  {
    id: "p-des-mama",
    slug: "mama-70-gold",
    title: "עוגה מעוצבת · Happy Birthday Mama",
    shortDescription: "לבן וזהב · פרחים לבנים · ספרה 70.",
    description: "עוגה גבוהה עם אותיות זהב תלת־ממד ופרחים — לאימהות וסבתות.",
    category: "meutzavot",
    tags: ["luxury", "bestseller"],
    image: "/cakes/meutzavot/mama-70-gold.jpg",
    imageCredit: "real",
    featured: true,
    shape: "round",
    variants: [
      { id: "v-mama", label: "גבוהה", sku: "LB-MZ-MM70", priceIls: 510, stock: 4 },
    ],
  },
  {
    id: "p-des-hk",
    slug: "hello-kitty-3",
    title: "עוגה מעוצבת · Hello Kitty",
    shortDescription: "ורוד בייבי · ספרה 3 · שם בעברית על הצד.",
    description: "עוגת ילדות צבעונית עם טופרים, פנינים ושם מודגש.",
    category: "meutzavot",
    tags: ["kids", "new"],
    image: "/cakes/meutzavot/hello-kitty-3.jpg",
    imageCredit: "real",
    featured: true,
    shape: "round",
    variants: [
      { id: "v-hk", label: "עגולה", sku: "LB-MZ-HK03", priceIls: 420, stock: 6 },
    ],
  },
  {
    id: "p-des-minnie-t",
    slug: "minnie-tiered-1",
    title: "עוגה מעוצבת · מיני שתי קומות",
    shortDescription: "ורוד · פפיון · ספרה 1 · דמות מיני.",
    description: "שתי קומות ורודות עם פפיונים וטופרים — ליום הולדת ראשון.",
    category: "meutzavot",
    tags: ["kids", "bestseller"],
    image: "/cakes/meutzavot/minnie-tiered-1.jpg",
    imageCredit: "real",
    featured: true,
    shape: "round",
    variants: [
      { id: "v-mt", label: "שתי קומות", sku: "LB-MZ-MT01", priceIls: 550, stock: 4 },
    ],
  },
  {
    id: "p-des-minnie-d",
    slug: "minnie-drip-1",
    title: "עוגה מעוצבת · מיני Drip",
    shortDescription: "ורוד ולבן · דריפת שוקולד · כתר זהב.",
    description: "עיצוב פרימיום עם כתר זהב ודמות מיני — על בסיס שיש שחור.",
    category: "meutzavot",
    tags: ["kids", "luxury"],
    image: "/cakes/meutzavot/minnie-drip-1.jpg",
    imageCredit: "real",
    featured: false,
    shape: "round",
    variants: [
      { id: "v-md", label: "עגולה גבוהה", sku: "LB-MZ-MD01", priceIls: 480, stock: 5 },
    ],
  },
  {
    id: "p-des-cookie",
    slug: "minnie-cookie-princess",
    title: "עוגת קרם · צורת מיני",
    shortDescription: "בסיס ביסקוויט · קרם · נשיקות מרנג · «להולדת הנסיכה».",
    description: "קרם־טרט בצורת ראש מיני — ורוד־לבן לחגיגת נסיכה.",
    category: "meutzavot",
    tags: ["kids", "new"],
    image: "/cakes/meutzavot/minnie-cookie-princess.jpg",
    imageCredit: "real",
    featured: false,
    shape: "shaped",
    variants: [
      { id: "v-cookie", label: "צורת מיני", sku: "LB-MZ-MC01", priceIls: 360, stock: 6 },
    ],
  },
];

export const collections: Collection[] = [
  {
    id: "c-birthday",
    slug: "yom_huledet",
    title: "עוגות יום הולדת",
    description: "ליום הולדת — דמויות, תמונה על דף אכיל, ומסיבות.",
    productIds: products.filter((p) => p.category === "yom_huledet").map((p) => p.id),
    coverImage: "/cakes/gan/photo-libby-8.jpg",
  },
  {
    id: "c-misparim",
    slug: "misparim",
    title: "עוגות מספרים",
    description: "ספרות עם קרם, פירות, שוקולדים ופלאקים בעברית.",
    productIds: products.filter((p) => p.category === "misparim").map((p) => p.id),
    coverImage: "/cakes/misparim/number-70-gold.jpg",
  },
  {
    id: "c-meutzavot",
    slug: "meutzavot",
    title: "עוגות מעוצבות",
    description: "עגולות ושכבות עם טופרים, כתרים ועיצוב תלת־ממדי.",
    productIds: products.filter((p) => p.category === "meutzavot").map((p) => p.id),
    coverImage: "/cakes/meutzavot/gold-crown-king.jpg",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
