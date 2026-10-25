# LALIBAKERY — Module A-3 · Motion Engine

> Status: **Awaiting approval** before Immersive/3D technical plan.  
> Direction locked: **A — Noir Atelier**.  
> Laws: animate only `transform` + `opacity` · 60FPS · LCP never opacity-fades · motion never blocks clicks · reduced-motion = hard off.

---

## Stage 1 — Easing & duration tokens

| Token | Value | Use |
|-------|--------|-----|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrances, drawer, price tick |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Soft overshoot on CTA press / step check |
| `--ease-soft` | `cubic-bezier(0.22, 1, 0.36, 1)` | Horizontal gallery inertia feel |
| `--ease-lens` | Lenis `1.001 - Math.pow(2, -10 * t)` | Smooth scroll (Tier 3 mandatory) |
| `--dur-fast` | `180ms` | Hover, cursor scale |
| `--dur-med` | `420ms` | Reveals, step transitions |
| `--dur-slow` | `900ms` | Hero kinetic title, scroll pin beats |
| `--lerp-cursor` | `0.18` | Gold cursor follow |
| `--lerp-frame` | `0.12` | Any scroll-linked visual damping |

**Banned:** CSS `ease`, `ease-in-out`, `linear` on brand motion (except rAF math).  
**GSAP defaults:** `power4.out` ≈ expo · `back.out(1.4)` sparingly on step icons only.

### Reduced motion

`prefers-reduced-motion: reduce` → destroy Lenis · no cursor · no particles · no scroll zoom · kinetic titles render static · R3F auto-rotate off · Builder still fully usable.

### Mobile (<768 / coarse pointer)

- Magnetic cursor + gold trail: **off**
- Touch drag rotate on cake: **on**
- Gyro: optional, behind permission, low amplitude
- DPR clamp 1–1.5

---

## Stage 2 — Motion map by route

### `/` Home

| Beat | Mechanic | Notes |
|------|----------|--------|
| LCP | Static poster of hero cake | No fade-in on poster |
| Idle+80ms | Lazy mount R3F Canvas | Poster crossfade via opacity on overlay only after paint |
| Idle loop | Slow Y rotation / pointer parallax | `transform` on group; amplitude low |
| Title | Kinetic words from clip mask | Split by words; `y: 110% → 0`; expo |
| Scroll 0–40% | **Pin** hero visual; camera/group Z zoom toward gold detail | ScrollTrigger + Lenis sync; not scroll-jack speed |
| After pin | Unpin → category gate rises `y` | Once |
| Category cards | `Reveal` y+opacity | Stagger 60ms |
| Bestsellers | **Horizontal pin** section | X translate cakes while pinned; sticky line copy |
| Reviews | Soft reveal | No cards bounce |

### `/builder` (Cake Builder)

| Beat | Mechanic |
|------|----------|
| Enter | Canvas already interactive; steps panel slides on X (RTL: from left) |
| Step change | Active step opacity/transform; 3D tiers scale with expo |
| Flavor | Material color lerp on mesh (GPU), not CSS filter spam |
| Decor toggle | Instance mount/unmount with scale 0.92→1 |
| Plaque type | Text appears on gold plane; no layout thrash |
| Price | Number tick via transform on digit strip or opacity crossfade — never layout reflow jank |
| CTA | Magnetic on fine pointer; spring on press |

### `/shop` · `/collections/[slug]`

| Beat | Mechanic |
|------|----------|
| Grid | Reveal on view; image hover `scale(1.04)` 500ms expo |
| Facets | Instant filter (no page reload animation) |
| Empty | Static — no looping spinners beyond 1s |

### `/product/[slug]`

| Beat | Mechanic |
|------|----------|
| Gallery | Main image static LCP; secondary fade via opacity |
| Add to bag | Cart drawer `y`/`x` with expo; badge scale spring |
| Related | Horizontal snap optional on mobile |

### Cart drawer · `/cart` · `/checkout`

| Beat | Mechanic |
|------|----------|
| Drawer | Overlay opacity + panel translate; focus trap |
| Line add/remove | Height not animated (avoid CLS); opacity only |
| Checkout steps | One decision surface — no animated multi-step maze |
| Success | Checkmark scale spring once; confetti **forbidden** (60FPS + taste) |

### Global chrome

| Element | Mechanic |
|---------|----------|
| Lenis | Always on (except reduced-motion) |
| Gold cursor | Lerp dot; expand + label on `[data-magnetic]`; trail particles max ~12, GPU points/sprites, off on mobile |
| Sticky CTA | Present; does not animate entrance every scroll |
| WA float | Static position above sticky; hover scale 1.05 only |
| Route change | No WebGL page distortion in MVP (deferred Stage B) |

---

## Signature interactions (implementation contract)

1. **Magnetic UI** — cursor follows with lerp; targets do **not** translate (hit-target stability).  
2. **Kinetic typography** — mask reveal, word-level, expo.  
3. **Section pinning** — Hero zoom + bestsellers horizontal only; max 2 pinned regions on Home.  
4. **Builder price** — micro motion on value change ≤420ms.  
5. **LCP first** — hero poster in HTML/Image priority; Canvas after idle.

---

## Perf checklist (ship gate)

- [ ] No animation of `width`/`height`/`top`/`left`  
- [ ] ScrollTrigger scrub uses Lenis scroll proxy  
- [ ] Particle trail disabled ≤768px  
- [ ] Builder maintains interaction when Canvas loading (form usable)  
- [ ] Lighthouse / manual: scroll Home at 60FPS on mid Android

---

## Approval gate

Reply **«מאשר תנועה»** (or edits).  
Next: **Module 3D — Immersive pipeline technical plan** (Path C details, worker policy, asset license doc) → then Stage 3 core code.
