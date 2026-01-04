# Router Guide

## Overview

Use React Router v7 with `createBrowserRouter` for type-safe, data-driven routing.

## Basic Setup

```tsx
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Layout } from './Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'users/:id', element: <UserDetailPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
```

## Route Patterns

### Static Routes
```tsx
{ path: 'users', element: <UsersPage /> }
{ path: 'settings', element: <SettingsPage /> }
```

### Dynamic Routes
```tsx
{ path: 'users/:id', element: <UserDetailPage /> }
{ path: 'products/:category/:id', element: <ProductPage /> }
```

### Index Route (Default Child)
```tsx
{
  path: '/',
  element: <Layout />,
  children: [
    { index: true, element: <DashboardPage /> },  // Shows at "/"
    { path: 'users', element: <UsersPage /> },    // Shows at "/users"
  ],
}
```

### Catch-All (404)
```tsx
{ path: '*', element: <Navigate to="/" replace /> }
// Or custom 404 page:
{ path: '*', element: <NotFoundPage /> }
```

## Accessing Route Params

```tsx
import { useParams } from 'react-router-dom';

function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  // Use id to fetch user data
}
```

## Navigation

### Programmatic Navigation
```tsx
import { useNavigate } from 'react-router-dom';

function Component() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/users');           // Go to /users
    navigate('/users/123');       // Go to /users/123
    navigate(-1);                 // Go back
    navigate('/login', { replace: true });  // Replace history
  };
}
```

### Link Component
```tsx
import { Link } from 'react-router-dom';

<Link to="/users">Users</Link>
<Link to={`/users/${user.id}`}>View User</Link>
```

## Layout with Outlet

```tsx
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* Spacer for fixed header */}
        <Outlet />  {/* Child routes render here */}
      </Box>
    </Box>
  );
}
```

## Adding a New Route

When adding a new page to an existing project:

### Step 1: Create Page Component
```tsx
// src/pages/OrdersPage.tsx
import { Box, Typography } from '@mui/material';

export function OrdersPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Orders</Typography>
    </Box>
  );
}
```

### Step 2: Add Import to router.tsx
```tsx
import { OrdersPage } from './pages/OrdersPage';
```

### Step 3: Add Route to children array
```tsx
children: [
  // ... existing routes
  { path: 'orders', element: <OrdersPage /> },
]
```

### Step 4: Add to Sidebar Navigation
```tsx
// In Sidebar.tsx navItems array:
{ path: '/orders', title: 'Orders', icon: <ShoppingCartIcon /> },
```

## Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| Route path | lowercase, kebab-case | `/user-settings` |
| Page component | PascalCase + Page suffix | `UserSettingsPage` |
| File name | Match component name | `UserSettingsPage.tsx` |

## Best Practices

1. **Use Layout routes** - Wrap related routes in a layout component
2. **Index routes** - Always define a default child for parent routes
3. **Catch-all last** - Put `*` route at the end of children array
4. **Type params** - Use `useParams<{ id: string }>()` for type safety
5. **Lazy loading** - Use `React.lazy()` for code splitting on large apps

## Protected Routes

```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Usage in router:
{
  path: 'admin',
  element: <ProtectedRoute><AdminPage /></ProtectedRoute>,
}
```
