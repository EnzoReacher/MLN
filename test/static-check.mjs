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

assert(html.includes('id="game-canvas"') && html.includes('src="./vendor/three.min.js"') && html.includes('src="./content.js"') && html.includes('src="./app.js"'), "3D/content shell is incomplete");
assert(html.includes('id="content-viewer"') && html.includes('id="viewer-image"') && html.includes('id="viewer-next"'), "Content viewer shell is incomplete");
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
assert(app.includes("const gates = [") && app.includes('id: "gate-end"') && app.includes('id: "gate-revolt"'), "Expected three chapter gates plus one ending gate");
assert(app.includes("function canMove") && app.includes("passedGates") && app.includes("GALLERY.minZ"), "3D movement and gate collision system missing");
assert(app.includes("antialias: false") && app.includes("shadowMap.enabled = false") && app.includes("maxPixelRatio") && app.includes("MeshLambertMaterial"), "Performance-safe renderer configuration is missing");
assert(app.includes("section.images") && app.includes("viewerImage.onerror") && app.includes("function cycleImage"), "Image/content data flow is missing");
assert(content.includes("sections:") && content.includes("images: []"), "Content contract is missing sections/images arrays");

assert(!html.includes("☭") && !app.includes("☭") && !html.includes("mark.svg") && !app.includes("mark.svg"), "Old hammer-and-sickle rendering is still referenced");
assert(!html.includes("lens-button") && !app.includes("lensActive") && !app.includes("drawRelationField"), "Removed lens mechanic is still referenced");
assert(!html.includes("choice-button") && !app.includes("choice-button") && !app.includes("function choose"), "Choice mechanic is still wired into the game");
assert(!app.includes("drawRoomScene") && !app.includes("drawRoomArtifact"), "Room content is still being drawn as static decorative panels");

assert(css.includes("#game-canvas") && css.includes(".content-viewer") && css.includes(".viewer-card") && css.includes(".image-lightbox") && css.includes("@media (max-width: 800px)"), "Game viewer/responsive rules missing");
assert(css.split("{").length === css.split("}").length, "CSS braces are unbalanced");
assert(vercel.rewrites?.[0]?.destination === "/dist/index.html", "Vercel root rewrite is not explicit");
assert(vercel.rewrites?.[1]?.destination === "/dist/$1", "Vercel asset rewrite is not configured");

console.log("PASS: self-contained WebGL shell, four sequential exhibits/gates, image viewer, no choices/lens/icons, responsive CSS, and Vercel rewrites");
