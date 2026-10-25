"use client";

import { create } from "zustand";
import {
  PLAQUE_MAX,
  quoteCustomCake,
  type CakeDecor,
  type CakeFlavor,
  type CreamTone,
  type PipingStyle,
} from "@/lib/cake-pricing";

export type { CakeDecor, CakeFlavor, CreamTone, PipingStyle };
export type AllergyFlag = "gluten_free" | "vegan" | "sugar_free";
export { PLAQUE_MAX, quoteCustomCake, BASE_CAKE_ILS } from "@/lib/cake-pricing";

export type CakeBuilderState = {
  tiers: 1 | 2 | 3;
  flavor: CakeFlavor;
  creamTone: CreamTone;
  piping: PipingStyle;
  decors: CakeDecor[];
  plaqueText: string;
  allergies: AllergyFlag[];
  notes: string;
  setTiers: (t: 1 | 2 | 3) => void;
  setFlavor: (f: CakeFlavor) => void;
  setCreamTone: (c: CreamTone) => void;
  setPiping: (p: PipingStyle) => void;
  toggleDecor: (d: CakeDecor) => void;
  setPlaqueText: (t: string) => void;
  toggleAllergy: (a: AllergyFlag) => void;
  setNotes: (n: string) => void;
  priceIls: () => number;
  toCustomSpec: () => {
    tiers: 1 | 2 | 3;
    flavor: CakeFlavor;
    creamTone: CreamTone;
    piping: PipingStyle;
    decors: CakeDecor[];
    plaqueText: string;
    allergies: AllergyFlag[];
    notes: string;
  };
};

export const useCakeBuilderStore = create<CakeBuilderState>((set, get) => ({
  tiers: 2,
  flavor: "velvet_rose",
  creamTone: "baby_blush",
  piping: "classic_ruffles",
  decors: ["sugar_flowers"],
  plaqueText: "",
  allergies: [],
  notes: "",
  setTiers: (tiers) => set({ tiers }),
  setFlavor: (flavor) => set({ flavor }),
  setCreamTone: (creamTone) => set({ creamTone }),
  setPiping: (piping) => set({ piping }),
  toggleDecor: (d) =>
    set((s) => ({
      decors: s.decors.includes(d)
        ? s.decors.filter((x) => x !== d)
        : [...s.decors, d],
    })),
  setPlaqueText: (plaqueText) =>
    set({ plaqueText: plaqueText.slice(0, PLAQUE_MAX) }),
  toggleAllergy: (a) =>
    set((s) => ({
      allergies: s.allergies.includes(a)
        ? s.allergies.filter((x) => x !== a)
        : [...s.allergies, a],
    })),
  setNotes: (notes) => set({ notes: notes.slice(0, 500) }),
  priceIls: () => {
    const s = get();
    return quoteCustomCake({
      tiers: s.tiers,
      flavor: s.flavor,
      creamTone: s.creamTone,
      piping: s.piping,
      decors: s.decors,
    });
  },
  toCustomSpec: () => {
    const s = get();
    return {
      tiers: s.tiers,
      flavor: s.flavor,
      creamTone: s.creamTone,
      piping: s.piping,
      decors: s.decors,
      plaqueText: s.plaqueText,
      allergies: s.allergies,
      notes: s.notes,
    };
  },
}));
