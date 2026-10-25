# LALIBAKERY — PROJECT BRIEF

## Status
**Script 5 audit — VERDICT: NO-GO** until live Supabase + Tranzila keys.  
**Script 1.2 Envelope:** Hero + Header + Footer engines shipped.  
**Morning lock (2026-10-23):** all 14 ops answers locked — see § Decisions lock.  
Hardening: middleware CSP/headers, health, security.txt, env gate, slots checkout, a11y, PredictiveSearch MVP.  
Overnight log: `docs/OVERNIGHT_PROGRESS.md` · Locked Qs: `docs/MORNING_QUESTIONS.md`.

## Decisions lock (2026-10-23)
| # | Decision |
|---|----------|
| 1 | Footer social: **Instagram only** (FB/TikTok later). Set `NEXT_PUBLIC_INSTAGRAM_URL`. |
| 2 | Full street NAP: pending final client form · interim copy: איסוף עצמי · נתניה |
| 3 | Search: **internal** (local → Supabase) · no Algolia/Meilisearch in MVP |
| 4 | Upsell: **Cart Drawer only** · no Post-Purchase |
| 5 | Reviews: **internal Supabase** (+ WhatsApp import later) |
| 6 | Payments: **Tranzila Redirect only** · keys when supplier account ready |
| 7 | Webhooks: **Tranzila only** · invoicing (iCount/ירוקה) later |
| 8 | Third-party ready: GA4 · Meta Pixel · Clarity · Turnstile · IDs via env |
| 9 | Ownership: builder holds GitHub/Vercel/Supabase/domain · **2FA mandatory** |
| 10 | **Staging environment: yes** (separate from Production) |
| 11 | Customer portal + Reorder: **Phase B** after live pay |
| 12 | Auth MVP: **Guest Checkout** · magic link only if later required |
| 13 | Domain: **`lalibakery.co.il`** (or final purchased TLD) |
| 14 | **PWA: no** in MVP |

## Hero (locked & live)
- Direction A Noir Atelier · Path C1 3-tier R3F + poster LCP
- H1: בונות את העוגה — רואות את המחיר
- CTA → `/builder` · Sticky: הרכיבו עוגה אישית ב-3D
- GSAP pin zoom · Lenis↔ScrollTrigger sync

## Art direction (locked → Blush Atelier 2026-10-23)
- **Blush Atelier:** baby-pink canvas `#F2C4CE` · charcoal type `#0D0D0D` · gold jewelry CTAs
- Fonts: Frank Ruhl Libre + Heebo · tracking `-0.02em`
- Categories: מספרים · מעוצבות · יום הולדת
- Hero H1: בונות את העוגה — רואות את המחיר
- Builder: live cream tones + piping styles + sugar sheet
- Sticky CTA: הרכיבו עוגה אישית ב-3D

## Brand
- **Name:** LALIBAKERY (אפייה מהלב)
- **Legal id (provided):** `0508739090`
- **Phone / WhatsApp:** 050-8739090 (`972508739090`)
- **Tone:** Haute visual · warm Hebrew microcopy
- **Palette (strict):** `#F2C4CE` · `#0D0D0D`/`#121212` · `#D4AF37`/`#C5A059`
- **Logo:** `public/cakes/brand/logo.jpg` (final)
- **Service:** Pickup Netanya · Delivery Sharon/Center
- **Language:** Hebrew RTL

## Tier & stack
- **Tier 3** — R3F · Lenis · gold cursor · live Cake Builder
- **CMS:** Supabase only (products, variants, orders, daily_slots, promotions)
- Next.js App Router · Tailwind · Zustand · GSAP · Zod · server-only

## Commerce (locked)
- Catalog + Cake Builder; cart line `custom_cake` with JSON spec
- Catalog variants: size/servings · flavor · inscription
- Builder pricing: base ₪250 + tier/flavor/decor matrix (see ARCHITECTURE.md)
- Plaque ≤25 chars HE+EN
- Allergies: gluten_free / vegan / sugar_free + free notes
- Capacity via **daily_slots** (default max 5 complex/day), not numeric SKU stock
- Facets MVP: category + price range
- `LALI10` 10% · free shipping ≥ ₪400 · delivery ₪50 · pickup 0
- `compareAt` only with real DB promo
- Slot + time required before pay · min **3 business days** lead
- Pay MVP: Tranzila (stub until keys) + WhatsApp · Guest checkout
- Prices include VAT

## Immersive (locked)
- Hero C1 GLB/procedural + poster LCP
- Builder Path C baked/basic materials
- Shaders / Image Sequence deferred
- USP: live 3D build + live price
- Label: הדמיית תלת־ממד אינטראקטיבית until final GLB
- Catalog photos: real, owned; no kids’ faces

## Legal / ops
- Accessibility button + TY 5568 baseline
- Custom cancel per consumer law after production start (~48h window rules)
- Full prepay to reserve slot
- Invoice provider before full launch
- Data in Supabase; deletion on request

## Integrations MVP
- WhatsApp notify bakery on order
- Success page for customer
- Order statuses in Supabase
- Turnstile/hCaptcha · GA4 · Meta Pixel · Clarity
- KPIs: Hero→Builder · Builder complete · Checkout started · Purchase · WA clicks

## Source of truth docs
- Full schemas, security map, unit-test matrix → `ARCHITECTURE.md`
