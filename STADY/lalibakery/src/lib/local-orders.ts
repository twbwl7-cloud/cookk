import type { CartLine } from "@/types/commerce";

export const LOCAL_ORDERS_KEY = "lb-local-orders-v1";

export type LocalOrder = {
  orderNumber: string;
  totalIls: number;
  createdAt: string;
  lines: CartLine[];
};

export function readLocalOrders(): LocalOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_ORDERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as LocalOrder[];
    return Array.isArray(parsed) ? parsed.slice(0, 20) : [];
  } catch {
    return [];
  }
}

export function pushLocalOrder(order: LocalOrder) {
  if (typeof window === "undefined") return;
  const prev = readLocalOrders().filter(
    (o) => o.orderNumber !== order.orderNumber,
  );
  localStorage.setItem(
    LOCAL_ORDERS_KEY,
    JSON.stringify([order, ...prev].slice(0, 20)),
  );
}
