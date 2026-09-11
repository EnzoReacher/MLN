import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const html = read("dist/index.html");
const css = read("dist/styles.css");
const phaseCss = read("dist/phase34.css");
const app = read("dist/app.js");
const vercel = JSON.parse(read("vercel.json"));

for (const asset of ["dist/styles.css", "dist/phase34.css", "dist/app.js"]) {
  assert(fs.existsSync(path.join(root, asset)), `Missing referenced asset: ${asset}`);
}
assert(html.includes('href="./styles.css"'), "Main stylesheet is not linked");
assert(html.includes('href="./phase34.css"'), "Release polish stylesheet is not linked");
assert(html.includes('src="./app.js"'), "Game script is not linked");
assert((app.match(/chapter:/g) ?? []).length === 5, "Expected exactly five game events");
for (const concept of ["giai cấp", "tư liệu sản xuất", "mâu thuẫn", "Nhà nước", "cách mạng xã hội"]) {
  assert(html.toLocaleLowerCase("vi").includes(concept.toLocaleLowerCase("vi")) || app.toLocaleLowerCase("vi").includes(concept.toLocaleLowerCase("vi")), `Missing academic concept: ${concept}`);
}
assert(css.includes("@media (max-width: 560px)"), "Mobile layout rules missing");
assert(phaseCss.includes("event-enter") && phaseCss.includes("choice.selected"), "Phase 2 polish rules missing");
assert(css.split("{").length === css.split("}").length, "Base CSS braces are unbalanced");
assert(phaseCss.split("{").length === phaseCss.split("}").length, "Phase CSS braces are unbalanced");
assert(vercel.rewrites?.[0]?.destination === "/dist/index.html", "Vercel root rewrite is not explicit");
assert(vercel.rewrites?.[1]?.destination === "/dist/$1", "Vercel asset rewrite is not configured");

console.log("PASS: static assets, 5 events, academic concepts, responsive CSS, and Vercel rewrites");
