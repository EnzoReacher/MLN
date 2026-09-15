# THE STATE // EXHIBITION 01 — Chat Handoff

Updated: 2026-09-15

## Project identity

- Product: a self-contained 3D WebGL political-philosophy exhibition game.
- Theme: Marxist–Leninist Philosophy, Chapter 7 — State and Social Revolution.
- Local project: `/workspace/sites/social-revolution`
- GitHub: `https://github.com/EnzoReacher/MLN`
- Branch: `main`
- Latest verified implementation commit: `adfe91e39db3e53663f214dac5e989b2b08d1937`
- Production: `https://mln-chi-eight.vercel.app/`
- Latest verified Vercel deployment before this image audit: success for the prior content commit; the new audit commit triggers another auto-deployment from `main`.
- The Room 01 artwork swap, Room 03 wall replacement, opt-in `?test=1` noclip mode, portrait/glass upgrade, Chapter 7 content refinement and complete image audit are included in implementation commit `adfe91e39db3e53663f214dac5e989b2b08d1937`.

## Current game design

The player enters a 3D museum and follows four sequential rooms:

1. Điều kiện vật chất
2. Giai cấp và sở hữu
3. Nhà nước và quyền lực
4. Mâu thuẫn và cách mạng xã hội

Movement is WASD/arrow keys plus mouse look. `E` opens the exhibit nearest to the player. Every painting is an independent exhibit: the player only sees the content attached to that painting, not all three room exhibits. The main painting must be read and recorded before the next gate opens; optional paintings add context. The exit works only after all four chapters are completed and shows a thank-you ending.

The four central honor portraits are:

- Room 1: Friedrich Engels
- Room 2: Karl Marx
- Room 3: Hồ Chí Minh
- Room 4: Vladimir Lenin

Room 01 no longer duplicates the central historical figures on its walls: the former Engels and Lenin wall images are now `ch02-feudal-state.webp` and `ch02-bourgeois-transition.webp`. Engels remains the Room 01 honor display and Lenin remains the Room 04 honor display.

Room 03 no longer uses Karl Marx on its first wall: the wall and its first exhibit now use `ch03-state-rally.webp`, converted from the second supplied image in the latest batch. Marx remains the central honor portrait in Room 02.

All four honor displays now use a lightweight transparent glass pane, reflection streak, corner studs, a unified bronze/gold frame treatment, and centered name/caption text. Room 03 is the special centerpiece: it uses `ch03-ho-chi-minh-hero.webp`, the supplied formal black-and-white portrait beside a microphone, with a larger gold frame, deeper pedestal and expanded plaque.

The exhibit copy was re-audited against the supplied Chapter 7 material. It now makes the causal chain explicit—productive forces, surplus and private property, class antagonism, the State, and social revolution—and includes the source distinctions between class/social and internal/external functions, State type/form, the transitional socialist State, revolution’s broad/narrow meanings, forces, objective conditions, subjective factors and methods. Added interpretation remains concise and clearly tied to those concepts.

Every bundled image was then checked against that content map: 20 WebP assets are accounted for (16 content images plus four honor portraits), every content image has alt text, a Chapter 7 concept tag and a topic-linked caption, and the static audit fails if any image is unmapped or under-described. The image descriptions distinguish direct evidence from historical comparison where an image is illustrative rather than literal.

Each room also has a red carpet, bronze trim, simple low-poly museum plants placed away from paintings and interaction points, and a central static honor display. NPCs, spotlights, dynamic shadows, broken hammer-and-sickle glyphs, old theory boxes, A/B choices and the obsolete lens mechanic are intentionally removed.

Long horizontal images remain on the wall, but their `E` viewer can use `contentOnly: true` so the text is shown without repeating the same wide image. Other exhibits support image captions, next/previous image controls and a full-viewport lightbox.

## Important implementation details

- App entry: `dist/index.html`
- Game engine: `dist/app.js`
- Content/data: `dist/content.js`
- Styles: `dist/styles.css`
- Local Three.js runtime: `dist/vendor/three.min.js`
- Optimized image assets: `dist/assets/*.webp`
- Vercel config: `vercel.json`
- Tests: `test/`

