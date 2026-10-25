# LALIBAKERY — Architecture Summary (Module A · Stage 2)

> Status: **Awaiting stakeholder approval** before Art Direction (A-2), Motion (A-3), Immersive pipeline docs, then core code.
> Stack decision (locked): Next.js App Router · TypeScript · Tailwind · Zustand · R3F/Drei · GSAP · Lenis · **Supabase only** (no Sanity).

---

## 1. Brand & Tier (Group 1 — locked)

| Item | Value |
|------|--------|
| Brand | LALIBAKERY · אפייה מהלב |
| Legal id (as provided) | `0508739090` |
| Tone | Visual: Haute Pâtisserie · Copy: warm “אפייה מהלב” |
| Palette (strict) | Baby Pink `#F2C4CE` · Deep Black `#0D0D0D` / `#121212` · Gold `#D4AF37` / `#C5A059` |
| Locale | Hebrew RTL · `<bdi>` / `dir="ltr"` for numbers & Latin |
| Service | Pickup Netanya · Delivery Sharon/Center |
| Tier | **Tier 3** — R3F + Lenis + gold cursor + live Cake Builder |
| CMS | **Supabase only** (products + orders + slots) |
| Logo | `public/cakes/brand/logo.jpg` (final) |

---

## 2. Supabase schema (portable)

### 2.1 `products`

| Column | Type | Notes |
|--------|------|--------|
| id | uuid PK | |
| slug | text unique | |
| title | text | |
| short_description | text | |
| description | text | |
| category | text | `meutzavot` \| `misparim` \| `yom_huledet` \| `business` \| `custom_patisserie` (MVP facets) |
| tags | text[] | |
| image_path | text | real studio photos under `/public/cakes/**` |
| image_credit | text | always `real` for catalog |
| featured | boolean | |
| shape | text | `round` \| `sheet` \| `number` \| `shaped` |
| base_price_ils | numeric | display floor; variants own prices |
| active | boolean | |
| lead_days_min | int | default `3` |
| created_at / updated_at | timestamptz | |

### 2.2 `product_variants`

| Column | Type | Notes |
|--------|------|--------|
| id | uuid PK | |
| product_id | uuid FK → products | |
| label | text | size / servings |
| sku | text unique | |
| price_ils | numeric | **server truth** |
| compare_at_ils | numeric nullable | only if promo row exists |
| flavor_options | jsonb | allowed base flavors |
| max_inscription_chars | int | default 40 for catalog |
| active | boolean | |

> Catalog “stock” is **not** a numeric warehouse count. Capacity is enforced via `daily_slots`.

### 2.3 `promotions`

| Column | Type | Notes |
|--------|------|--------|
| id | uuid PK | |
| code | text unique | e.g. `LALI10` |
| percent_off | numeric | 10 |
| active | boolean | |
| starts_at / ends_at | timestamptz nullable | |
| applies_to | text | `subtotal` |

Rules: no fake countdown; `compare_at` only when linked to an active promo.

### 2.4 `daily_slots`

| Column | Type | Notes |
|--------|------|--------|
| id | uuid PK | |
| slot_date | date unique | |
| max_complex_orders | int | default **5** |
| reserved_count | int | incremented server-side only |
| pickup_windows | jsonb | e.g. `["09:00-12:00","12:00-15:00","15:00-18:00"]` |
| closed | boolean | |

Hours policy (MVP): Sun–Thu 09:00–18:00 · Fri until ~2h before Shabbat.

### 2.5 `orders`

| Column | Type | Notes |
|--------|------|--------|
| id | uuid PK | |
| order_number | text unique | e.g. `LB-…` |
| status | text | `received` → `in_baking` → `decorating` → `ready_for_pickup` |
| customer_name | text | PII — server only |
| phone | text | |
| email | text | |
| fulfillment | text | `pickup` \| `delivery` |
| slot_date | date | |
| slot_window | text | |
| address_city | text | |
| address_line | text | |
| notes | text | |
| allergy_flags | text[] | `gluten_free` \| `vegan` \| `sugar_free` |
| coupon_code | text nullable | |
| subtotal_ils | numeric | **server-quoted** |
| discount_ils | numeric | |
| shipping_ils | numeric | |
| total_ils | numeric | VAT-inclusive prices |
| payment_method | text | `tranzila` \| `whatsapp` |
| payment_status | text | `pending` \| `paid` \| `failed` |
| tranzila_ref | text nullable | |
| idempotency_key | text unique | |
| whatsapp_notified_at | timestamptz nullable | |
| user_id | uuid nullable | null in MVP (guest) |
| created_at | timestamptz | |

