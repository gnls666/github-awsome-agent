---
agent: engineering-agent-builder
description: Build a complete benchmarked custom engineering-agent bundle for development, QA, review, migration, testing, or maintenance
---

# /build-engineering-agent

Create or update a runnable custom engineering-agent bundle from the user's agent idea in one pass.

Use the `engineering-agent-builder` skill.

## Rules

1. Produce runnable artifacts, not only prose.
2. Ask at most two blocking questions when the agent's scope or target domain is materially ambiguous.
3. For a new bundle, first run `.github/skills/engineering-agent-builder/scripts/scaffold-agent-bundle.mjs`, then refine the generated files.
4. Keep the generated bundle layered:
   - `.github/agents/<agent-name>.agent.md` for policy and routing
   - `.github/prompts/<agent-name>.prompt.md` for a user-facing shortcut when useful
   - `.github/skills/<focused-skill>/SKILL.md` for reusable methods or language/framework rules
   - `benchmarks/<agent-name>/` for benchmark protocol and at least one golden task
5. Keep Java, Python, or framework-specific rules in skills instead of overloading the agent profile.
6. Do not add specialist agents unless the requested scope has different permissions, tools, or context boundaries.
7. Run the smallest relevant verification after writing artifacts.

## Expected Output

- Files created or updated
- Required vs optional layers
- Benchmark task and scoring summary
- Verification commands and results
