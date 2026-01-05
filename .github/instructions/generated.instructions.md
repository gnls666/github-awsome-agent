---
applyTo: "generated/**"
---

# Generated Projects Instructions

These are generated React + MUI projects created by `scripts/generate.js`.

## Rules

- Follow existing code patterns in the project
- Use MUI `sx` prop for styling (not styled-components)
- Maintain TypeScript strict mode
- Run `pnpm typecheck` after modifications to verify changes
- Use named exports for components

## Do NOT Modify

- `node_modules/` - Package dependencies
- `pnpm-lock.yaml` - Lock file (auto-generated)

## Commands

```bash
pnpm install      # Install dependencies
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm typecheck    # TypeScript check
pnpm test         # Run tests
```

## Code Style

- Function components with React Hooks
- Interfaces for all component props
- Error handling with try/catch
- Loading states for async operations

## Code Examples

When explaining code patterns, prefer real code snippets over text descriptions.

### Good - Show actual code:

```tsx
// Search filter example
const [searchTerm, setSearchTerm] = useState('');
const filteredData = data.filter(item =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
);
```

```tsx
// Loading state example
if (loading) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
      <CircularProgress />
    </Box>
  );
}
```

### Avoid - Long text explanations without code examples
