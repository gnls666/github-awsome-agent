---
name: mui-v6-design
description: Provide Material UI v6 component, layout, theme, and visual design guidance for this repository. Use when requests need MUI v6 components, page shells, spacing, forms, tables, dialogs, navigation, or UI polish. Do not use for template selection, project generation, or non-MUI libraries.
---

# MUI v6 Design

Use this skill for instructional MUI v6 work and for UI polish decisions that should stay aligned with the repository's shared patterns.

## Trigger Signals

- User asks for guidance on MUI v6 components, page layouts, visual spacing, theme setup, cards, tables, forms, dialogs, navigation, or dashboards.
- Request is instructional or design-oriented rather than immediate template generation.
- Work needs concrete code examples that stay on Material UI v6 APIs.
- Work needs stronger visual quality without abandoning the repository's MUI-first system.

## Workflow

1. Read [references/components-index.md](references/components-index.md), [references/v6-guardrails.md](references/v6-guardrails.md), and [references/design-anti-patterns.md](references/design-anti-patterns.md).
2. For page, dashboard, or layout questions, also read [references/visual-rules.md](references/visual-rules.md).
3. For theme, dark mode, or reusable visual system questions, also read [references/theme-v6.md](references/theme-v6.md).
4. Load only the relevant shared component guide files from `.github/skills/_shared/components/`.
5. Choose a clear visual direction before suggesting detailed code.
6. Answer with concrete MUI v6 examples and concise best practices.
7. Keep recommendations aligned with the repository's spacing, surface, page-shell rules, and anti-pattern guardrails.

## Design Stance

- Prefer intentional, editorial, or product-grade composition over generic admin boilerplate.
- Preserve enterprise usability: clarity, scanability, and state visibility still matter more than decorative flair.
- Use anti-patterns as a hard filter. If a suggestion looks like generic AI UI, change direction.
