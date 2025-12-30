# Button Component Guide

## Overview

Buttons allow users to trigger actions with a single tap. Use buttons consistently throughout your application.

## Variants

### Contained (Primary Actions)

Use for primary, high-emphasis actions. Limit to one per section.

```tsx
import { Button } from '@mui/material';

<Button variant="contained" color="primary">
  Submit
</Button>
```

### Outlined (Secondary Actions)

Use for secondary, medium-emphasis actions.

```tsx
<Button variant="outlined">
  Cancel
</Button>
```

### Text (Tertiary Actions)

Use for low-emphasis actions or navigation links.

```tsx
<Button variant="text">
  Learn More
</Button>
```

## Sizes

```tsx
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>  {/* default */}
<Button size="large">Large</Button>
```

## With Icons

```tsx
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

<Button variant="contained" startIcon={<SaveIcon />}>
  Save
</Button>

<Button variant="outlined" endIcon={<DeleteIcon />}>
  Delete
</Button>
```

## Loading State

```tsx
import { Button, CircularProgress } from '@mui/material';

interface SubmitButtonProps {
  loading: boolean;
  children: React.ReactNode;
}

function SubmitButton({ loading, children }: SubmitButtonProps) {
  return (
    <Button
      variant="contained"
      disabled={loading}
      startIcon={loading ? <CircularProgress size={20} /> : null}
    >
      {loading ? 'Saving...' : children}
    </Button>
  );
}
```

## Button Group

```tsx
import { ButtonGroup, Button } from '@mui/material';

<ButtonGroup variant="outlined">
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>
```

## Best Practices

1. **One primary per section** - Avoid multiple contained buttons together
2. **Clear labels** - Use action verbs (Save, Submit, Delete, Cancel)
3. **Consistent placement** - Primary action on the right in button groups
4. **Loading states** - Show progress during async operations
5. **Disabled state** - Disable during loading or when action is unavailable

## Accessibility

- Always include descriptive text or `aria-label`
- Ensure sufficient color contrast (WCAG AA)
- Support keyboard navigation (Tab, Enter, Space)
- Provide visual focus indicators

## Common Patterns

### Form Actions

```tsx
<Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
  <Button variant="outlined" onClick={onCancel}>
    Cancel
  </Button>
  <Button variant="contained" onClick={onSubmit}>
    Save Changes
  </Button>
</Box>
```

### Destructive Actions

```tsx
<Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
  Delete
</Button>
```
