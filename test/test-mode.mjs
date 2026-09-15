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
    this.style = { setProperty() {}, removeProperty() {} };
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
  querySelector(selector) { if (selector === "span") return this._span ??= new Element(`${this.id}-span`); return null; }
}

const ids = [
  "game-canvas", "title-screen", "game-ui", "dialogue", "ending-screen", "quit-screen", "runtime-error", "runtime-error-message",
  "interaction-prompt", "prompt-text", "zone-name", "zone-index", "status-text", "evidence-count", "objective-text",
  "dialogue-title", "dialogue-body", "dialogue-type", "dialogue-number", "dialogue-close", "content-viewer", "viewer-kicker",
  "viewer-title", "viewer-page", "viewer-page-total", "viewer-progress-bar", "viewer-section-label", "viewer-section-title",
  "viewer-lead", "viewer-paragraphs", "viewer-image-placeholder", "viewer-image", "viewer-caption", "viewer-image-count",
  "viewer-prev-image", "viewer-next-image", "viewer-note", "viewer-next", "viewer-close", "image-lightbox", "lightbox-image",
  "lightbox-caption", "lightbox-close", "start-button", "restart-button", "quit-button", "return-title-button", "ending-exit-button",
  "theory-button", "theory-note", "ending-evidence", "ending-pages", "ending-images", "ending-copy", "runtime-reload-button",
  "test-mode-badge"
];
const elements = Object.fromEntries(ids.map((id) => [id, new Element(id)]));
elements["mini-player"] = new Element("mini-player");
elements["viewer-layout"] = new Element("viewer-layout");
elements["viewer-visual"] = new Element("viewer-visual");

const documentListeners = {};
const document = {
  getElementById: (id) => elements[id] ?? null,
  querySelector: (selector) => selector === ".mini-player" ? elements["mini-player"] : null,
  createElement: () => new Element(),
  addEventListener: (type, handler) => { (documentListeners[type] ??= []).push(handler); },
  exitPointerLock() {},
  pointerLockElement: null
};
const windowListeners = {};
const window = {
  devicePixelRatio: 1,
  location: { search: "?test=1" },
  addEventListener: (type, handler) => { (windowListeners[type] ??= []).push(handler); },
  THE_STATE_CONTENT: undefined,
  THREE: undefined,
  __THE_STATE__: null
};
const sandbox = {
  document, window, URLSearchParams, innerWidth: 1280, innerHeight: 720,
  performance: { now: () => 100 }, requestAnimationFrame: () => {}, console, Math, Set, Map, String
};

vm.runInNewContext(contentSource, sandbox);
vm.runInNewContext(source, sandbox);
const game = sandbox.window.__THE_STATE__;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const emitKey = (key) => { for (const handler of windowListeners.keydown ?? []) handler({ key, preventDefault() {} }); };

game.start();
assert(game.testMode && game.state.testMode, "?test=1 did not enable test mode");
assert(game.state.noclip, "Test mode did not start with noclip enabled");
assert(!elements["test-mode-badge"].classList.contains("hidden"), "Test mode badge is hidden");
assert(elements["test-mode-badge"].innerHTML.includes("NOCLIP ON"), "Test mode badge does not show noclip status");
assert(game.canMove(12, -12), "Test mode did not bypass gallery wall bounds");

game.state.player = { x: 0, z: -10 };
assert(game.canMove(0, -13), "Test mode did not bypass a chapter gate");
emitKey("n");
assert(!game.state.noclip, "N did not disable noclip in test mode");
assert(!game.canMove(0, -13), "Disabling noclip did not restore gate collision");
assert(elements["test-mode-badge"].innerHTML.includes("NOCLIP OFF"), "Test mode badge did not update after N");
emitKey("n");
assert(game.state.noclip && game.canMove(0, -13), "N did not re-enable noclip");

console.log("PASS: opt-in ?test=1 mode enables bounded noclip, bypasses gates, and toggles with N");
