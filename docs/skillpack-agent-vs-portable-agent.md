# Skillpack Agent 与 Portable Agent 说明

这份文档用于说明当前仓库里两套 sibling workspace 的定位差异，以及当你希望把 `skillpack-agent` 的使用方式切换成 `portable-agent` 时，应该做哪些操作。

## 一、两者的定位区别

### 1. `skillpack-agent` 是什么

`skillpack-agent` 是作者工作台，也是这套 agent 的模板、skill、generator 和共享组件规范的维护入口。

它更适合这些场景：

- 在这个仓库里维护 skill 本身
- 调整模板、共享组件、生成器脚本
- 验证新模板是否能正常生成
- 把生成结果输出到 `generated/` 里做演示和回归测试

它的默认思路是：

- 先产出 `plans/<project-name>/plan.md` 和 `plans/<project-name>/spec.json`
- 再调用 generator 基于模板生成项目
- 必要时再走 `post-generation`

一句话说，`skillpack-agent` 更像“作者仓库里的生成工作台”。

### 2. `portable-agent` 是什么

`portable-agent` 是给用户复制到现有仓库里直接使用的版本。

它更适合这些场景：

- 目标仓库本身已经有代码
- 用户要维护、补功能、重构、统一风格
- 用户只在明确需要时才生成一个新的独立页面、模块或子树

它的默认思路是：

- 先理解当前仓库
- 优先做原地维护或渐进式重构
- 只有用户明确说“需要新生成一个东西”时，才使用 generator

一句话说，`portable-agent` 更像“带进别人现有项目里工作的 agent”。

## 二、核心差异一览

| 维度 | `skillpack-agent` | `portable-agent` |
| --- | --- | --- |
| 主要用途 | 维护 skill、模板、generator，并在本仓库里生成项目 | 复制进已有仓库后做维护、重构、局部生成 |
| 默认对象 | 新生成项目或新模板产物 | 当前仓库里已经存在的代码 |
| 默认工作流起点 | `plan-to-spec` | `project-context` |
| 默认目标 | 先形成 spec，再生成 | 先理解现有项目，再改代码 |
| 是否默认生成 | 是，生成是主路径 | 否，生成只是显式动作 |
| 输出位置假设 | 默认使用 `generated/` | 默认原地工作，不假定 `app`/`apps` 目录 |
| 对本地约定的态度 | 以本仓库模板和共享资产为准 | 优先尊重现有项目约定 |
| 技术栈收敛策略 | 直接以推荐模板和推荐栈输出 | 除非用户明确要求，否则不强推全仓迁移 |
| 计划文件作用 | 为生成任务服务 | 为复杂维护/重构任务服务 |

## 三、默认 skill 路由区别

### `skillpack-agent` 的默认侧重点

优先顺序更偏“生成链”：

1. `plan-to-spec`
2. `build-from-spec`
3. `post-generation`
4. `mui-v6-design`
5. `material-react-table`
6. `design-critique`
7. `design-polish`
8. `code-review`

这意味着它默认把用户请求理解成“要产出一个基于模板的新结果”。

### `portable-agent` 的默认侧重点

优先顺序更偏“理解现状再动手”：

1. `project-context`
2. `mui-v6-design`
3. `material-react-table`
4. `design-critique`
5. `design-polish`
6. `quality-gate`
7. `code-review`
8. `plan-to-spec`
9. `build-from-spec`
10. `post-generation`

这意味着它默认把用户请求理解成“先读当前项目，再判断应该维护、重构，还是生成”。

## 四、什么时候该用哪一个

### 用 `skillpack-agent`

适合：

- 你在维护这套 agent 本身
- 你在改模板
- 你在改 generator
- 你要验证生成产物
- 你要演示“新建一个项目”这条链路

### 用 `portable-agent`

适合：

- 你要把这套 agent 放进别人的仓库
- 目标仓库已经有 React 项目或前端代码
- 你主要是做维护、升级、统一风格、渐进改造
- 只有少数情况下才需要新生成一个独立页面或模块

## 五、把 `skillpack-agent` 改成 `portable-agent`，需要做哪些操作

这里的“改成”不是把两个目录合并，而是指：

- 你原本想把 `skillpack-agent` 那套内容直接放进一个业务仓库里使用
- 现在要改成 `portable-agent` 这套行为模型

推荐做法如下。

### 方案 A：直接使用现成的 `portable-agent`

这是最推荐的方式。

1. 不要复制 `skillpack-agent/` 到目标仓库。
2. 直接复制 [portable-agent](/Users/baizijun/projects/claude-vscode/portable-agent) 里的这两部分到目标仓库根目录：
   - `AGENTS.md`
   - `.github/`
3. 不要复制 `generated/`。
4. 不要复制 `plans/` 作为仓库正式内容；需要时让 agent 自己在本地生成。
5. 复制完成后，在目标仓库里直接使用 `@ux-standard`。

这样做的好处是：

- 默认行为就是“先理解现有项目”
- 不会错误地把目标仓库当成模板生成仓
- 不会默认把新产物塞进 `generated/`

### 方案 B：如果你已经把 `skillpack-agent` 放进了目标仓库，需要切换成 portable 语义

如果你已经把 `skillpack-agent` 风格的内容带进了别人的仓库，建议按下面的替换方式处理。

1. 用 `portable-agent/AGENTS.md` 替换目标仓库里的 `AGENTS.md`。
2. 用 `portable-agent/.github/agents/ux-standard.agent.md` 替换目标仓库里的同名 agent 文件。
3. 把 `portable-agent/.github/skills/project-context/` 一并带进去。
   - 这是 portable 默认工作流和 skillpack 最大的区别之一。
4. 用 `portable-agent/.github/copilot-instructions.md` 和相关 prompts / skills 覆盖目标仓库里对应文件。
5. 保留共享模板和 generator，但调整使用预期：
   - 生成不再是默认动作
   - 生成时才显式指定输出目录
6. 确认目标仓库的 `.gitignore` 忽略了 `plans/`。
7. 不要要求仓库里长期保留 `generated/`；只有确实要用 skillpack 的演示式生成时才需要。

## 六、切换时最容易出错的地方

### 1. 还把目标仓库当成“生成仓库”

这是最常见的问题。

如果你在已有仓库里还沿用 `skillpack-agent` 的思维，agent 会过早进入 `plan-to-spec -> build-from-spec`，而不是先理解现有代码。

### 2. 默认假设输出目录是 `generated/`

这在作者工作台里没问题，但在已有仓库里通常不对。

portable 的正确做法是：

- 默认原地维护
- 只有明确生成新子树时才给 `outputDir`

### 3. 忘了带上 `project-context`

如果没有这个 skill，portable 模式就会失去“先理解当前项目”的关键一步。

### 4. 把 `plans/` 当成正式仓库内容

`plans/` 现在默认是本地工作状态，不是必须提交的项目文档。

除非用户明确要求保留计划文档，否则不要把它当作仓库正式资产。

## 七、建议的使用原则

如果一句话概括：

- **维护这套 agent 本身，用 `skillpack-agent`**
- **把 agent 带进现有项目里工作，用 `portable-agent`**

如果你只是想把这套能力交给别的项目使用，而不是继续维护模板和生成器本身，那么默认应该选 `portable-agent`，而不是 `skillpack-agent`。
