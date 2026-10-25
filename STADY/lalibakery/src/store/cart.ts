"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "@/types/commerce";

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
    customSpec?: CartLine["customSpec"],
  ) => void;
  addCustomCake: (spec: NonNullable<CartLine["customSpec"]>) => void;
  removeItem: (productId: string, variantId: string) => void;
  setQuantity: (productId: string, variantId: string, quantity: number) => void;
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
      addItem: (productId, variantId, quantity = 1, customSpec) => {
        set((state) => {
          const existing = state.lines.find(
            (l) =>
              l.productId === productId &&
              l.variantId === variantId &&
              l.lineType !== "custom_cake",
          );
          if (existing && !customSpec) {
            return {
              lines: state.lines.map((l) =>
                l.productId === productId && l.variantId === variantId
                  ? { ...l, quantity: Math.min(20, l.quantity + quantity) }
                  : l,
              ),
              isOpen: true,
            };
          }
          return {
            lines: [
              ...state.lines,
              {
                lineType: customSpec ? "custom_cake" : "catalog",
                productId,
                variantId,
                quantity,
                customSpec,
              },
            ],
            isOpen: true,
          };
        });
      },
      addCustomCake: (spec) => {
        const variantId = `custom-${spec.tiers}-${spec.flavor}-${Date.now().toString(36)}`;
        set((state) => ({
          lines: [
            ...state.lines,
            {
              lineType: "custom_cake",
              productId: "custom_cake",
              variantId,
              quantity: 1,
              customSpec: spec,
            },
          ],
          isOpen: true,
        }));
      },
      removeItem: (productId, variantId) =>
        set((state) => ({
          lines: state.lines.filter(
            (l) => !(l.productId === productId && l.variantId === variantId),
          ),
        })),
      setQuantity: (productId, variantId, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter(
                  (l) =>
                    !(l.productId === productId && l.variantId === variantId),
                )
              : state.lines.map((l) =>
                  l.productId === productId && l.variantId === variantId
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
      name: "luxe-glam-cart-v1",
      partialize: (state) => ({
        lines: state.lines,
        couponDraft: state.couponDraft,
        lastViewedSlugs: state.lastViewedSlugs,
        lastSearch: state.lastSearch,
      }),
    },
  ),
);
