import type { FaqItem, Review, SiteSettings } from "@/types/commerce";

export const siteSettings: SiteSettings = {
  brandName: "LALIBAKERY",
  legalName: "LALIBAKERY (אפייה מהלב)",
  businessId: "0508739090",
  phone: "050-8739090",
  whatsapp: "972508739090",
  email: "orders@lalibakery.co.il",
  address: "איסוף עצמי · נתניה · משלוח שרון והמרכז",
  addressPending: true,
  hours: "א׳–ה׳ 09:00–18:00 · ו׳ עד כשעתיים לפני שבת · הזמנות בוואטסאפ 24/7",
  tagline: "אפייה מהלב",
  domain: "lalibakery.co.il",
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() ||
    "https://www.instagram.com/lalibakery/",
  shippingFlatIls: 50,
  freeShippingFromIls: 400,
  launchCouponCode: "LALI10",
  launchCouponPercent: 10,
};

export const reviews: Review[] = [
  {
    id: "r1",
    author: "נועה ל.",
    city: "ראשון לציון",
    rating: 5,
    body: "עוגת הגן הגיעה מושלמת — הצילום יצא חד, והילדים לא הפסיקו לצלם לפני שחתכו.",
    productSlug: "photo-libby-8",
    source: "whatsapp",
  },
  {
    id: "r2",
    author: "יעל מ.",
    city: "חולון",
    rating: 5,
    body: "עוגת מספרים ליום הולדת 40 — חצי פרי חצי שוקולד. כולם שאלו מאיפה הזמנו.",
    productSlug: "number-40-fruit",
    source: "site",
  },
  {
    id: "r3",
    author: "דנה ש.",
    city: "תל אביב",
    rating: 5,
    body: "העוגה המעוצבת עם כתר הזהב נראית כמו מסעדה — והטעם לא פחות מהמראה.",
    productSlug: "gold-crown-king",
    source: "whatsapp",
  },
  {
    id: "r4",
    author: "מיכל ר.",
    city: "רעננה",
    rating: 5,
    body: "תקשורת בוואטסאפ מסודרת, עיצוב לפי הדמות שביקשנו, ואריזה נקייה.",
    source: "site",
  },
];

export const faqs: FaqItem[] = [
  {
    id: "f1",
    question: "כמה זמן מראש צריך להזמין?",
    answer:
      "מומלץ 3–5 ימי עסקים לעוגות גן ותבניות פופולריות. עוגות מעוצבות ומספרים — עד שבוע מראש בעונות עמוסות.",
  },
  {
    id: "f2",
    question: "אפשר לשלוח תמונה לעוגת גן?",
    answer:
      "כן. שולחים תמונה באיכות גבוהה בוואטסאפ, ואנחנו מדפיסים על דף אכיל ומשלבים בעיצוב.",
  },
  {
    id: "f3",
    question: "מה ההבדל בין עוגת גן לעוגה מעוצבת?",
    answer:
      "עוגת גן היא מלבנית לחיתוך קל בכיתה/גן. עוגה מעוצבת היא עגולה/שכבות עם טופרים ועיצוב תלת־ממדי. עוגת מספרים — ספרות עם קרם וממתקים.",
  },
  {
    id: "f4",
    question: "יש אפשרויות ללא גלוטן / אלרגיות?",
    answer:
      "אפשר לתאם בוואטסאפ לפי צורך. חשוב לציין אלרגיות מראש — המטבח אינו נטול אלרגנים מלא.",
  },
  {
    id: "f5",
    question: "איך משלמים?",
    answer:
      "אשראי, ביט, פייבוקס, או קישור תשלום בוואטסאפ. המחיר הסופי מאושר לפני הייצור.",
  },
  {
    id: "f6",
    question: "משלוחים?",
    answer:
      "משלוח אקספרס לפי אזור, או איסוף עצמי בתיאום. פרטים מדויקים בשיחה בוואטסאפ.",
  },
];
