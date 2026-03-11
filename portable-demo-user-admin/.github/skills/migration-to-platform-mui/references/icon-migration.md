# Icon Migration

Use the platform icon entrypoint as part of the target stack.

## Rules

- In migrated files, prefer the platform icon import path over direct imports from the old icon library.
- Keep icon replacement within the declared migration scope unless the user explicitly asks for a broader sweep.
- Preserve visual intent first: replace semantics before chasing one-to-one glyph perfection.

## Recommended Order

1. replace top-level navigation and app-shell icons in the migrated scope
2. replace action icons in touched components
3. replace status or decorative icons only when they materially affect the migrated UI

## Anti-Patterns

- Leaving three icon libraries mixed inside the same migrated file
- Treating icon replacement as a standalone full-repository cleanup before the main migration path is proven
