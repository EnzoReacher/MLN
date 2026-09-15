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
elements["mini-player"] = new Element("mini-player");
elements["viewer-layout"] = new Element("viewer-layout");
elements["viewer-visual"] = new Element("viewer-visual");

const document = {
  getElementById: (id) => elements[id] ?? null,
  querySelector: (selector) => selector === ".mini-player" ? elements["mini-player"] : selector === ".viewer-layout" ? elements["viewer-layout"] : selector === ".viewer-visual" ? elements["viewer-visual"] : null,
  createElement: () => new Element()
};
const windowListeners = {};
const window = {
  devicePixelRatio: 1,
  addEventListener: (type, handler) => { (windowListeners[type] ??= []).push(handler); },
  THE_STATE_CONTENT: undefined,
  THREE: undefined,
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
const item = (id) => game.interactables.find((entry) => entry.id === id);
const gate = (id) => item(id);

game.start();
assert(game.state.running, "Game did not start");
assert(game.state.player.x === 0 && game.state.player.z === 7, "Game did not start at the entrance");
assert(elements["title-screen"].classList.contains("hidden"), "Title screen did not hide");
assert(!elements["game-ui"].classList.contains("hidden"), "Game HUD did not appear");
assert(game.content.length === 4 && game.content.every((chapter) => chapter.sections.length === 3), "Content contract did not load four three-panel chapters");
assert(game.content.every((chapter) => chapter.sections.every((section) => section.paragraphs.length <= 2)), "Gallery copy is longer than the compact two-paragraph format");
assert(Math.max(...game.content.flatMap((chapter) => chapter.sections.flatMap((section) => section.paragraphs.map((paragraph) => paragraph.length)))) <= 300, "A gallery paragraph is too long to read comfortably");
assert(game.content.every((chapter) => chapter.sections.every((section) => section.images.every((image) => image.alt && image.topic && image.caption))), "Every gallery image must retain its alt text, concept tag and topic-linked caption");
assert(game.rooms.length === 4 && game.gates.length === 4, "3D gallery did not expose four rooms and four gates");
assert(game.rooms.every((room) => room.artworks?.length === 3), "Each gallery room should have three wall artworks");
assert(game.rooms[0].artworks[0].image === "./assets/ch02-feudal-state.webp" && game.rooms[0].artworks[1].image === "./assets/ch02-bourgeois-transition.webp", "Room 01 still uses duplicate historical-figure wall portraits");
assert(game.rooms[2].artworks[0].image === "./assets/ch03-state-rally.webp", "Room 03 still uses the Karl Marx wall image instead of the supplied replacement");
assert(Object.keys(game.roomPlants).length === 4 && Object.values(game.roomPlants).every((plants) => plants.length === 2 && plants.every((plant) => Math.abs(plant.side) === 1 && Math.abs(plant.zOffset) >= 8)), "Each room should have two far-corner plant specs");
assert(Object.keys(game.roomHonors).length === 4 && Object.values(game.roomHonors).every((honor) => honor.image && honor.name && honor.role && honor.topic), "Each room should have one topic-linked central historical figure display");
assert(game.roomHonors.state.image === "./assets/ch03-ho-chi-minh-hero.webp" && game.roomHonors.state.special === true, "Room 03 should use the selected special Hồ Chí Minh centerpiece portrait");
assert(game.content.find((chapter) => chapter.id === "state")?.sections[0]?.images[0]?.src === "./assets/ch03-state-rally.webp", "Room 03 replacement image is not connected to its exhibit content");
assert(game.content.find((chapter) => chapter.id === "class")?.sections[2]?.images.length === 1, "Historical state-types exhibit should use one representative image");
for (const room of game.rooms) {
  const primary = item(room.id);
  assert(primary.x === (room.artworks[0].wall === "right" ? 5.15 : -5.15), `${room.id} exhibit interaction is not aligned with its wall`);
  assert(primary.z === room.centerZ + room.artworks[0].zOffset, `${room.id} exhibit interaction is not aligned with its artwork center`);
}
const exhibits = game.interactables.filter((entry) => entry.kind === "exhibit");
assert(exhibits.length === 12, "The gallery should expose twelve painting interactions");
for (const room of game.rooms) {
  const roomExhibits = exhibits.filter((entry) => entry.chapterId === room.id);
  const chapter = game.contentById.get(room.id);
  assert(roomExhibits.length === 3, `${room.id} does not expose three painting interactions`);
  room.artworks.forEach((artwork, index) => {
    const exhibit = roomExhibits.find((entry) => entry.artworkIndex === index);
    assert(exhibit?.sectionIndex === index, `${room.id} painting ${index + 1} is not linked to its content panel`);
    assert(chapter.sections[index].images.some((image) => image.src === artwork.image), `${room.id} painting ${index + 1} is not paired with its content image`);
    assert(exhibit.x === (artwork.wall === "right" ? 5.15 : -5.15), `${room.id} painting ${index + 1} interaction is not aligned with its wall`);
    assert(exhibit.z === room.centerZ + (artwork.zOffset || 0), `${room.id} painting ${index + 1} interaction is not aligned with its center`);
  });
}
game.drawWorld();

game.state.player = { x: item("curator").x, z: item("curator").z };
game.interact();
assert(game.state.dialogueOpen, "Curator guidance did not open");
elements["dialogue-close"].click();
assert(!game.state.dialogueOpen, "Curator guidance did not close");

assert(!game.canMove(0, gate("gate-class").z), "Chapter 02 gate was passable before chapter 01");
game.state.player = { x: gate("gate-class").x, z: gate("gate-class").z + 1 };
game.interact();
assert(game.state.dialogueOpen, "Locked chapter gate did not explain its requirement");
emitKey("e");
assert(!game.state.dialogueOpen, "E did not close the locked gate notice");

function openChapter(id) {
  const exhibit = item(id);
  game.state.player = { x: exhibit.x, z: exhibit.z };
  game.interact();
  assert(game.state.viewerOpen, `Content viewer did not open for ${id}`);
  assert(!game.state.dialogueOpen, `${id} incorrectly opened dialogue instead of the content viewer`);
  assert(elements["viewer-page"].textContent === "01", `${id} did not start on page 01`);
  assert(elements["viewer-page-total"].textContent === "03", `${id} did not expose its total page count`);
  assert(elements["viewer-kicker"].textContent.includes("TRANH 01"), `${id} did not identify the selected painting`);
  assert(elements["viewer-paragraphs"].children.length > 0, `${id} did not render paragraph content`);
}

openChapter("base");
assert(elements["viewer-image-count"].textContent === "1 / 1", "Supplied chapter image metadata did not render");
assert(!elements["viewer-image"].classList.contains("hidden"), "Supplied chapter image was not shown");
emitKey("e");
assert(game.state.viewerOpen, "E unexpectedly closed the content viewer");
elements["viewer-close"].click();
assert(!game.state.viewerOpen && !game.state.evidence.has("base"), "Closing an unfinished chapter incorrectly completed it");

elements["viewer-image"].onerror();
assert(!elements["viewer-image-placeholder"].classList.contains("hidden"), "Missing image did not fall back to the image slot");
elements["viewer-close"].click();
openChapter("base");
elements["viewer-image"].onload();
assert(!elements["viewer-image"].classList.contains("hidden"), "Loaded image did not remain visible");
elements["viewer-image"].click();
assert(!elements["image-lightbox"].classList.contains("hidden"), "Image click did not open detail view");
emitKey("escape");
assert(elements["image-lightbox"].classList.contains("hidden"), "Escape did not close image detail view");
elements["viewer-close"].click();

const secondaryBaseExhibit = item("base-artwork-2");
game.state.player = { x: secondaryBaseExhibit.x, z: secondaryBaseExhibit.z };
game.interact();
assert(game.state.viewerOpen && game.state.viewerPage === 1, "E on a secondary painting did not open its linked content panel");
assert(elements["viewer-kicker"].textContent.includes("TRANH 02"), "Secondary painting opened the wrong exhibit label");
assert(!game.state.evidence.has("base"), "Opening a secondary painting completed the room too early");
elements["viewer-next"].click();
assert(!game.state.viewerOpen && !game.state.evidence.has("base"), "Closing a secondary painting changed the room progression");
openChapter("base");

function finishOpenChapter(id) {
  assert(game.state.viewerChapter === id, `Wrong active chapter: expected ${id}`);
  assert(game.state.viewerArtworkIndex === 0, `${id} progression did not use the primary painting`);
  elements["viewer-next"].click();
  assert(!game.state.viewerOpen, `${id} did not close after chapter completion`);
  assert(game.state.evidence.has(id), `${id} was not recorded after closing the primary painting`);
}

function passGate(id, nextRoomId) {
  const nextGate = gate(id);
  assert(!game.canMove(0, nextGate.z), `${id} was not held at the gate before E`);
  game.state.player = { x: nextGate.x, z: nextGate.z + 1 };
  game.interact();
  assert(game.state.passedGates.has(id), `${id} did not open after the chapter was completed`);
  assert(game.state.player.z < nextGate.z, `${id} did not move the player through the doorway`);
  assert(game.state.player.z < game.rooms.find((room) => room.id === nextRoomId).zBack, `${id} did not place player inside the next room`);
}

finishOpenChapter("base");
passGate("gate-class", "class");
assert(!game.canMove(0, gate("gate-state").z), "Chapter 03 gate was passable before chapter 02");

openChapter("class");
assert(elements["viewer-layout"].classList.contains("content-only"), "The wide Room 02 image did not switch the viewer to content-only mode");
assert(elements["viewer-visual"].classList.contains("hidden"), "The wide Room 02 image was still displayed after pressing E");
assert(elements["viewer-image"].classList.contains("hidden"), "The content-only exhibit still exposed its image element");
assert(elements["viewer-paragraphs"].children.length > 0, "The content-only exhibit lost its readable text");
elements["viewer-close"].click();
const thirdClassExhibit = item("class-artwork-3");
game.state.player = { x: thirdClassExhibit.x, z: thirdClassExhibit.z };
game.interact();
assert(game.state.viewerOpen && game.state.viewerPage === 2, "E on the third painting did not open its linked content panel");
elements["viewer-next"].click();
assert(!game.state.viewerOpen && !game.state.evidence.has("class"), "Closing the third painting incorrectly completed the chapter");
openChapter("class");
finishOpenChapter("class");
passGate("gate-state", "state");
assert(!game.canMove(0, gate("gate-revolt").z), "Chapter 04 gate was passable before chapter 03");

openChapter("state");
finishOpenChapter("state");
passGate("gate-revolt", "revolt");

openChapter("revolt");
finishOpenChapter("revolt");
assert(game.state.evidence.size === 4, "Chapter counter did not reach 4/4");
game.state.player = { x: gate("gate-end").x, z: gate("gate-end").z + 1 };
game.interact();
assert(!game.state.running, "Final gate did not end the exhibition");
assert(!elements["ending-screen"].classList.contains("hidden"), "Ending screen did not appear");
assert(elements["ending-evidence"].textContent === "4/4", "Ending chapter count is wrong");
assert(elements["ending-pages"].textContent === String(game.state.viewedPages.size), "Ending page count is wrong");
assert(elements["ending-images"].textContent === "1", "Ending image count is wrong");
elements["ending-exit-button"].click();
assert(!elements["quit-screen"].classList.contains("hidden"), "Ending exit did not open thank-you screen");
elements["return-title-button"].click();
assert(!elements["title-screen"].classList.contains("hidden"), "Return-to-title did not restore title screen");

console.log("PASS: 3D gallery state, WASD movement gates, E-only content viewer, image detail flow, ending, quit, and restart paths");
