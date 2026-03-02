# Cross-Project Migration Playbook (From Legacy Layout to Skill-Only)

This playbook is for migrating another repository that still uses the legacy pattern:

```text
components/
templates/
scripts/
.github/(agents/prompts/instructions)
```

to skill-only:

```text
.github/skills/
.github/skills/_shared/
```

## 1. When this playbook applies

Use this playbook if the source repository has:

1. a generator script driven by templates
2. component/design guidance files
3. Copilot agent or prompt instructions referencing root-level assets

## 2. Migration inputs you must define

Before starting, fill these values:

1. `LEGACY_BRANCH` (example: `main`)
2. `MIGRATION_BRANCH` (example: `feat/skill-only-migration`)
3. `GENERATOR_REL_PATH` (example: `scripts/generate.js`)
4. `TEMPLATE_DIR` (example: `templates`)
5. `COMPONENT_DIR` (example: `components`)
6. `SKILLPACK_ROOT` (fixed: `.github/skills/_shared`)

## 3. One-time bootstrap commands

```bash
git switch ${LEGACY_BRANCH}
git switch -c ${MIGRATION_BRANCH}

mkdir -p .github/skills/_shared/scripts
mkdir -p .github/skills/_shared/templates
mkdir -p .github/skills/_shared/components
mkdir -p .github/skills/_shared/instructions
```

## 4. Copy legacy assets into `_shared`

```bash
cp -R ${COMPONENT_DIR}/* .github/skills/_shared/components/
cp -R ${TEMPLATE_DIR}/* .github/skills/_shared/templates/
cp ${GENERATOR_REL_PATH} .github/skills/_shared/scripts/generate.js
```

If present, also copy:

1. troubleshooting docs
2. generated-project instructions
3. generator tests

## 5. Port the generator script

Apply these rules inside `_shared/scripts/generate.js`:

1. template source root = `.github/skills/_shared/templates`
2. generated output root = `${WORKSPACE_ROOT}/generated`
3. usage docs mention `_shared` command path

Required command contract:

```bash
node .github/skills/_shared/scripts/generate.js <template> <project-name> [options]
```

## 6. Create skill set and routing

Create these skill folders (minimum viable set):

1. requirement-intake
2. template-selection
3. project-generation
4. customize-list-page
5. customize-detail-page
6. customize-multi-page
7. component-standards
8. quality-gate
9. troubleshooting

For each skill, create:

1. `SKILL.md`
2. `references/*.md`

## 7. Rewire all repository references

Update references in:

1. `.github/agents/*.agent.md`
2. `.github/copilot-instructions.md`
3. `.github/prompts/*.prompt.md`
4. `.github/instructions/*.instructions.md`
5. `.github/skills/*/references/*.md`

Replace legacy references with `_shared` references.

## 8. Validation matrix (must pass)

Run all checks:

```bash
node --check .github/skills/_shared/scripts/generate.js
node .github/skills/_shared/scripts/generate.js list-page verify-list --entity User --title "User Management" --dry-run
node .github/skills/_shared/scripts/generate.js detail-page verify-detail --entity Product --title "Product Detail" --dry-run
node .github/skills/_shared/scripts/generate.js multi-page verify-multi --title "Admin" --pages "Dashboard,Users,Reports" --dry-run
```

If you have regression tests:

```bash
node --test .github/skills/_shared/scripts/generate.test.mjs
```

## 9. Cutover and cleanup

After validation passes:

```bash
git rm -r -f ${COMPONENT_DIR} ${TEMPLATE_DIR} scripts
```

Keep `generated/.gitkeep`.

## 10. Post-cutover stale reference scan

```bash
rg --hidden -n "\bcomponents/|\btemplates/|scripts/generate.js|scripts/TROUBLESHOOTING.md" . -g '!node_modules' -g '!.git'
```

Review each match:

1. expected if it points to `.github/skills/_shared/...`
2. unexpected if it requires deleted root paths

## 11. PR structure for safe review

Recommended commit sequence:

1. Add skill skeleton
2. Import `_shared` assets
3. Port generator
4. Rewire references
5. Add tests and pass validations
6. Delete legacy directories
7. Final docs

## 12. Final acceptance gates

A migrated repository is ready only if:

1. generation succeeds via `_shared` command
2. no runtime dependency remains on deleted legacy directories
3. agent/prompt/instruction files are consistent
4. migration docs are updated for the new canonical paths

## 13. Common migration failures

## Failure 1: partial file rewrite left stale guidance

Symptom: agent file still references legacy paths in lower sections.

Fix: rewrite entire file, do not patch only top section.

## Failure 2: tests still call old generator path

Symptom: test fails or silently validates the wrong script.

Fix: move test under `_shared/scripts` and update invocation path.

## Failure 3: templates copied, but generator root still points to old path

Symptom: "Template not found" after deleting legacy directories.

Fix: verify template root calculation in `_shared/scripts/generate.js`.
