import fs from "node:fs";
import vm from "node:vm";

const contentSource = fs.readFileSync(new URL("../dist/content.js", import.meta.url), "utf8");
const source = fs.readFileSync(new URL("../dist/app.js", import.meta.url), "utf8");

class ClassList {
  constructor() { this.values = new Set(); }
  add(...names) { names.forEach((name) => this.values.add(name)); }
  remove(...names) { names.forEach((name) => this.values.delete(name)); }
  toggle(name, force) { const next = force === undefined ? !this.values.has(name) : force; next ? this.add(name) : this.remove(name); return next; }
  contains(name) { return this.values.has(name); }
}

class Element {
  constructor(id = "") {
    this.id = id;
    this.classList = new ClassList();
    this.style = {};
    this.textContent = "";
    this._innerHTML = "";
    this.listeners = {};
    this.children = [];
    this._span = null;
    this.disabled = false;
    this.src = "";
    this.alt = "";
    this.onerror = null;
    this.onload = null;
  }
  get innerHTML() { return this._innerHTML; }
  set innerHTML(value) { this._innerHTML = value; this.children = []; }
  addEventListener(type, handler) { (this.listeners[type] ??= []).push(handler); }
  click() { for (const handler of this.listeners.click ?? []) handler({ currentTarget: this }); }
  append(child) { this.children.push(child); }
  querySelector(selector) {
    if (selector === "span") return this._span ??= new Element(`${this.id}-span`);
    return null;
  }
}

const noop = () => {};
const context = {
  clearRect: noop, save: noop, restore: noop, translate: noop, fillRect: noop, strokeRect: noop,
  beginPath: noop, moveTo: noop, lineTo: noop, quadraticCurveTo: noop, stroke: noop, fill: noop,
  arc: noop, fillText: noop, measureText: (text) => ({ width: String(text).length * 6 }),
  createRadialGradient: () => ({ addColorStop: noop }), setTransform: noop
};

const ids = [
  "game-canvas", "title-screen", "game-ui", "dialogue", "ending-screen", "quit-screen", "interaction-prompt", "prompt-text",
  "zone-name", "zone-index", "status-text", "evidence-count", "objective-text", "dialogue-title", "dialogue-body",
  "dialogue-type", "dialogue-number", "dialogue-close", "content-viewer", "viewer-kicker", "viewer-title",
  "viewer-page", "viewer-page-total", "viewer-progress-bar", "viewer-section-label", "viewer-section-title", "viewer-lead",
  "viewer-paragraphs", "viewer-image-placeholder", "viewer-image", "viewer-caption", "viewer-image-count", "viewer-prev-image",
  "viewer-next-image", "viewer-note", "viewer-next", "viewer-close", "image-lightbox", "lightbox-image", "lightbox-caption",
  "lightbox-close", "start-button", "restart-button", "quit-button", "return-title-button", "ending-exit-button", "theory-button",
  "theory-note", "ending-evidence", "ending-pages", "ending-images", "ending-copy"
];
const elements = Object.fromEntries(ids.map((id) => [id, new Element(id)]));
elements["game-canvas"].getContext = () => context;
elements["mini-player"] = new Element("mini-player");

const document = {
  getElementById: (id) => elements[id] ?? null,
  querySelector: (selector) => selector === ".mini-player" ? elements["mini-player"] : null,
  createElement: () => new Element()
};
const windowListeners = {};
const window = {
  devicePixelRatio: 1,
  addEventListener: (type, handler) => { (windowListeners[type] ??= []).push(handler); },
  THE_STATE_CONTENT: undefined,
  __THE_STATE__: null
};
const sandbox = {
  document, window, innerWidth: 1280, innerHeight: 720,
  performance: { now: () => 100 }, requestAnimationFrame: noop, console, Math, Set, Map, String
};

vm.runInNewContext(contentSource, sandbox);
vm.runInNewContext(source, sandbox);
const game = sandbox.window.__THE_STATE__;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const emitKey = (key) => { for (const handler of windowListeners.keydown ?? []) handler({ key, preventDefault: noop }); };

game.start();
assert(game.state.running, "Game did not start");
assert(game.state.player.x === 190 && game.state.player.y === 950, "Game did not start at the entrance");
assert(elements["title-screen"].classList.contains("hidden"), "Title screen did not hide");
assert(!elements["game-ui"].classList.contains("hidden"), "Game HUD did not appear");
assert(game.content.length === 4 && game.content.every((chapter) => chapter.sections.length === 3), "Content contract did not load four three-panel chapters");
game.drawWorld();

game.interact();
assert(game.state.dialogueOpen, "Curator guidance did not open");
elements["dialogue-close"].click();
assert(!game.state.dialogueOpen, "Curator guidance did not close");

assert(!game.canMove(710, 600), "Chapter 02 gate was passable before chapter 01");
game.state.player = { x: 710, y: 600 };
game.interact();
assert(game.state.dialogueOpen, "Locked chapter gate did not explain its requirement");
emitKey("e");
assert(!game.state.dialogueOpen, "E did not close the locked gate notice");

