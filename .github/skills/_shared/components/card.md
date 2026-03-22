# Card Component Guide

## Overview

Cards contain content and actions about a single subject. Use cards to group related information.

## Basic Card

```tsx
import { Card, CardContent, Typography } from '@mui/material';

<Card sx={{ height: '100%', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
  <CardContent>
    <Typography variant="h5" component="div">
      Card Title
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Card description goes here.
    </Typography>
  </CardContent>
</Card>
```

## Card with Actions

```tsx
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';

<Card>
  <CardContent>
    <Typography variant="h5" gutterBottom>
      Product Name
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Product description and details.
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Learn More</Button>
    <Button size="small" variant="contained">Buy Now</Button>
  </CardActions>
</Card>
```

## Card with Media

```tsx
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

<Card>
  <CardMedia
    component="img"
    height="140"
    image="/product-image.jpg"
    alt="Product image"
  />
  <CardContent>
    <Typography variant="h5">Product Name</Typography>
    <Typography variant="body2" color="text.secondary">
      $99.99
    </Typography>
  </CardContent>
</Card>
```

## Card with Header

```tsx
import { Card, CardHeader, CardContent, Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

<Card>
  <CardHeader
    avatar={<Avatar>U</Avatar>}
    action={
      <IconButton aria-label="settings">
        <MoreVertIcon />
      </IconButton>
    }
    title="User Name"
    subheader="September 14, 2024"
  />
  <CardContent>
    <Typography variant="body2">
      Card content goes here.
    </Typography>
  </CardContent>
</Card>
```

## Stat Card Pattern

```tsx
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 'none',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: `${color}.light`,
              color: `${color}.main`,
              display: 'flex',
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
```

## Card Grid Layout

```tsx
import Grid from '@mui/material/Grid2';

<Grid container spacing={3}>
  {items.map((item) => (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6">{item.title}</Typography>
          <Typography variant="body2">{item.description}</Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
```

## Best Practices

1. **Consistent card heights** - Use `sx={{ height: '100%' }}` in grids
2. **Action alignment** - Align actions to the bottom with flexbox
3. **Proper spacing** - Prefer `CardContent sx={{ p: 3 }}` for standard surfaces
4. **Surface consistency** - Reuse the same border, radius, and shadow treatment across cards
5. **Click interaction** - Use CardActionArea for clickable cards

## Accessibility

- Use semantic heading levels in card titles
- Provide alt text for CardMedia images
- Ensure interactive elements are keyboard accessible
- Use sufficient color contrast
