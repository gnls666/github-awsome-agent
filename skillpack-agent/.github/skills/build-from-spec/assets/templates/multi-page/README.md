# Multi-Page Site Template

A runnable multi-page admin shell with Header, Sidebar, React Router, and Material React Table defaults for operational list pages.

## Features

- Fixed Header with "UX template" branding
- Collapsible Sidebar (200px width) with navigation
- React Router v7 for routing
- Dynamic route and sidebar generation based on the pages parameter
- Material React Table defaults for operational list pages such as Users and Products
- Responsive layout (mobile-friendly)
- TypeScript strict mode
- Vitest for testing

## Template Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Project name (kebab-case) | `admin-dashboard` |
| `{{PAGES}}` | Array of page names (comma-separated) | `Dashboard,Users,Products` |

## Layout Structure

```
+--------------------------------------------------+
|  Header (64px)                                    |
|  +----------------------------------------------+|
|  | [☰] UX template                  [User Menu] ||
+--+----------------------------------------------++
|       |                                          |
| Side  |  Main Content Area                       |
| bar   |                                          |
| 200px |  (React Router Outlet)                   |
|       |                                          |
|       |                                          |
+-------+------------------------------------------+
```

## Files

```
.github/skills/build-from-spec/assets/templates/multi-page/
├── index.html.template           # HTML entry point
├── package.json.template         # Dependencies and scripts
├── AGENTS.md.template            # Workspace-level project guidance
├── tsconfig.json.template        # TypeScript config
├── tsconfig.node.json.template   # TypeScript config for Node
├── vite.config.ts.template       # Vite config
├── vitest.config.ts.template     # Vitest config
├── README.md                     # This file
└── src/
    ├── App.test.tsx.template     # Baseline smoke test
    ├── App.tsx.template          # Root app with theme
    ├── Header.tsx.template       # Header (UX template branding)
    ├── Layout.tsx.template       # Main layout
    ├── Sidebar.tsx.template      # Navigation sidebar
    ├── main.tsx.template         # Entry point
    ├── router.tsx.template       # React Router config
    ├── vite-env.d.ts.template    # Vite types
    ├── pages/
    │   ├── DashboardPage.tsx.template   # Dashboard page
    │   ├── UsersPage.tsx.template       # Users list page
    │   └── ProductsPage.tsx.template    # Products list page
    └── test/
        └── setup.ts.template     # Test setup
```

## Usage

Generate from the embedded generator:

```bash
node .github/skills/build-from-spec/scripts/generate.js multi-page my-dashboard --title "Dashboard" --pages "Dashboard,Users,Products"
```

Use `--output <dir>` when you need a non-default destination.

`{{PAGES}}` drives the generated route imports, route config, and sidebar navigation entries.

The generated project also includes a root `AGENTS.md` that documents the local workspace, validation expectations, and when nested `AGENTS.md` files are justified.

## Testing

```bash
pnpm typecheck   # TypeScript check
pnpm test        # Run Vitest tests
```