RLS: service role for writes from Server Actions; no public insert of totals from client.

### 2.6 `order_lines`

| Column | Type | Notes |
|--------|------|--------|
| id | uuid PK | |
| order_id | uuid FK | |
| line_type | text | `catalog` \| `custom_cake` |
| product_id | uuid nullable | catalog |
| variant_id | uuid nullable | |
| title_snapshot | text | |
| quantity | int | |
| unit_price_ils | numeric | from server quote |
| line_total_ils | numeric | |
| inscription | text nullable | catalog personalization |
| flavor | text nullable | |
| custom_spec | jsonb nullable | full Builder JSON when `custom_cake` |

### 2.7 `custom_spec` JSON (Cake Builder)

```json
{
  "tiers": 1 | 2 | 3,
  "flavor": "velvet_rose" | "belgian_chocolate" | "vanilla_gold",
  "decors": ["sugar_flowers" | "gold_leaf" | "macaron_crown" | "name_topper"],
  "plaqueText": "string≤25",
  "allergies": ["gluten_free" | "vegan" | "sugar_free"],
  "notes": "string"
}
```

### 2.8 Pricing matrix (Builder — locked)

| Lever | Option | ILS |
|-------|--------|-----|
| Base | 1 tier | **250** |
| Tiers | 2 / 3 | +180 / +350 |
| Flavor | Velvet Rose / Belgian chocolate / Vanilla gold | 0 / +30 / +40 |
| Decor | Sugar flowers / Gold leaf / Macaron crown / Name topper | +50 / +80 / +70 / +45 |
| Plaque | ≤25 chars HE+EN | included with topper rules as priced |

Shipping MVP: pickup **0** · delivery Sharon/Center **50** · free when `(subtotal - discount) ≥ 400`.

Coupon MVP: `LALI10` = 10% on subtotal (not shipping).

---

## 3. Cart architecture

```
Client (Zustand, persisted)
  lines: { lineType, productId?, variantId?, quantity, customSpec?, inscription?, flavor? }[]
  couponDraft, lastViewedSlugs, lastSearch
  NO prices as source of truth, NO PII

Display estimate
  estimateCart() — client mirror for UX only

Checkout Server Action
  1. Zod validate payload
  2. Turnstile/hCaptcha verify
  3. quoteCart() against Supabase (prices, promo, shipping)
  4. validate slot_date ≥ today+3 business days; reserved_count < max
  5. create order + lines (pending)
  6. Tranzila stub OR return WhatsApp deep-link path
  7. On paid webhook (signed + idempotent): status paid, reserve slot++, WhatsApp notify bakery
  8. Success page with order_number
```

Guest checkout default. Account creation deferred to Module B.

---

## 4. Immersive pipeline (Group 3 — locked)

| Surface | Path | Notes |
|---------|------|--------|
| Hero | **C1** | R3F 3-tier cake GLB/procedural + static poster LCP |
| Cake Builder | **Path C** | Live model, baked lightmaps / MeshBasic, no heavy dynamic lights |
| Gallery shaders | Deferred | Stage B — documented skip for MVP weight |
| Sequence (Path A) | Out of MVP | No 150–300 frame sequences |
| Budget | GLB ≤ 2MB DRACO; local files; Canvas lazy after idle |
| Mobile <768 | Lower poly, disable heavy trails, DPR 1–1.5 |
| Label | “הדמיית תלת־ממד אינטראקטיבית” until final photoreal GLB |
| USP | Live 3D assemble + live ₪ — no surprises |

MVP interactions: pointer/touch rotate · GSAP scroll zoom · gold cursor trail · horizontal bestsellers gallery.

---

## 5. Security map

