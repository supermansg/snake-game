# Snake Me

`Snake Me` היא אפליקציית משחק דפדפן בסגנון `Snake`, עם חוויית ארקייד מודרנית, ממשק בעברית והתאמה טובה גם למובייל. המשחק נבנה כפרויקט סטטי שמבוסס על `HTML`, `CSS` ו-`JavaScript` ללא תלויות חיצוניות.

## מה האפליקציה עושה

המטרה היא לשלוט בנחש, לאסוף פירות, לשרוד כמה שיותר זמן ולצבור ניקוד. מעבר למשחק `Snake` בסיסי, האפליקציה מוסיפה שכבות של התקדמות ואתגר:

- 3 רמות קושי: קל, בינוני וקשה
- אויבים ומכשולים שמופיעים תוך כדי ההתקדמות
- פורטלים, גאדג'טים ויכולת ירי במצבים מסוימים
- הישגים, משימות יומיות וצבירת `XP`
- לוח שיאים מקומי, עם תמיכה גם בלוח קהילתי אם מוגדר endpoint חיצוני
- התאמה למסכי מגע עם כפתורי שליטה ייעודיים למובייל
- אפשרויות התאמה אישית כמו ערכת צבעים, סקין לנחש ורקע ללוח

## למי הפרויקט מתאים

הפרויקט מתאים ל:

- שחקנים שרוצים משחק דפדפן מהיר ופשוט להפעלה
- מפתחים שרוצים בסיס למשחק `Canvas` קטן ללא framework
- מי שרוצה להרחיב משחק קיים עם UI, הישגים, מובייל ושמירת נתונים מקומית

## איך מריצים

זהו פרויקט סטטי, ולכן אפשר להפעיל אותו בכמה דרכים פשוטות:

1. לפתוח את הקובץ `index.html` בדפדפן.
2. לחלופין, להריץ שרת סטטי מקומי ולהיכנס לקובץ דרך הדפדפן.

## שליטה במשחק

- מקלדת: חיצים לתנועה
- כפתורי מסך: התחל, עצור, התחלה מחדש וירי
- מובייל: משטח מגע עם כיוונים וכפתור ירי
- תפריט פנימי: שינוי קושי, שם שחקן, עיצוב, הגדרות מגע, רקע והעדפות נוספות

## מבנה הקבצים

- `index.html` - מבנה האפליקציה, אזורי המשחק, תפריטים, חלונות overlay ופאנלים
- `style.css` - העיצוב, הפריסה, הרספונסיביות והתאמות המובייל
- `game.js` - לוגיקת המשחק, ציור על `canvas`, ניקוד, אויבים, גאדג'טים, הישגים, משימות ושמירה מקומית
- `defualt background.png` - תמונת הרקע ברירת המחדל של לוח המשחק

## שמירת מידע

האפליקציה שומרת מידע מקומית בדפדפן באמצעות `localStorage`, כולל:

- שיא אישי
- רמת קושי נבחרת
- שם שחקן
- ערכת עיצוב וסקין
- הגדרות שליטה למובייל
- התקדמות, הישגים ומשימות יומיות
- רקע מותאם אישית ללוח

## פיצ'רים בולטים

- ממשק עברי עם כיוון `RTL`
- מסך תוצאות ריצה עם פירוט ביצועים
- מערכת התקדמות שמתגמלת על משחק חוזר
- תמיכה בהתאמה אישית של רקע הלוח מקישור או מקובץ מקומי
- מבנה פשוט שקל להמשיך לפתח ולשפר

## הערות למפתחים

- הפרויקט כתוב בקובץ JavaScript מרכזי אחד, ולכן הרחבות גדולות בעתיד כנראה ירוויחו מפיצול למודולים.
- אם רוצים להוסיף ולידציה אוטומטית, כדאי להוסיף `package.json` עם פקודות `lint` ו-`build`.
- אם רוצים לוח שיאים קהילתי אמיתי, צריך להגדיר endpoint עבור `window.SNAKE_LEADERBOARD_ENDPOINT`.

## Developer Setup

The project now includes a minimal Vite + ESLint foundation so the game can keep its current vanilla architecture while supporting verified builds and environment-based auth setup.

### Commands

- `npm install`
- `npm run dev`
- `npm run lint`
- `npm run build`

### Environment

Copy `.env.example` to `.env` and set:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_APP_URL`

If Supabase variables are missing, the game still works in guest mode and keeps local progression/settings behavior.

### Supabase Auth Setup

To enable real authentication:

1. In `Authentication > Providers > Email`, enable email auth and Magic Link.
2. In `Authentication > Providers > Google`, enable Google and paste the Google OAuth client credentials.
3. In `Authentication > URL Configuration`:
   - set `Site URL` to your production Vercel URL
   - add `http://localhost:5173/*` to `Redirect URLs`
   - add your production Vercel URL with `/*` to `Redirect URLs`
4. Run the SQL from `supabase/schema.sql` to create the minimal `profiles` table and policies.

The game stays guest-first even when auth is configured: players can always start immediately without logging in.

### Notes

- The game remains a canvas-based browser game with Hebrew UI and mobile controls.
- Auth is additive and guest-first. Google and Magic Link are wired through Supabase when env vars are present.
- Lightweight SVG assets under `public/assets/ui` replace the need for heavy default UI imagery in the main flow.
