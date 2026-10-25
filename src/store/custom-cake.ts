"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CakeKindId } from "@/data/custom-cake";

export type CustomCakeState = {
  step: number;
  category: CakeKindId | null;
  figure: string;
  sizeId: string | null;
  baseId: string | null;
  creamId: string | null;
  fillingId: string | null;
  coatingId: string | null;
  colors: string[];
  themeId: string | null;
  addons: string[];
  exclusions: string[];
  allergy: boolean;
  message: string;
  notes: string;
  date: string;
  setStep: (n: number) => void;
  setCategory: (id: CakeKindId) => void;
  patch: (p: Partial<Omit<CustomCakeState, "setStep" | "setCategory" | "patch" | "reset" | "canContinue">>) => void;
  reset: () => void;
  canContinue: () => boolean;
};

const empty = {
  step: 1,
  category: null as CakeKindId | null,
  figure: "",
  sizeId: null as string | null,
  baseId: null as string | null,
  creamId: null as string | null,
  fillingId: null as string | null,
  coatingId: null as string | null,
  colors: [] as string[],
  themeId: null as string | null,
  addons: [] as string[],
  exclusions: [] as string[],
  allergy: false,
  message: "",
  notes: "",
  date: "",
};

export const useCustomCakeStore = create<CustomCakeState>()(
  persist(
    (set, get) => ({
      ...empty,
      setStep: (n) => set({ step: Math.min(5, Math.max(1, n)) }),
      setCategory: (id) =>
        set({
          category: id,
          sizeId: null,
          baseId: null,
          creamId: null,
          fillingId: null,
          coatingId: null,
          figure: id === "number" ? get().figure : "",
          themeId: id === "hybrid" ? "hybrid" : get().themeId === "hybrid" ? null : get().themeId,
        }),
      patch: (p) => set(p),
      reset: () => set({ ...empty }),
      canContinue: () => {
        const s = get();
        if (s.step === 1) {
          if (!s.category) return false;
          if (s.category === "number" && !s.figure.trim()) return false;
          return true;
        }
        if (s.step === 2) return Boolean(s.sizeId && s.baseId);
        if (s.step === 3) return Boolean(s.creamId && s.coatingId);
        return true;
      },
    }),
    { name: "lalibakery-custom-cake-v1" },
  ),
);
