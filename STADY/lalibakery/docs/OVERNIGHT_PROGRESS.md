# Overnight progress — Script continuum

Worked while you sleep. Approvals treated as granted for locked brief items. Questions deferred to morning (see `docs/MORNING_QUESTIONS.md`).

## Done

### Script 1.2 — Envelope
- **Header Engine (Stage 3):** Smart scroll (top / hide / frosted), 4 links + single gold CTA → `/builder`, full-screen mobile overlay + stagger + focus trap + Lenis stop.
- **Footer Engine (Stages 1–4 from brief):** Mini-hero CTA, desktop grid, mobile accordions, magnetic underline links, GSAP scrub reveal, NAP/legal trust block.

### Universal Motion
- `MagneticLink`, `MagneticButton`, `TextRevealMask` (line masks, expo easing, reduced-motion safe).
- Cart drawer: AnimatePresence slide + Lenis stop + Escape.

### Script 2
- Module A: PredictiveSearch MVP; cart one-click upsell + free-shipping bar; empty-cart copy purged.
- Module B plan: `docs/SCRIPT2_MODULE_B_PERF.md` + Hero `aria-live`.
- Module C: `docs/SCRIPT2_MODULE_C_NEURO.md`.
- Module D: `WhyUs` home wedge + `docs/COMPETITOR_WEDGE.md`.

### Script 3 Module A (partial)
- `lib/request-guard.ts` — exact Origin↔Host + rate limit shared by checkout/contact.
- `actions/contact.ts` — Zod, honeypot, CRLF strip, WhatsApp handoff.
- security.txt, env gate, Tranzila webhook stub (prior).

### Script 6
- Phase 1: `docs/SCRIPT6_PHASE1_HERO_GUILLOTINE.md`
- Phase 2: `docs/SCRIPT6_PHASE2_ANTI_AI_PURGE.md`

### Script 1 Module B (stub)
- `/account` local reorder via `localStorage` until Auth/Supabase.

## Still open (needs you / secrets)
- Live Supabase + Tranzila keys
- Modules B/C (portal + IAM) beyond stub
- Instagram / social URLs for footer
- Algolia vs keep internal search
- Yotpo/Loox vs internal reviews
- Full Script 3 interview answers
- Script 4 handoff package (needs live URL + retainer numbers)
