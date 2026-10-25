import type { Metadata } from "next";
import { Suspense } from "react";
import { CustomCakeWizard } from "@/components/custom-cake/CustomCakeWizard";

export const metadata: Metadata = {
  title: "הזמנת עוגה בהתאמה אישית · צעד אחר צעד",
  description:
    "בונים את העוגה צעד אחר צעד: סוג, גודל, טעמים, קרם, עיצוב ובקשות הסרה. הסיכום נשלח בוואטסאפ.",
};

export default function CustomCakePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Suspense
        fallback={
          <div className="py-20 text-center font-display text-2xl text-ink/50">
            טוענים את האשף…
          </div>
        }
      >
        <CustomCakeWizard />
      </Suspense>
    </div>
  );
}
