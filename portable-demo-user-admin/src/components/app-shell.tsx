import { useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Stack,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Search as SearchIcon,
  Shield as ShieldIcon,
} from "@mui/icons-material"

import { DashboardPage } from "@/pages/dashboard-page"
import { UserDetailPage } from "@/pages/user-detail-page"
import { UsersPage } from "@/pages/users-page"

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: DashboardIcon },
  { path: "/users", label: "Users", icon: PeopleIcon },
]

function Navigation() {
  return (
    <List sx={{ py: 2 }}>
      {navItems.map(({ path, label, icon: Icon }) => (
        <ListItemButton
          key={path}
          href={path}
          sx={{
            borderRadius: 2,
            mb: 1,
            "&.active": {
              bgcolor: "primary.main",
              color: "primary.contrastText",
              "& .MuiListItemIcon-root": {
                color: "inherit",
              },
            },
          }}
        >
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      ))}
    </List>
  )
}

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"))

  const drawerWidth = 280

  const drawer = (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 1,
            bgcolor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          <ShieldIcon />
        </Box>
        <Box>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Aurora Ops
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Admin Console
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="overline"
          sx={{
            display: "block",
            mb: 2,
            color: "text.secondary",
            fontWeight: 600,
          }}
        >
          Navigation
        </Typography>
        <Navigation />
      </Box>

      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: "action.hover",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          Portable migration target
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          This sample app intentionally uses a non-MUI UI stack so the portable
          agent can later migrate it toward your platform MUI baseline.
        </Typography>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box
          component="aside"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            borderRight: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            overflowY: "auto",
          }}
        >
          {drawer}
        </Box>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header/AppBar */}
        <AppBar
          position="sticky"
          sx={{
            bgcolor: "background.paper",
            color: "text.primary",
            borderBottom: "1px solid",
            borderColor: "divider",
            boxShadow: "none",
          }}
        >
          <Toolbar sx={{ gap: 2 }}>
            {isMobile && (
              <IconButton
                color="inherit"
                onClick={() => setMobileOpen(!mobileOpen)}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Dashboard
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Wednesday, March 11, 2026
              </Typography>
            </Box>

            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <IconButton size="small" sx={{ display: { xs: "none", md: "flex" } }}>
                <SearchIcon />
              </IconButton>
              <Chip
                label="18 security alerts"
                variant="outlined"
                size="small"
                sx={{ display: { xs: "none", md: "flex" } }}
              />
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Avatar sx={{ width: 32, height: 32 }}>AJ</Avatar>
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Avery Johnson
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    Platform Operations
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, md: 3, lg: 4 },
            bgcolor: "background.default",
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:userId" element={<UserDetailPage />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  )
}
