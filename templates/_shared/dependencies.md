# Dependency Versions

**IMPORTANT**: Always use these exact versions when generating `package.json`.

## Base Dependencies (All Templates)

```json
{
  "dependencies": {
    "@emotion/react": "^11.13.0",
    "@emotion/styled": "^11.13.0",
    "@mui/material": "^7.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.15.0",
    "@testing-library/react": "^16.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "eslint": "^9.15.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "globals": "^15.12.0",
    "jsdom": "^25.0.0",
    "typescript": "~5.6.0",
    "typescript-eslint": "^8.15.0",
    "vite": "^5.4.0",
    "vitest": "^2.0.0"
  }
}
```

## Template-Specific Dependencies

### list-page
```json
{
  "dependencies": {
    "@mui/x-data-grid": "^7.0.0"
  }
}
```

### detail-page
```json
{
  "dependencies": {
    "@mui/x-date-pickers": "^7.0.0"
  }
}
```

### multi-page
```json
{
  "dependencies": {
    "@mui/icons-material": "^7.0.0",
    "@mui/x-data-grid": "^7.0.0",
    "react-router-dom": "^7.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.9.1"
  }
}
```

---

## Upgrade Guide

When upgrading dependency versions:

### Step 1: Update this file
Edit the version numbers in this file first.

### Step 2: Update template files
Update versions in these files:
- `templates/list-page/package.json.template`
- `templates/detail-page/package.json.template`
- `templates/multi-page/package.json.template`

### Step 3: Test generated project
```bash
cd generated/test-project
pnpm install
pnpm typecheck
pnpm test
pnpm build
```

### Step 4: Verify compatibility
- Check MUI component APIs haven't changed
- Check React Router APIs (v7 has breaking changes from v6)
- Check Vite/Vitest configurations
