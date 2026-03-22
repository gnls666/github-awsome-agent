import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const agent = readFileSync(".github/agents/ux-standard.agent.md", "utf8");
const planToSpec = readFileSync(".github/skills/plan-to-spec/SKILL.md", "utf8");
const specSchema = readFileSync(
  ".github/skills/plan-to-spec/references/spec-schema.md",
  "utf8",
);
const buildFromSpec = readFileSync(".github/skills/build-from-spec/SKILL.md", "utf8");
const postGeneration = readFileSync(".github/skills/post-generation/SKILL.md", "utf8");
const qualityGate = readFileSync(".github/skills/quality-gate/SKILL.md", "utf8");

test("generate path stays spec-bounded and must verify before completion", () => {
  assert.match(agent, /quality-gate/i);
  assert.match(agent, /do not leave a broken generated workspace/i);
  assert.match(planToSpec, /verification/i);
  assert.match(planToSpec, /keep `pages` as simple page names/i);
  assert.match(planToSpec, /smallest phase|first phase|phase/i);
  assert.match(specSchema, /"typecheck": true/i);
  assert.match(specSchema, /"test": true/i);
  assert.match(specSchema, /"build": true/i);
  assert.match(buildFromSpec, /run `quality-gate`/i);
  assert.match(buildFromSpec, /do not invent broad follow-up work outside the spec/i);
  assert.match(postGeneration, /apply only the tasks listed/i);
  assert.match(postGeneration, /hand off to `quality-gate`/i);
  assert.match(qualityGate, /do not report generation complete until the requested checks pass/i);
});
