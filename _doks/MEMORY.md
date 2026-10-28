# DOKS Memory — Michael’s Website Playbooks

**Standing order (always on):** Whenever we build or redesign a website for this user, treat `/cursor/stores/user/doks/` as the source of truth. Do **not** ask him to re-upload. Read the matching playbooks and take **only the strongest pieces** for that specific request — not everything at once.

## Pack (uploaded 2026-10-28)

| File | Path | Use when |
|---|---|---|
| ספר מיליוני אתרים | `raw/million-sites-book.pdf` + `text/million-sites-book-*.txt` | Psychology levers P01–P40, animation recipes A01–A40, tools T*, niches N* (incl. cakes N05) |
| אנימציות לאתרים | `raw/אנימציות-לאתרים.docx` + `text/animations.txt` | Framer Motion / GSAP / R3F components (reveal, scroll fade, curtain, magnetic cursor…) |
| סקריפט אתר דימו | `raw/סקריפט-אתר-דימו.docx` + `text/demo-site-script.txt` | Sales POC / Awwwards-style demo — no backend, hardcoded luxury data, Lenis + motion |
| פורמט דף נחיתה | `raw/פורמט-דף-נחיתה.docx` + `text/landing-page-script.txt` | PPC landing / CRO — sticky CTA, mobile-first 375px, real scarcity only, Zod forms |
| פורמטים לאתר | `raw/פורמטים-לאתר.docx` + `text/prompt-formats.txt` | Prompt engineering / brief structuring (Role · Task · Context · Format) |
| תקיה בסיסית לאתר | `raw/תקיה-בסיסית-לאתר.docx` + `text/boilerplate-folder.txt` | Next.js RTL layout, Heebo, Sanity schemas starter |

Also mirrored in repos that opt in at `/workspace/_doks/`.

## Selection policy (how to “take the best”)

1. **Classify the ask** first: demo/WOW · landing/PPC · full boutique shop · hero/polish pass · new niche from book.
2. **Primary script:** demo → דימו; PPC/lead → נחיתה; full product site → boilerplate + book niches + shop patterns already in repo.
3. **Always layer from the book:** pick 3–7 psychology principles (P*) that fit the goal; never fake scarcity/countdown/reviews.
4. **Motion:** pull 2–5 animation recipes (A* / animations.docx) that serve hierarchy — not noise. Prefer Lenis + Framer Motion; curtain/page transition when premium.
5. **Hebrew RTL:** logical CSS, bidi-safe numbers/phones, Hebrew-first copy unless user asks English.
6. **Taste:** ultra-luxury when the niche is premium (cakes, wine, atelier). Avoid generic AI purple/cream clichés unless the brief demands them.
7. **Ship a runnable slice** with real copy; one composition hero; brand-first.

## Non-negotiables from the pack

- No fake urgency / invented reviews.
- Mobile-first Israeli UX; sticky CTA on landings without blocking reading.
- Demo sites = no backend unless asked.
- Work module-by-module when a script says so; update PROJECT_BRIEF when that script requires it.
- Prefer concrete numbers, proof, and appointment/scarcity grounded in real client data.

## How to start each new site job

1. Open this MEMORY.md.
2. Skim the matching `text/*.txt` playbook(s).
3. Pull P*/A* IDs from the book text that match the brief.
4. Tell the user (briefly) which playbooks/levers you are applying — then build.
