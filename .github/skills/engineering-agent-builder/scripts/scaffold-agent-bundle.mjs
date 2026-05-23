#!/usr/bin/env node

import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    if (!current.startsWith("--")) {
      throw new Error(`Unexpected argument: ${current}`);
    }
    const key = current.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      args[key] = "true";
    } else {
      args[key] = next;
      index += 1;
    }
  }
  return args;
}

function requireKebab(value, name) {
  if (!/^[a-z][a-z0-9-]*$/.test(value)) {
    throw new Error(`${name} must be kebab-case: ${value}`);
  }
}

function titleize(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function writeNewFile(root, relativePath, content, force) {
  const fullPath = join(root, relativePath);
  if (existsSync(fullPath) && !force) {
    throw new Error(`Refusing to overwrite existing file: ${relativePath}`);
  }
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, content.trimStart(), "utf8");
}

const args = parseArgs(process.argv.slice(2));
const root = args.root || process.cwd();
const agentName = args["agent-name"];
if (!agentName) {
  throw new Error("Missing --agent-name");
}
requireKebab(agentName, "--agent-name");

const skillName = args["skill-name"] || `${agentName}-workflow`;
requireKebab(skillName, "--skill-name");

const force = args.force === "true";
const humanName = args["human-name"] || titleize(agentName);
const domain =
  args.domain ||
  "maintain existing software projects with repository-aware edits and verification";
const description =
  args.description ||
  `Maintain and improve ${domain} with focused skills and benchmark evidence`;
const verification =
  args.verification ||
  "<replace with the smallest relevant build, test, typecheck, or lint command>";

writeNewFile(
  root,
  `.github/agents/${agentName}.agent.md`,
  `---
name: ${agentName}
description: ${description}
target: vscode
tools: ["vscode", "execute", "read", "edit", "search", "todo"]
---

# ${humanName}

## Identity

You are \`${agentName}\`, a custom engineering agent for ${domain}.

## Scope

- Inspect the target repository before proposing broad changes.
- Maintain or improve the requested area with small, verified edits.
- Use focused skills for domain-specific build, test, framework, or review rules.

## Non-Goals

- Do not perform broad rewrites without explicit approval.
- Do not invent external tools or MCP APIs unless the task needs real external state or actions.
- Do not report completion before verification passes or a concrete blocker is recorded.

## Kernel

Classify requests by:

- \`intent\`: maintain, refactor, generate, review, migrate, or benchmark
- \`mode\`: direct-execute or plan-first

Use \`plan-first\` for risky, multi-file, destructive, ambiguous, or benchmark-design work.
Use \`direct-execute\` for small, local, low-risk changes after context inspection.

## Skill Routing

1. Start with \`${skillName}\`.
2. Use narrower skills only when their trigger conditions are met.
3. Run the smallest relevant quality gate before completion.

## Completion Policy

Do not report completion until:

- target context is inspected
- changes stay inside the requested scope
- verification command is run or a concrete blocker is recorded
- benchmark evidence is updated when the task evaluates agent capability

## Output

- Context found
- Path taken
- Files changed
- Verification result
- Benchmark evidence, when applicable
- Remaining blockers
`,
  force,
);

writeNewFile(
  root,
  `.github/prompts/${agentName}.prompt.md`,
  `---
agent: ${agentName}
description: Use ${humanName} for repository-aware engineering work with verification
---

# /${agentName}

Use \`${agentName}\` for the requested engineering task.

## Rules

1. Inspect local repository context before edits.
2. Use \`${skillName}\` before applying domain-specific changes.
3. Keep changes scoped to the request.
4. Run the smallest relevant verification before completion.

## Expected Output

- Context
- Plan or action taken
- Verification
- Benchmark note when relevant
`,
  force,
);

writeNewFile(
  root,
  `.github/skills/${skillName}/SKILL.md`,
  `---
name: ${skillName}
description: Use when working on ${domain} and the agent needs repository-aware planning, implementation, verification, or benchmark evidence.
user-invokable: true
---

# ${titleize(skillName)}

Use this skill when ${domain}.

## Workflow

1. Inspect local project rules, manifests, source roots, and validation commands.
2. Identify the smallest safe task path: direct-execute or plan-first.
3. Keep language, framework, and build details in this skill or narrower skills.
4. Make only scoped changes.
5. Run verification:

\`\`\`bash
${verification}
\`\`\`

6. Record benchmark evidence when evaluating the agent.

## Guardrails

- Preserve local conventions.
- Ask only when repository facts are materially ambiguous.
- Prefer focused edits over rewrites.
- Do not report completion until verification passes or a concrete blocker is recorded.
`,
  force,
);

