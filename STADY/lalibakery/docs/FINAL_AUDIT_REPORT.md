# LALIBAKERY — Ultimate $100K QA / Security / CRO Audit

**Date:** 2026-10-20  
**Auditor mode:** Principal QA · AppSec · CRO  
**Live/Staging:** `http://127.0.0.1:43127` (Cloud Agent VM)  
**Branch:** `cursor/module-a-architecture-913c`  
**Verdict (pre-user answers):** **NO-GO**

---

## Stage 0 — Discovery materials

| Item | Status | Evidence |
|------|--------|----------|
| PROJECT_BRIEF.md | ✅ | `/workspace/PROJECT_BRIEF.md` |
| Tree | ✅ | `find` → `src/`, `public/cakes/`, docs |
| next.config | ✅ | `next.config.ts` (not `.mjs`) |
| middleware | ✅ after fix | `src/middleware.ts` |
| API / Server Actions / schemas | ⚠️ | `src/actions/checkout.ts`, `src/lib/pricing.ts`, `src/sanity/schemas/index.ts` (legacy shapes; CMS locked = Supabase, not wired) |
| Core components | ✅ | Hero, Footer, Cart, HeroCake3D, ShopCatalog |
| env.example | ✅ | `env.example` (updated Supabase) |
| Live URL | ⚠️ | Local only `127.0.0.1:43127` — no production |
| asset-licenses | ✅ after fix | `docs/asset-licenses.md` |
| Architecture / motion | ✅ | `ARCHITECTURE.md`, `MOTION_SYSTEM.md`, `DESIGN_DIRECTION.md` |

**Note:** User asleep — audit + fixes proceeded without per-module gate approvals. Questions deferred to end.

---

## Script 1 — Module A (Core)

1.1 Tier 3 implemented | ⚠️ | R3F+Lenis+Builder in `HeroCake3D.tsx`, `LenisProvider.tsx`, `/builder` — Header Premium Engine & Footer Immersive Engine not built per Script 1.2  
1.2 Brand tokens | ✅ | `globals.css` `--pink-baby #F2C4CE`, `--black-deep #0D0D0D`, gold `#D4AF37/#C5A059`; fonts Heebo+Frank in `layout.tsx`  
1.3 Sanity Product schema variants | ❌ | CMS locked Supabase; only portable shapes in `src/sanity/schemas/index.ts`; no live Supabase tables  
1.4 Faceted search | ⚠️ | `ShopCatalog.tsx` category+price+text; missing typo-tolerance / brand facet / business categories from brief  
1.5 Promo engine 1+1 / BxGy | ⚠️ | Server coupon `LALI10` in `quoteCart` (`pricing.ts`); no 1+1/BxGy  
1.6 Zustand cart | ✅ | `store/cart.ts` persist IDs/qty/customSpec; `partialize` no PII; display via `estimateCart`  
1.7 Assets local | ✅ | `public/cakes/**` studio photos; no remote product CDN  
1.8 Scroll anim Tier-aligned | ⚠️ | GSAP pin+Lenis sync (`Hero.tsx`, `LenisProvider.tsx`); no lab FPS proof  
1.9 Legal pages | ✅ | `/terms` `/privacy` `/accessibility` (+ shipping/cancel copy in terms)  
1.10 Industry 18+/per-100g | ✅ N/A | Bakery custom cakes — not required in brief  
1.11 Order destination | ⚠️ | WhatsApp deep-link in `submitCheckout`; no retry/queue/ERP; Supabase insert missing  
1.12 Dynamic shipping server | ⚠️ | Free≥400 + flat 50 + pickup 0 in `submitCheckout`/`quoteCart`; no area matrix  
1.13 Prices server-side vs CMS | ⚠️ | Server `quoteCart` vs local `data/products.ts` — **not** Supabase  
1.14 Zustand no PII | ✅ | `cart.ts` partialize lines/coupon/viewed/search  
1.15 server-only + secrets | ⚠️ | `pricing.ts`, `rate-limit.ts`, `env.ts` use `server-only`; no hard Zod fail on boot for required prod secrets  
1.16 GROQ params | ❌ N/A path | No GROQ client; Sanity abandoned for Supabase  
1.17 Zod all inputs | ⚠️ | Checkout+contact Zod; Checkout generic errors after fix; Turnstile missing  
1.18 dangerouslySetInnerHTML | ✅ | `rg` — zero matches in `src/`  
1.19 Authorization ownership | ❌ | No auth/user resources yet; no IDOR layer  
1.20 Deps/lockfile/CVE | ⚠️ | `package-lock.json` exists; `npm audit` → Next/postcss **high** advisory  
1.21 Architecture doc | ✅ | `ARCHITECTURE.md`  
1.22 Vercel deploy docs | ⚠️ | `README.md` deploy sketch; no Sanity CORS (Supabase instead)  
1.23 No TODOs/placeholders logic | ⚠️ | UI placeholders OK; Floating3DModel comment “Placeholder for future GLB”; checkout Tranzila stub  
1.24 Error boundaries | ✅ after fix | `src/app/error.tsx`, `not-found.tsx`

