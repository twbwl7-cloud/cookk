"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AccentSet,
  CakeCustomSpec,
  FrostTone,
  HybridLayerStyle,
  PipingStyle,
} from "@/types/cake-builder";

const defaultBase = (): HybridLayerStyle => ({
  category: "gan",
  frost: "sky",
  piping: "shell",
  accents: "figures",
  label: "עוגת גן",
});

const defaultSecondary = (): HybridLayerStyle => ({
  category: "meutzavot",
  frost: "ivory",
  piping: "lambeth",
  accents: "goldLeaf",
  label: "קוטור עליון",
});

type BuilderState = {
  hybridMode: boolean;
  baseStyle: HybridLayerStyle;
  secondaryStyle: HybridLayerStyle;
  fusionRatio: number;
  plaqueText: string;
  numbersText: string;
  sugarSheet: boolean;
  sugarNote: string;
  notes: string;
  setHybridMode: (v: boolean) => void;
  setFusionRatio: (v: number) => void;
  patchBase: (p: Partial<HybridLayerStyle>) => void;
  patchSecondary: (p: Partial<HybridLayerStyle>) => void;
  setPlaqueText: (v: string) => void;
  setNumbersText: (v: string) => void;
  setSugarSheet: (v: boolean) => void;
  setSugarNote: (v: string) => void;
  setNotes: (v: string) => void;
  toSpec: () => CakeCustomSpec;
};

export const useCakeBuilderStore = create<BuilderState>()(
  persist(
    (set, get) => ({
      hybridMode: true,
      baseStyle: defaultBase(),
      secondaryStyle: defaultSecondary(),
      fusionRatio: 0.55,
      plaqueText: "",
      numbersText: "",
      sugarSheet: false,
      sugarNote: "",
      notes: "",
      setHybridMode: (v) => set({ hybridMode: v }),
      setFusionRatio: (v) => set({ fusionRatio: Math.min(1, Math.max(0, v)) }),
      patchBase: (p) => set((s) => ({ baseStyle: { ...s.baseStyle, ...p } })),
      patchSecondary: (p) =>
        set((s) => ({ secondaryStyle: { ...s.secondaryStyle, ...p } })),
      setPlaqueText: (v) => set({ plaqueText: v.slice(0, 25) }),
      setNumbersText: (v) => set({ numbersText: v.slice(0, 12) }),
      setSugarSheet: (v) => set({ sugarSheet: v }),
      setSugarNote: (v) => set({ sugarNote: v.slice(0, 200) }),
      setNotes: (v) => set({ notes: v.slice(0, 800) }),
      toSpec: () => {
        const s = get();
        return {
          kind: s.hybridMode ? "hybrid" : "single",
          hybridMode: s.hybridMode,
          baseStyle: s.baseStyle,
          secondaryStyle: s.secondaryStyle,
          fusionRatio: s.fusionRatio,
          plaqueText: s.plaqueText,
          numbersText: s.numbersText,
          sugarSheet: s.sugarSheet,
          sugarNote: s.sugarNote,
          notes: s.notes,
        };
      },
    }),
    { name: "lalibakery-cake-builder-v1" },
  ),
);

export type { FrostTone, PipingStyle, AccentSet };
