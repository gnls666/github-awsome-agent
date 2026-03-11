# Visual Rules

Apply these rules whenever the request affects page structure, layout, spacing, or UI polish.

## Spacing Rhythm

- Use the theme's 8px spacing scale.
- Prefer `Stack` for local vertical rhythm and `Grid` from `@mui/material/Grid2` for macro layout.
- Keep page padding at `px: { xs: 2, md: 3 }` and `py: { xs: 2, md: 3 }`.
- Use `gap: 2` inside dense control rows and `gap: 3` or `4` between major sections.
- Prefer card and paper padding of `3` for standard content blocks and `2` for dense toolbars.

## Page Shell

- Prefer a restrained content frame over edge-to-edge layouts on desktop.
- Do not squeeze the main work area into a narrow centered column when the shell already has a sidebar or persistent navigation.
- For list, dashboard, and admin pages, let the content area expand to use the available width; reserve narrow reading widths for forms, settings prose, or detail sections that truly benefit from it.
- Use a page header with title, short supporting copy, and a right-aligned action area.
- Keep filters and search inside a dedicated surface instead of mixing them into the page title row.
- For dashboards, separate hero metrics, supporting charts/tables, and recent activity into distinct sections.

## Surfaces

- Reuse a small set of surface treatments: neutral page background, elevated cards, and one highlighted accent surface if needed.
- Keep border radius and shadow consistent through the theme instead of per-card ad hoc styling.
- Use status chips, soft color backgrounds, and icon containers sparingly and consistently.

## Density

- Default to `size="small"` for dense filters and admin form controls.
- Avoid overly tall cards, giant page titles, and full-width form rows when a 2-column layout improves scanning.
- Do not stack too many actions in one row on mobile; let action groups wrap or collapse.