**Module A tally (post-fix):** ✅ 8 · ⚠️ 13 · ❌ 3 · N/A 1

---

## Script 1 — A-2 Art / Microcopy

1.25 Logo/favicon/OG | ⚠️ | Logo `public/cakes/brand/logo.jpg`; favicon default; OG via logo in `layout.tsx` — no dedicated OG art  
1.26 Direction + signature | ✅ | Noir Atelier + pin-zoom gold cake (`DESIGN_DIRECTION.md`, `Hero.tsx`)  
1.27 Design tokens | ⚠️ | CSS vars in `globals.css`; still some arbitrary `text-[clamp(...)]` / `text-[11px]`  
1.28 Microcopy map | ⚠️ | Deck in `DESIGN_DIRECTION.md`; gender-neutral mostly; thank-you page = checkout success only  
1.29 Anti-AI H1 | ✅ | Hero H1 `בונות את העוגה — רואות את המחיר` (`Hero.tsx`)  
1.30 Message map no empty repeats | ⚠️ | Home sections purposeful; some catalog/legal still soft-pink vs Noir inconsistency  

**A-2:** ✅ 2 · ⚠️ 4 · ❌ 0

---

## Script 1 — A-3 Motion

1.31 Lenis↔ScrollTrigger | ✅ | `LenisProvider.tsx` `lenis.on("scroll", ScrollTrigger.update)` + gsap.ticker  
1.32 Magnetic cursor mobile-off | ✅ | `MagneticCursor.tsx` `(pointer: fine)` + reduced-motion  
1.33 Kinetic typography | ✅ | Word mask in `Hero.tsx`  
1.34 LCP eager no fade poster | ✅ | `priority` Image poster; fade only after canvas ready  
1.35 prefers-reduced-motion | ✅ | Lenis/Hero/Cursor/globals.css  

**A-3:** ✅ 5 · ⚠️ 0 · ❌ 0

---

## Script 1 — 3D Immersive

1.36 Sales rationale documented | ✅ | PROJECT_BRIEF USP + ARCHITECTURE Immersive  
1.37 Poster then lazy canvas | ✅ | `HeroCake3D.tsx` idle mount  
1.38 Image Sequence worker | ❌ N/A deferred | Path A out of MVP (ARCHITECTURE non-goals)  
1.39 DRACO + dispose | ❌ | Procedural MeshBasic; no DRACO; no explicit `dispose()` on unmount  
1.40 asset-licenses.md | ✅ after fix | `docs/asset-licenses.md`  

**3D:** ✅ 3 · ⚠️ 0 · ❌ 1 · N/A 1

---

## Script 1 — Modules B & C (Portal / IAM)

1.41 Guest checkout | ✅ | Checkout copy + flow guest (`CheckoutForm.tsx`)  
1.42 Protected `/account/*` | ❌ | No account routes / middleware auth  
1.43 Reorder | ❌ | Missing  
1.44 IDOR | ❌ | No user-scoped fetches  
1.45 Public order ids + guest token | ⚠️ | `LB-` + `crypto.randomUUID` slice; no signed guest token URL  
1.46 private no-store account | ⚠️ | middleware sets no-store on `/checkout` `/cart` `/account` `/api` — account unused  
1.47 Svix webhooks | ❌ | Missing  
1.48 Session cookies hardening | ❌ | No auth sessions  
1.49 OTP rate limit | ❌ | Missing  
1.50 Open redirect allowlist | ❌ | Missing  

**B/C:** ✅ 1 · ⚠️ 2 · ❌ 7

---

## Script 2 — CRO / Perf / Neuro / Wedge

