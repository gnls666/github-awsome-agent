---
applyTo: "src/**/*.ts,src/**/*.tsx,app/**/*.ts,app/**/*.tsx,pages/**/*.ts,pages/**/*.tsx,apps/**/*.ts,apps/**/*.tsx,apps/**/src/**/*.ts,apps/**/src/**/*.tsx,packages/**/*.ts,packages/**/*.tsx,packages/**/src/**/*.ts,packages/**/src/**/*.tsx"
---

# Existing Project Instructions

When editing code in an existing repository:

- Inspect nearby files and follow local patterns before introducing new abstractions.
- Prefer incremental edits over broad rewrites.
- Keep behavior stable unless the task explicitly changes it.
- Match the repository's existing package manager, routing style, and state/data conventions.
- Run the smallest relevant validation for the touched area before broadening scope.
