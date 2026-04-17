# Snake Me Trailer Creative Pack

## Goal
Create a 15-second trailer that sells `Snake Me` as a polished arcade browser game with a strong Hebrew UI, fast gameplay, customization, and mobile-friendly controls.

## Trailer Structure
1. 0.0-3.0s
Hook on the desktop home screen.
On-screen line: `סנייק ארקייד מודרני בעברית`

2. 3.0-6.5s
Zoom into gameplay with obstacles and the board UI visible.
On-screen line: `מכשולים, קצב מהיר וגאדג'טים`

3. 6.5-9.8s
Show the menu and progression/customization panels.
On-screen line: `פרופיל, עיצוב ומשימות יומיות`

4. 9.8-12.5s
Switch to the mobile capture.
On-screen line: `עובד מצוין גם במובייל`

5. 12.5-15.0s
End card with the game name and CTA.
On-screen line: `לשחק. להתחמק. להשתפר.`

## Captions
- `Snake Me`
- `סנייק ארקייד מודרני בעברית`
- `יותר מסנייק רגיל`
- `מכשולים, קצב מהיר וגאדג'טים`
- `שליטה והתאמה אישית`
- `בנוי גם למובייל`
- `לשחק. להתחמק. להשתפר.`

## AI Key Art Prompt
`infsh` is not installed in this workspace, so this prompt is prepared for a later image run:

```text
Cinematic key art poster for "Snake Me", a modern arcade snake browser game in Hebrew UI.
Show a glowing neon game board floating in a dark futuristic interface.
The snake should feel fast, smart, and expressive, with bright green/cyan body segments.
Include fruit pickups, obstacles, and subtle gadget effects.
Visual tone: premium indie arcade, polished UI, dramatic rim light, crisp screen reflections.
Composition: 16:9 hero art, center-weighted, space for title text "Snake Me".
Avoid clutter, avoid realistic snakes, avoid horror, avoid gore.
```

## Suggested `infsh` Command
When `infsh` is available:

```bash
infsh app run bytedance/seedream-4-5 --input '{
  "prompt": "Cinematic key art poster for Snake Me, a modern arcade snake browser game in Hebrew UI. Show a glowing neon game board floating in a dark futuristic interface. The snake should feel fast, smart, and expressive, with bright green/cyan body segments. Include fruit pickups, obstacles, and subtle gadget effects. Visual tone: premium indie arcade, polished UI, dramatic rim light, crisp screen reflections. Composition: 16:9 hero art, center-weighted, space for title text Snake Me. Avoid clutter, avoid realistic snakes, avoid horror, avoid gore."
}'
```

## Files Used By The Renderer
- `promo/trailer/shots/01-home.png`
- `promo/trailer/shots/02-menu.png`
- `promo/trailer/shots/03-gameplay.png`
- `promo/trailer/shots/05-mobile-gameplay.png`

## Export
- Renderer page: `promo/trailer/render-trailer.html`
- Expected output: `promo/trailer/out/snake-me-trailer-15s.webm`
