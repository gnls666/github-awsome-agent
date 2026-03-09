# Portable Agent Workspace

This directory is the portable distribution of `ux-standard` for copying into an existing repository.

## Default Behavior

- Start by understanding the existing project.
- Prefer in-place maintenance and gradual refactor.
- Use generation only when the user explicitly wants a new standalone module or app.
- Treat the current repository root as the main project target; do not assume an `app` or `apps` subdirectory exists.
- When generation is needed inside an existing repository, require an explicit output directory instead of guessing one.

## Install Into Another Repository

Copy these bundle contents into the target repository root:

- `AGENTS.md`
- `.github/`

After copying, the target repository can use `@ux-standard` as a portable agent bundle.