function openChapter(id) {
  const exhibit = game.interactables.find((item) => item.id === id);
  game.state.player = { x: exhibit.x, y: exhibit.y };
  game.interact();
  assert(game.state.viewerOpen, `Content viewer did not open for ${id}`);
  assert(!game.state.dialogueOpen, `${id} incorrectly opened dialogue instead of the content viewer`);
  assert(elements["viewer-page"].textContent === "01", `${id} did not start on page 01`);
  assert(elements["viewer-page-total"].textContent === "03", `${id} did not expose its total page count`);
  assert(elements["viewer-paragraphs"].children.length > 0, `${id} did not render paragraph content`);
}

openChapter("base");
assert(elements["viewer-image-count"].textContent === "0 / 0", "Empty image slot did not degrade cleanly");
assert(!elements["viewer-image-placeholder"].classList.contains("hidden"), "Empty image slot was hidden");
emitKey("e");
assert(game.state.viewerOpen, "E unexpectedly closed the content viewer");
elements["viewer-close"].click();
assert(!game.state.viewerOpen && !game.state.evidence.has("base"), "Closing an unfinished chapter incorrectly completed it");

game.contentById.get("base").sections[0].images.push({ src: "./assets/ch01-factory.jpg", alt: "Nhà máy tư liệu", caption: "Ảnh tư liệu chương 01." });
openChapter("base");
assert(elements["viewer-image-count"].textContent === "1 / 1", "Image metadata did not render");
assert(!elements["viewer-image"].classList.contains("hidden"), "Configured image was not shown");
elements["viewer-image"].onerror();
assert(elements["viewer-image-placeholder"].classList.contains("hidden") === false, "Missing image did not fall back to the image slot");
elements["viewer-close"].click();
openChapter("base");
elements["viewer-image"].onload();
assert(!elements["viewer-image"].classList.contains("hidden"), "Loaded image did not remain visible");
elements["viewer-image"].click();
assert(!elements["image-lightbox"].classList.contains("hidden"), "Image click did not open detail view");
emitKey("escape");
assert(elements["image-lightbox"].classList.contains("hidden"), "Escape did not close image detail view");

function finishOpenChapter(id) {
  assert(game.state.viewerChapter === id, `Wrong active chapter: expected ${id}`);
  elements["viewer-next"].click();
  assert(game.state.viewerPage === 1, `${id} did not advance to page 02`);
  elements["viewer-next"].click();
  assert(game.state.viewerPage === 2, `${id} did not advance to page 03`);
  elements["viewer-next"].click();
  assert(!game.state.viewerOpen, `${id} did not close after chapter completion`);
  assert(game.state.evidence.has(id), `${id} was not recorded after the final content panel`);
}

finishOpenChapter("base");
assert(game.canMove(710, 600), "Chapter 02 gate remained blocked after chapter 01");
game.state.player = { x: 710, y: 600 };
game.interact();
assert(game.state.player.x > 770, "Opening chapter 02 gate did not move player into chapter 02");
assert(!game.canMove(1390, 600), "Chapter 03 gate was passable before chapter 02");

openChapter("class");
finishOpenChapter("class");
assert(game.canMove(1390, 600), "Chapter 03 gate remained blocked after chapter 02");
game.state.player = { x: 1390, y: 600 };
game.interact();
assert(game.state.player.x > 1450, "Opening chapter 03 gate did not move player into chapter 03");
assert(!game.canMove(2070, 600), "Chapter 04 gate was passable before chapter 03");

openChapter("state");
finishOpenChapter("state");
assert(game.canMove(2070, 600), "Chapter 04 gate remained blocked after chapter 03");
game.state.player = { x: 2070, y: 600 };
game.interact();
assert(game.state.player.x > 2130, "Opening chapter 04 gate did not move player into chapter 04");

openChapter("revolt");
finishOpenChapter("revolt");
assert(game.state.evidence.size === 4, "Chapter counter did not reach 4/4");
game.state.player = { x: 2550, y: 920 };
game.interact();
assert(!game.state.running, "Final gate did not end the exhibition");
assert(!elements["ending-screen"].classList.contains("hidden"), "Ending screen did not appear");
assert(elements["ending-evidence"].textContent === "4/4", "Ending chapter count is wrong");
assert(elements["ending-pages"].textContent === "12", "Ending page count is wrong");
assert(elements["ending-images"].textContent === "1", "Ending image count is wrong");
elements["ending-exit-button"].click();
assert(!elements["quit-screen"].classList.contains("hidden"), "Ending exit did not open thank-you screen");
elements["return-title-button"].click();
assert(!elements["title-screen"].classList.contains("hidden"), "Return-to-title did not restore title screen");

console.log("PASS: content-first viewer, E-only reading, image detail flow, linear gates, collision, ending, quit, and restart paths");
