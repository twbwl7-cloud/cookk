/** Catalog for the 5-step custom cake wizard — method from LaliBakery v4. */

export type CakeKindId = "number" | "designer" | "birthday" | "kindergarten" | "hybrid";

export type TasteGroup =
  | "classic"
  | "chocolate"
  | "fruity"
  | "nutty"
  | "sweets"
  | "special";

export type Allergen = "dairy" | "nuts" | "gluten" | "eggs";

export type CakeOption = {
  id: string;
  label: string;
  note?: string;
  hex?: string;
  group?: TasteGroup;
  contains?: Allergen[];
  parve?: boolean;
};

export type CakeSize = {
  id: string;
  label: string;
  detail?: string;
  servings: [number, number];
  priceFromIls: number;
  perFigure?: boolean;
};

export type CakeCategory = {
  id: CakeKindId;
  title: string;
  blurb: string;
  image: string;
  figure?: boolean;
  sizes: CakeSize[];
  baseIds: string[];
  creamIds: string[];
  fillingIds: string[];
  coatingIds: string[];
};

export const CAKE_COLORS = [
  { id: "cream", label: "שמנת", hex: "#F6F0E6" },
  { id: "blush", label: "ורוד עדין", hex: "#E4B4B2" },
  { id: "peach", label: "אפרסק", hex: "#F1C5A4" },
  { id: "sky", label: "תכלת", hex: "#BCD3E5" },
  { id: "sage", label: "ירוק מרווה", hex: "#B6C4A3" },
  { id: "lilac", label: "לילך", hex: "#C9B9DA" },
  { id: "gold", label: "זהב", hex: "#C5A15C" },
  { id: "black", label: "שחור", hex: "#2B2421" },
] as const;

export const EXCLUSIONS = [
  { id: "no-nuts", label: "ללא אגוזים" },
  { id: "no-dairy", label: "ללא חלב / פרווה" },
  { id: "no-gluten", label: "ללא גלוטן" },
  { id: "no-eggs", label: "ללא ביצים" },
  { id: "no-colors", label: "בלי צבעי מאכל" },
  { id: "no-alcohol", label: "ללא אלכוהול" },
] as const;

export const THEMES = [
  { id: "kids", label: "יום הולדת לילדים" },
  { id: "adult", label: "יום הולדת למבוגרים" },
  { id: "bat-mitzvah", label: "בת מצווה" },
  { id: "bar-mitzvah", label: "בר מצווה" },
  { id: "princess", label: "נסיכות ומלכות" },
  { id: "football", label: "כדורגל" },
  { id: "unicorn", label: "יוניקורן" },
  { id: "animals", label: "חיות וספארי" },
  { id: "vintage", label: "וינטג׳" },
  { id: "gold", label: "זהב ואלגנטי" },
  { id: "flowers", label: "פרחים" },
  { id: "minimal", label: "מינימליסטי" },
  { id: "wedding", label: "חתונה ואירוסין" },
  { id: "baby", label: "לידה וברית" },
  { id: "hybrid", label: "גן × מעוצבת · עוגה אחת" },
] as const;

export const ADDONS = [
  { id: "piping", label: "זילוף Lambeth / Shell" },
  { id: "flowers", label: "פרחים" },
  { id: "goldLeaf", label: "עלי זהב" },
  { id: "macarons", label: "מקרונים" },
  { id: "fruit", label: "תותים ופירות" },
  { id: "topper", label: "טופר" },
  { id: "sugarFigure", label: "דמות מבצק סוכר" },
  { id: "ediblePrint", label: "דף סוכר מודפס" },
  { id: "candles", label: "נרות ונצנצים" },
] as const;

