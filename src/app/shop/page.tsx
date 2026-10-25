import type { Metadata } from "next";
import { ShopCatalog } from "@/components/shop/ShopCatalog";

export const metadata: Metadata = {
  title: "חנות",
  description: "קולקציית פרימיום, מארזי יוקרה ושירותי VIP.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ highlight?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="min-h-[70svh] bg-gradient-to-b from-[#fffaf8] via-[#fff5f7] to-pink-soft/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">כל העוגות</h1>
        <p className="mt-3 max-w-2xl text-sm font-medium text-ink/65">
          עוגות גן · מספרים · מעוצבות. המחירים להמחשה — המחיר הסופי מאושר בוואטסאפ
          לפי גודל ועיצוב.
        </p>
        <div className="mt-10">
          <ShopCatalog highlight={params.highlight} />
        </div>
      </div>
    </div>
  );
}
