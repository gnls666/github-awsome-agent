# 2026-03-14 Agent 改造总览

这份文档总结了今天围绕 `skillpack-agent/` 与 `portable-agent/` 的整轮改造。

重点不是单个文件改了什么，而是：

- 我们把哪些结构关系重新讲清楚了
- 我们把哪些能力真正落成了可执行资产
- 我们最终把这套 agent 体系收成了什么样

## 1. 改动前后的核心对比

### 改动前

今天开始之前，这套体系的主要问题不是“没有能力”，而是“能力边界不够清楚”：

- `portable-agent` 虽然一直有生成能力，但它的整体叙事仍然更偏“进入已有仓库维护”
- `build-from-spec` 依赖的 generator 和 templates 之前已经做过一次内聚，但围绕它的说明和调用心智还不够稳定
- 可复用的复杂 UI 结构还没有一个正式的 skill 层承载，更多是散落在：
  - `_shared/components/*.md`
  - `mui-v6-design`
  - `material-react-table`
  - `post-generation`
  - `migration-to-platform-mui`
- 对 `components`、`patterns`、`templates` 三层关系的描述还不够准确，容易让 pattern 被说得过重
- 一些真正影响运行结果的 layout 问题，只在测试项目里暴露，还没有形成足够清晰的总结材料

### 改动后

今天改完以后，这套体系收成了一个更稳定的模型：

- `build-from-spec` 成为更明确的生成入口，真正拥有自己的 generator 和 template assets
- 新增了 `platform-patterns` skill，专门承载复杂组合结果层
- `components / patterns / templates` 三层关系被重新定义清楚
- `table-operation-errors` 这种真正带后台产品感的复杂交互，被正式沉淀成 pattern
- `portable-agent` 的 agent / prompt / migration / post-generation / design / MRT 相关文案，都改成与这套三层模型一致
- 生成与维护、迁移与模式复用之间的关系，更接近我们今天反复确认的第一性原则

## 2. 今天实际做了哪些改动

### 2.1 把 `build-from-spec` 真正收成一个自带资产的 skill

这部分的目标是避免 Copilot 在运行时继续读错旧路径，或者绕开真正的生成入口。

今天确认和强化了这件事：

- generator 脚本在：
  - `skillpack-agent/.github/skills/build-from-spec/scripts/generate.js`
  - `portable-agent/.github/skills/build-from-spec/scripts/generate.js`
- templates 在：
  - `skillpack-agent/.github/skills/build-from-spec/assets/templates/`
  - `portable-agent/.github/skills/build-from-spec/assets/templates/`

这意味着：

- `build-from-spec` 不再只是“一个描述生成流程的 skill”
- 它已经拥有自己的真正生成资产
- 其他技能或 prompt 不应该再把 `_shared/templates` 当主入口

### 2.2 新增 `platform-patterns` skill

今天新增了一个新的 skill：

- `skillpack-agent/.github/skills/platform-patterns/`
- `portable-agent/.github/skills/platform-patterns/`

这个 skill 的目标，不是替代 component guidance，也不是替代 templates。

它承载的是：

- 复杂组合结果层
- 可复用的多组件结构
- 已知页面/交互结果的优先参考实现

目前第一批 pattern 包括：

- `async-state`
- `page-shell`
- `filter-toolbar`
- `form-patterns`
- `mrt-admin-table`
- `table-operation-errors`

并且配套包含：

- `SKILL.md`
- `references/*.md`
- `assets/patterns/*.tsx`

### 2.3 把 `table-operation-errors` 明确定义成一个后台 pattern

这是今天一个非常重要的新资产。

我们明确了：

- 它不是 generic error handling
- 它不是 page-level loading/error state
- 它不是 toast/snackbar

它代表的是：

- 页面主体是一个大表格
- 用户在表格中执行行操作或批量操作
- 操作失败后，页面下方出现一个 persistent bottom panel
- 这个 panel 像 VS Code 的 terminal / output 区
- 支持：
  - grouped errors
  - collapse / expand
  - vertical resize
  - clear all

同时还补了一个更贴近真实后台的示例：

- `UserManagementOperationErrorsExample.tsx`

### 2.4 重写了三层模型的语言层级

这是今天最关键的认知调整之一。

最终我们把三层关系收成了：

1. `components`
   - 基础实现层
   - 默认 building blocks
   - 所有常规新增和局部修改先看这里

2. `patterns`
   - 由 component layer 组合出来的复杂结果层
   - 当目标是已知的多组件结果时，优先参考这里

3. `templates`
   - 从零生成层
   - 只服务于 greenfield / scaffold

这里最重要的调整是：

- 不再说 “components 不够才看 patterns”
- 而改成：
  - `patterns` 是由 components 组合出来的、值得优先参考的稳定结果

这使得整套表述更符合我们今天确认的第一性原则。

### 2.5 把相关 skill / prompt / agent 的说法统一到同一个方向

今天不是只建了一个新 skill，就停了。