writeNewFile(
  root,
  `benchmarks/${agentName}/README.md`,
  `# ${humanName} Benchmark

## Goal

Evaluate whether \`${agentName}\` improves ${domain} compared with a generic Copilot baseline.

## Baseline

- Same model
- Same repository snapshot
- Generic Copilot or no custom agent

## Candidate

- Same model
- Same repository snapshot
- \`${agentName}\` plus generated skills

## Metrics

The benchmark uses a 100-point weighted score:

| Metric | Weight | Scale |
| --- | ---: | --- |
| \`resolved\` | 30 | boolean |
| \`verificationPass\` | 25 | boolean |
| \`instructionAdherence\` | 15 | 0-5 |
| \`skillActivationAccuracy\` | 10 | 0-5 |
| \`patchQuality\` | 15 | 0-5 |
| \`recoveryBehavior\` | 5 | 0-5 |
| \`cost\` | 0 | recorded only |

Default pass rule: total score >= 80 and both \`resolved\` and \`verificationPass\` are true.

## Evidence

Save prompt, transcript, diff, verification output, and result summary for each run.

## Scoring

Create a run JSON under \`runs/<timestamp>/result.json\`, then run:

\`\`\`bash
node benchmarks/${agentName}/scripts/score-run.mjs runs/<timestamp>/result.json
\`\`\`
`,
  force,
);

writeNewFile(
  root,
  `benchmarks/${agentName}/scoring.json`,
  JSON.stringify(
    {
      version: 1,
      totalPoints: 100,
      passThreshold: 80,
      hardGates: ["resolved", "verificationPass"],
      metrics: {
        resolved: {
          type: "boolean",
          weight: 30,
          description: "Task outcome is correct.",
        },
        verificationPass: {
          type: "boolean",
          weight: 25,
          description: "Declared verification command passes.",
        },
        instructionAdherence: {
          type: "rubric",
          scale: [0, 5],
          weight: 15,
          description: "Follows scope, inspect-first behavior, local rules, and plan-first policy when required.",
        },
        skillActivationAccuracy: {
          type: "rubric",
          scale: [0, 5],
          weight: 10,
          description: "Uses the right generated skill or explains why it is not applicable.",
        },
        patchQuality: {
          type: "rubric",
          scale: [0, 5],
          weight: 15,
          description: "Patch is minimal, maintainable, and avoids unrelated rewrites.",
        },
        recoveryBehavior: {
          type: "rubric",
          scale: [0, 5],
          weight: 5,
          description: "When verification fails, investigates and fixes or records a concrete blocker.",
        },
        cost: {
          type: "record",
          weight: 0,
          description: "Wall time, tool calls, tokens, and model cost when available.",
        },
      },
    },
    null,
    2,
  ),
  force,
);

writeNewFile(
  root,
  `benchmarks/${agentName}/report-template.md`,
  `# ${humanName} Benchmark Report

## Summary

- Score:
- Passed:
- Hard gates:
- Task:
- Model:
- Agent:

## Evidence

- Transcript:
- Diff:
- Verification output:
- Result JSON:

## Metric Notes

- resolved:
- verificationPass:
- instructionAdherence:
- skillActivationAccuracy:
- patchQuality:
- recoveryBehavior:
- cost:

## Review Notes

- Blocking issues:
- Follow-up:
`,
  force,
);

