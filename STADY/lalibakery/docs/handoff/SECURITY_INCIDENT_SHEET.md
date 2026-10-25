# Security & Incident Sheet — LALIBAKERY

## הגנות קיימות בקוד
- מחיר/קופון/משלוח בשרת (`quoteCart`)
- CSP + HSTS + XFO + COOP/CORP (`middleware.ts`)
- Zod על checkout · honeypot · rate limit זיכרון
- Guest checkout · אין שמירת כרטיס באתר

## באחריות הלקוח
- 2FA בכל החשבונות
- שמירת מפתחות מחוץ לצ׳אט/Slack
- אישור ביקורות אמיתיות לפני פרסום
- חיבור Tranzila/Supabase Production

## נוהל חירום
1. הורדת האתר ל-Maintenance / Disable deploy  
2. סבב מפתחות (Supabase service role, Tranzila, Vercel env)  
3. בדיקת לוגים (Vercel / Supabase) בלי להדביק PII  
4. הודעה ללקוחות רק אם היה דלף מוכח  
5. Post-mortem תוך 72 שעות
