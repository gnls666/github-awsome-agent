# UX Standard Agent - Global Instructions

This repository contains templates and guidelines for generating frontend pages using React 18, Vite 5.4, and MUI 7.

## Before Generating Code

**MUST read these files first:**
1. `templates/_shared/dependencies.md` - Dependency versions
2. `templates/_shared/variables.md` - Variable naming rules

Then read the specific template directory for your task.

## Technology Stack

- **React 18** - Modern React with Hooks and Concurrent Features
- **Vite 5.4** - Next-generation frontend build tool
- **MUI 7** - Material UI component library
- **TypeScript 5.x** - Strict type checking enabled
- **Vitest** - Fast unit testing framework

## Project Structure

```
.github/
├── agents/           # Custom agent definitions
├── prompts/          # Reusable prompt files
└── instructions/     # Path-specific instructions

templates/            # Page templates
├── list-page/        # Data list page template
├── detail-page/      # Detail/form page template
└── multi-page/       # Multi-page site template

components/           # MUI component guidelines
```

## Code Generation Rules

When generating React + MUI code in this repository:

1. **Always use TypeScript** with strict mode enabled
2. **Use function components** - Never use class components
3. **Use React Hooks** - useState, useEffect, useCallback, useMemo
4. **Use MUI sx prop** for styling instead of styled-components
5. **Define interfaces** for all component props
6. **Use named exports** for components
7. **Include error boundaries** for production code
8. **Add loading states** for async operations

## Naming Conventions

- **Components**: PascalCase (e.g., `UserListPage`, `ProductCard`)
- **Files**: PascalCase for components, camelCase for utilities
- **Props interfaces**: `ComponentNameProps` (e.g., `UserListPageProps`)
- **Hooks**: `use` prefix (e.g., `useUserData`)

## Import Order

1. React imports
2. Third-party library imports (MUI, react-router, etc.)
3. Local component imports
4. Local utility/hook imports
5. Type imports
6. Style imports (if any)

## Testing Requirements

- All components should be testable with Vitest
- Use React Testing Library for component tests
- Minimum test coverage: render test + key interactions
