"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CakeCustomization, CartLine } from "@/types/commerce";

function newLineId() {
  return `ln_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  couponDraft: string;
  lastViewedSlugs: string[];
  lastSearch: string;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setCouponDraft: (code: string) => void;
  addItem: (
    productId: string,
    variantId: string,
    quantity?: number,
    customization?: CakeCustomization,
  ) => void;
  removeLine: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  rememberViewed: (slug: string) => void;
  setLastSearch: (q: string) => void;
  totalUnits: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      couponDraft: "",
      lastViewedSlugs: [],
      lastSearch: "",
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      setCouponDraft: (code) => set({ couponDraft: code }),
      addItem: (productId, variantId, quantity = 1, customization) => {
        set((state) => {
          // Only merge identical plain lines (no customization)
          if (!customization) {
            const existing = state.lines.find(
              (l) =>
                l.productId === productId &&
                l.variantId === variantId &&
                !l.customization,
            );
            if (existing) {
              return {
                lines: state.lines.map((l) =>
                  l.lineId === existing.lineId
                    ? { ...l, quantity: Math.min(20, l.quantity + quantity) }
                    : l,
                ),
                isOpen: true,
              };
            }
          }
          return {
            lines: [
              ...state.lines,
              {
                lineId: newLineId(),
                productId,
                variantId,
                quantity,
                customization,
              },
            ],
            isOpen: true,
          };
        });
      },
      removeLine: (lineId) =>
        set((state) => ({
          lines: state.lines.filter((l) => l.lineId !== lineId),
        })),
      setQuantity: (lineId, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => l.lineId !== lineId)
              : state.lines.map((l) =>
                  l.lineId === lineId
                    ? { ...l, quantity: Math.min(20, quantity) }
                    : l,
                ),
        })),
      clearCart: () => set({ lines: [] }),
      rememberViewed: (slug) =>
        set((state) => ({
          lastViewedSlugs: [
            slug,
            ...state.lastViewedSlugs.filter((s) => s !== slug),
          ].slice(0, 8),
        })),
      setLastSearch: (q) => set({ lastSearch: q }),
      totalUnits: () => get().lines.reduce((n, l) => n + l.quantity, 0),
    }),
    {
      name: "lalibakery-cart-v2",
      partialize: (state) => ({
        lines: state.lines,
        couponDraft: state.couponDraft,
        lastViewedSlugs: state.lastViewedSlugs,
        lastSearch: state.lastSearch,
      }),
    },
  ),
);
