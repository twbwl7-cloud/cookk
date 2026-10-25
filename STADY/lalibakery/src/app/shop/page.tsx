import type { Metadata } from "next";
import { ShopCatalog } from "@/components/shop/ShopCatalog";

export const metadata: Metadata = {
  title: "חנות",
  description: "עוגות מספרים, מעוצבות ויום הולדת — קטלוג LALIBAKERY עם מחיר לפני תשלום.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ highlight?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl sm:text-5xl">כל העוגות</h1>
      <p className="mt-3 max-w-2xl text-ink-muted">
        מספרים · מעוצבות · יום הולדת. המחירים להמחשה — המחיר הסופי מאושר בוואטסאפ
        לפי גודל ועיצוב.
      </p>
      <div className="mt-10">
        <ShopCatalog highlight={params.highlight} />
      </div>
    </div>
  );
}