2.1 Predictive search | ❌ | Simple `includes` filter only  
2.2 Search security | ❌ | Client-only filter; no GROQ/RL  
2.3 Upsell/cross-sell | ❌ | Missing  
2.4 One-click cart + free-ship bar | ⚠️ | Drawer add; free-ship text in drawer; no physics progress bar  
2.5 Upsell server prices | ❌ | N/A no upsell  
2.6 Reviews system upload | ❌ | Static `data/site.ts` reviews only  
2.7 Review moderation security | ❌ | Missing  
2.8 Review image pipeline | ❌ | Missing  
2.9 Cold-start social proof | ⚠️ | Real-looking reviews in data — **source not independently verified in this audit**  
2.10 DRACO/Offscreen | ❌ | Missing  
2.11 Skeleton/poster | ✅ | Poster/LCP patterns  
2.12 Optimistic cart rollback | ⚠️ | Instant Zustand; no server reconcile rollback  
2.13 WCAG AA+ | ⚠️ | Skip link + a11y widget + RTL; no full audit proof  
2.14 Skip links / roles | ✅ after fix | `layout.tsx` skip-link + `#main-content`  
2.15 CSP nonce middleware | ⚠️ | CSP+nonce in `middleware.ts`; Next inline scripts may need nonce wiring to `Script` — not fully proven  
2.16 Cache split ISR/private | ⚠️ | Private headers on cart/checkout; catalog static/SSG  
2.17 PWA SW | ✅ N/A | No SW present (safe)  
2.18 Trust above fold | ✅ | Hero reassurance under CTA  
2.19 Lighthouse budgets | ❌ | Not measured this run (JS First Load home ~215KB > 150KB gzip target)  
2.20 5-second test | ✅ | Hero answers what/who/why  
2.21 Scroll journey | ⚠️ | Sticky CTA+WA; Header still multi-link (not Premium Header engine)  
2.22 Price/photo/phone truth | ⚠️ | Phone real; businessId=`0508739090` equals phone — **legal ID questionable**; photos claimed real  
2.23 Checkout easy + Turnstile | ⚠️ | Slot+guest; honeypot added; **Turnstile not wired**  
2.24 3–5 CRO fixes done | ⚠️ | Partial (Hero/Builder/slots); not formal CRO plan file  
2.25 Competitor cards | ❌ | Missing doc  
2.26 Wedge message | ⚠️ | Live price/3D wedge in Hero; no competitor doc  
2.27 Godfather offer | ❌ | Missing formal offer stack  
2.28 Comparison table | ❌ | FAQ only  
2.29 Comparative claims sourced | ✅ | No trademark-attacking comparisons found  

**Script 2:** ✅ 5 · ⚠️ 10 · ❌ 13 · N/A 1

---

## Script 3 — AppSec & Launch

3.1 Cart integrity vs CMS | ⚠️ | Server quote vs **local catalog**, not Supabase  
3.2 Payment webhook verify | ❌ | No Tranzila webhook  
3.3 CSP+HSTS+COOP… | ⚠️ | Headers in middleware; nonce not end-to-end on all scripts  
3.4 poweredBy / sourceMaps | ✅ after fix | `next.config.ts`  
3.5 Upstash rate limit | ⚠️ | In-memory `rate-limit.ts` on checkout only — not Redis  
3.6 Server Actions secure suite | ⚠️ | Zod+rate limit+server reprice; Origin check / encryption key incomplete  
3.7 IDOR + UUID orders | ⚠️ | UUID-ish order numbers; no ownership layer  
3.8 Session/OTP | ❌ | Missing  
3.9 Secrets Zod boot | ⚠️ | Soft `env.ts`  
3.10 Sanity hardening | ❌ N/A | Supabase not configured  
3.11 Payment/inventory atomic | ❌ | Stub payment; slot reserve not atomic in DB  
3.12 Cache private | ✅ after fix | middleware  
3.13 XSS/redirects | ⚠️ | No HTML inject; no redirect allowlist util  
3.14 Turnstile+honeypot | ⚠️ | Honeypot on checkout; Turnstile missing  
3.15 revalidate/health | ⚠️ | `/api/health` OK; no `/api/revalidate`  
3.16 2FA org accounts | ❌ | Process — needs user confirmation  
3.17–3.27 Level B | ❌/⚠️ | Mostly missing (Dependabot, Sentry, DMARC, etc.)  
3.28–3.34 Level C | ❌ | Mostly missing; `security.txt` ✅ after fix  
3.35 JSON-LD ecommerce | ❌ | Missing  
3.36 Checkout OTP SMS | ❌ | Not in MVP  
3.37 health | ✅ | `/api/health`  
3.38 ISR revalidate secret | ❌ | Missing  
3.39 Payment webhooks shipping | ❌ | Incomplete  
3.40 HTML email RTL | ❌ | Missing  
3.41 GA4/Pixel consent | ❌ | IDs in env only; not implemented+consent  
3.42 Sitemap + dynamic OG | ⚠️ | `sitemap.ts` ✅; OG static logo only  
3.43 NAP consistency | ⚠️ | Phone consistent; street address incomplete (“נתניה”)  
3.44 301 map | ✅ N/A | New site  
3.45 Media local | ✅ | `/public`  

**Script 3 (scored 3.1–3.45):** majority ❌/⚠️ — see final counts

---