export const BASES: CakeOption[] = [
  { id: "vanilla", label: "וניל", note: "ספוג וניל רך", hex: "#EFD9A8", group: "classic", contains: ["eggs", "gluten"] },
  { id: "vanilla-bean", label: "וניל בורבון", note: "עם גרגירי וניל", hex: "#F2DFB4", group: "classic", contains: ["eggs", "gluten"] },
  { id: "chocolate", label: "שוקולד", note: "ספוג שוקולד עשיר", hex: "#5C3B2C", group: "chocolate", contains: ["eggs", "gluten"] },
  { id: "red-velvet", label: "רד וולווט", note: "קטיפתי ואדום", hex: "#9A2E36", group: "classic", contains: ["eggs", "gluten", "dairy"] },
  { id: "lemon", label: "לימון", note: "רענן ובהיר", hex: "#F0DC86", group: "fruity", contains: ["eggs", "gluten"] },
  { id: "strawberry", label: "תות", note: "ספוג תותים", hex: "#F2B8B5", group: "fruity", contains: ["eggs", "gluten"] },
  { id: "lotus", label: "לוטוס", note: "עם ביסקוויט לוטוס", hex: "#C48A57", group: "sweets", contains: ["eggs", "gluten", "dairy"] },
  { id: "coffee", label: "קפה", note: "עם אספרסו", hex: "#8B6447", group: "special", contains: ["eggs", "gluten"] },
  { id: "matcha", label: "מאצ׳ה", note: "תה ירוק", hex: "#A7B97A", group: "special", contains: ["eggs", "gluten"] },
  { id: "sable-vanilla", label: "בצק פריך וניל", note: "לעוגות מספרים", hex: "#E4C28C", group: "classic", contains: ["dairy", "gluten", "eggs"] },
  { id: "sable-chocolate", label: "בצק פריך שוקולד", note: "לעוגות מספרים", hex: "#6B4533", group: "chocolate", contains: ["dairy", "gluten", "eggs"] },
  { id: "sable-lotus", label: "בצק פריך לוטוס", note: "לעוגות מספרים", hex: "#C48A57", group: "sweets", contains: ["dairy", "gluten", "eggs"] },
  { id: "pistachio", label: "פיסטוק", note: "אגוזי ופרימיום", hex: "#B5BF86", group: "nutty", contains: ["eggs", "gluten", "nuts"] },
];

export const CREAMS: CakeOption[] = [
  { id: "buttercream", label: "קרם חמאה", note: "מבריק ומחזיק צורה", hex: "#F6E6C2", group: "classic", contains: ["dairy"], parve: true },
  { id: "mascarpone", label: "מסקרפונה", note: "עשיר ויציב בקיץ", hex: "#F7EDD6", group: "classic", contains: ["dairy"] },
  { id: "cream-cheese", label: "קרם גבינה", note: "קלאסי לעיצוב", hex: "#FBF5EA", group: "classic", contains: ["dairy"] },
  { id: "whipped", label: "קצפת", note: "קלילה ואוורירית", hex: "#FCF7EE", group: "classic", contains: ["dairy"], parve: true },
  { id: "diplomat", label: "דיפלומט", note: "קרם פטיסייר + קצפת", hex: "#F4E2B8", group: "classic", contains: ["dairy", "eggs"] },
  { id: "ganache", label: "גנאש שוקולד", note: "כהה ואלגנטי", hex: "#6A4331", group: "chocolate", contains: ["dairy"], parve: true },
  { id: "white-chocolate", label: "שוקולד לבן", note: "מתוק ועדין", hex: "#F3E7CF", group: "chocolate", contains: ["dairy"] },
  { id: "salted-caramel", label: "קרמל מלוח", note: "עמוק וממכר", hex: "#C68A4C", group: "sweets", contains: ["dairy"] },
  { id: "pistachio", label: "פיסטוק", note: "ירוק ואגוזי", hex: "#B5BF86", group: "nutty", contains: ["dairy", "nuts"] },
  { id: "lotus", label: "לוטוס", note: "ביסקוויט לוטוס", hex: "#C48A57", group: "sweets", contains: ["dairy", "gluten"] },
  { id: "berries", label: "פירות יער", note: "חמוץ־מתוק", hex: "#B45872", group: "fruity", contains: ["dairy"] },
  { id: "rose", label: "ורדים", note: "פרחוני עדין", hex: "#F1C6CC", group: "special", contains: ["dairy"] },
];

