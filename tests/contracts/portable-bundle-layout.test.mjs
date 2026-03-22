import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

test("portable bundle only installs .github as the default surface", () => {
  assert.equal(existsSync(".github/ux-standard.config.json"), false);
  assert.match(
    readFileSync("README.md", "utf8"),
    /Copy this bundle's `\.github\/` directory/i,
  );
  assert.match(readFileSync("AGENTS.md", "utf8"), /runtime/i);
});
