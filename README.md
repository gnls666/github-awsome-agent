# UX Standard Portable Agent

This repository is the portable distribution of `ux-standard` for copying into a target workspace.

## Repository Layout

- `.github/` contains the portable agent, prompts, instructions, skills, and bundle config.
- `AGENTS.md` describes how to work on this bundle repository itself.
- `plans/` and `generated/` are local working directories for agent state and generated output when needed.

## Default Behavior

- Start by identifying whether the target workspace is empty, a single project, or a multi-project repository.
- Prefer in-place maintenance and gradual refactor for existing projects.
- Use generation when the workspace is empty or when the user explicitly wants a new standalone module or app.
- Do not assume the repository root is the project target until local project roots are checked.
- When generation is needed inside an existing project, require an explicit output directory instead of guessing one.
- For empty-workspace bootstrap, generation may write to the current root.

## Install Into Another Repository

Copy this bundle's `.github/` directory into the target workspace root:

- `.github/`

After copying, the target workspace can use `@ux-standard`.
The target project's own `AGENTS.md` should be created or updated in that target workspace at runtime by `project-context`.

## Working On This Repository

If you are evolving the portable bundle itself, work at the repository root:

- update `.github/` directly
- keep `AGENTS.md` focused on the bundle repository
- keep target-project guidance inside the target repository where the bundle is installed
