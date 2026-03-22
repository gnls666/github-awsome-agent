import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const agent = readFileSync(".github/agents/ux-standard.agent.md", "utf8");

test("agent file is the primary routing contract", () => {
  assert.match(agent, /intent/i);
  assert.match(agent, /mode/i);
  assert.match(agent, /project-context/i);
  assert.match(agent, /AGENTS\.md/i);
  assert.equal(existsSync(".github/copilot-instructions.md"), false);
});
