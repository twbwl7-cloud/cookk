import { NextResponse } from "next/server";

/** Public liveness probe — returns OK only, no version/secrets. */
export async function GET() {
  return new NextResponse("OK", {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
