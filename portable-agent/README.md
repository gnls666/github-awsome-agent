# Portable Agent Workspace

This directory is the portable distribution of `ux-standard` for copying into a target workspace.

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
The target project's own `AGENTS.md` should be created or updated in that target workspace during real work.
