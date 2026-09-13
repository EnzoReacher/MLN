# Chapter 7 images

The current WebP files are compressed copies of the reference images supplied
with the Chapter 7 PDF. They are assigned to rooms by the content data in
`dist/content.js`:

```js
images: [
  { src: "./assets/ch01-engels.webp", alt: "...", caption: "..." }
]
```

The viewer supports multiple images per content section and keeps the image
caption separate from the chapter text. Images are displayed with `contain` in
a large presentation frame and can be opened in the lightbox at full size.
The image assigned to each section is also loaded into the matching 3D wall
painting and fitted to its original aspect ratio. If a future image is added,
keep it compressed and update both the relevant section and its matching
`room.artworks[index]` entry in `dist/app.js`.

Current room mapping:

- Room 01: Engels, Lenin, State institutions — origin, nature and characteristics.
- Room 02: State functions, forms, slavery, feudalism and bourgeois transition.
- Room 03: Marx, Soviet State, Ho Chi Minh and Vietnam — socialist State.
- Room 04: revolution origin, mass action, revolutionary forces and methods.
