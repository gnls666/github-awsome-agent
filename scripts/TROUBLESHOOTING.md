# Troubleshooting Guide

Quick reference for common issues when generating and customizing projects.

## Generator Script Errors

### Template not found

```
❌ Template "xxx" not found.
   Available templates: list-page, detail-page, multi-page
```

**Solution:** Use the exact template name:
- `list-page` (not `listpage` or `list`)
- `detail-page` (not `detailpage` or `detail`)
- `multi-page` (not `multipage` or `multi`)

### Output directory already exists

```
❌ Output directory already exists: generated/my-project
```

**Solution:** Remove existing directory first:
```bash
rm -rf generated/my-project
```

### Command not found: node

```
node: command not found
```

**Solution:** Install Node.js (v18+) from https://nodejs.org/

## Build & TypeScript Errors

### After running `pnpm typecheck`

1. **Missing imports** - Check import paths are correct
2. **Type mismatches** - Ensure types in `types.ts` match usage
3. **Undefined properties** - Add missing fields to interfaces

**Common fix pattern:**
```bash
cd generated/<project-name>
pnpm typecheck        # See errors
# Fix the issues
pnpm typecheck        # Verify fixed
```

### Module not found errors

```
Cannot find module '@mui/material'
```

**Solution:** Run `pnpm install` first:
```bash
cd generated/<project-name>
pnpm install
```

## Runtime Errors

### Blank page / React errors

1. Check browser console (F12) for errors
2. Common causes:
   - Missing routes in `router.tsx`
   - Import errors in components
   - Missing default exports

### API errors

If connecting to a real API:
1. Check CORS settings on your backend
2. Verify API endpoint URLs in `api.ts`
3. Check network tab in browser DevTools

## Quick Recovery Commands

```bash
# Start fresh - remove and regenerate
rm -rf generated/<project-name>
node scripts/generate.js <template> <project-name> [options]

# Fix dependencies
cd generated/<project-name>
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Full verification
pnpm typecheck && pnpm build && pnpm dev
```
