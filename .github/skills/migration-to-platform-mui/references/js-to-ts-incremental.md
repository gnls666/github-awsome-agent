# Incremental JavaScript To TypeScript

Use this track when the user wants stronger typing without a full rewrite.

## Default Strategy

- convert only touched files and directly adjacent interfaces
- allow JS and TS to coexist
- preserve runtime behavior and file/module boundaries
- avoid opportunistic architectural rewrites

## Preferred Order

1. type shared data shapes used by the migrated scope
2. convert the pilot page/module files
3. convert local hooks or utilities only when needed by the migrated scope
4. tighten types after the migration path is stable

## Guardrails

- Do not turn incremental TS migration into a global strictness crusade.
- Do not rename broad directory trees just to normalize extensions.
- Avoid introducing complex generic abstractions unless the existing code already depends on them.
- Favor pragmatic interfaces and local types over broad speculative modeling.
