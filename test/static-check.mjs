import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const html = read("dist/index.html");
const css = read("dist/styles.css");
const app = read("dist/app.js");
const content = read("dist/content.js");
const vercel = JSON.parse(read("vercel.json"));

for (const asset of ["dist/styles.css", "dist/content.js", "dist/app.js", "dist/vendor/three.min.js"]) {
  assert(fs.existsSync(path.join(root, asset)), `Missing referenced asset: ${asset}`);
}

const chapterImages = [
  "ch01-engels.webp", "ch01-lenin.webp", "ch01-state-institutions.webp",
  "ch02-state-functions.webp", "ch02-state-form.webp", "ch02-slave-state.webp", "ch02-feudal-state.webp", "ch02-bourgeois-transition.webp",
  "ch03-marx.webp", "ch03-soviet-state.webp", "ch03-ho-chi-minh.webp", "ch03-vietnam-socialism.webp", "ch03-vietnam-state.webp", "ch03-public-power.webp",
  "ch04-revolution-origin.webp", "ch04-mass-action.webp", "ch04-revolution-force.webp", "ch04-revolution-method.webp"
];
const activeChapterImages = chapterImages.filter((image) => !["ch02-feudal-state.webp", "ch02-bourgeois-transition.webp"].includes(image));
for (const image of chapterImages) assert(fs.existsSync(path.join(root, "dist/assets", image)), `Missing chapter image: ${image}`);

assert(html.includes('id="game-canvas"') && html.includes('src="./vendor/three.min.js"') && html.includes('src="./content.js"') && html.includes('src="./app.js"'), "3D/content shell is incomplete");
assert(html.includes('id="content-viewer"') && html.includes('id="viewer-image"') && html.includes('id="viewer-next"') && html.includes('id="viewer-close"'), "Content viewer shell is incomplete");
assert(html.includes('id="runtime-error"') && html.includes('id="runtime-reload-button"') && app.includes("function reportRuntimeError"), "3D runtime recovery shell is incomplete");
assert(html.includes('id="image-lightbox"') && html.includes('id="lightbox-image"'), "Image detail viewer shell is incomplete");
assert(app.includes("requestAnimationFrame(loop)") && app.includes("getContext(\"2d\")"), "Canvas game loop is missing");

for (const concept of ["giai cấp", "tư liệu sản xuất", "mâu thuẫn", "Nhà nước", "cách mạng xã hội"]) {
  const needle = concept.toLocaleLowerCase("vi");
  assert(html.toLocaleLowerCase("vi").includes(needle) || content.toLocaleLowerCase("vi").includes(needle), `Missing academic concept: ${concept}`);
}

for (const marker of [
  "WASD", "MOUSE", "interaction-prompt", "evidence-count", "EXHIBITION MAP", "Cánh cửa cuối", "quit-button", "quit-screen",
  "THREE.WebGLRenderer", "initThreeGallery", "makeArtworkTexture", "openContentViewer", "renderViewer", "normaliseChapter", "contentById", "viewer-image-placeholder",
  "viewer-progress-bar", "gate-class", "gate-state", "gate-revolt", "gate-end", "requiredEvidence", "tư liệu sản xuất",
  "cách mạng xã hội"
]) assert(html.includes(marker) || app.includes(marker) || content.includes(marker), `Missing game/content marker: ${marker}`);

assert(app.includes("...rooms.map((room) => ({") && app.includes('kind: "exhibit"'), "Expected four generated evidence exhibits");
assert(app.includes("room.artworks.forEach") && app.includes("room.artworks[0].wall") && app.includes("artworkIndex") && app.includes("sectionIndex") && app.includes("radius: 1.9") && app.includes("addRoomDecor") && app.includes("carpet-"), "Room artwork layout, E alignment, or gallery decor is missing");
assert(app.includes("const ROOM_PLANTS") && app.includes("function addPlant") && app.includes("function addRoomPlants") && app.includes("CylinderGeometry") && app.includes("SphereGeometry") && !app.includes("function addNpc") && !app.includes("updateAnimatedNpcs"), "Plant-only room decor is missing or NPC logic remains");
assert(app.includes("artworkImage") && app.includes("new THREE.TextureLoader") && app.includes("artworkMaterial.map = texture"), "Supplied images are not wired into the 3D gallery paintings");
assert(!app.includes("new THREE.SpotLight") && !app.includes("spotlight-pool") && !app.includes("contact-shadow") && app.includes("fitArtworkToFrame"), "Spotlight effect is still wired into the 3D gallery or artwork fitting is missing");
assert(app.includes("viewerImageControls?.classList.toggle(\"hidden\", images.length < 2)"), "Single-image exhibits should not show inactive image arrows");
assert(app.includes("syncViewerImageFrame") && app.includes("--viewer-image-ratio"), "Viewer image frame does not adapt to the loaded image ratio");
assert(app.includes("const gates = [") && app.includes('id: "gate-end"') && app.includes('id: "gate-revolt"'), "Expected three chapter gates plus one ending gate");
assert(app.includes("function canMove") && app.includes("passedGates") && app.includes("GALLERY.minZ"), "3D movement and gate collision system missing");
assert(app.includes("antialias: false") && app.includes("shadowMap.enabled = false") && app.includes("maxPixelRatio") && app.includes("MeshLambertMaterial"), "Performance-safe renderer configuration is missing");
assert(app.includes("section.images") && app.includes("viewerImage.onerror") && app.includes("function cycleImage") && app.includes("viewerArtworkIndex") && app.includes("GHI NHẬN & ĐÓNG"), "Image/content data flow is missing");
assert(content.includes("sections:") && content.includes("images:") && content.includes("ch04-revolution-method.webp"), "Chapter 7 content/image contract is incomplete");
assert(activeChapterImages.every((image) => content.includes(`./assets/${image}`)), "Not every active chapter image is connected to content");

assert(!html.includes("☭") && !app.includes("☭") && !html.includes("mark.svg") && !app.includes("mark.svg"), "Old hammer-and-sickle rendering is still referenced");
assert(!html.includes("lens-button") && !app.includes("lensActive") && !app.includes("drawRelationField"), "Removed lens mechanic is still referenced");
assert(!html.includes("choice-button") && !app.includes("choice-button") && !app.includes("function choose"), "Choice mechanic is still wired into the game");
assert(!app.includes("drawRoomScene") && !app.includes("drawRoomArtifact"), "Room content is still being drawn as static decorative panels");

assert(css.includes("#game-canvas") && css.includes(".content-viewer") && css.includes(".viewer-card") && css.includes(".viewer-layout") && css.includes("minmax(0, 1.28fr)") && css.includes("overflow-x: hidden") && css.includes(".viewer-image-stage") && css.includes("aspect-ratio: var(--viewer-image-ratio") && css.includes("width: 100%; height: 100%;") && css.includes(".image-lightbox") && css.includes("@media (max-width: 800px)"), "Game viewer/responsive rules missing");
assert(css.split("{").length === css.split("}").length, "CSS braces are unbalanced");
assert(vercel.rewrites?.[0]?.destination === "/dist/index.html", "Vercel root rewrite is not explicit");
assert(vercel.rewrites?.[1]?.destination === "/dist/$1", "Vercel asset rewrite is not configured");

console.log("PASS: self-contained WebGL shell, four sequential exhibits/gates, image viewer, no choices/lens/icons, responsive CSS, and Vercel rewrites");