还把这套说法同步到了多个现有入口中，包括：

- `ux-standard.agent.md`
- `component.prompt.md`
- `_shared/components/{form,layout,table}.md`
- `build-from-spec/SKILL.md`
- `post-generation/SKILL.md`
- `migration-to-platform-mui/SKILL.md`
- `mui-v6-design/SKILL.md`
- `material-react-table/SKILL.md`

统一后的含义是：

- component guidance 仍然是基础层
- pattern skill 是复杂组合层
- template 只用于从零生成

这一步很重要，因为如果只新增 skill，而不统一这些入口文案，Copilot 还是会在运行时形成错误心智。

### 2.6 本次提交涉及的文件名单

这次提交对应的提交号是：

- `c95a383`

为了方便其他项目对照 adopt，这里按分组列出相关文件。

#### 文档

- `docs/README-skill-architecture.md`
- `docs/agent-updates-2026-03-14.zh-CN.md`

#### portable-agent：入口与基础 guidance

- `portable-agent/.github/agents/ux-standard.agent.md`
- `portable-agent/.github/prompts/component.prompt.md`
- `portable-agent/.github/skills/_shared/components/form.md`
- `portable-agent/.github/skills/_shared/components/layout.md`
- `portable-agent/.github/skills/_shared/components/table.md`
- `portable-agent/.github/skills/build-from-spec/SKILL.md`
- `portable-agent/.github/skills/build-from-spec/references/build-checklist.md`
- `portable-agent/.github/skills/material-react-table/SKILL.md`
- `portable-agent/.github/skills/migration-to-platform-mui/SKILL.md`
- `portable-agent/.github/skills/mui-v6-design/SKILL.md`
- `portable-agent/.github/skills/post-generation/SKILL.md`
- `portable-agent/.github/skills/post-generation/references/post-generation-checklist.md`

#### portable-agent：新增 `platform-patterns`

- `portable-agent/.github/skills/platform-patterns/SKILL.md`
- `portable-agent/.github/skills/platform-patterns/references/pattern-catalog.md`
- `portable-agent/.github/skills/platform-patterns/references/adoption-rules.md`
- `portable-agent/.github/skills/platform-patterns/references/async-state.md`
- `portable-agent/.github/skills/platform-patterns/references/page-shell.md`
- `portable-agent/.github/skills/platform-patterns/references/filter-toolbar.md`
- `portable-agent/.github/skills/platform-patterns/references/form-patterns.md`
- `portable-agent/.github/skills/platform-patterns/references/mrt-admin-table.md`
- `portable-agent/.github/skills/platform-patterns/references/table-operation-errors.md`
- `portable-agent/.github/skills/platform-patterns/assets/patterns/AsyncStatePanel.tsx`
- `portable-agent/.github/skills/platform-patterns/assets/patterns/PageShell.tsx`
- `portable-agent/.github/skills/platform-patterns/assets/patterns/FilterToolbar.tsx`
- `portable-agent/.github/skills/platform-patterns/assets/patterns/SectionForm.tsx`
- `portable-agent/.github/skills/platform-patterns/assets/patterns/MrtAdminTable.tsx`
- `portable-agent/.github/skills/platform-patterns/assets/patterns/TableOperationErrorsPanel.tsx`
- `portable-agent/.github/skills/platform-patterns/assets/patterns/UserManagementOperationErrorsExample.tsx`

#### skillpack-agent：入口与基础 guidance

- `skillpack-agent/.github/agents/ux-standard.agent.md`
- `skillpack-agent/.github/prompts/component.prompt.md`
- `skillpack-agent/.github/skills/_shared/components/form.md`
- `skillpack-agent/.github/skills/_shared/components/layout.md`
- `skillpack-agent/.github/skills/_shared/components/table.md`
- `skillpack-agent/.github/skills/build-from-spec/SKILL.md`
- `skillpack-agent/.github/skills/build-from-spec/references/build-checklist.md`
- `skillpack-agent/.github/skills/material-react-table/SKILL.md`
- `skillpack-agent/.github/skills/mui-v6-design/SKILL.md`
- `skillpack-agent/.github/skills/post-generation/SKILL.md`
- `skillpack-agent/.github/skills/post-generation/references/post-generation-checklist.md`

#### skillpack-agent：新增 `platform-patterns`

