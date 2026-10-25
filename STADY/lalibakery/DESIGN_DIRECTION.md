# LALIBAKERY — Module A-2 · Art Direction & Copy Deck

> **2026-10-23 LOCK:** Blush Atelier live — baby-pink canvas, charcoal type, gold CTAs.  
> Categories: מספרים · מעוצבות · יום הולדת. Builder: cream + piping + sugar sheet.  
> Constraint: palette locked to Baby Pink / Charcoal / Metallic Gold only.

---

# LALIBAKERY — Module A-2 · Art Direction & Copy Deck (archive notes)

> Status: Direction A flipped from Noir panels to Blush canvas (user request).  
> Architecture approved: 2026-10-20.

---

## Stage 1 — Three design directions

All directions obey the brand triad. Differentiation is **composition, contrast ratio, and signature mechanic** — not new hues.

### Direction A — «סטודיו פריז בלילה» (Noir Atelier) ★ Recommended

| Field | Spec |
|-------|------|
| Feeling | Fashion-house night window: deep matte black structure, pink as blush light, gold as jewelry edge |
| Inspiration 1 | [P448](https://www.awwwards.com/sites/p448-1) — dark luxury commerce, horizontal product scroll, decisive nav |
| Inspiration 2 | [Mah Ze Dahr Bakery](https://www.awwwards.com/sites/mah-ze-dahr-bakery) — black/gold pastry desire, big imagery |
| Inspiration 3 | [Dominique Ansel Bakery LA](https://www.awwwards.com/sites/dominique-ansel-bakery-la) — bakery as craft spectacle, not coupon site |
| Palette | BG `#0D0D0D` · surface `#121212` · blush wash `#F2C4CE` @ 12–18% · text `#F2C4CE` · CTA gold `#D4AF37`→`#C5A059` |
| Fonts | Display: **Frank Ruhl Libre** · UI: **Heebo** (Hebrew-ready, already in stack) |
| Signature Moment | Hero: 3-tier cake floats on black void; gold dust cursor; first scroll **pins** and zooms into gold leaf before revealing category gate |

**Why this wins for IL market:** Instant “not a Wix bakery” signal; WhatsApp CTA still loud in gold; photos of real cakes pop on black; matches Haute visual + warm copy contrast.

---

### Direction B — «בוטיק ורוד שמפניה» (Blush Maison)

| Field | Spec |
|-------|------|
| Feeling | Soft Paris salon: pink canvas, black type, gold line accents — romantic but sharp |
| Inspiration 1 | L'Mamounia luxury pastry boutique (RTL editorial pastry jewelry) |
| Inspiration 2 | Mah Ze Dahr — desire framing, large hero food |
| Inspiration 3 | P448 mobile collection discipline (less clutter, one action) |
| Palette | BG `#F2C4CE` · ink `#0D0D0D` · gold borders/CTAs · charcoal cards `#121212` for contrast blocks |
| Fonts | Display: **Frank Ruhl Libre** · UI: **Heebo** |
| Signature Moment | Category gate as three full-bleed towers; hover reveals black glass strip with lead time + allergy tags |

**Risk:** Closer to current soft-pink build; needs ruthless hero budget to avoid “cute bakery template.”

---

### Direction C — «קוטור מונוכרום + עלה זהב» (Couture Monochrome)

| Field | Spec |
|-------|------|
| Feeling | Extreme editorial: 80% black/pink duotone photography treatment, gold only on interactive affordances |
| Inspiration 1 | P448 — view switcher / product as object |
| Inspiration 2 | Dominique Ansel — craft focus |
| Inspiration 3 | Mah Ze Dahr — gold accent economy |
| Palette | Same triad; gold reserved **only** for CTA, cursor, active border, price |
| Fonts | Display: **Frank Ruhl Libre** @ tracking `-0.03em` · UI: **Heebo** Medium/Bold |
| Signature Moment | Horizontal bestsellers pin: cakes slide on X while sticky Hebrew line reads «5 עוגות מורכבות ביום — לא יותר» |

**Risk:** Can feel cold if microcopy isn’t warm enough; Builder must break the austerity with pink plaque preview.

---

### Art Director pick

**Ship Direction A — Noir Atelier**, with Blush Maison accents only in legal/soft pages and empty states (never accidental fourth colors).

---

## Stage 2 — Design tokens & Anti-AI Hero laws

### CSS variables (locked)

```css
--pink-baby: #F2C4CE;
--black-deep: #0D0D0D;
--black-matte: #121212;
--gold-luxury: #D4AF37;
--gold-antique: #C5A059;
--radius-lg: 1.25rem;
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--tracking-display: -0.02em;
--shadow-contact:
  0 1px 0 rgb(242 196 206 / 0.12) inset,
  0 2px 4px rgb(0 0 0 / 0.35),
  0 18px 40px -16px rgb(0 0 0 / 0.65),
  0 0 0 1px rgb(212 175 55 / 0.22);
```

### Visual physics

- Glass panels: `backdrop-filter: blur(18px) saturate(1.15)` on `#121212` @ 55–70%  
- Forbidden: single-layer `box-shadow: 0 4px 6px black`  
- Gold CTA: multi-stop gradient + sheen via `transform` only  
- Type: `clamp(2.25rem, 6vw, 3.75rem)` for H1 · letter-spacing `-0.02em`

### Bullshit Filter (banned)

❌ «המסע מתחיל כאן» · «חדשנות» · «חוויה בלתי נשכחת» · «העוגה המושלמת שלכם» (vague)  
✅ Concrete outcome + number + channel

### Hero budget (375px first)

Only: brand mark · one H1 · one support line · one CTA group · one dominant cake visual.  
No stats strip, no schedule, no address block in viewport 1.

---

## Stage 3 — Copy Deck (Hebrew, fact-based)

Claims below map to locked research / catalog / pricing — not invented scarcity.

### Global

| Key | Copy |
|-----|------|
| Brand lockup | LALIBAKERY · אפייה מהלב |
| Phone | 050-8739090 |
| Sticky CTA | הרכיבו עוגה אישית ב-3D |
| WA float aria | וואטסאפ להזמנה |
| 3D badge | הדמיית תלת־ממד אינטראקטיבית |
| VAT note | המחירים כוללים מע״מ |

### Home / Hero

| Key | Copy |
|-----|------|
| H1 | עוגה ב־3 קומות — אתן בונות, המחיר מתעדכן בלייב |
| Support | איסוף נתניה · משלוח שרון והמרכז · הזמנה מ־3 ימי עסקים · וואטסאפ <bdi>050-8739090</bdi> |
| CTA primary | להרכבת עוגה ב-3D |
| CTA secondary | לקטלוג העוגות |
| Proof line | צילומי סטודיו אמיתיים · בלי מלאי מזויף · עד 5 עוגות מורכבות ביום |

### Category gate H2

| Key | Copy |
|-----|------|
| H2 | איזו עוגה סוגרת לכן את האירוע? |
| Support | שלוש דלתות ברורות — בלי גלילה אינסופית של אותה עוגה בתחפושת |

### Builder

| Key | Copy |
|-----|------|
| Title | בונות את העוגה — רואות אותה בלייב |
| Step1 | קומות · 1 כלול ב־₪250 · 2 ‎+₪180 · 3 ‎+₪350 |
| Step2 | טעם בסיס · Velvet Rose / שוקולד בלגי ‎+₪30 / וניל זהב ‎+₪40 |
| Step3 | קישוט יוקרה · פרחי סוכר · עלי זהב · כתר מקרון · טופר שם |
| Step4 | פלאק זהב · עד 25 תווים בעברית או אנגלית |
| Price live | סה״כ לעוגה: <bdi>₪X</bdi> |
| CTA | לשריון תאריך ותשלום |
| Empty decor | אפשר בלי קישוט נוסף — הבסיס כבר נקי ויוקרתי |

### Shop / facets

| Key | Copy |
|-----|------|
| H1 | קטלוג העוגות |
| Filter | קטגוריה · טווח מחיר |
| Stock truth | ההזמנה נשמרת לפי סלוט יומי — לא «נותרו 2 במלאי» פיקטיבי |
| Lead | מינימום 3 ימי עסקים להכנה |

### Cart / Checkout

| Key | Copy |
|-----|------|
| Guest | תשלום כאורחת — בלי חשבון |
| Slot required | בחרו תאריך ושעת איסוף/משלוח לפני תשלום |
| Shipping | איסוף נתניה חינם · משלוח שרון/מרכז ₪50 · חינם מעל ₪400 |
| Coupon | קוד השקה LALI10 — 10% (מבצע אמיתי) |
| Pay | אשראי מאובטח · או המשך בקישור וואטסאפ |
| Success | ההזמנה נקלטה · מספר אסמכתא <bdi>LB-…</bdi> |

### Trust / legal micro

| Key | Copy |
|-----|------|
| Cancel | עוגה בהזמנה אישית — אחרי תחילת הכנה אין ביטול לפי חוק הגנת הצרכן |
| Allergy | ציינו רגישויות כאן — המטבח אינו נטול אלרגנים מלא |
| Reviews intro | המלצות מלקוחות אמיתיות — לא ביקורות מומצאות |
| Accessibility | הצהרת נגישות ת״י 5568 |

### WhatsApp bakery payload (labels)

```
הזמנה חדשה מ-LALIBAKERY!
שם הלקוח/ה: …
טלפון: …
תאריך ושעת איסוף/משלוח: …
מפרט עוגה: …
סה"כ לתשלום: ₪…
```

---

## Competitive-psych note (documented, non-comparative ads)

Israeli bakery sites often: weak mobile CTA, stock photos, no live price for custom, login walls.  
Our counters (facts we can ship): real photos · sticky gold CTA + WA · live Builder price · guest checkout · slot honesty (max 5/day).

---

## Approval gate

Reply **«מאשר עיצוב A»** (or pick B/C / edits).  
Next: **Module A-3 — Motion tokens & per-page motion map**.
