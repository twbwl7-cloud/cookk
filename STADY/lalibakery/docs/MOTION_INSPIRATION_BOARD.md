# Universal Motion Engine — Stages 1–3 (locked from PROJECT_BRIEF)

User overnight approval: proceed from brief without re-asking niche/vibe/tier.

## Stage 1 — Context (from brief)
- **Niche:** Haute pâtisserie / bespoke luxury cakes (Israel, Hebrew RTL)
- **Vibe:** Noir Atelier — deep matte black, baby pink, metallic gold; warm boutique Hebrew
- **Tier:** **3** (R3F + Lenis + magnetic gold cursor)

## Stage 2 — Inspiration board & signature mechanics

### Reference sites (mechanics, not clones)
1. **Pierre Hermé / luxury patisserie product pages** — restraint, one hero object, sparse copy. Luxury = silence around the cake.
2. **Apple product scroll pages** — pin + scrub zoom into detail; LCP poster before heavy media.
3. **Stripe / Linear marketing** — magnetic CTAs, expo easing, no decorative noise competing with the action.

### 3 Signature mechanics (approved by overnight blanket OK)
1. **Cake Scrub Zoom (Hero)** — already live: Lenis↔ScrollTrigger pin, Z-zoom into gold crown; poster LCP first.
2. **Magnetic Gold Field** — cursor lerp + `MagneticButton` / `MagneticLink` underline physics on envelope CTAs.
3. **Builder Material Lerp** — tier/flavor changes via mesh color/scale expo (not CSS filter spam); price tick without layout thrash.

### Psychological rationale
Customer fears “ordering blind.” Seeing the cake assemble in 3D + price live removes loss aversion better than any slogan. Magnetic chrome signals atelier craft without carnival motion.

## Stage 3 — Motion blueprint (tokens)
| Token | Value |
|-------|--------|
| Entrance | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Spring press | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Cursor lerp | `0.18` |
| Mobile | cursor off · touch rotate on · R3F DPR clamp 1–1.5 |
| Reduced motion | Lenis/cursor/scrub off · final state instant |

Stack: Framer Motion + GSAP ScrollTrigger + R3F + Lenis (already in repo).
