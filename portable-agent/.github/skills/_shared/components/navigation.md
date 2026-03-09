# Navigation Component Guide

## Overview

Navigation components help users move through your application. Use consistent navigation patterns for better UX.

## Sidebar Navigation

```tsx
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

const DRAWER_WIDTH = 240;

interface NavItem {
  path: string;
  title: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: '/', title: 'Dashboard', icon: <DashboardIcon /> },
  { path: '/users', title: 'Users', icon: <PeopleIcon /> },
  { path: '/settings', title: 'Settings', icon: <SettingsIcon /> },
];

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        '& .MuiDrawer-paper': { width: DRAWER_WIDTH },
      }}
    >
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
```

## Responsive Sidebar

```tsx
function ResponsiveSidebar({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={open}
      onClose={onClose}
      sx={{ width: DRAWER_WIDTH }}
    >
      {/* Drawer content */}
    </Drawer>
  );
}
```

## Tabs Navigation

```tsx
import { Tabs, Tab, Box } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function TabNavigation() {
  const [value, setValue] = useState(0);

  return (
    <Box>
      <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
        <Tab label="Overview" />
        <Tab label="Details" />
        <Tab label="Settings" />
      </Tabs>
      <TabPanel value={value} index={0}>Overview content</TabPanel>
      <TabPanel value={value} index={1}>Details content</TabPanel>
      <TabPanel value={value} index={2}>Settings content</TabPanel>
    </Box>
  );
}
```

## Breadcrumbs

```tsx
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';

function AppBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link component={RouterLink} to="/" underline="hover" color="inherit">
        Home
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography key={to} color="text.primary">
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Typography>
        ) : (
          <Link key={to} component={RouterLink} to={to} underline="hover" color="inherit">
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
```

## Bottom Navigation (Mobile)

```tsx
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

function MobileBottomNav() {
  const [value, setValue] = useState(0);

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
```

## Best Practices

1. **Consistent placement** - Keep navigation in predictable locations
2. **Clear active states** - Highlight current page/section
3. **Logical grouping** - Group related items together
4. **Mobile-friendly** - Use responsive patterns
5. **Icon + text** - Use both for clarity (especially in sidebars)

## Accessibility

- Use semantic navigation elements (`<nav>`)
- Provide `aria-label` for navigation regions
- Ensure keyboard navigation works
- Use `aria-current="page"` for active links
