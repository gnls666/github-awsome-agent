# Integration Notes

## How MRT Fits This Repository

- `mui-v6-design` stays responsible for global layout, spacing, theme, and design language.
- `material-react-table` is the table-specific skill for rich admin grids.
- `.github/skills/_shared/components/layout.md` defines page shells and width behavior.
- `.github/skills/_shared/components/form.md` defines filter bars, modal forms, and admin field density.
- `.github/skills/_shared/components/table.md` is the quick shared guide and should stay aligned with this skill.

## Recommended Defaults

- List pages: use MRT as the default table layer.
- Search + filters: keep them in a dedicated surface above the table, not embedded into a narrow centered band.
- Row actions: use compact icon actions or an overflow menu.
- Detail or edit flows: use drawers, dialogs, or routed detail pages depending on the task size.
- Toolbars: keep view controls, density, column toggles, export, and selection-aware actions in the toolbar.

## External Skill Research

No strong, authoritative public Copilot/Codex skill for Material React Table was found during research.

Use the official MRT documentation as the primary source of truth. Treat public skill marketplaces or prompt snippets only as weak inspiration for naming or structure, not as API authority.
