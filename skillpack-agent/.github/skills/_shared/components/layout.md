# Layout Component Guide

## Overview

Layout components structure your application's UI. Use consistent layouts for predictable user experiences.

## App Shell Layout

```tsx
import { Box, AppBar, Toolbar, Typography } from '@mui/material';

const HEADER_HEIGHT = 64;
const SIDEBAR_WIDTH = 240;

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6">UX template</Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
        }}
      >
        {/* Sidebar content */}
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: `${HEADER_HEIGHT}px`,
          p: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
```

## Page Container

```tsx
import { Container, Box } from '@mui/material';

function PageContainer({ children, maxWidth = 'lg' }) {
  return (
    <Container maxWidth={maxWidth}>
      <Box sx={{ py: 4 }}>
        {children}
      </Box>
    </Container>
  );
}
```

## Grid Layout

```tsx
import { Grid, Box } from '@mui/material';

// Responsive grid
<Grid container spacing={3}>
  <Grid size={{ xs: 12, md: 8 }}>
    <Box>Main content</Box>
  </Grid>
  <Grid size={{ xs: 12, md: 4 }}>
    <Box>Sidebar</Box>
  </Grid>
</Grid>

// Equal columns
<Grid container spacing={2}>
  {[1, 2, 3, 4].map((item) => (
    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item}>
      <Card>Item {item}</Card>
    </Grid>
  ))}
</Grid>
```

## Stack Layout

```tsx
import { Stack } from '@mui/material';

// Vertical stack
<Stack spacing={2}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</Stack>

// Horizontal stack
<Stack direction="row" spacing={2} alignItems="center">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</Stack>

// Responsive direction
<Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={2}
>
  {/* Items */}
</Stack>
```

## Page Header

```tsx
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        mb: 4,
      }}
    >
      <Box>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body1" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
      {actions && <Box>{actions}</Box>}
    </Box>
  );
}
```

## Split Layout

```tsx
function SplitLayout() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box
        sx={{
          width: '50%',
          bgcolor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h3" color="primary.contrastText">
          Left Panel
        </Typography>
      </Box>
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ maxWidth: 400, p: 4 }}>
          {/* Form or content */}
        </Box>
      </Box>
    </Box>
  );
}
```

## Responsive Breakpoints

```tsx
// MUI default breakpoints
const breakpoints = {
  xs: 0,      // Mobile
  sm: 600,    // Tablet
  md: 900,    // Small laptop
  lg: 1200,   // Desktop
  xl: 1536,   // Large desktop
};

// Responsive values
<Box
  sx={{
    p: { xs: 1, sm: 2, md: 3 },
    width: { xs: '100%', md: '50%' },
    display: { xs: 'block', md: 'flex' },
  }}
>
```

## Best Practices

1. **Use semantic elements** - `main`, `nav`, `header`, `footer`
2. **Consistent spacing** - Use theme spacing (8px base)
3. **Mobile-first** - Design for mobile, enhance for desktop
4. **Flexible containers** - Use `maxWidth` for readable content
5. **Proper z-index** - Layer elements correctly

## Accessibility

- Use landmark elements for screen readers
- Ensure skip links for keyboard users
- Maintain logical reading order
- Test with screen readers