The app has no backend, database, API or environment variables. It serves the static `dist/` folder directly and is designed for Vercel or a basic static HTTP server.

The current portrait rendering fix changed the portrait material to neutral white with `toneMapped: false`, enabled linear texture filtering and enabled light hardware antialiasing. Dynamic spotlight/shadow rendering remains disabled for performance. Pixel ratio is capped and the scene uses lightweight materials/geometries.

The selected Hồ Chí Minh hero asset is stored at `dist/assets/ch03-ho-chi-minh-hero.webp`; it is used only by the central Room 03 honor display, not as a duplicate wall exhibit. The Room 03 replacement asset is `dist/assets/ch03-state-rally.webp` and keeps its supplied 2048×1090 landscape ratio.

## Run locally

From the project directory:

```bash
python3 -m http.server 4173 --directory dist
```

Open `http://localhost:4173/`. Use a normal local browser with WebGL enabled; a remote/cloud browser may report that WebGL is unavailable even when the deployed game is healthy.

For fast QA, open `http://localhost:4173/?test=1`. This enables a visible test badge, bypasses chapter gates and enables bounded noclip. Press `N` to toggle noclip on or off. It is client-side game testing only; no network ports or system privileges are opened.

## Verification commands

Run from `/workspace/sites/social-revolution`:

```bash
node --check dist/app.js
node test/runtime-test.mjs
node test/static-check.mjs
node test/smoke-test.mjs
node test/test-mode.mjs
```

Last verified results:

```text
PASS: vendored Three.js runtime exposes the full gallery API (r159)
PASS: self-contained WebGL shell, four sequential exhibits/gates, image viewer, no choices/lens/icons, responsive CSS, and Vercel rewrites
PASS: 3D gallery state, WASD movement gates, E-only content viewer, image detail flow, ending, quit, and restart paths
HTTP routes checked locally: 25/25
Content audit: 4 rooms, 24 paragraphs, longest paragraph 286 characters
```

## Release state

Already complete:

- Four-room 3D gallery and sequential gates.
- Independent painting interaction with `E`.
- Content from the supplied philosophy document mapped into four rooms.
- 20 optimized WebP assets: 16 content images plus four honor portraits, all mapped to Chapter 7 concepts with alt text/captions.
- Full image lightbox and content-only mode for the long image.
- Central Engels/Marx/Hồ Chí Minh/Lenin displays.
- Glass-protected honor displays with a larger gold Hồ Chí Minh centerpiece using the selected supplied portrait.
- Room 03 wall replacement using the second supplied image, with the matching exhibit content updated and all honor plaque text centered.
- Chapter 7 content re-audited against the supplied source material, with concise explanatory links added without exceeding the two-paragraph presentation limit.
- Complete image-to-topic audit with concept tags, precise captions and automated orphan-asset coverage checks.
- Plants and red-carpet museum dressing.
- Quit/thank-you ending, restart flow and performance safeguards.
- GitHub push and successful Vercel deployment.
- Automated syntax, runtime, static, smoke and asset-route checks.
- Opt-in test mode with bounded noclip and progression bypass for manual QA.
- The current Room 01/Room 03/portrait/test-mode/content changes have been pushed to `EnzoReacher/MLN` `main`; Vercel auto-deploys from the branch.

Still worth doing before presentation:

1. Play one complete production run on the actual presentation laptop.
2. Confirm WebGL console output and network requests in that browser.
3. Read every viewer at the real projector resolution and shorten any line that feels too dense.
4. Confirm the final image/source captions with the lecturer.
5. Verify `https://mln-chi-eight.vercel.app/?test=1` on the actual presentation laptop.

## Next-chat instruction

Start by reading this file, then inspect `README.md`, `PLAN.md`, `RELEASE_CHECKLIST.md`, `dist/content.js` and `dist/app.js`. Preserve the existing linear progression, one-painting-per-`E` interaction, text-only wide-image behavior, central historical portraits and performance-first constraints unless the user explicitly changes them. For any new change, run the syntax, runtime, static, smoke and `test-mode` checks plus the 25-route asset check before committing/deploying.
