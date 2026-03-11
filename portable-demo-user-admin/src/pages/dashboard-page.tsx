import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Typography,
  Paper,
} from "@mui/material"
import {
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  Group as GroupIcon,
  AutoAwesome as AutoAwesomeIcon,
} from "@mui/icons-material"

import { dashboardStats, recentEvents, users } from "@/data/users"

const toneColors = {
  steady: "success",
  warning: "warning",
  critical: "error",
} as const

export function DashboardPage() {
  const activeUsers = users.filter((user) => user.status === "Active").length

  return (
    <Stack gap={4} data-testid="dashboard-page">
      {/* Header Section */}
      <Box>
        <Chip label="Weekly operations snapshot" variant="outlined" size="small" />
        <Stack direction={{ xs: "column", lg: "row" }} spacing={2} sx={{ mt: 2, alignItems: { lg: "flex-end" }, justifyContent: { lg: "space-between" } }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Team access is healthy, with a few reviews to close out.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "text.secondary", maxWidth: "60ch" }}>
              This dashboard is intentionally built with shadcn/ui so you can
              later test the portable agent on a realistic non-MUI admin app.
            </Typography>
          </Box>
          <Paper
            sx={{
              bgcolor: "success.lighter",
              color: "success.dark",
              p: 1.5,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "success.light",
              whiteSpace: "nowrap",
            }}
          >
            <Typography variant="body2">
              {activeUsers} active users are currently inside policy.
            </Typography>
          </Paper>
        </Stack>
      </Box>

      {/* Stats Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
          },
          gap: 2,
        }}
      >
        {dashboardStats.map((stat) => (
            <Card key={stat.label} sx={{ height: "100%" }}>
              <CardHeader
                title={<Typography variant="body2" sx={{ color: "text.secondary" }}>{stat.label}</Typography>}
              />
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                  {stat.value}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: `${toneColors[stat.tone]}.main`,
                    }}
                  >
                    {stat.delta}
                  </Typography>
                  <TrendingUpIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                </Stack>
              </CardContent>
            </Card>
        ))}
      </Box>

      {/* Operational Focus & Recent Changes */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 2,
        }}
      >
          <Card>
            <CardHeader
              title="Operational focus"
              subheader="The next migration run should start in the user-management module."
            />
            <CardContent>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                  gap: 2,
                }}
              >
                  <Paper
                    sx={{
                      bgcolor: "grey.900",
                      color: "grey.50",
                      p: 2,
                      borderRadius: 2,
                    }}
                  >
                    <WarningIcon sx={{ mb: 1, color: "warning.main" }} />
                    <Typography variant="body2" sx={{ color: "grey.300" }}>
                      Reviews due today
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 1, fontWeight: 600 }}>
                      3
                    </Typography>
                  </Paper>

                  <Paper
                    sx={{
                      bgcolor: "info.lighter",
                      border: "1px solid",
                      borderColor: "divider",
                      p: 2,
                      borderRadius: 2,
                    }}
                  >
                    <GroupIcon sx={{ mb: 1, color: "info.main" }} />
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      New seats requested
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 1, fontWeight: 600 }}>
                      14
                    </Typography>
                  </Paper>

                  <Paper
                    sx={{
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      p: 2,
                      borderRadius: 2,
                    }}
                  >
                    <AutoAwesomeIcon sx={{ mb: 1, color: "secondary.main" }} />
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Themed screens remaining
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 1, fontWeight: 600 }}>
                      11
                    </Typography>
                  </Paper>
              </Box>
            </CardContent>
          </Card>

        <Card sx={{ height: "100%" }}>
            <CardHeader
              title="Recent changes"
              subheader="Latest user and access events across the workspace."
            />
            <CardContent>
              <Stack gap={1.5}>
                {recentEvents.map((event) => (
                  <Paper
                    key={event}
                    sx={{
                      p: 1.5,
                      bgcolor: "background.default",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body2">{event}</Typography>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Stack>
  )
}
