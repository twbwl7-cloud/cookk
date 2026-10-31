import type { Collection, Product } from "@/types/commerce";

export const products: Product[] = [
  // —— עוגות גן ——
  // קטנה 220 · גדולה 250
  {
    id: "p-gan-roblox",
    slug: "roblox-10",
    title: "עוגת גן Roblox",
    shortDescription: "מלבנית עם דף אכיל של דמויות — מושלמת לכיתה.",
    description:
      "עוגת גן קלאסית בקופסה לבנה, מסגרת קרם צבעונית ודף אכיל בהתאמה אישית. מתאימה לחיתוך מהיר בגן ובמסיבה.",
    category: "gan",
    tags: ["kids", "bestseller"],
    image: "/cakes/gan/roblox-10.jpg",
    imageCredit: "real",
    featured: true,
    shape: "sheet",
    variants: [
      { id: "v-roblox-s", label: "גן קטנה", sku: "LB-GN-RB10-S", priceIls: 220, stock: 12 },
      { id: "v-roblox-l", label: "גן גדולה", sku: "LB-GN-RB10-L", priceIls: 250, stock: 10 },
    ],
  },
  {
    id: "p-gan-libby",
    slug: "photo-libby-8",
    title: "עוגת גן עם תמונה",
    shortDescription: "תמונה אמיתית על דף אכיל · מסגרת ורודה עם פרפרים.",
    description:
      "שולחים תמונה בוואטסאפ — אנחנו מדפיסים ומעצבים מסגרת קרם לפי הצבעים שבחרתם.",
    category: "gan",
    tags: ["kids", "custom", "bestseller"],
    image: "/cakes/gan/photo-libby-8.jpg",
    imageCredit: "real",
    featured: true,
    shape: "sheet",
    variants: [
      { id: "v-libby-s", label: "גן קטנה", sku: "LB-GN-PH08-S", priceIls: 220, stock: 15 },
      { id: "v-libby-l", label: "גן גדולה", sku: "LB-GN-PH08-L", priceIls: 250, stock: 12 },
    ],
  },
  {
    id: "p-gan-yagel",
    slug: "mickey-yagel-1",
    title: "עוגת גן מיקי · בן שנה",
    shortDescription: "כחול-ירוק עם מיקי וספרה 1.",
    description: "עיצוב גן קלאסי לדמויות אהובות — טקסט בעברית לפי הזמנה.",
    category: "gan",
    tags: ["kids"],
    image: "/cakes/gan/mickey-yagel-1.jpg",
    imageCredit: "real",
    featured: false,
    shape: "sheet",
    variants: [
      { id: "v-yagel-s", label: "גן קטנה", sku: "LB-GN-MY01-S", priceIls: 220, stock: 10 },
      { id: "v-yagel-l", label: "גן גדולה", sku: "LB-GN-MY01-L", priceIls: 250, stock: 8 },
    ],
  },
  {
    id: "p-gan-adam",
    slug: "mickey-adam-2",
    title: "עוגת גן מיקי · גיל 2",
    shortDescription: "אדום וצהוב · הדפס מיקי קלאסי.",
    description: "עוגת גן צבעונית עם דף אכיל וכפפות מיקי על הקרם.",
    category: "gan",
    tags: ["kids"],
    image: "/cakes/gan/mickey-adam-2.jpg",
    imageCredit: "real",
    featured: false,
    shape: "sheet",
    variants: [
      { id: "v-adam-s", label: "גן קטנה", sku: "LB-GN-MA02-S", priceIls: 220, stock: 10 },
      { id: "v-adam-l", label: "גן גדולה", sku: "LB-GN-MA02-L", priceIls: 250, stock: 8 },
    ],
  },
  {
    id: "p-gan-kuti",
    slug: "chesed-kuti",
    title: "עוגת גן מותאמת אישית",
    shortDescription: "קולאז׳ תמונות + מסגרת קרם מרובת טקסטורות.",
    description:
      "לאירועים אישיים וקהילתיים — הדפסה מלאה, צבעי קרם לפי בחירה, וטופר זהב.",
    category: "gan",
    tags: ["custom", "luxury"],
    image: "/cakes/gan/chesed-kuti.jpg",
    imageCredit: "real",
    featured: true,
    shape: "sheet",
    variants: [
      { id: "v-kuti-s", label: "גן קטנה", sku: "LB-GN-CK01-S", priceIls: 220, stock: 8 },
      { id: "v-kuti-l", label: "גן גדולה", sku: "LB-GN-CK01-L", priceIls: 250, stock: 6 },
    ],
  },
  {
    id: "p-gan-brawl",
    slug: "brawl-stars-7",
    title: "עוגת גן Brawl Stars",
    shortDescription: "דמויות המשחק · כחול נוצץ · גיל לפי הזמנה.",
    description: "עיצוב גיימינג לילדים — דמויות, כוכבים וספרה תלת־ממדית.",
    category: "gan",
    tags: ["kids", "new"],
    image: "/cakes/gan/brawl-stars-7.jpg",
    imageCredit: "real",
    featured: false,
    shape: "sheet",
    variants: [
      { id: "v-brawl-s", label: "גן קטנה", sku: "LB-GN-BS07-S", priceIls: 220, stock: 9 },
      { id: "v-brawl-l", label: "גן גדולה", sku: "LB-GN-BS07-L", priceIls: 250, stock: 7 },
    ],
  },
  {
    id: "p-gan-bar",
    slug: "bar-mitzvah-13",
    title: "עוגת בר מצווה",
    shortDescription: "לבן־כחול־זהב · טלית ותפילין · גיל 13.",
    description: "עיצוב חגיגי לבר מצווה על בסיס עוגת גן גדולה עם אלמנטים מוזהבים.",
    category: "gan",
    tags: ["custom", "luxury"],
    image: "/cakes/gan/bar-mitzvah-13.jpg",
    imageCredit: "real",
    featured: true,
    shape: "sheet",
    variants: [
      { id: "v-bar", label: "גן גדולה", sku: "LB-GN-BM13", priceIls: 250, stock: 6 },
    ],
  },

  // —— עוגות מספרים ——
  // שתי ספרות 320 · ספרה אחת 250
  {
    id: "p-num-1",
    slug: "number-1",
    title: "עוגת מספרים · ספרה 1",
    shortDescription: "ספרה אחת עם קרם, ממתקים ופלאק בעברית.",
    description:
      "עוגת מספרים לספרה בודדת — קרם, קישוטים ופלאקים בעברית לפי הזמנה.",
    category: "misparim",
    tags: ["kids", "new", "bestseller"],
    image: "/cakes/misparim/number-22-chocolate.jpg",
    imageCredit: "real",
    featured: true,
    shape: "number",
    variants: [
      { id: "v-n1", label: "ספרה אחת", sku: "LB-NM-01", priceIls: 250, stock: 10 },
    ],
  },
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
      { id: "v-n70", label: "שתי ספרות", sku: "LB-NM-70", priceIls: 320, stock: 7 },
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
      { id: "v-n40", label: "שתי ספרות", sku: "LB-NM-40", priceIls: 320, stock: 8 },
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
      { id: "v-n22", label: "שתי ספרות", sku: "LB-NM-22", priceIls: 320, stock: 7 },
    ],
  },

  // —— עוגות מעוצבות ——
  // עגולה מעוצבת עם דף סוכר · קוטר 22 · גובה 14 ס״מ · 400
  {
    id: "p-des-king",
    slug: "gold-crown-king",
    title: "עוגה מעוצבת · כתר זהב",
    shortDescription: "עגולה · דף סוכר · קוטר 22 · גובה 14 ס״מ.",
    description:
      "העוגה שסוגרת רגע גדול — קרם חלק, דף סוכר, עלי זהב אכילים, וכתר זהב במרכז. קוטר 22 ס״מ, גובה 14 ס״מ.",
    category: "meutzavot",
    tags: ["luxury", "bestseller"],
    image: "/cakes/meutzavot/gold-crown-king.jpg",
    imageCredit: "real",
    featured: true,
    shape: "round",
    variants: [
      {
        id: "v-king",
        label: "Ø22 · גובה 14 ס״מ · דף סוכר",
        sku: "LB-MZ-GK01",
        priceIls: 400,
        stock: 5,
      },
    ],
  },
  {
    id: "p-des-topaz",
    slug: "topaz-15",
    title: "עוגה מעוצבת · טופז 15",
    shortDescription: "לבן־שחור · דף סוכר · קוטר 22 · גובה 14 ס״מ.",
    description:
      "עיצוב נקי עם סרטים שחורים ואותיות כהות — עגולה מעוצבת עם דף סוכר, קוטר 22 ס״מ וגובה 14 ס״מ.",
    category: "meutzavot",
    tags: ["luxury"],
    image: "/cakes/meutzavot/topaz-15.jpg",
    imageCredit: "real",
    featured: false,
    shape: "round",
    variants: [
      {
        id: "v-topaz",
        label: "Ø22 · גובה 14 ס״מ · דף סוכר",
        sku: "LB-MZ-TP15",
        priceIls: 400,
        stock: 4,
      },
    ],
  },
  {
    id: "p-des-tamar",
    slug: "tamar-18",
    title: "עוגה מעוצבת · תמר 18",
    shortDescription: "וינטג׳ לבן · דף סוכר · קוטר 22 · גובה 14 ס״מ.",
    description:
      "עיצוב אלגנטי לבת מצווה / 18 עם פייפינג קלאסי — עגולה מעוצבת עם דף סוכר, קוטר 22 וגובה 14 ס״מ.",
    category: "meutzavot",
    tags: ["luxury", "custom"],
    image: "/cakes/meutzavot/tamar-18.jpg",
    imageCredit: "real",
    featured: false,
    shape: "round",
    variants: [
      {
        id: "v-tamar",
        label: "Ø22 · גובה 14 ס״מ · דף סוכר",
        sku: "LB-MZ-TM18",
        priceIls: 400,
        stock: 4,
      },
    ],
  },
  {
    id: "p-des-mama",
    slug: "mama-70-gold",
    title: "עוגה מעוצבת · Happy Birthday Mama",
    shortDescription: "לבן וזהב · דף סוכר · קוטר 22 · גובה 14 ס״מ.",
    description:
      "עוגה גבוהה עם אותיות זהב ופרחים — עגולה מעוצבת עם דף סוכר, קוטר 22 ס״מ וגובה 14 ס״מ.",
    category: "meutzavot",
    tags: ["luxury", "bestseller"],
    image: "/cakes/meutzavot/mama-70-gold.jpg",
    imageCredit: "real",
    featured: true,
    shape: "round",
    variants: [
      {
        id: "v-mama",
        label: "Ø22 · גובה 14 ס״מ · דף סוכר",
        sku: "LB-MZ-MM70",
        priceIls: 400,
        stock: 4,
      },
    ],
  },
  {
    id: "p-des-hk",
    slug: "hello-kitty-3",
    title: "עוגה מעוצבת · Hello Kitty",
    shortDescription: "ורוד בייבי · דף סוכר · קוטר 22 · גובה 14 ס״מ.",
    description:
      "עוגת ילדות צבעונית עם טופרים ופנינים — עגולה מעוצבת עם דף סוכר, קוטר 22 ס״מ וגובה 14 ס״מ.",
    category: "meutzavot",
    tags: ["kids", "new"],
    image: "/cakes/meutzavot/hello-kitty-3.jpg",
    imageCredit: "real",
    featured: true,
    shape: "round",
    variants: [
      {
        id: "v-hk",
        label: "Ø22 · גובה 14 ס״מ · דף סוכר",
        sku: "LB-MZ-HK03",
        priceIls: 400,
        stock: 6,
      },
    ],
  },
  {
    id: "p-des-minnie-t",
    slug: "minnie-tiered-1",
    title: "עוגה מעוצבת · מיני שתי קומות",
    shortDescription: "ורוד · פפיון · דף סוכר · קוטר 22 · גובה 14 ס״מ.",
    description:
      "עיצוב מיני עם פפיונים וטופרים — עגולה מעוצבת עם דף סוכר, קוטר 22 ס״מ וגובה 14 ס״מ.",
    category: "meutzavot",
    tags: ["kids", "bestseller"],
    image: "/cakes/meutzavot/minnie-tiered-1.jpg",
    imageCredit: "real",
    featured: true,
    shape: "round",
    variants: [
      {
        id: "v-mt",
        label: "Ø22 · גובה 14 ס״מ · דף סוכר",
        sku: "LB-MZ-MT01",
        priceIls: 400,
        stock: 4,
      },
    ],
  },
  {
    id: "p-des-minnie-d",
    slug: "minnie-drip-1",
    title: "עוגה מעוצבת · מיני Drip",
    shortDescription: "ורוד ולבן · דף סוכר · קוטר 22 · גובה 14 ס״מ.",
    description:
      "עיצוב פרימיום עם כתר זהב ודמות מיני — עגולה מעוצבת עם דף סוכר, קוטר 22 ס״מ וגובה 14 ס״מ.",
    category: "meutzavot",
    tags: ["kids", "luxury"],
    image: "/cakes/meutzavot/minnie-drip-1.jpg",
    imageCredit: "real",
    featured: false,
    shape: "round",
    variants: [
      {
        id: "v-md",
        label: "Ø22 · גובה 14 ס״מ · דף סוכר",
        sku: "LB-MZ-MD01",
        priceIls: 400,
        stock: 5,
      },
    ],
  },
  {
    id: "p-des-cookie",
    slug: "minnie-cookie-princess",
    title: "עוגת קרם · צורת מיני",
    shortDescription: "בסיס ביסקוויט · קרם · דף סוכר · קוטר 22 · גובה 14 ס״מ.",
    description:
      "קרם־טרט בצורת ראש מיני — עגולה מעוצבת עם דף סוכר, קוטר 22 ס״מ וגובה 14 ס״מ.",
    category: "meutzavot",
    tags: ["kids", "new"],
    image: "/cakes/meutzavot/minnie-cookie-princess.jpg",
    imageCredit: "real",
    featured: false,
    shape: "shaped",
    variants: [
      {
        id: "v-cookie",
        label: "Ø22 · גובה 14 ס״מ · דף סוכר",
        sku: "LB-MZ-MC01",
        priceIls: 400,
        stock: 6,
      },
    ],
  },
];

export const collections: Collection[] = [
  {
    id: "c-gan",
    slug: "gan",
    title: "עוגות גן",
    description: "מלבניות לחיתוך קל — תמונה, דמות או קולאז׳ אישי. קטנה ₪220 · גדולה ₪250.",
    productIds: products.filter((p) => p.category === "gan").map((p) => p.id),
    coverImage: "/cakes/gan/photo-libby-8.jpg",
  },
  {
    id: "c-misparim",
    slug: "misparim",
    title: "עוגות מספרים",
    description: "ספרה אחת ₪250 · שתי ספרות ₪320 — עם קרם, פירות ופלאקים בעברית.",
    productIds: products.filter((p) => p.category === "misparim").map((p) => p.id),
    coverImage: "/cakes/misparim/number-70-gold.jpg",
  },
  {
    id: "c-meutzavot",
    slug: "meutzavot",
    title: "עוגות מעוצבות",
    description: "עגולה מעוצבת עם דף סוכר · קוטר 22 · גובה 14 ס״מ · ₪400.",
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