writeNewFile(
  root,
  `benchmarks/${agentName}/scripts/score-run.mjs`,
  `#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const runPath = process.argv[2];
if (!runPath) {
  throw new Error("Usage: node scripts/score-run.mjs <runs/.../result.json>");
}

const benchmarkRoot = resolve(new URL("..", import.meta.url).pathname);
const scoring = JSON.parse(readFileSync(join(benchmarkRoot, "scoring.json"), "utf8"));
const result = JSON.parse(readFileSync(resolve(runPath), "utf8"));

function metricValue(name, spec) {
  const value = result.metrics?.[name];
  if (spec.type === "boolean") {
    return value === true ? spec.weight : 0;
  }
  if (spec.type === "rubric") {
    const numeric = Number(value ?? 0);
    const max = spec.scale?.[1] ?? 5;
    return Math.max(0, Math.min(max, numeric)) / max * spec.weight;
  }
  return 0;
}

const metricScores = {};
let total = 0;
for (const [name, spec] of Object.entries(scoring.metrics)) {
  const score = metricValue(name, spec);
  metricScores[name] = Number(score.toFixed(2));
  total += score;
}

const hardGatesPass = scoring.hardGates.every((name) => result.metrics?.[name] === true);
const score = Number(total.toFixed(2));
const passed = hardGatesPass && score >= scoring.passThreshold;

const report = {
  score,
  passed,
  hardGatesPass,
  passThreshold: scoring.passThreshold,
  metricScores,
  result,
};

const runDir = dirname(resolve(runPath));
const reportPath = join(runDir, "report.md");
const reportJsonPath = join(runDir, "score.json");
mkdirSync(runDir, { recursive: true });
writeFileSync(reportJsonPath, JSON.stringify(report, null, 2), "utf8");
writeFileSync(
  reportPath,
  \`# Benchmark Report

## Summary

- Score: \${score}/\${scoring.totalPoints}
- Passed: \${passed ? "yes" : "no"}
- Hard gates passed: \${hardGatesPass ? "yes" : "no"}
- Task: \${result.taskId ?? "unknown"}
- Agent: \${result.agent ?? "unknown"}
- Model: \${result.model ?? "unknown"}

## Metric Scores

\${Object.entries(metricScores).map(([name, value]) => \`- \\\`\${name}\\\`: \${value}\`).join("\\\\n")}

## Evidence

- Transcript: \${result.evidence?.transcript ?? "not recorded"}
- Diff: \${result.evidence?.diff ?? "not recorded"}
- Verification: \${result.evidence?.verification ?? "not recorded"}

## Notes

\${result.notes ?? "No notes recorded."}
\`,
  "utf8",
);

console.log(JSON.stringify(report, null, 2));
if (!passed && process.env.BENCHMARK_STRICT === "1") {
  process.exitCode = 1;
}
`,
  force,
);

writeNewFile(
  root,
  `benchmarks/${agentName}/tasks/example-task.md`,
  `# Example Golden Task

## Task ID

\`${agentName}-001\`

## Setup

Use a representative repository snapshot for ${domain}.

## Prompt

Use \`${agentName}\` to inspect the repository, make the smallest safe fix or improvement, and verify the result.

## Allowed Tools

Read, search, edit, and execute local validation commands.

## Expected Scope

- Stay inside the requested repository area.
- Do not introduce unrelated architecture.
- Do not change external service behavior without explicit approval.

## Verification

\`\`\`bash
${verification}
\`\`\`

## Scoring

- \`resolved\`: pass/fail
- \`verificationPass\`: pass/fail
- \`instructionAdherence\`: 0-5
- \`skillActivationAccuracy\`: 0-5
- \`patchQuality\`: 0-5
- \`recoveryBehavior\`: 0-5

## Example Result JSON

\`\`\`json
{
  "taskId": "${agentName}-001",
  "agent": "${agentName}",
  "model": "<model>",
  "metrics": {
    "resolved": true,
    "verificationPass": true,
    "instructionAdherence": 5,
    "skillActivationAccuracy": 5,
    "patchQuality": 4,
    "recoveryBehavior": 4,
    "cost": {
      "wallTimeSeconds": 0,
      "toolCalls": 0
    }
  },
  "evidence": {
    "transcript": "transcript.md",
    "diff": "patch.diff",
    "verification": "verification.txt"
  },
  "notes": "Replace placeholder values with real run evidence."
}
\`\`\`
`,
  force,
);

mkdirSync(join(root, `benchmarks/${agentName}/runs`), { recursive: true });
writeNewFile(root, `benchmarks/${agentName}/runs/.gitkeep`, "", force);

console.log(
  JSON.stringify(
    {
      agentName,
      skillName,
      files: [
        `.github/agents/${agentName}.agent.md`,
        `.github/prompts/${agentName}.prompt.md`,
        `.github/skills/${skillName}/SKILL.md`,
        `benchmarks/${agentName}/README.md`,
        `benchmarks/${agentName}/scoring.json`,
        `benchmarks/${agentName}/report-template.md`,
        `benchmarks/${agentName}/scripts/score-run.mjs`,
        `benchmarks/${agentName}/tasks/example-task.md`,
        `benchmarks/${agentName}/runs/.gitkeep`,
      ],
    },
    null,
    2,
  ),
);
