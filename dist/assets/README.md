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

Six replacement images have been refreshed from the supplied files:
`ch02-state-form.webp`, `ch02-slave-state.webp`, `ch03-soviet-state.webp`,
`ch04-mass-action.webp`, `ch04-revolution-origin.webp`, and
`ch04-revolution-force.webp`. The latest two replacements preserve the full
speaker-and-crowd compositions for Room 04 without cropping or stretching.
Screenshots supplied with those batches are QA references only and are not
bundled as gallery content.

Current room mapping:

- Room 01: Engels, Lenin, State institutions — origin, nature and characteristics.
- Room 02: State functions, forms, and a single representative image for the historical state types discussed in the text. The older feudal and bourgeois comparison files remain in the archive but are not opened by the painting viewer.
- Room 03: Marx, Soviet State, Ho Chi Minh and Vietnam — socialist State.
- Room 04: revolution origin, mass action, revolutionary forces and methods.
