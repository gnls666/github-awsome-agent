---
name: multi-page
description: Generate a complete multi-page site with Header, Sidebar, and Router
agent: agent
argument-hint: "projectName=dashboard pages=Users,Products,Settings"
---

# Generate Multi-Page Site

Generate a complete multi-page site based on the [multi-page template](../../templates/multi-page/README.md).

## User Parameters

- **projectName**: ${input:projectName:Project name for package.json}
- **pages**: ${input:pages:Comma-separated page names (e.g., Users,Products,Settings)}

## Reference Templates

Use these template files as the base for generation:

- [Layout component](../../templates/multi-page/src/Layout.tsx.template)
- [Header component](../../templates/multi-page/src/Header.tsx.template)
- [Sidebar component](../../templates/multi-page/src/Sidebar.tsx.template)
- [Router setup](../../templates/multi-page/src/router.tsx.template)

## Component Guidelines

Follow these guides:

- [Navigation Guide](../../components/navigation.md)
- [Layout Guide](../../components/layout.md)

## Layout Requirements

### Header
- Fixed position at top
- Left side: Display "**UX template**" as the app title
- Right side: Optional user menu or actions
- Height: 64px (MUI AppBar default)

### Sidebar
- Fixed position on left
- Width: 240px
- Dynamically generated navigation items based on `pages` parameter
- Active state highlighting for current page
- Collapsible on mobile (responsive)

### Main Content Area
- Fills remaining space
- Proper padding and scroll behavior
- React Router outlet for page content

## Requirements

1. Use `react-router-dom` v7 for routing
2. Generate Sidebar navigation dynamically from `pages` parameter
3. Support responsive layout (mobile-friendly)
4. Include proper TypeScript types
5. Generate a page component for each item in `pages`

## Output Directory

Generate files in the `generated/{{projectName}}/` folder.

## File Structure to Generate

```
generated/{{projectName}}/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── Layout.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── router.tsx
│   ├── pages/
│   │   ├── {{PageName}}Page.tsx (for each page)
│   │   └── index.ts
│   ├── types.ts
│   ├── vite-env.d.ts
│   └── __tests__/
│       ├── setup.ts
│       └── Layout.test.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── index.html
```

## Example Output

For `projectName=admin-dashboard, pages=Users,Products,Settings`:

### Generated Routes
- `/users` → UsersPage
- `/products` → ProductsPage
- `/settings` → SettingsPage

### Sidebar Items
```tsx
const navItems = [
  { path: '/users', title: 'Users', icon: <PeopleIcon /> },
  { path: '/products', title: 'Products', icon: <InventoryIcon /> },
  { path: '/settings', title: 'Settings', icon: <SettingsIcon /> },
];
```

### Header Display
- App title: "UX template" (top-left)
