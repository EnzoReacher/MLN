import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../dist/app.js", import.meta.url), "utf8");
class ClassList { constructor() { this.values = new Set(); } add(...names) { names.forEach((name) => this.values.add(name)); } remove(...names) { names.forEach((name) => this.values.delete(name)); } toggle(name, force) { const next = force === undefined ? !this.values.has(name) : force; next ? this.add(name) : this.remove(name); return next; } contains(name) { return this.values.has(name); } }
class Element { constructor(id = "") { this.id = id; this.classList = new ClassList(); this.style = {}; this.textContent = ""; this._innerHTML = ""; this.listeners = {}; this.children = []; this.hidden = false; } get innerHTML() { return this._innerHTML; } set innerHTML(value) { this._innerHTML = value; this.children = []; } addEventListener(type, handler) { (this.listeners[type] ??= []).push(handler); } click() { for (const handler of this.listeners.click ?? []) handler({ currentTarget: this }); } append(child) { this.children.push(child); } }
const noop = () => {};
const context = { clearRect: noop, save: noop, restore: noop, translate: noop, fillRect: noop, strokeRect: noop, beginPath: noop, moveTo: noop, lineTo: noop, stroke: noop, fill: noop, arc: noop, fillText: noop, measureText: (text) => ({ width: String(text).length * 6 }), createRadialGradient: () => ({ addColorStop: noop }), setTransform: noop };
const ids = ["game-canvas", "title-screen", "game-ui", "dialogue", "ending-screen", "quit-screen", "interaction-prompt", "prompt-text", "zone-name", "zone-index", "status-text", "evidence-count", "objective-text", "dialogue-title", "dialogue-body", "dialogue-type", "dialogue-number", "dialogue-choices", "dialogue-close", "start-button", "restart-button", "quit-button", "return-title-button", "ending-exit-button", "theory-button", "theory-note", "ending-evidence", "ending-power", "ending-conflict", "ending-copy"];
const elements = Object.fromEntries(ids.map((id) => [id, new Element(id)]));
elements["game-canvas"].getContext = () => context;
elements["mini-player"] = new Element("mini-player");
const document = { getElementById: (id) => elements[id] ?? null, querySelector: (selector) => selector === ".mini-player" ? elements["mini-player"] : null, createElement: () => new Element() };
const window = { devicePixelRatio: 1, addEventListener: noop, __THE_STATE__: null };
const sandbox = { document, window, innerWidth: 1280, innerHeight: 720, performance: { now: () => 100 }, requestAnimationFrame: noop, console };
vm.runInNewContext(source, sandbox);
const game = sandbox.window.__THE_STATE__;
const assert = (condition, message) => { if (!condition) throw new Error(message); };

game.start();
assert(game.state.running, "Game did not start");
assert(elements["title-screen"].classList.contains("hidden"), "Title screen did not hide");
assert(elements["game-ui"].classList.contains("hidden") === false, "Game HUD did not appear");
elements["quit-button"].click();
assert(!game.state.running, "Quit button did not stop the game");
assert(!elements["quit-screen"].classList.contains("hidden"), "Quit screen did not appear");
assert(elements["game-ui"].classList.contains("hidden"), "Game HUD remained visible after quitting");
elements["return-title-button"].click();
assert(!elements["title-screen"].classList.contains("hidden"), "Return-to-title button did not work");
game.start();
assert(game.rooms.length === 4, "Expected four exhibition rooms");
assert(game.interactables.filter((item) => item.kind === "exhibit").length === 4, "Expected four exhibits");
assert(game.canMove(700, 400), "Open floor was incorrectly blocked");
assert(!game.canMove(750, 400), "Wall collision failed");

function reachable(from, to) {
  const step = 20;
  const queue = [[Math.round(from.x / step) * step, Math.round(from.y / step) * step]];
  const visited = new Set(queue.map(([x, y]) => `${x},${y}`));
  while (queue.length) {
    const [x, y] = queue.shift();
    if (Math.hypot(x - to.x, y - to.y) < 45) return true;
    for (const [dx, dy] of [[step, 0], [-step, 0], [0, step], [0, -step]]) {
      const next = [x + dx, y + dy];
      const key = `${next[0]},${next[1]}`;
      if (next[0] >= 80 && next[0] <= 2320 && next[1] >= 80 && next[1] <= 1420 && !visited.has(key) && game.canMove(next[0], next[1])) { visited.add(key); queue.push(next); }
    }
  }
  return false;
}

for (const exhibit of game.interactables.filter((item) => item.kind === "exhibit")) assert(reachable({ x: 250, y: 1220 }, exhibit), `No walkable route to ${exhibit.id}`);

const exhibits = game.interactables.filter((item) => item.kind === "exhibit");
for (const exhibit of exhibits) {
  game.state.player = { x: exhibit.x, y: exhibit.y };
  game.interact();
  assert(game.state.dialogueOpen, `Dialogue did not open for ${exhibit.id}`);
  assert(elements["dialogue-choices"].children.length === 2, `${exhibit.id} did not expose two choices`);
  elements["dialogue-choices"].children[0].click();
  assert(game.state.evidence.has(exhibit.id), `${exhibit.id} evidence was not collected`);
  elements["dialogue-close"].click();
  assert(!game.state.dialogueOpen, `${exhibit.id} dialogue did not close`);
}
assert(game.state.evidence.size === 4, "Evidence counter did not reach 4/4");
game.state.player = { x: 2180, y: 1115 };
game.interact();
assert(game.state.dialogueOpen, "Final gate did not open");
elements["dialogue-choices"].children[0].click();
elements["dialogue-close"].click();
assert(!game.state.running, "Ending did not stop the game loop");
assert(!elements["ending-screen"].classList.contains("hidden"), "Ending screen did not appear");
elements["ending-exit-button"].click();
assert(!elements["quit-screen"].classList.contains("hidden"), "Ending exit button did not open the thank-you screen");

console.log("PASS: start, HUD, four-room navigation model, wall collision, four evidence interactions, final gate, and ending");
