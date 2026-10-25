# Script 2 Module B — Extreme Performance plan (locked from brief)

## Heavy payload
- Hero Path C1 procedural R3F + LCP poster (`HeroCake3D.tsx`)
- Builder preview meshes with MeshBasic (no PBR)

## Loading strategy
| Asset | Strategy |
|-------|----------|
| Hero poster JPG | `priority` / eager |
| R3F Canvas | idle callback + mobile DPR clamp 1–1.35 |
| Materials / geo | `dispose()` on unmount |
| Reduced motion | poster only, no Canvas |

## Cache
- Catalog: static/local data + future Supabase ISR
- `/checkout` `/cart` `/account` `/api/*`: `private, no-store` (middleware)

## Targets
- LCP < 1.5s (poster path)
- INP < 100ms on Builder clicks
- CLS < 0.05 (fixed hero aspect shells)
- Initial JS: watch R3F chunk — lazy mount already

## State
- Zustand optimistic cart; server `quoteCart` is source of truth at checkout

## a11y
- Hero 3D: `role="img"` + `aria-live` status
- Native focus rings / skip-link; no overlay a11y widgets that trap
