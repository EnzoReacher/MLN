import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../dist/app.js", import.meta.url), "utf8");

class ClassList {
  constructor() { this.values = new Set(); }
  add(...names) { names.forEach((name) => this.values.add(name)); }
  remove(...names) { names.forEach((name) => this.values.delete(name)); }
  toggle(name, force) { const next = force === undefined ? !this.values.has(name) : force; next ? this.add(name) : this.remove(name); return next; }
  contains(name) { return this.values.has(name); }
}

class Element {
  constructor(id = "") { this.id = id; this.classList = new ClassList(); this.style = {}; this.textContent = ""; this.disabled = false; this.dataset = {}; this.listeners = {}; this.children = []; this._html = ""; }
  addEventListener(type, handler) { (this.listeners[type] ??= []).push(handler); }
  click() { if (this.disabled) throw new Error(`Clicked disabled element: ${this.id}`); for (const handler of this.listeners.click ?? []) handler({ currentTarget: this }); }
  querySelector(selector) { return selector === "span" ? (this.children.find((child) => child.tagName === "SPAN") ?? new Element()) : new Element(); }
  scrollIntoView() {}
}

const ids = [
  "intro-screen", "game-screen", "result-screen", "start-button", "restart-button", "play-again-button", "event-card", "event-counter", "chapter-name", "cycle-label", "event-index", "event-category", "event-question", "event-context", "choices", "feedback", "feedback-title", "feedback-copy", "delta-list", "next-button", "world-status", "map-phase", "production-chip", "inequality-chip", "state-chip", "conflict-chip", "production-value", "inequality-value", "conflict-value", "stability-value", "state-value", "production-bar", "inequality-bar", "conflict-bar", "stability-bar", "state-bar", "result-sequence", "result-title", "result-summary", "result-score-value", "result-core-word", "journey", "debrief-button", "debrief"
];
const elements = Object.fromEntries(ids.map((id) => [id, new Element(id)]));
const documentListeners = {};

elements["game-screen"].classList.add("hidden");
elements["result-screen"].classList.add("hidden");
elements.feedback.classList.add("hidden");
elements.debrief.classList.add("hidden");
Object.defineProperty(elements.choices, "innerHTML", {
  get() { return this._html; },
  set(value) {
    this._html = value;
    this.children = [...value.matchAll(/data-choice="(\d+)"/g)].map((match) => {
      const button = new Element();
      button.tagName = "BUTTON";
      button.dataset.choice = match[1];
      button.classList.add("choice");
      return button;
    });
  }
});

const document = {
  getElementById: (id) => elements[id] ?? null,
  querySelectorAll: (selector) => selector === ".choice" ? elements.choices.children : [],
  addEventListener: (type, handler) => { (documentListeners[type] ??= []).push(handler); }
};
const window = { scrollTo() {} };
vm.runInNewContext(source, { document, window, console });

function emit(type, event) { for (const handler of documentListeners[type] ?? []) handler(event); }
function assert(condition, message) { if (!condition) throw new Error(message); }
function assertStatsInRange() {
  for (const key of ["production", "inequality", "conflict", "stability", "state"]) {
    const value = Number(elements[`${key}-value`].textContent);
    assert(value >= 0 && value <= 100, `${key} escaped 0–100: ${value}`);
  }
}

let paths = 0;
for (let path = 0; path < 3 ** 5; path += 1) {
  let code = path;
  elements["start-button"].click();
  assert(elements["event-counter"].textContent === "SỰ KIỆN 01 / 05", "Start did not reset counter");
  for (let eventIndex = 0; eventIndex < 5; eventIndex += 1) {
    const choiceIndex = code % 3;
    code = Math.floor(code / 3);
    assert(elements.choices.children.length === 3, `Event ${eventIndex + 1} did not render 3 choices`);
    if (eventIndex === 0) emit("keydown", { key: String.fromCharCode(65 + choiceIndex) });
    else elements.choices.children[choiceIndex].click();
    const selected = elements.choices.children[choiceIndex];
    assert(selected.classList.contains("selected"), `Event ${eventIndex + 1} selection not marked`);
    assert(elements.choices.children.filter((button) => !button.classList.contains("selected")).every((button) => button.disabled), "Unselected choice remained enabled");
    assert(!elements.feedback.classList.contains("hidden"), `Event ${eventIndex + 1} feedback did not appear`);
    assertStatsInRange();
    emit("keydown", { key: "Enter" });
  }
  assert(!elements["result-screen"].classList.contains("hidden"), `Path ${path} did not reach result`);
  assert((elements.journey.innerHTML.match(/journey-step/g) ?? []).length === 5, `Path ${path} has incomplete journey`);
  paths += 1;
}

function playPath(choiceIndexes) {
  elements["start-button"].click();
  for (const choiceIndex of choiceIndexes) {
    elements.choices.children[choiceIndex].click();
    elements["next-button"].click();
  }
  return elements["result-title"].innerHTML;
}

const stableEnding = playPath([0, 0, 0, 0, 1]);
assert(stableEnding.includes("TRẬT TỰ"), "Stable path did not produce the stable ending");
const transformedEnding = playPath([1, 1, 1, 2, 2]);
assert(transformedEnding.includes("MÂU THUẪN"), "High-conflict path did not produce the transformed ending");

elements["debrief-button"].click();
assert(!elements.debrief.classList.contains("hidden"), "Debrief did not open");
elements["debrief-button"].click();
assert(elements.debrief.classList.contains("hidden"), "Debrief did not close");
elements["restart-button"].click();
assert(elements["event-counter"].textContent === "SỰ KIỆN 01 / 05", "Restart did not reset the game");
elements["play-again-button"].click();
assert(!elements["game-screen"].classList.contains("hidden"), "Play again did not return to game");

console.log(`PASS: ${paths}/243 gameplay paths; keyboard A/B/C + Enter; selection locking; stat bounds; debrief; restart; play-again`);
