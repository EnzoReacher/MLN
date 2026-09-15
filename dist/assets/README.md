# Chapter 7 images

The current 20 WebP files are compressed copies of the reference images
supplied with the Chapter 7 PDF and the supplied portrait batch. Sixteen are
content images and four are honor-display portraits. They are assigned to
rooms by the content data in `dist/content.js`:

```js
images: [
  { src: "./assets/ch01-state-institutions.webp", alt: "...", topic: "...", caption: "..." }
]
```

The viewer supports multiple images per content section when a comparison is
useful, and keeps the image caption separate from the chapter text. Single-image
exhibits hide the inactive image arrows. Images are displayed with `contain` in
a large presentation frame and can be opened in the lightbox at full size.
The first image in each section is loaded into its matching 3D wall painting
and fitted to its original aspect ratio; additional images stay available as
context in the viewer. Every content image now carries a `topic` tag, alt text
and a caption that names the Chapter 7 concept it illustrates. If a future
image is added, keep it compressed, add all three metadata fields, and update
the relevant section plus its `room.artworks[index]` entry when it should be a
wall painting.

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

Semantic image audit:

- Room 01: feudal court as a comparison for class-stratified State origins; bourgeois transition for class contradiction and power change; public institutions for territory, population and professional State apparatus.
- Room 02: public-management montage for internal/external functions; constitutional assembly for State form; enslaved people for the economic basis of the slave-owning State.
- Room 03: public rally for mass power in transition; Soviet emblem for the socialist-State historical case; Hồ Chí Minh and Vietnam imagery for the people’s State, organization-building, rule of law and popular mastery.
- Room 04: revolutionary crowds for social transformation, mass forces, leadership, timing and method.
- Honor displays: Engels—State origins; Marx—class and ownership; Hồ Chí Minh—Vietnamese socialist State; Lenin—social revolution.