| Control | Implementation |
|---------|----------------|
| Server-side truth | `quoteCart` / slot reserve in Server Actions vs Supabase |
| Client hygiene | Zustand: ids, qty, builder spec only — no PII |
| Secrets | `import "server-only"`; env never exposed to client |
| Validation | Zod on checkout, contact, webhooks |
| Captcha | Turnstile/hCaptcha on contact + checkout |
| Payments | Tranzila stub + WhatsApp fallback; signed webhooks; idempotency_key |
| Auth MVP | None (guest); Clerk/NextAuth in Modules B/C |
| Rate limit | Checkout + contact |
| CSP allowlist | self · Supabase · Tranzila · wa.me / api.whatsapp.com · GA4 · Meta · Clarity · `worker-src 'self' blob:` |
| Cache private areas | `Cache-Control: private, no-store` when portal arrives (B) |
| Media privacy | No children’s faces / identifying kids in catalog |

---

## 6. Notifications & integrations

**On paid / confirmed order**

1. Insert/update `orders` in Supabase  
2. WhatsApp to `972508739090` with PRD payload (name, phone, slot, cake spec, total)  
3. Customer: in-site Success page + reference number  

**Invoice:** Green Invoice / iCount before full production go-live; MVP = structured order record.  
**Analytics:** GA4 · Meta Pixel · Clarity (heatmaps / Builder funnels).  
**KPIs:** Hero→Builder · Builder complete · Checkout started · Purchase · WhatsApp clicks.

---

## 7. Business logic matrix (future unit tests)

1. `quoteCatalogLine` uses only Supabase `product_variants.price_ils` × qty.  
2. `quoteCustomCake` equals base 250 + tier add-ons + flavor + sum(decors).  
3. Unknown flavor/decor codes → reject.  
4. Plaque text > 25 chars → reject.  
5. Coupon `LALI10` applies exactly 10% to subtotal, never to shipping.  
6. Unknown coupon with non-empty code → error (no silent ignore).  
7. Pickup → `shipping_ils = 0`.  
8. Delivery → `shipping_ils = 50` unless after-discount ≥ 400 → 0.  
9. Slot date earlier than +3 business days → reject.  
10. `reserved_count >= max_complex_orders` → reject.  
11. Successful reserve increments `reserved_count` exactly once per `idempotency_key`.  
12. Duplicate payment webhook with same key does not double-charge or double-notify.  
13. `compare_at` rendered only when promo active in DB.  
14. Cart persist restores lines without trusting client prices.  
15. WhatsApp message includes tiers, flavor, decors, plaque, slot, total.  
16. 3D preview shows interactive-simulation label until final GLB.  
17. Reduced-motion disables Lenis smoothing, heavy particles, and non-essential 3D motion.

---

## 8. Explicit non-goals (MVP) — with rationale

| Feature | Why deferred |
|---------|----------------|
| Sanity CMS | Locked Option B — Supabase only |
| GROQ queries | N/A — Supabase SQL/RPC instead (`supabase/schema.sql`) |
| 1+1 / Buy-X-Get-Y | Not in commerce lock; coupon `LALI10` only |
| Image Sequence Hero | Path A not chosen; weight + no Blender sequence assets |
| Page-transition shaders | Stage B focus on Builder conversion |
| Bit / Apple Pay | Stage B payment expansion |
| Full bakery admin UI | Status fields in DB first; Module B dashboard |
| Clerk / NextAuth | Guest-first; Modules B/C |
| Auto tax invoice API | Wire before full launch; MVP order record |
| Exact street on marketing pages | Collected on order form |

---

## 9. Deploy sketch (Vercel) — post-code

Env (see `env.example` after implementation):  
`NEXT_PUBLIC_SUPABASE_URL` · `NEXT_PUBLIC_SUPABASE_ANON_KEY` · `SUPABASE_SERVICE_ROLE_KEY` · `TRANZILA_*` · `TURNSTILE_*` · `NEXT_PUBLIC_GA4_ID` · `NEXT_PUBLIC_CLARITY_ID` · `NEXT_PUBLIC_META_PIXEL_ID` · `NEXT_PUBLIC_SITE_URL` · `WHATSAPP_BUSINESS_E164=972508739090`

CORS: allow only site origin for browser calls; webhooks verify signatures, not open CORS.

Local mock: app must run without payment keys (WhatsApp + stub quote).

---

## 10. Approval gate

**Approve this document to unlock:** Module A-2 (Art Direction + Copy Deck) → A-3 (Motion map) → Immersive tech plan → Module A Stage 3 core code.

Reply: **«מאשר ארכיטקטורה»** or list change requests.
