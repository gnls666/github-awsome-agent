import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const agent = readFileSync(".github/agents/engineering-agent-builder.agent.md", "utf8");
const prompt = readFileSync(".github/prompts/build-engineering-agent.prompt.md", "utf8");
const skill = readFileSync(".github/skills/engineering-agent-builder/SKILL.md", "utf8");
const layered = readFileSync(
  ".github/skills/engineering-agent-builder/references/layered-agent-structure.md",
  "utf8",
);
const workflows = readFileSync(
  ".github/skills/engineering-agent-builder/references/workflow-chains.md",
  "utf8",
);
const benchmark = readFileSync(
  ".github/skills/engineering-agent-builder/references/benchmark-protocol.md",
  "utf8",
);
const cliValidation = readFileSync(
  ".github/skills/engineering-agent-builder/references/copilot-cli-validation.md",
  "utf8",
);
const research = readFileSync(
  ".github/skills/engineering-agent-builder/references/research-notes.md",
  "utf8",
);
const scaffoldScript = ".github/skills/engineering-agent-builder/scripts/scaffold-agent-bundle.mjs";

test("engineering-agent-builder creates runnable agent bundles, not docs-only output", () => {
  assert.equal(existsSync("docs/custom-engineering-agent-blueprint.zh-CN.md"), false);
  assert.equal(existsSync(".github/prompts/create-agent.prompt.md"), false);
  assert.equal(existsSync(".github/agents/agent-builder.agent.md"), false);
  assert.equal(existsSync(".github/skills/agent-builder/SKILL.md"), false);
  assert.match(agent, /runnable custom agent bundle/i);
  assert.match(agent, /name: engineering-agent-builder/i);
  assert.match(prompt, /# \/build-engineering-agent/i);
  assert.doesNotMatch(prompt, /# \/create-agent/i);
  assert.match(agent, /\.github\/agents\/<agent-name>\.agent\.md/i);
  assert.match(agent, /benchmarks\/<agent-name>/i);
  assert.match(prompt, /runnable artifacts, not only prose/i);
  assert.match(skill, /not a standalone strategy document/i);
  assert.match(skill, /run the deterministic scaffold script/i);
  assert.match(agent, /scaffold-agent-bundle\.mjs/i);
  assert.match(prompt, /scaffold-agent-bundle\.mjs/i);
});

test("engineering-agent-builder keeps agent, skill, prompt, and benchmark layers separate", () => {
  assert.match(agent, /required policy/i);
  assert.match(agent, /optional skills/i);
  assert.match(agent, /benchmark evidence/i);
  assert.match(skill, /Agent profile: policy and routing/i);
  assert.match(skill, /Skill: reusable method and references/i);
  assert.match(skill, /Benchmark: evidence that the agent works/i);
  assert.match(skill, /Do not create multiple specialist agents by default/i);
  assert.match(skill, /Do not use VS Code built-in creation command names/i);
  assert.match(layered, /Agent Profile/i);
  assert.match(layered, /Skill/i);
  assert.match(layered, /MCP Tools/i);
  assert.match(layered, /build-engineering-agent\.prompt\.md/i);
});

test("engineering-agent-builder requires benchmark and verification discipline", () => {
  assert.match(agent, /Copilot CLI validation/i);
  assert.match(skill, /baseline vs candidate comparison/i);
  assert.match(skill, /verification commands/i);
  assert.match(skill, /Do not report completion until files exist and verification has run/i);
  assert.match(benchmark, /Baseline:/i);
  assert.match(benchmark, /Candidate:/i);
  assert.match(benchmark, /SWE-bench/i);
});

test("engineering-agent-builder references the existing bundle workflow chain without making it ux-specific", () => {
  assert.match(skill, /project-context -> plan-to-spec -> build-from-spec -> post-generation -> quality-gate/i);
  assert.match(workflows, /project-context\s*-> plan-to-spec\s*-> build-from-spec\s*-> post-generation\s*-> quality-gate/i);
  assert.doesNotMatch(skill, /UX Standard Workflow Pattern/i);
  assert.match(workflows, /java-project-context/i);
  assert.match(workflows, /python-project-context/i);
});

test("engineering-agent-builder documents real Copilot CLI validation", () => {
  assert.match(cliValidation, /copilot/i);
  assert.match(cliValidation, /--agent engineering-agent-builder/i);
  assert.match(cliValidation, /rerun without `--model`/i);
  assert.match(cliValidation, /transcript path/i);
  assert.match(cliValidation, /validation failure/i);
});

test("engineering-agent-builder includes external research references", () => {
  assert.match(skill, /research-notes\.md/i);
  assert.match(research, /GitHub Copilot custom agents/i);
  assert.match(research, /AGENTS\.md/i);
  assert.match(research, /SWE-bench/i);
  assert.match(research, /Multi-SWE-bench/i);
  assert.match(research, /Terminal-Bench/i);
});

test("engineering-agent-builder scaffold script creates valid runnable layers", () => {
  const root = mkdtempSync(join(tmpdir(), "engineering-agent-builder-contract-"));
  execFileSync("node", [
    scaffoldScript,
    "--root",
    root,
    "--agent-name",
    "java-service-maintenance",
    "--skill-name",
    "java-project-context",
    "--domain",
    "maintain existing Maven or Gradle Java services",
    "--verification",
    "mvn -B test",
  ]);

  const generatedAgent = readFileSync(
    join(root, ".github/agents/java-service-maintenance.agent.md"),
    "utf8",
  );
  const generatedPrompt = readFileSync(
    join(root, ".github/prompts/java-service-maintenance.prompt.md"),
    "utf8",
  );
  const generatedSkill = readFileSync(
    join(root, ".github/skills/java-project-context/SKILL.md"),
    "utf8",
  );
  const generatedBenchmark = readFileSync(
    join(root, "benchmarks/java-service-maintenance/README.md"),
    "utf8",
  );
  const generatedScoring = readFileSync(
    join(root, "benchmarks/java-service-maintenance/scoring.json"),
    "utf8",
  );

  assert.match(generatedAgent, /^---\nname: java-service-maintenance/m);
  assert.match(generatedAgent, /target: vscode/);
  assert.match(generatedAgent, /tools: \["vscode", "execute", "read", "edit", "search", "todo"\]/);
  assert.match(generatedPrompt, /^---\nagent: java-service-maintenance/m);
  assert.match(generatedSkill, /^---\nname: java-project-context/m);
  assert.match(generatedSkill, /description:/);
  assert.match(generatedBenchmark, /Baseline/);
  assert.match(generatedBenchmark, /100-point weighted score/);
  assert.match(generatedScoring, /"passThreshold": 80/);
  assert.equal(
    existsSync(join(root, "benchmarks/java-service-maintenance/report-template.md")),
    true,
  );
  assert.equal(
    existsSync(join(root, "benchmarks/java-service-maintenance/scripts/score-run.mjs")),
    true,
  );
  assert.equal(
    existsSync(join(root, "benchmarks/java-service-maintenance/runs/.gitkeep")),
    true,
  );
});

test("engineering-agent-builder benchmark scorer writes score report", () => {
  const root = mkdtempSync(join(tmpdir(), "engineering-agent-builder-score-"));
  execFileSync("node", [
    scaffoldScript,
    "--root",
    root,
    "--agent-name",
    "qa-regression-agent",
    "--skill-name",
    "qa-regression-workflow",
    "--domain",
    "evaluate QA regression workflows for existing web applications",
    "--verification",
    "npm test",
  ]);

  const runDir = join(root, "benchmarks/qa-regression-agent/runs/001");
  mkdirSync(runDir, { recursive: true });
  const resultPath = join(runDir, "result.json");
  writeFileSync(
    resultPath,
    JSON.stringify(
      {
        taskId: "qa-regression-agent-001",
        agent: "qa-regression-agent",
        model: "test-model",
        metrics: {
          resolved: true,
          verificationPass: true,
          instructionAdherence: 5,
          skillActivationAccuracy: 4,
          patchQuality: 4,
          recoveryBehavior: 5,
        },
        evidence: {
          transcript: "transcript.md",
          diff: "patch.diff",
          verification: "verification.txt",
        },
      },
      null,
      2,
    ),
    "utf8",
  );

  const output = execFileSync(
    "node",
    [join(root, "benchmarks/qa-regression-agent/scripts/score-run.mjs"), resultPath],
    { encoding: "utf8" },
  );
  const report = JSON.parse(output);

  assert.equal(report.passed, true);
  assert.equal(report.hardGatesPass, true);
  assert.equal(report.score, 95);
  assert.equal(existsSync(join(runDir, "score.json")), true);
  assert.equal(existsSync(join(runDir, "report.md")), true);
});
