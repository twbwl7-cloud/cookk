import { NextResponse, type NextRequest } from "next/server";
import { createHash, createHmac } from "crypto";
import { safeEqualString } from "@/lib/crypto-safe";

/**
 * Tranzila payment webhook stub (Script 3 §2).
 * Rejects until TRANZILA_WEBHOOK_SECRET is set. Verifies HMAC + freshness + idempotency key.
 * Replace body field mapping with Tranzila's real payload once keys arrive.
 */

const seenEvents = new Map<string, number>();

function pruneSeen() {
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  for (const [id, ts] of seenEvents) {
    if (ts < cutoff) seenEvents.delete(id);
  }
}

export async function POST(request: NextRequest) {
  const secret = process.env.TRANZILA_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const raw = await request.text();
  const signature =
    request.headers.get("x-tranzila-signature") ||
    request.headers.get("x-signature") ||
    "";
  const timestamp = request.headers.get("x-tranzila-timestamp") || "";

  if (!signature || !timestamp) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const tsNum = Number(timestamp);
  if (!Number.isFinite(tsNum) || Math.abs(Date.now() - tsNum) > 5 * 60 * 1000) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${raw}`)
    .digest("hex");
  if (!safeEqualString(expected, signature)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let body: { eventId?: string; status?: string; orderNumber?: string };
  try {
    body = JSON.parse(raw) as typeof body;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const eventId =
    body.eventId ||
    createHash("sha256").update(raw).digest("hex").slice(0, 32);

  pruneSeen();
  if (seenEvents.has(eventId)) {
    return NextResponse.json({ ok: true, duplicate: true });
  }
  seenEvents.set(eventId, Date.now());

  // Persist paid status to Supabase when credentials exist — stub logs only.
  if (process.env.NODE_ENV !== "production") {
    console.info("[tranzila-webhook]", body.status, body.orderNumber);
  }

  return NextResponse.json({ ok: true });
}
