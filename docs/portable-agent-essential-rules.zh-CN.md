# Portable Agent Essential Rules

这份文档总结了当前 `portable ux-standard` 的核心设计和必须遵守的规则，供别的仓库移植或参考。

## 目标

把 agent 做成一个可复制到目标仓库里的 `.github/` bundle，让它在 VS Code + GitHub Copilot 环境里：

- 先识别当前工作区状态
- 再选择正确的执行路径
- 最后在明确验证通过前，不把任务误报为完成

## 适用范围

- 目标是 **portable agent**
- 默认运行面是 **VS Code**
- 默认安装面是 **目标仓库根目录下的 `.github/`**

## 核心分层

### 1. Agent 是总指挥

唯一的 policy source 是：

- `.github/agents/ux-standard.agent.md`

这里定义：

- 默认意图分类
- 路由优先级
- 什么时候 `plan-first`
- 什么时候允许 `generate`
- 什么时候必须跑 `quality-gate`

### 2. Skills 负责执行

skills 负责具体执行流程，不负责抢总路由：

- `project-context`
- `plan-to-spec`
- `build-from-spec`
- `post-generation`
- `quality-gate`

### 3. Instructions 负责补充代码级硬约束

比如：

- JSX 文件必须用 `.tsx`
- MUI typed callback 要用精确事件类型
- 收尾前要做到 `typecheck-clean`

## Bundle 安装规则

### 默认安装面

portable bundle 默认只交付：

- 根级 `.github/`

不要在第一次复制时自动塞给目标仓库：

- 根 `AGENTS.md`
- `plans/`
- 其他本地状态文件

### 运行时产物

目标仓库自己的根 `AGENTS.md` 是 **运行时产物**，不是安装产物。

创建时机：

- `project-context` 一旦确认 `targetProjectRoot`
- 且发现目标项目缺少可用的根 `AGENTS.md`
- 就立刻创建 baseline 版本

## 路由模型

路由拆成两层：

### Intent

- `maintain`
- `migrate`
- `generate`
- `refactor`
- `review`

### Mode

- `direct-execute`
- `plan-first`

这两个维度不要混在一起。

例子：

- `maintain + direct-execute`
- `maintain + plan-first`
- `generate + plan-first`

不要把 `/plan` 做成一个和 `maintain / migrate / generate` 平级竞争的业务入口。

## 默认行为

### 模糊的已有项目请求

如果用户在已有项目里说得很模糊，比如：

- “帮我看看这个项目怎么改进”

默认归到：

- `intent = maintain`

不是默认 `generate`，也不是一上来重新搭项目。

### `project-context` 永远先跑

任何真正 touching target workspace 的任务，都先跑：

- `project-context`

它至少要确认：

- `workspaceMode`
- `repositoryRoot`
- `targetProjectRoot`
- 适用的 `AGENTS.md`
- 基本 stack / validation facts

## Generate 路径规则

### 1. Generate 必须受 spec 约束

生成路径的执行合同是：

- `plans/<project>/plan.md`
- `plans/<project>/spec.json`

其中：

- `plan.md` 是给人看的决策记录
- `spec.json` 是机器合同

### 2. `spec.json` 要保持简洁

`spec.json` 不要膨胀成第二份 planning 文档。

建议保持：

- `projectName`
- `template`
- `title`
- `pages`
- `outputDir`
- `constraints`
- `customizations`
- `postGeneration.tasks`
- `verification`

规则：

- `pages` 保持简单页名数组
- richer 页面描述写到 `plan.md`
- `postGeneration.tasks` 只写 generator 无法直接表达的内容

### 3. Broad bootstrap 只做 first phase

如果用户要一个“大而全”的新项目，不要第一轮就无限展开。

规则：

- `postGeneration.tasks` 只放第一阶段必须做完、且能验证通过的任务
- 后续增强写进 `plan.md`
- 不要把大量新 context / service / hook / theme / UX polish 一次性全塞进第一轮执行

### 4. Empty workspace 默认验证更严格

对于空工作区 bootstrap，默认 `verification` 应该是：

```json
{
  "typecheck": true,
  "test": true,
  "build": true
}
```

除非用户明确缩小验证范围。

## Completion 规则

### 1. 不能留下坏工作区

生成任务在下面这些检查通过之前，不算完成：

- `typecheck`
- `test`
- `build`

如果合同里要求了这些检查，就必须跑。

### 2. `quality-gate` 是硬收尾

`build-from-spec` 和 `post-generation` 后面必须接：

- `quality-gate`

如果失败：

- 要么继续修
- 要么明确报告 blocker

不能把“生成成功但 typecheck 没过”说成完成。

## React / TypeScript 规则

### JSX 文件后缀

只要文件里渲染 JSX：

- 必须使用 `.tsx`
- 不要写成 `.ts`

### MUI typed callback

使用 MUI 组件时，如果 API 需要专门事件类型：

- 优先使用精确类型
- 例如 `SelectChangeEvent`

不要一律写成宽泛的 `React.ChangeEvent`

### 收尾要 typecheck-clean

完成前要清掉：

- 未使用 import
- 未使用局部变量
- 错误的事件类型
- 陈旧占位测试断言

## Generator 规则

Generator 需要保证：

- richer `spec.json` 输入能被安全归一化
- `spec.md` 摘要不能退化成 `Page Title`、`ObjectObject`
- 生成项目的 `vitest` 不要把 bundle 自己的 `.github/**` 扫进去

## 实践建议

如果你要把这套规则搬到另一个仓库，最少保留下面这些点：

1. `agent` 文件做唯一 policy source  
2. `project-context` 负责 runtime `AGENTS.md` bootstrap  
3. generate 路径必须 spec-bounded  
4. empty-workspace bootstrap 默认带 `typecheck/test/build`  
5. `quality-gate` 通过前不能报完成  
6. JSX => `.tsx`  
7. broad bootstrap 只做 first phase

## 当前仓库对应入口

- Agent policy: `.github/agents/ux-standard.agent.md`
- Runtime target context: `.github/skills/project-context/SKILL.md`
- Target AGENTS baseline: `.github/skills/project-context/references/target-agents-baseline.md`
- Spec planning: `.github/skills/plan-to-spec/SKILL.md`
- Generation: `.github/skills/build-from-spec/SKILL.md`
- Post-generation: `.github/skills/post-generation/SKILL.md`
- Verification: `.github/skills/quality-gate/SKILL.md`
- React/TS hard rules: `.github/instructions/react-tsx.instructions.md`
- Contract tests: `tests/contracts/`
