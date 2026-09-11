import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const html = read("dist/index.html");
const css = read("dist/styles.css");
const app = read("dist/app.js");
const vercel = JSON.parse(read("vercel.json"));

for (const asset of ["dist/styles.css", "dist/app.js"]) assert(fs.existsSync(path.join(root, asset)), `Missing referenced asset: ${asset}`);
assert(html.includes('id="game-canvas"') && html.includes('src="./app.js"'), "Canvas game shell is incomplete");
assert(app.includes("requestAnimationFrame(loop)") && app.includes("getContext(\"2d\")"), "Canvas game loop is missing");
for (const concept of ["giai cấp", "tư liệu sản xuất", "mâu thuẫn", "Nhà nước", "cách mạng xã hội"]) assert(html.toLocaleLowerCase("vi").includes(concept.toLocaleLowerCase("vi")) || app.toLocaleLowerCase("vi").includes(concept.toLocaleLowerCase("vi")), `Missing academic concept: ${concept}`);
for (const marker of ["WASD", "interaction-prompt", "evidence-count", "EXHIBITION MAP", "Cánh cửa cuối"]) assert(html.includes(marker) || app.includes(marker), `Missing gameplay marker: ${marker}`);
assert((app.match(/kind: "exhibit"/g) ?? []).length === 4, "Expected exactly four evidence exhibits");
assert(app.includes("function rectCircleCollision") && app.includes("function canMove"), "Collision system missing");
assert(css.includes("#game-canvas") && css.includes(".choice-button") && css.includes("@media (max-width:800px)"), "Game visual/responsive rules missing");
assert(css.split("{").length === css.split("}").length, "CSS braces are unbalanced");
assert(vercel.rewrites?.[0]?.destination === "/dist/index.html", "Vercel root rewrite is not explicit");
assert(vercel.rewrites?.[1]?.destination === "/dist/$1", "Vercel asset rewrite is not configured");

console.log("PASS: Canvas shell, movement, collision, four exhibits, theory concepts, responsive CSS, and Vercel rewrites");
