import { useNavigate, useParams } from "react-router-dom"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Typography,
  Avatar,
  Alert,
  Paper,
} from "@mui/material"
import {
  ArrowBack as ArrowBackIcon,
  Shield as ShieldIcon,
  Warning as WarningIcon,
} from "@mui/icons-material"

import { users } from "@/data/users"

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)

export function UserDetailPage() {
  const navigate = useNavigate()
  const { userId } = useParams()
  const user = users.find((entry) => entry.id === userId)

  if (!user) {
    return (
      <Card>
        <CardHeader
          title={<Typography variant="h6">User not found</Typography>}
          subheader="The requested user record is not available in this demo dataset."
        />
        <CardContent>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/users")}
          >
            Back to users
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Stack gap={3} data-testid="user-detail-page">
      {/* Header */}
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={2}
        sx={{
          alignItems: { lg: "center" },
          justifyContent: { lg: "space-between" },
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              fontSize: "1.5rem",
              fontWeight: 600,
            }}
          >
            {getInitials(user.name)}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
              User detail
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {user.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
              {user.email}
            </Typography>
          </Box>
        </Stack>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/users")}
        >
          Back to users
        </Button>
      </Stack>

      {/* Content Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.4fr 1fr" },
          gap: 2,
        }}
      >
          <Card>
            <CardHeader
              title="Access profile"
              subheader="Core account data and operational ownership."
            />
            <CardContent>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                  gap: 2,
                }}
              >
                  <Paper
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "background.default",
                      p: 2,
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        display: "block",
                        color: "text.secondary",
                        fontWeight: 600,
                      }}
                    >
                      Role
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                      {user.role}
                    </Typography>
                  </Paper>
                </Box>
                <Box>
                  <Paper
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "background.default",
                      p: 2,
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        display: "block",
                        color: "text.secondary",
                        fontWeight: 600,
                      }}
                    >
                      Team
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                      {user.team}
                    </Typography>
                  </Paper>
                </Box>
                <Box>
                  <Paper
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "background.default",
                      p: 2,
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        display: "block",
                        color: "text.secondary",
                        fontWeight: 600,
                      }}
                    >
                      Workspace plan
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                      {user.plan}
                    </Typography>
                  </Paper>
                </Box>
                <Box>
                  <Paper
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "background.default",
                      p: 2,
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        display: "block",
                        color: "text.secondary",
                        fontWeight: 600,
                      }}
                    >
                      Location
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                      {user.location}
                    </Typography>
                  </Paper>
                </Box>
            </CardContent>
          </Card>

        <Card sx={{ height: "100%" }}>
          <CardHeader
            title="Account health"
            subheader="Quick signal card for the operator on duty."
          />
          <CardContent>
              <Stack gap={2}>
                <Paper
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.default",
                    p: 2,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Status
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 0.5, fontWeight: 600 }}>
                      {user.status}
                    </Typography>
                  </Box>
                  <Chip label={user.status} />
                </Paper>

                <Paper
                  sx={{
                    bgcolor: "grey.900",
                    color: "grey.50",
                    p: 2,
                    borderRadius: 2,
                  }}
                >
                  <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: "center" }}>
                    <ShieldIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2" sx={{ color: "grey.300" }}>
                      Protected by default admin policy
                    </Typography>
                  </Stack>
                  <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {user.sessions}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "grey.300" }}>
                    Recent active sessions
                  </Typography>
                </Paper>

                <Alert severity="warning">
                  <WarningIcon sx={{ mr: 1, fontSize: 18 }} />
                  <Typography variant="body2">
                    {user.alerts} item(s) still need operator review.
                  </Typography>
                </Alert>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Stack>
  )
}
