---
name: component
description: Get Material UI v6 component and layout guidance using the repository design skill
agent: ux-standard
argument-hint: "button | table | form | card | dialog | navigation | layout | theme"
---

# Component Guidelines Query

Use the `mui-v6-design` skill and provide Material UI v6 guidance based on this repository.

## Available Component Guides

- [Button Guide](../skills/_shared/components/button.md) - Button variants, states, and best practices
- [Table/DataGrid Guide](../skills/_shared/components/table.md) - Data display with MUI DataGrid
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
- `/component table` - Get DataGrid/Table guidelines
- `/component form` - Get Form component guidelines
- `/component navigation` - Get Sidebar/Menu guidelines

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
