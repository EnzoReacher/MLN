import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../dist/vendor/three.min.js", import.meta.url), "utf8");
const sandbox = { console: { warn() {}, log() {} } };
vm.runInNewContext(source, sandbox);

if (typeof sandbox.THREE !== "object" || typeof sandbox.THREE.WebGLRenderer !== "function") {
  throw new Error("Vendored Three.js did not expose WebGLRenderer globally");
}

if (sandbox.THREE.REVISION !== "159") {
  throw new Error(`Unexpected vendored Three.js revision: ${sandbox.THREE.REVISION}`);
}

console.log("PASS: vendored Three.js runtime exposes WebGLRenderer (r159)");
