# Multi-Page Site Template

A complete multi-page site template with Header, Sidebar, and React Router.

## Features

- Fixed Header with "UX template" branding
- Collapsible Sidebar (200px width) with navigation
- React Router v7 for routing
- Dynamic page generation based on pages parameter
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
templates/multi-page/
├── index.html.template           # HTML entry point
├── package.json.template         # Dependencies and scripts
├── tsconfig.json.template        # TypeScript config
├── tsconfig.node.json.template   # TypeScript config for Node
├── vite.config.ts.template       # Vite config
├── vitest.config.ts.template     # Vitest config
├── README.md                     # This file
└── src/
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

1. Use the `/multi-page` prompt with parameters:
   ```
   /multi-page projectName=my-dashboard pages=Dashboard,Users,Products
   ```
2. The agent generates files in `generated/{{projectName}}/`
3. Run the project:
   ```bash
   cd generated/my-dashboard
   pnpm install
   pnpm dev
   ```

## Testing

```bash
pnpm typecheck   # TypeScript check
pnpm test        # Run Vitest tests
```
