# LALIBAKERY

אתר עוגות בעברית (RTL) — Tier 3 · Cake Builder תלת־ממד · קטלוג צילומי סטודיו.

## הרצה מקומית

```bash
npm install
npm run dev
```

אתר: [http://127.0.0.1:43127](http://127.0.0.1:43127)  
Builder: [http://127.0.0.1:43127/builder](http://127.0.0.1:43127/builder)  
Health: [http://127.0.0.1:43127/api/health](http://127.0.0.1:43127/api/health)

העתק `env.example` → `.env.local` לפי הצורך. בלי מפתחות — קטלוג מקומי + checkout לוואטסאפ.

## סטאק

Next.js 15 · Tailwind · Zustand · Zod · GSAP · Lenis · R3F · Supabase (יעד) · Tranzila (יעד)

## פריסה ל-Vercel

1. חברו את הריפו ל-Vercel (פרויקט על שם הלקוח + 2FA).
2. הגדירו משתני סביבה מ־`env.example` (Production בלבד לטוקני כתיבה).
3. CORS ב-Supabase: רק `https://lalibakery.co.il` (+ preview אם צריך).
4. Tranzila: notify URL חתום + idempotency על `orderId`.
5. ודאו `middleware` CSP / HSTS פעיל אחרי HTTPS.
6. לפני Go-Live: סגירת כל סעיפי ❌ ב־`docs/FINAL_AUDIT_REPORT.md`.

## מסמכים

- `PROJECT_BRIEF.md` · `ARCHITECTURE.md` · `DESIGN_DIRECTION.md` · `MOTION_SYSTEM.md`
- `docs/asset-licenses.md` · `docs/FINAL_AUDIT_REPORT.md`

טלפון / וואטסאפ: **050-8739090**
