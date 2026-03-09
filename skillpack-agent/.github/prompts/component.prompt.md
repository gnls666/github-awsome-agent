---
name: component
description: Get MUI component usage guidance using repository component standards skill
agent: ux-standard
argument-hint: "button | table | form | card | dialog | navigation | layout"
---

# Component Guidelines Query

Use the `component-standards` skill and provide MUI component guidance based on this repository.

## Available Component Guides

- [Button Guide](../skills/_shared/components/button.md) - Button variants, states, and best practices
- [Table/DataGrid Guide](../skills/_shared/components/table.md) - Data display with MUI DataGrid
- [Form Guide](../skills/_shared/components/form.md) - Form layouts, validation, and inputs
- [Card Guide](../skills/_shared/components/card.md) - Card layouts and content patterns
- [Dialog Guide](../skills/_shared/components/dialog.md) - Modal dialogs and confirmations
- [Navigation Guide](../skills/_shared/components/navigation.md) - Sidebar, menus, and navigation patterns
- [Layout Guide](../skills/_shared/components/layout.md) - Page layouts and responsive design
- [API Design Guide](../skills/_shared/components/api-design.md) - API patterns and best practices

## How to Use

Query a specific component to get:

1. **Overview** - When and why to use this component
2. **Variants** - Available variants and when to use each
3. **Code Examples** - TypeScript + MUI code snippets
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
