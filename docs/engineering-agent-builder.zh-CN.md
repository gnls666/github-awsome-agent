# Engineering Agent Builder

> 这份文档总结 `Engineering Agent Builder` 的设计思路、使用方式、生成结构、benchmark 评分机制和验证方法。目标是让不同工程角色都能一次性生成自己的 custom engineering agent，而不是只生成一份 `.agent.md`。

## 一句话结论

`Engineering Agent Builder` 是一个用于创建 **可运行、可评测、可复制** 的工程 agent bundle 的能力。

它面向的不只是写代码的 agent，也包括：

- 开发维护 agent
- QA / regression agent
- test automation agent
- PR review agent
- migration agent
- platform / data / framework-specific agent

用户入口是：

```text
@engineering-agent-builder
/build-engineering-agent
```

不用 VS Code 内置 `/create-agent`、`/create-skill`、`/create-instruction`、`/create-prompt` 这些名字，避免命名冲突和心智混淆。

## 核心判断

VS Code / GitHub Copilot 已经支持创建单个 agent、skill、instruction、prompt。我们这套不应该重复做一个“生成 `.agent.md`”的小工具。

我们真正要解决的是：

```text
一个同事有一个工程 agent 想法
  -> 一次生成完整 bundle
  -> agent 有清晰层级
  -> skill 承载方法论
  -> benchmark 能评估效果
  -> report 能被别人审计
```

所以它不是“Create Agent”的替代品，而是更完整的 **Engineering Agent Bundle Builder**。

## 设计原则

### 1. 一次生成完整 bundle

不要让用户先创建 agent，再创建 skill，再补 benchmark。

一个有效的工程 agent 至少应该同时包含：

```text
.github/
  agents/<agent-name>.agent.md
  prompts/<agent-name>.prompt.md
  skills/<focused-skill>/SKILL.md

benchmarks/<agent-name>/
  README.md
  scoring.json
  report-template.md
  scripts/score-run.mjs
  tasks/example-task.md
  runs/.gitkeep
```

这样用户第一次生成后就能看到：

- agent 怎么被调用
- skill 怎么执行
- benchmark 怎么评估
- report 怎么产出

### 2. Skill 是主产品

Agent profile 只负责身份、范围、路由、工具边界和 completion policy。

真正可复用的方法放进 Skill：

- Java / Maven / Gradle 项目怎么识别
- Python / pytest / uv / poetry 怎么验证
- QA regression 怎么建任务
- review agent 怎么输出 findings
- migration agent 怎么做 plan-first

这避免把所有知识塞进一个长 prompt，也让同一套方法能被其他 agent 复用。

### 3. Scaffold 先保证骨架正确

实测发现，只靠文字 instruction 让 Copilot 手写 `.agent.md`、`.prompt.md`、`SKILL.md`，容易出现 frontmatter 不标准、benchmark 漏文件、结构不稳定。

所以新建 bundle 时必须先跑确定性脚本：

```bash
node .github/skills/engineering-agent-builder/scripts/scaffold-agent-bundle.mjs \
  --agent-name <agent-name> \
  --skill-name <skill-name> \
  --domain "<domain>" \
  --verification "<verification command>"
```

脚本负责生成稳定骨架，模型再负责把领域内容细化。

### 4. Benchmark 不是装饰

如果一个 agent 号称“工程能力更强”，必须有 evidence。

所以每个 generated engineering agent 默认带 benchmark scaffold：

- benchmark protocol
- one golden task
- weighted scoring model
- report template
- scoring script
- run evidence 目录

这不是完整 benchmark 平台，但足够让一个团队开始比较 baseline vs candidate。

## 使用方式

在 VS Code Copilot Chat 里：

```text
/build-engineering-agent
Create a benchmarked engineering agent named java-service-maintenance.
Audience: backend developers maintaining existing Java services.
Scope: Maven and Gradle services.
Non-goals: no broad rewrites, no new service generation.
Verification: mvn -B test or ./gradlew test.
Benchmark: fix a failing test regression with the smallest safe patch.
```

或者：

```text
@engineering-agent-builder Build a QA regression agent for existing web apps.
It should inspect the app first, identify regression scope, run npm test or Playwright when available,
and include a benchmark task with scoring and report output.
```

推荐用户一次性说明：

| Field | Example |
| --- | --- |
| Agent name | `java-service-maintenance` |
| Audience | backend developers |
| Domain | Maven / Gradle Java services |
| Non-goals | no broad rewrites |
| Verification | `mvn -B test` |
| Benchmark task | fix a failing regression |

