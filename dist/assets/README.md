# Chapter 7 images

The current WebP files are compressed copies of the reference images supplied
with the Chapter 7 PDF. They are assigned to rooms by the content data in
`dist/content.js`:

```js
images: [
  { src: "./assets/ch01-engels.webp", alt: "...", caption: "..." }
]
```

The viewer supports multiple images per content section when a comparison is
useful, and keeps the image caption separate from the chapter text. Single-image
exhibits hide the inactive image arrows. Images are displayed with `contain` in
a large presentation frame and can be opened in the lightbox at full size.
The image assigned to each section is also loaded into the matching 3D wall
painting and fitted to its original aspect ratio. If a future image is added,
keep it compressed and update both the relevant section and its matching
`room.artworks[index]` entry in `dist/app.js`.

The wide `ch02-state-functions.webp` exhibit is retained on the Room 02 wall,
but its section uses `contentOnly: true`, so pressing `E` opens the readable
text without duplicating the long image in the viewer. Four central honor
displays use the supplied portraits of Engels, Marx, Hồ Chí Minh, and Lenin;
they are static, non-interactive room decor placed away from the wall exhibits
and the player path. Each display now has a lightweight transparent glass pane,
a restrained reflection streak, and four corner studs. The selected
`ch03-ho-chi-minh-hero.webp` is the supplied black-and-white microphone portrait;
it receives the largest display, a gold frame, and a deeper pedestal so Room 03
has a clear centerpiece. Room 01 uses the feudal-state and bourgeois-transition
images on its first two walls so Engels and Lenin are not repeated outside the
honor displays.

Room 03's first wall now uses `ch03-state-rally.webp`, a WebP conversion of the
second supplied image in the latest batch. It replaces the former Karl Marx wall
image and is connected to the first Room 03 exhibit; `ch03-marx.webp` remains
available for the Room 02 central honor display.

Six replacement images have been refreshed from the supplied files:
`ch02-state-form.webp`, `ch02-slave-state.webp`, `ch03-soviet-state.webp`,
`ch04-mass-action.webp`, `ch04-revolution-origin.webp`, and
`ch04-revolution-force.webp`. The latest two replacements preserve the full
speaker-and-crowd compositions for Room 04 without cropping or stretching.
Screenshots supplied with those batches are QA references only and are not
bundled as gallery content.

Current room mapping:

- Room 01: Feudal state, bourgeois transition, State institutions — origin, nature and characteristics.
- Room 02: State functions, forms, and a single representative image for the historical state types discussed in the text.
- Room 03: State rally, Soviet State, Ho Chi Minh and Vietnam — socialist State.
- Room 04: revolution origin, mass action, revolutionary forces and methods.
