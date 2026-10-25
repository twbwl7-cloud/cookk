import "server-only";
import { timingSafeEqual } from "crypto";

/** Constant-time string compare for secrets / webhook signatures. */
export function safeEqualString(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) {
    // Still compare against self to keep timing flatter on length mismatch.
    timingSafeEqual(left, left);
    return false;
  }
  return timingSafeEqual(left, right);
}
