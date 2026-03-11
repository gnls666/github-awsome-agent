# Dialog Component Guide

## Overview

Dialogs interrupt users with important information or require user input. Use dialogs sparingly for critical interactions.

## Basic Dialog

```tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

interface BasicDialogProps {
  open: boolean;
  onClose: () => void;
}

function BasicDialog({ open, onClose }: BasicDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogContent>
        Dialog content goes here.
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose} variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
```

## Confirmation Dialog

```tsx
interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{cancelText}</Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color={isDestructive ? 'error' : 'primary'}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
```

## Form Dialog

```tsx
function FormDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              fullWidth
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Add User
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
```

## Dialog Sizes

```tsx
// Extra small (confirmation dialogs)
<Dialog maxWidth="xs" fullWidth>

// Small (simple forms)
<Dialog maxWidth="sm" fullWidth>

// Medium (complex forms)
<Dialog maxWidth="md" fullWidth>

// Large (detailed content)
<Dialog maxWidth="lg" fullWidth>

// Full screen
<Dialog fullScreen>
```

## Alert Dialog

```tsx
import { Alert, AlertTitle } from '@mui/material';

function AlertDialog({ open, onClose, severity, title, message }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ p: 0 }}>
        <Alert severity={severity} onClose={onClose}>
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      </DialogContent>
    </Dialog>
  );
}
```

## Loading Dialog

```tsx
function LoadingDialog({ open, message = 'Loading...' }) {
  return (
    <Dialog open={open} disableEscapeKeyDown>
      <DialogContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={24} />
          <Typography>{message}</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
```

## Best Practices

1. **Use sparingly** - Dialogs interrupt user flow
2. **Clear actions** - Primary action should be obvious
3. **Dismissible** - Allow escape key and backdrop click (unless critical)
4. **Appropriate size** - Use maxWidth to fit content
5. **Focus management** - Focus first interactive element

## Accessibility

- Use `aria-labelledby` and `aria-describedby` for screen readers
- Ensure keyboard navigation works (Tab, Escape)
- Trap focus within dialog when open
- Return focus to trigger element on close
