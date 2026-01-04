---
name: component
description: Get MUI component usage guidelines and best practices
agent: ux-standard
argument-hint: "button | table | form | card | dialog | navigation | layout"
---

# Component Guidelines Query

Provide MUI component usage guidelines based on the component guides in this repository.

## Available Component Guides

- [Button Guide](../../components/button.md) - Button variants, states, and best practices
- [Table/DataGrid Guide](../../components/table.md) - Data display with MUI DataGrid
- [Form Guide](../../components/form.md) - Form layouts, validation, and inputs
- [Card Guide](../../components/card.md) - Card layouts and content patterns
- [Dialog Guide](../../components/dialog.md) - Modal dialogs and confirmations
- [Navigation Guide](../../components/navigation.md) - Sidebar, menus, and navigation patterns
- [Layout Guide](../../components/layout.md) - Page layouts and responsive design
- [API Design Guide](../../components/api-design.md) - API patterns and best practices

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
