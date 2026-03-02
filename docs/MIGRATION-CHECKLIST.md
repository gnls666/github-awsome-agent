# Migration Checklist (Execution-Grade)

This checklist is designed for high-confidence migration from legacy layout to skill-only layout.

Use it as a hard gate list. Do not skip steps.

## A. Preconditions (must pass before touching files)

1. Confirm target platform: VS Code Copilot Agent Mode `1.109+`.
2. Confirm architecture: single agent + auto-triggered skills.
3. Confirm backup point exists:

```bash
git status
git rev-parse --short HEAD
```

4. Create dedicated migration branch:

```bash
git switch <legacy-branch>
git switch -c <migration-branch>
```

5. Confirm legacy root layout exists (or equivalent):

```bash
ls -la
```

Expected legacy indicators:

1. `components/`
2. `templates/`
3. `scripts/`

## B. Build skill structure first (no deletions yet)

1. Create `.github/skills/`.
2. Create skill folders:

- `requirement-intake`
- `template-selection`
- `project-generation`
- `customize-list-page`
- `customize-detail-page`
- `customize-multi-page`
- `component-standards`
- `quality-gate`
- `troubleshooting`

3. Add `SKILL.md` in each folder with:

1. `name`
2. `description`
3. trigger signals
4. workflow
5. output contract

## C. Create `_shared` asset layer

1. Create `.github/skills/_shared/`.
2. Copy legacy assets into `_shared`:

- `components/` -> `_shared/components/`
- `templates/` -> `_shared/templates/`
- `scripts/generate.js` -> `_shared/scripts/generate.js`
- `scripts/generate.test.mjs` -> `_shared/scripts/generate.test.mjs`
- `scripts/TROUBLESHOOTING.md` -> `_shared/TROUBLESHOOTING.md`

3. Copy any critical instructions used by generated projects into `_shared/instructions/`.

## D. Make generator portable (critical)

Update `_shared/scripts/generate.js` so that:

1. template source path is `_shared/templates`.
2. output path is `process.cwd()/generated`.
3. command examples use `_shared` script path.

Canonical command:

```bash
node .github/skills/_shared/scripts/generate.js <template> <project-name> [options]
```

## E. Repoint all references (critical)

Update all references away from legacy root paths:

1. `.github/agents/*.agent.md`
2. `.github/copilot-instructions.md`
3. `.github/prompts/*.prompt.md`
4. `.github/instructions/*.instructions.md`
5. `.github/skills/*/references/*.md`

Target references should point to `.github/skills/_shared/...`.

## F. Validation Gate #1 (before deleting legacy dirs)

Run all commands below and require success:

```bash
node --check .github/skills/_shared/scripts/generate.js
node .github/skills/_shared/scripts/generate.js list-page gate1-list --entity User --title "User Management" --dry-run
node .github/skills/_shared/scripts/generate.js detail-page gate1-detail --entity Product --title "Product Detail" --dry-run
node .github/skills/_shared/scripts/generate.js multi-page gate1-multi --title "Admin" --pages "Home,Orders,Reports" --dry-run
node --test .github/skills/_shared/scripts/generate.test.mjs
```

If any command fails, stop and fix before proceeding.

## G. Delete legacy root directories (cutover)

Only after Gate #1 passes:

```bash
git rm -r -f components templates scripts
```

Keep:

1. `generated/.gitkeep`

## H. Validation Gate #2 (after deletion)

1. Run generator dry-runs again:

```bash
node .github/skills/_shared/scripts/generate.js list-page gate2-list --entity User --title "User Management" --dry-run
node .github/skills/_shared/scripts/generate.js multi-page gate2-multi --title "Admin" --pages "Dashboard,Users,Reports" --dry-run
node --test .github/skills/_shared/scripts/generate.test.mjs
```

2. Run stale-path scan:

```bash
rg --hidden -n "\bcomponents/|\btemplates/|scripts/generate.js|scripts/TROUBLESHOOTING.md" . -g '!node_modules' -g '!.git'
```

Pass rule:

1. matches in `.github/skills/_shared/...` are expected.
2. no active dependency should remain on deleted root directories.

## I. Documentation closure (required)

Update at least:

1. architecture readme
2. migration methodology
3. operator checklist
4. any agent/prompt docs that still mention legacy commands

## J. Acceptance criteria

Migration is accepted only if all are true:

1. Root has no `components/`, `templates/`, `scripts/`.
2. Generation works through `_shared/scripts/generate.js` only.
3. Skills references resolve without legacy directories.
4. Both validation gates pass.
5. Documentation reflects current canonical paths.

## K. Rollback strategy

If blocked at any stage:

1. Stop at current stage.
2. Capture failing command + output.
3. Revert branch to pre-cutover commit:

```bash
git log --oneline -n 20
# pick safe commit
# git reset --hard <safe-commit>   (only if explicitly approved in your workflow)
```

4. Resume from the last successful gate.

## L. Recommended commit slicing

For safe PR review, split into commits:

1. skill skeleton + `_shared` asset import
2. generator portability changes
3. path rewiring (agent/prompts/instructions/references)
4. tests and validation updates
5. legacy directory deletion
6. final docs
