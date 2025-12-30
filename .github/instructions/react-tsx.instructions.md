---
applyTo: "**/*.tsx,**/*.ts"
---

# React + TypeScript Code Standards

When editing or generating TypeScript/React code in this repository, follow these standards:

## Technology Stack

- React 18 with Hooks
- TypeScript 5.x strict mode
- MUI 7 component library
- Vite 5.4 build tool

## Code Style

### Component Structure

```tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
  children?: React.ReactNode;
}

export function MyComponent({
  title,
  onAction,
  children
}: MyComponentProps): React.ReactElement {
  const [loading, setLoading] = useState(false);

  const handleAction = useCallback(() => {
    if (onAction) {
      onAction();
    }
  }, [onAction]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">{title}</Typography>
      {children}
      <Button onClick={handleAction} disabled={loading}>
        Action
      </Button>
    </Box>
  );
}
```

### Rules

1. **Function Components Only** - Never use class components
2. **Named Exports** - Use named exports for all components
3. **Interface Props** - Define props using `interface`, not `type`
4. **Explicit Return Types** - Add `: React.ReactElement` return type
5. **sx Prop Styling** - Use MUI's `sx` prop, not styled-components
6. **Destructured Props** - Destructure props in function signature

### Hooks Usage

- `useState` - For local component state
- `useEffect` - For side effects (API calls, subscriptions)
- `useCallback` - For memoizing event handlers
- `useMemo` - For expensive computations
- `useRef` - For DOM references and mutable values

### MUI Styling with sx

```tsx
// Good - using sx prop
<Box sx={{
  p: 2,
  mb: 2,
  display: 'flex',
  gap: 2
}}>

// Good - responsive values
<Box sx={{
  width: { xs: '100%', md: '50%' },
  p: { xs: 1, sm: 2, md: 3 }
}}>

// Avoid - inline style object
<Box style={{ padding: 16, marginBottom: 16 }}>
```

### Error Handling

```tsx
try {
  const data = await fetchData();
  setData(data);
} catch (error) {
  console.error('Failed to fetch data:', error);
  setError(error instanceof Error ? error.message : 'Unknown error');
} finally {
  setLoading(false);
}
```

### Loading States

```tsx
if (loading) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
      <CircularProgress />
    </Box>
  );
}
```
