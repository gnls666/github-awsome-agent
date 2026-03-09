# AGENTS.md

This workspace is a meta-repository for two sibling agent workspaces.

## Workspace Layout

- `skillpack-agent/` is the authoring and testable skillpack workspace.
- `portable-agent/` is the portable workspace meant to be copied into an existing repository.
- `docs/` contains workspace-level architecture notes.

## Working Rules

- When changing the main skillpack, work inside `skillpack-agent/`.
- When changing the portable distribution, work directly inside `portable-agent/`.
