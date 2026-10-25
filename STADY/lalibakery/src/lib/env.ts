import "server-only";
import { z } from "zod";

/**
 * Soft env gate — missing optional keys do not crash local/mock mode.
 * Required keys fail loudly in production when CHECKOUT_STRICT=1.
 */
const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_ANON_KEY: z.string().min(20).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20).optional(),
  TRANZILA_SUPPLIER: z.string().optional(),
  TRANZILA_PASSWORD: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),
  CHECKOUT_STRICT: z.enum(["0", "1"]).optional(),
});

export type AppEnv = z.infer<typeof schema>;

let cached: AppEnv | null = null;

export function getEnv(): AppEnv {
  if (cached) return cached;
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    console.error("[env] invalid environment", parsed.error.flatten());
    cached = {};
    return cached;
  }
  cached = parsed.data;
  if (
    parsed.data.CHECKOUT_STRICT === "1" &&
    (!parsed.data.SUPABASE_URL || !parsed.data.SUPABASE_SERVICE_ROLE_KEY)
  ) {
    throw new Error("CHECKOUT_STRICT=1 requires Supabase server credentials.");
  }
  return cached;
}
