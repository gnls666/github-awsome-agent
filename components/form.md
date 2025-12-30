# Form Component Guide

## Overview

Build accessible, validated forms using MUI form components with proper layout and error handling.

## Basic Form Structure

```tsx
import { Box, TextField, Button, Grid } from '@mui/material';

interface FormData {
  name: string;
  email: string;
}

function BasicForm() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Validate and submit
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
            required
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
```

## Form Components

### TextField

```tsx
// Text input
<TextField label="Name" value={name} onChange={handleChange} />

// Multiline
<TextField label="Description" multiline rows={4} />

// Password
<TextField label="Password" type="password" />

// With error
<TextField
  label="Email"
  error={!!error}
  helperText={error || 'Enter your email'}
/>
```

### Select

```tsx
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

<FormControl fullWidth>
  <InputLabel>Status</InputLabel>
  <Select value={status} label="Status" onChange={handleChange}>
    <MenuItem value="active">Active</MenuItem>
    <MenuItem value="inactive">Inactive</MenuItem>
    <MenuItem value="pending">Pending</MenuItem>
  </Select>
</FormControl>
```

### Checkbox

```tsx
import { FormControlLabel, Checkbox } from '@mui/material';

<FormControlLabel
  control={
    <Checkbox checked={checked} onChange={handleChange} />
  }
  label="I agree to the terms"
/>
```

### Switch

```tsx
import { FormControlLabel, Switch } from '@mui/material';

<FormControlLabel
  control={
    <Switch checked={enabled} onChange={handleChange} />
  }
  label="Enable notifications"
/>
```

### Radio Group

```tsx
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

<FormControl>
  <FormLabel>Size</FormLabel>
  <RadioGroup value={size} onChange={handleChange}>
    <FormControlLabel value="small" control={<Radio />} label="Small" />
    <FormControlLabel value="medium" control={<Radio />} label="Medium" />
    <FormControlLabel value="large" control={<Radio />} label="Large" />
  </RadioGroup>
</FormControl>
```

## Validation Pattern

```tsx
interface FormErrors {
  name?: string;
  email?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  return errors;
}
```

## Form Layout with Grid

```tsx
<Grid container spacing={3}>
  <Grid size={{ xs: 12, md: 6 }}>
    <TextField fullWidth label="First Name" />
  </Grid>
  <Grid size={{ xs: 12, md: 6 }}>
    <TextField fullWidth label="Last Name" />
  </Grid>
  <Grid size={{ xs: 12 }}>
    <TextField fullWidth label="Email" />
  </Grid>
</Grid>
```

## Best Practices

1. **Use Grid for layout** - Responsive form layouts
2. **Always show validation errors** - Clear feedback for users
3. **Use fullWidth for form fields** - Consistent appearance
4. **Group related fields** - Logical sections with Divider
5. **Disable during submission** - Prevent double submit
6. **Clear errors on input** - Better UX feedback

## Accessibility

- Use `label` prop for all form fields
- Associate error messages with `helperText`
- Use `required` attribute for required fields
- Support keyboard navigation
- Provide clear error announcements