export const FILLINGS: CakeOption[] = [
  { id: "patissiere", label: "פטיסייר וניל", hex: "#F3DE9E", group: "classic", contains: ["dairy", "eggs"] },
  { id: "fresh-strawberries", label: "תותים טריים", hex: "#E0505E", group: "fruity" },
  { id: "berry-compote", label: "קומפוט פירות יער", hex: "#7E2F4F", group: "fruity" },
  { id: "lemon-curd", label: "לימון קרד", hex: "#F2D65C", group: "fruity", contains: ["dairy", "eggs"] },
  { id: "ganache-fill", label: "גנאש מריר", hex: "#3F2519", group: "chocolate", contains: ["dairy"] },
  { id: "lotus-spread", label: "ממרח לוטוס", hex: "#B97A45", group: "sweets", contains: ["gluten"] },
  { id: "nutella-filling", label: "נוטלה", hex: "#6B4027", group: "nutty", contains: ["dairy", "nuts"] },
  { id: "dubai", label: "קראנץ׳ דובאי", hex: "#8FA055", group: "nutty", contains: ["dairy", "nuts", "gluten"] },
  { id: "salted-caramel-sauce", label: "רוטב קרמל מלוח", hex: "#B87533", group: "sweets", contains: ["dairy"] },
  { id: "oreo-crumbs", label: "פירורי אוראו", hex: "#2D2420", group: "sweets", contains: ["gluten"] },
];

export const COATINGS: CakeOption[] = [
  { id: "buttercream", label: "קרם חמאה", note: "חלק ומבריק", contains: ["dairy"], parve: true },
  { id: "mascarpone", label: "מסקרפונה", note: "עשיר ויציב", contains: ["dairy"] },
  { id: "whipped", label: "קצפת", note: "קלילה", contains: ["dairy"], parve: true },
  { id: "ganache", label: "גנאש שוקולד", note: "כהה ואלגנטי", contains: ["dairy"], parve: true },
  { id: "fondant", label: "בצק סוכר", note: "משטח חלק לדמויות" },
];

const ALL_BASE = BASES.map((b) => b.id);
const SPONGE = ALL_BASE.filter((id) => !id.startsWith("sable-"));
const SABLE = ALL_BASE.filter((id) => id.startsWith("sable-") || id === "vanilla" || id === "chocolate");
const ALL_CREAM = CREAMS.map((c) => c.id);
const ALL_FILL = FILLINGS.map((f) => f.id);
const ALL_COAT = COATINGS.map((c) => c.id);

