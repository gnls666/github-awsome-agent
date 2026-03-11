import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from "@mui/icons-material"

import { users, type UserRecord } from "@/data/users"

const statusColorMap: Record<UserRecord["status"], "success" | "warning" | "error"> = {
  Active: "success",
  Review: "warning",
  Suspended: "error",
}

export function UsersPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")

  const filteredUsers = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      return users
    }

    return users.filter((user) =>
      [user.name, user.email, user.role, user.team]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    )
  }, [query])

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)

  return (
    <Stack gap={3} data-testid="users-page">
      {/* Header */}
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={2}
        sx={{
          alignItems: { lg: "flex-end" },
          justifyContent: { lg: "space-between" },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
            User management
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Manage people and account access
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: "60ch" }}>
            This list view uses a non-MUI table and shadcn surfaces so the
            portable migration agent has a realistic target to refactor later.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />}>
          Invite user
        </Button>
      </Stack>

      {/* Table Card */}
      <Card>
        <CardHeader
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 2,
            alignItems: { lg: "flex-end" },
            justifyContent: { lg: "space-between" },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              Directory
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Search by person, team, or role. Click any row to inspect the
              user detail view.
            </Typography>
          </Box>
          <TextField
            placeholder="Search users"
            size="small"
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, fontSize: 18 }} />,
            }}
            sx={{ width: { xs: "100%", md: 320 } }}
          />
        </CardHeader>
        <CardContent>
          <Stack gap={2}>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
              <Typography variant="body2">{filteredUsers.length} people in view</Typography>
              <Typography variant="body2">Source: local mock admin data</Typography>
            </Stack>

            <TableContainer sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
              <Table size="small" data-testid="users-table">
                <TableHead sx={{ bgcolor: "action.hover" }}>
                  <TableRow>
                    <TableCell sx={{ pl: 2 }}>User</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Team</TableCell>
                    <TableCell>Plan</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Last login</TableCell>
                    <TableCell align="right" sx={{ pr: 2 }}>
                      Details
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} sx={{ bgcolor: "background.paper" }}>
                      <TableCell sx={{ pl: 2 }}>
                        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                          <Avatar sx={{ width: 32, height: 32 }}>
                            {getInitials(user.name)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {user.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "text.secondary" }}>
                              {user.email}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{user.role}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{user.team}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{user.plan}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.status}
                          size="small"
                          color={statusColorMap[user.status]}
                          variant="filled"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{user.lastLogin}</Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ pr: 2 }}>
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/users/${user.id}`)}
                          sx={{ color: "primary.main" }}
                        >
                          <KeyboardArrowRightIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}