- `skillpack-agent/.github/skills/platform-patterns/SKILL.md`
- `skillpack-agent/.github/skills/platform-patterns/references/pattern-catalog.md`
- `skillpack-agent/.github/skills/platform-patterns/references/adoption-rules.md`
- `skillpack-agent/.github/skills/platform-patterns/references/async-state.md`
- `skillpack-agent/.github/skills/platform-patterns/references/page-shell.md`
- `skillpack-agent/.github/skills/platform-patterns/references/filter-toolbar.md`
- `skillpack-agent/.github/skills/platform-patterns/references/form-patterns.md`
- `skillpack-agent/.github/skills/platform-patterns/references/mrt-admin-table.md`
- `skillpack-agent/.github/skills/platform-patterns/references/table-operation-errors.md`
- `skillpack-agent/.github/skills/platform-patterns/assets/patterns/AsyncStatePanel.tsx`
- `skillpack-agent/.github/skills/platform-patterns/assets/patterns/PageShell.tsx`
- `skillpack-agent/.github/skills/platform-patterns/assets/patterns/FilterToolbar.tsx`
- `skillpack-agent/.github/skills/platform-patterns/assets/patterns/SectionForm.tsx`
- `skillpack-agent/.github/skills/platform-patterns/assets/patterns/MrtAdminTable.tsx`
- `skillpack-agent/.github/skills/platform-patterns/assets/patterns/TableOperationErrorsPanel.tsx`
- `skillpack-agent/.github/skills/platform-patterns/assets/patterns/UserManagementOperationErrorsExample.tsx`

## 3. Essential Rules

这是今天真正沉淀下来的核心规则。

### 3.1 `.github/*`、`AGENTS.md`、`plans/*` 是三层并列结构

它们分别代表：

- `.github/*`
  - agent capability layer
- `AGENTS.md`
  - project manual layer
- `plans/*`
  - task memory layer

这三者不能混写，也不该互相替代。

### 3.2 `portable-agent` 是能力包，不是目标项目

`portable-agent` 自己只是分发与运行能力的工作区。

真正的：

- `AGENTS.md`
- `plans/*`
- target codebase

应该落在它要生成、接管、维护、迁移的那个目标项目里。

### 3.3 `components` 是基础层

任何最基础的新增和修改，优先看 component guidance。

pattern 不是为了取代 component layer。

### 3.4 `patterns` 是优先参考的复杂结果层

当目标是一个已知的复杂多组件结果时，优先参考 pattern。

它们本质上仍然是由 component layer 组合出来的。

### 3.5 `templates` 只服务于从零生成

template 不应该成为已有项目维护和 surgery 的默认路径。

它的职责是：

- 起项目
- 起整页
- 起标准骨架

### 3.6 `UX template` 这个名字保留

今天还明确了一件事：

- `UX template` 不是一个应该被删掉的遗留词
- 它是 `UX Standards` 的品牌信号之一

所以后续不要因为“看起来像模板词”就把它误删。

### 3.7 所有正式仓库文案保持英文

repo 内的正式文案，包括：

- `SKILL.md`
- `references/*.md`
- `instructions`
- `prompts`
- `agent` 配置

都应该保持英文。

中文总结文档可以存在于 `docs/` 中，但技能正文和运行文案应保持英文。

## 4. 促成今天这个局面的关键思路

### 4.1 不是继续堆 template，而是补结构缺口

今天最重要的判断之一是：

- 我们真正缺的不是更多 project templates
- 而是一层能服务于已有项目维护、迁移、后处理的 pattern layer

这就是为什么要建 `platform-patterns`。

### 4.2 不追求“完全不重叠”，而追求“职责不重复拥有”

今天也重新确认了 skill 之间的关系：

- 可以有能力交叉
- 但不应该有大面积的重复拥有

最终形成的理解是：

- 交叉引用没问题
- 但每层职责要讲清楚

### 4.3 不是每个复杂需求都应该抬升到新 skill

今天之所以决定新建 `platform-patterns`，不是因为“想多一个 skill”，而是因为它真的补上了一个缺失的职责：

- 复杂组合结果层

也就是说：

- 新 skill 应该解决新的职责
- 不应该只是把旧内容重复包装一层

### 4.4 真正好的结构，应该符合 target-project 的运行现实

这也是今天一条很重要的判断：

- 目标项目面对的不是“技能包结构有多漂亮”
- 而是“agent 在真实项目里能不能按正确层次工作”

所以今天所有调整的最终标准都是：

- 对 Copilot / target project 运行时是否更清楚
- 对已有项目维护和迁移是否更合理

## 5. 从今天之前到今天之后，最核心的变化

如果只压成一句话：

今天之前，这套体系更像是：

- 已经有很多能力
- 但边界还不够稳定

今天之后，它更像是：

- 生成层、组件层、模式层、迁移层、设计层开始有了更清楚的分工
- 并且这套分工已经开始能支撑真实的 target-project 改造

## 6. 下一步最自然的延续

如果继续沿着今天这套思路往下走，最自然的方向是：

- 继续让更多页面通过 `components + patterns` 来收敛
- 让 `post-generation` 和 `migration-to-platform-mui` 更稳定地消费 `platform-patterns`
- 把真正高频、真实后台需要的 pattern 再补齐，而不是继续做更重的 template

---

一句话总结：

**今天这轮改造的本质，是把这套 agent 从“能力很多但边界偏松”推进到“components 打底、patterns 承担复杂组合、templates 只做从零生成”的更稳定结构，并且把这种结构落成了真实的 skill、assets、rules 和文档。**
