import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const skill = readFileSync(".github/skills/project-context/SKILL.md", "utf8");
const reference = readFileSync(
  ".github/skills/project-context/references/workspace-agents.md",
  "utf8",
);

test("project-context owns runtime AGENTS bootstrap", () => {
  assert.match(skill, /create a concise baseline version/i);
  assert.match(skill, /as soon as/i);
  assert.match(reference, /target project's `AGENTS\.md` belongs/i);
});
