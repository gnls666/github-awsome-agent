---
name: component
description: Get component-layer, composed pattern, Material UI v6, and Material React Table guidance using the repository design skills
agent: ux-standard
argument-hint: "button | table | material-react-table | mrt | form | card | dialog | navigation | layout | theme"
---

# Component Guidelines Query

Start with the component guides for routine building blocks. Use `platform-patterns` when the desired result is a known multi-component composition. Use `mui-v6-design` for general UI guidance and `material-react-table` for rich admin table guidance.

## Available Component Guides

- [Platform Patterns Skill](../skills/platform-patterns/SKILL.md) - Preferred composed references for page shells, async states, filter toolbars, forms, admin table compositions, and persistent operation-error panels
- [Button Guide](../skills/_shared/components/button.md) - Button variants, states, and best practices
- [Table Guide](../skills/_shared/components/table.md) - Rich admin tables with Material React Table and DataGrid fallback
- [Material React Table Skill](../skills/material-react-table/SKILL.md) - Advanced table workflow, server-side patterns, and toolbar/row-action guidance
- [Form Guide](../skills/_shared/components/form.md) - Form layouts, validation, and inputs
- [Card Guide](../skills/_shared/components/card.md) - Card layouts and content patterns
- [Dialog Guide](../skills/_shared/components/dialog.md) - Modal dialogs and confirmations
- [Navigation Guide](../skills/_shared/components/navigation.md) - Sidebar, menus, and navigation patterns
- [Layout Guide](../skills/_shared/components/layout.md) - Page layouts and responsive design
- [Theme Guide](../skills/mui-v6-design/references/theme-v6.md) - Theme setup and reusable styling
- [Visual Rules](../skills/mui-v6-design/references/visual-rules.md) - Layout rhythm, spacing, and polish
- [API Design Guide](../skills/_shared/components/api-design.md) - API patterns and best practices

## How to Use

Query a specific component to get:

1. **Overview** - When and why to use this component
2. **Variants** - Available variants and when to use each
3. **Code Examples** - TypeScript + Material UI v6 code snippets
4. **Best Practices** - UX guidelines and accessibility
5. **Common Patterns** - Frequently used combinations

## Example Queries

- `/component button` - Get Button component guidelines
- `/component table` - Get rich table guidelines
- `/component material-react-table` - Get MRT-specific guidance
- `/component form` - Get form building blocks first, plus composed form patterns when the target result calls for them
- `/component navigation` - Get Sidebar/Menu guidelines
- `/component pattern` - Get reusable page-shell, async-state, filter-toolbar, admin-table, or operation-error panel patterns

## Response Format

When responding about a component, include:

```markdown
## Component Name

### When to Use
[Description of use cases]

### Variants
[Available variants with descriptions]

### Code Example
[TypeScript code example]

### Best Practices
[List of best practices]

### Accessibility
[Accessibility considerations]
```