## 生成结构

### Agent profile

路径：

```text
.github/agents/<agent-name>.agent.md
```

职责：

- identity
- scope
- non-goals
- intent / mode 分类
- skill routing
- tool boundary
- completion policy
- output contract

不放：

- 语言手册
- 大段 checklist
- benchmark 评分细节
- 具体项目实现代码

### Prompt shortcut

路径：

```text
.github/prompts/<agent-name>.prompt.md
```

职责：

- 给用户一个 slash command
- 简化调用
- 说明输出期望

注意：

不要使用 VS Code 内置创建命令名：

- `create-agent.prompt.md`
- `create-skill.prompt.md`
- `create-instruction.prompt.md`
- `create-prompt.prompt.md`

本 bundle 的入口是：

```text
/build-engineering-agent
```

### Skill

路径：

```text
.github/skills/<focused-skill>/SKILL.md
```

职责：

- 可复用 workflow
- 领域判断
- 验证命令
- guardrails
- 失败恢复路径

Skill 是主产品，因为不同 agent 的差异通常来自方法，而不是来自角色名。

### Benchmark

路径：

```text
benchmarks/<agent-name>/
```

职责：

- 定义如何评估 agent
- 保存 scoring contract
- 生成 report
- 保存 run evidence

## Benchmark 设计

### 参考思路

公开 benchmark 的共同点是：它们不只看回答是否好听，而是看任务是否真的完成。

这套设计参考了：

- SWE-bench：真实 GitHub issue resolution，看最终 patch 是否解决问题
- Multi-SWE-bench：多语言 issue resolution，适合覆盖 Java / Python 等语言差异
- Terminal-Bench：终端环境里的任务执行和验证
- SWE-Skills-Bench / SkillsBench：评估 skill 对 coding agent 行为是否真的有增益
- Inspect / eval 类框架：把 scorer、metric、report 分离

我们采用轻量版：

```text
hard gates + weighted rubric + evidence report
```

### Baseline vs Candidate

每个 serious benchmark 都应该比较：

```text
Baseline:
  same model
  same repository snapshot
  generic Copilot or no custom agent

Candidate:
  same model
  same repository snapshot
  generated engineering agent + generated skills
```

如果要证明某个 skill 有价值，再做 ablation：

```text
Candidate without focused skill
Candidate with focused skill
```

### 评分机制

默认是 100 分制：

| Metric | Weight | Scale | Meaning |
| --- | ---: | --- | --- |
| `resolved` | 30 | boolean | 任务结果是否正确 |
| `verificationPass` | 25 | boolean | 声明的验证命令是否通过 |
| `instructionAdherence` | 15 | 0-5 | 是否遵守 scope、inspect-first、plan-first、本地规则 |
| `skillActivationAccuracy` | 10 | 0-5 | 是否正确使用生成的 skill |
| `patchQuality` | 15 | 0-5 | diff 是否小、集中、可维护 |
| `recoveryBehavior` | 5 | 0-5 | 验证失败后是否能定位、修复或记录 blocker |
| `cost` | 0 | record only | 时间、tool calls、token/cost |

通过标准：

```text
score >= 80
resolved == true
verificationPass == true
```

也就是说，不能靠主观项把硬失败“刷分刷过”。

### Run evidence

每次 benchmark run 建议保存：

```text
benchmarks/<agent-name>/runs/<timestamp>/
  result.json
  score.json
  report.md
  transcript.md
  patch.diff
  verification.txt
```

其中 `result.json` 是打分输入。

示例：

```json
{
  "taskId": "java-service-maintenance-001",
  "agent": "java-service-maintenance",
  "model": "gpt-5.2",
  "metrics": {
    "resolved": true,
    "verificationPass": true,
    "instructionAdherence": 5,
    "skillActivationAccuracy": 5,
    "patchQuality": 4,
    "recoveryBehavior": 4,
    "cost": {
      "wallTimeSeconds": 120,
      "toolCalls": 8
    }
  },
  "evidence": {
    "transcript": "transcript.md",
    "diff": "patch.diff",
    "verification": "verification.txt"
  },
  "notes": "Candidate fixed the regression with a scoped patch."
}
```

### Report generation

生成的 bundle 自带：

```text
benchmarks/<agent-name>/scripts/score-run.mjs
```

运行：