export const CATEGORIES: CakeCategory[] = [
  {
    id: "number",
    title: "עוגות מספרים",
    blurb: "ספרה או אות בשתי קומות, עם קרם ועיטורים",
    image: "/cakes/misparim/number-22-chocolate.jpg",
    figure: true,
    sizes: [
      { id: "regular", label: "גודל רגיל", detail: "כ־30 ס״מ לכל ספרה", servings: [12, 15], priceFromIls: 380, perFigure: true },
      { id: "large", label: "גודל גדול", detail: "כ־40 ס״מ לכל ספרה", servings: [20, 25], priceFromIls: 480, perFigure: true },
    ],
    baseIds: SABLE,
    creamIds: ALL_CREAM,
    fillingIds: ALL_FILL.filter((id) => id !== "coffee-soak"),
    coatingIds: ["buttercream", "mascarpone", "whipped", "ganache"],
  },
  {
    id: "designer",
    title: "עוגות מעוצבות",
    blurb: "עוגה גבוהה בעיצוב אישי, לכל אירוע",
    image: "/cakes/meutzavot/gold-crown-king.jpg",
    sizes: [
      { id: "d16", label: "קוטר 16 ס״מ", servings: [8, 10], priceFromIls: 420 },
      { id: "d20", label: "קוטר 20 ס״מ", servings: [14, 18], priceFromIls: 480 },
      { id: "d24", label: "קוטר 24 ס״מ", servings: [22, 28], priceFromIls: 560 },
      { id: "tiers", label: "שתי קומות", detail: "16 ו־24 ס״מ", servings: [35, 45], priceFromIls: 780 },
    ],
    baseIds: SPONGE,
    creamIds: ALL_CREAM,
    fillingIds: ALL_FILL,
    coatingIds: ALL_COAT,
  },
  {
    id: "birthday",
    title: "עוגות יום הולדת מעוצבות",
    blurb: "השם, הגיל והעיצוב שבחרתם",
    image: "/cakes/meutzavot/tamar-18.jpg",
    sizes: [
      { id: "d18", label: "קוטר 18 ס״מ", servings: [10, 12], priceFromIls: 450 },
      { id: "d22", label: "קוטר 22 ס״מ", servings: [16, 20], priceFromIls: 520 },
      { id: "d26", label: "קוטר 26 ס״מ", servings: [25, 30], priceFromIls: 620 },
    ],
    baseIds: SPONGE,
    creamIds: ALL_CREAM,
    fillingIds: ALL_FILL,
    coatingIds: ALL_COAT,
  },
  {
    id: "kindergarten",
    title: "עוגות גן",
    blurb: "מגש חתוך למנות אישיות, לחגיגה בגן",
    image: "/cakes/gan/photo-libby-8.jpg",
    sizes: [
      { id: "tray-s", label: "מגש 20×30 ס״מ", servings: [20, 24], priceFromIls: 280 },
      { id: "tray-l", label: "מגש 30×40 ס״מ", servings: [35, 40], priceFromIls: 380 },
      { id: "cupcakes", label: "30 קאפקייקס", detail: "לכל ילד אחד", servings: [30, 30], priceFromIls: 320 },
    ],
    baseIds: SPONGE,
    creamIds: ALL_CREAM,
    fillingIds: ALL_FILL,
    coatingIds: ["buttercream", "whipped", "ganache", "fondant"],
  },
  {
    id: "hybrid",
    title: "עוגה אחת משולבת · גן × מעוצבת",
    blurb: "בסיס גן מחובר לאלמנט קוטור — יצירה אחת, מחיר אחד",
    image: "/cakes/gan/mickey-yagel-1.jpg",
    sizes: [
      { id: "hybrid-std", label: "מגש + קוטור עליון", detail: "עוגה אחת מחוברת", servings: [25, 35], priceFromIls: 300 },
      { id: "hybrid-luxe", label: "פרימיום משולבת", detail: "יותר נפח קוטור וזהב", servings: [35, 45], priceFromIls: 420 },
    ],
    baseIds: SPONGE,
    creamIds: ALL_CREAM,
    fillingIds: ALL_FILL,
    coatingIds: ALL_COAT,
  },
];

export const WIZARD_STEPS = [
  { id: 1, key: "type", title: "סוג העוגה", heading: "איזו עוגה נכין לכם?", sub: "בחרו סוג — ואנחנו מתאימים גדלים, טעמים ועיצוב." },
  { id: 2, key: "size", title: "גודל ובסיס", heading: "גודל, בסיס ומנות", sub: "בוחרים גודל ומתיקות הבסיס. המחיר מתעדכן בזמן אמת." },
  { id: 3, key: "design", title: "קרם ועיצוב", heading: "קרם, מילוי ועיצוב", sub: "צבעים, ערכת נושא, תוספות — הכול על אותה עוגה." },
  { id: 4, key: "notes", title: "הסרות ובקשות", heading: "מה להוסיף / להוריד / לשנות?", sub: "אלרגיות, הסרות, כיתוב ותאריך — הכל בסיכום אחד." },
  { id: 5, key: "summary", title: "סיכום", heading: "סיכום העוגה שלכם", sub: "לפני האפייה תראו ותאשרו בדיוק מה ייצא — ואז שולחים בוואטסאפ." },
] as const;

export function byId<T extends { id: string }>(list: T[], id: string | null | undefined) {
  if (!id) return undefined;
  return list.find((x) => x.id === id);
}

export function categoryOf(id: CakeKindId | null) {
  return CATEGORIES.find((c) => c.id === id);
}
