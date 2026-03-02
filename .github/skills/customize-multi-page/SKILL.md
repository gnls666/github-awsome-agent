---
name: customize-multi-page
description: Use when the user customizes multi-page generated apps, including route structure, sidebar navigation, page composition, and layout behavior.
---

# Customize Multi-Page

Use this skill for app-shell and routing customization.

## Trigger Signals

- Requests mention pages, routes, sidebar, header, navigation, or app layout.

## Workflow

1. Read [references/router-sidebar-rules.md](references/router-sidebar-rules.md).
2. Keep page files, router entries, and sidebar nav items synchronized.
3. Ensure first page remains default index route unless user asks otherwise.
4. Maintain responsive behavior in `Layout.tsx` and `Sidebar.tsx`.

## Primary Files

- `src/router.tsx`
- `src/Sidebar.tsx`
- `src/Layout.tsx`
- `src/pages/*`