```bash
node benchmarks/<agent-name>/scripts/score-run.mjs benchmarks/<agent-name>/runs/<timestamp>/result.json
```

输出：

```text
benchmarks/<agent-name>/runs/<timestamp>/score.json
benchmarks/<agent-name>/runs/<timestamp>/report.md
```

这样创建 agent 时就能看到评判标准；真正跑 benchmark 后，也能得到可审计 report。

## Workflow Chain

本仓库已有一条成功模式：

```text
project-context -> plan-to-spec -> build-from-spec -> post-generation -> quality-gate
```

这不是 UX 专用模式，而是一种通用工程链路：

```text
context -> contract -> action -> follow-up -> verification -> evidence
```

迁移到不同 agent 时，只需要换掉中间领域 skill。

例如 Java maintenance：

```text
project-context
  -> java-project-context
  -> maintenance-plan
  -> implementation
  -> java-quality-gate
  -> benchmark-evidence
```

QA regression：

```text
project-context
  -> qa-regression-workflow
  -> reproduce
  -> compare expected vs actual
  -> verify
  -> benchmark-report
```

PR review：

```text
project-context
  -> diff inspection
  -> review rubric
  -> findings
  -> evidence
```

## 当前实现文件

核心入口：

```text
.github/agents/engineering-agent-builder.agent.md
.github/prompts/build-engineering-agent.prompt.md
.github/skills/engineering-agent-builder/SKILL.md
```

主要 reference：

```text
.github/skills/engineering-agent-builder/references/layered-agent-structure.md
.github/skills/engineering-agent-builder/references/file-templates.md
.github/skills/engineering-agent-builder/references/workflow-chains.md
.github/skills/engineering-agent-builder/references/benchmark-protocol.md
.github/skills/engineering-agent-builder/references/copilot-cli-validation.md
.github/skills/engineering-agent-builder/references/research-notes.md
```

确定性 scaffold：

```text
.github/skills/engineering-agent-builder/scripts/scaffold-agent-bundle.mjs
```

Contract test：

```text
tests/contracts/engineering-agent-builder-policy.test.mjs
```

## 验证情况

本地 contract tests 覆盖：

- 不使用 `/create-agent` 作为 workspace prompt
- 不保留旧 `agent-builder` 路径
- agent / prompt / skill / benchmark 分层存在
- scaffold script 能生成完整 bundle
- benchmark scorer 能根据 `result.json` 生成 `score.json` 和 `report.md`
- scoring threshold 和 hard gates 生效

实际命令：

```bash
node --test tests/contracts/*.test.mjs
```

最近验证结果：

```text
13 pass
0 fail
```

## 设计取舍

### 为什么不直接用 VS Code 内置 `/create-agent`

内置命令适合生成单个文件。

我们要的是：

```text
agent + prompt + skills + benchmark + scoring + report
```

所以入口必须避开内置命名，并表达“一次生成完整工程 agent bundle”。

### 为什么不做重型 benchmark 平台

现阶段需要的是让每个 agent 从第一天就有评估标准，而不是先建设一整套平台。

轻量方案足够支持：

- golden task
- baseline vs candidate
- weighted scoring
- hard gates
- Markdown report
- 后续接入 CI 或平台

### 为什么 scorer 是本地脚本

评分计算应该确定、可复现、可审计。

模型可以生成解释，但不应该负责算分。

### 为什么 `runs/` 默认 gitignored

benchmark run evidence 可能包含 transcript、diff、log、路径、成本信息。默认作为本地评估产物更安全。

需要把 report 变成项目文档时，可以由用户显式提交。

## 后续可扩展方向

1. 增加 baseline/candidate 自动运行器。
2. 支持 strict mode：低于阈值时让 CI fail。
3. 接 GitHub Copilot CLI transcript 和 diff 自动采集。
4. 增加更多 task templates：QA regression、PR review、migration、security review。
5. 支持 benchmark summary across runs。

## Source Notes

- GitHub Copilot custom agents: https://docs.github.com/en/copilot/reference/custom-agents-configuration
- VS Code Copilot customization: https://code.visualstudio.com/docs/copilot/customization/overview
- AGENTS.md: https://agents.md/
- SWE-bench: https://www.swebench.com/
- Multi-SWE-bench: https://github.com/multi-swe-bench/multi-swe-bench
- Terminal-Bench: https://www.tbench.ai/
- SWE-Skills-Bench: https://arxiv.org/abs/2603.15401