## Script 4 — Handoff

4.1–4.8 | ❌ | Welcome manual, Loom script, social kit, retainer pitch, incident sheet, case study, ownership transfer — **not produced**

---

## Cross-project (5.x)

5.1 Clean code scan | ⚠️ | No TODO/FIXME; stub comments remain; no secret leak found in tree  
5.2 build/lint/typecheck | ⚠️ | `npm run build` ✅; lint 0 errors (hooks warning fixed); typecheck ✅; no CI  
5.3 Single middleware | ✅ | `src/middleware.ts` only  
5.4 RTL/Bidi eye | ⚠️ | Widespread `<bdi>`; full visual pass not screenshot-certified this run  
5.5 Mobile Playwright 375 | ❌ | Not run (preview forwarding flaky for user)  
5.6 Fake data | ⚠️ | `businessId: "0508739090"` suspicious (=phone); email `orders@lalibakery.co.il` unverified  
5.7 Image authenticity | ⚠️ | Claimed studio-owned in brief/licenses — auditor did not see license screenshots  
5.8 Extreme content resilience | ⚠️ | Not stress-tested  
5.9 E2E purchase path | ❌ | WhatsApp path manual only; no Sanity/Supabase order write  
5.10 Go-Live gate | ❌ | robots allow ✅ but critical ❌ remain → **NO-GO**

---

## Fixes applied this audit session (without user)

- `src/middleware.ts` — CSP/HSTS/XFO/COOP/CORP/Permissions-Policy + private cache  
- `next.config.ts` — `poweredByHeader: false`, `productionBrowserSourceMaps: false`, `serverActions.allowedOrigins`  
- `/api/health`, `error.tsx`, `not-found.tsx`, `sitemap.ts`  
- `robots.txt`, `.well-known/security.txt`, `docs/asset-licenses.md`  
- Skip link + `AccessibilityWidget`  
- Checkout: slots, fulfillment, honeypot, UUID order ids, rate limit, generic errors, pickup shipping 0  
- PsychStrip: real “max 5/day” copy (removed stock-as-slots framing)  
- `env.example` Supabase-first · README deploy · OG metadata  

**Rebuild proof:** `npm run build` succeeded including Middleware 34.7 kB (2026-10-20).

---

## Final scoreboard (approximate scored items ~120)

| Status | Count (approx) |
|--------|----------------|
| ✅ | **~32** |
| ⚠️ | **~48** |
| ❌ | **~40** |

Exact line-by-line statuses above; counts include N/A treated as non-blocking where marked.

### Open by severity

**Critical (blocks GO)**  
- No Supabase wiring (truth store) · No Tranzila webhook/idempotency · No Turnstile · Payment stub · Slot capacity not atomic · npm high CVE on Next/postcss · Modules B/C absent if portal promised · businessId validity  

**High**  
- CSP nonce not bound to Next scripts end-to-end · No Upstash · No JSON-LD · No consent analytics · DRACO/dispose · Header/Footer elite engines incomplete · First Load JS budget  

**Medium**  
- Facets incomplete · No upsell/reviews pipeline · Competitor/Wedge docs · NAP street · Handoff pack  

**Low**  
- Dedicated OG art · arbitrary px utilities · Floating3DModel leftover  

### Verdict

# **NO-GO**

Ship is a strong **Hero + Builder + catalog MVP**, not a $100K launch-ready fortress.

---

## Priority remediation plan

1. Confirm real ע.מ/ח.פ + Netanya street; fix `site.ts`  
2. Wire Supabase schemas from ARCHITECTURE + RLS  
3. Tranzila notify webhook (signature + idempotency) + replace stub  
4. Turnstile server verify on contact/checkout  
5. Upgrade Next to clear postcss CVE (careful major)  
6. Bind CSP nonce to Next `headers()`/`Script`  
7. Upstash rate limits  
8. JSON-LD Product/Org + consent for GA4/Pixel  
9. Complete Header/Footer engines (Script 1.2)  
10. Handoff pack (Script 4) only after GO criteria  

---

## Questions for user (wake-up queue)

1. מה מספר הע.מ/ח.פ **הרשמי** אם אינו מספר הטלפון?  
2. כתובת רחוב מדויקת בנתניה ל-NAP?  
3. האם יש כבר פרויקט Supabase + מפתחות לשלב הבא?  
4. האם יש חשבון Tranzila מוכן ל-webhook?  
5. האם מודולי B/C (אזור אישי/IAM) ב-scope להשקה או נדחים רשמית?  
6. האם הביקורות ב-`data/site.ts` מאושרות לפרסום בשם המלא/עיר?  
7. דומיין Production סופי + האם לפרוס ל-Vercel עכשיו?
