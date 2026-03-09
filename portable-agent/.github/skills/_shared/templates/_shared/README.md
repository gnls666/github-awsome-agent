# Shared Templates Documentation

This directory contains shared documentation for all templates. **AI Agents MUST read these files before generating code.**

## Files

| File | Purpose |
|------|---------|
| `dependencies.md` | Dependency versions and upgrade guide |
| `variables.md` | Template variable naming conventions |

## For AI Agents

When generating a project, follow this order:

1. **Read** `_shared/dependencies.md` - Get correct dependency versions
2. **Read** `_shared/variables.md` - Understand variable naming
3. **Read** the specific template directory (e.g., `multi-page/`)
4. **Generate** files with correct versions and variable substitutions
5. **Output** to `generated/{{projectName}}/`
