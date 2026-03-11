export type UserStatus = "Active" | "Review" | "Suspended"

export interface UserRecord {
  id: string
  name: string
  email: string
  role: string
  team: string
  status: UserStatus
  plan: string
  location: string
  lastLogin: string
  sessions: number
  alerts: number
}

export const users: UserRecord[] = [
  {
    id: "USR-1024",
    name: "Lena Foster",
    email: "lena.foster@example.com",
    role: "Platform Admin",
    team: "Core Systems",
    status: "Active",
    plan: "Enterprise",
    location: "Singapore",
    lastLogin: "2026-03-11 09:42",
    sessions: 18,
    alerts: 1,
  },
  {
    id: "USR-1041",
    name: "Marco Liu",
    email: "marco.liu@example.com",
    role: "Operations Lead",
    team: "Revenue Ops",
    status: "Active",
    plan: "Business",
    location: "Shanghai",
    lastLogin: "2026-03-11 08:14",
    sessions: 11,
    alerts: 0,
  },
  {
    id: "USR-1088",
    name: "Arianna Cole",
    email: "arianna.cole@example.com",
    role: "Support Manager",
    team: "Customer Success",
    status: "Review",
    plan: "Business",
    location: "Sydney",
    lastLogin: "2026-03-10 23:18",
    sessions: 7,
    alerts: 2,
  },
  {
    id: "USR-1117",
    name: "Devon Park",
    email: "devon.park@example.com",
    role: "Finance Admin",
    team: "Finance",
    status: "Suspended",
    plan: "Starter",
    location: "Seoul",
    lastLogin: "2026-03-06 17:33",
    sessions: 0,
    alerts: 5,
  },
  {
    id: "USR-1142",
    name: "Priya Raman",
    email: "priya.raman@example.com",
    role: "Security Analyst",
    team: "Security",
    status: "Active",
    plan: "Enterprise",
    location: "Bangalore",
    lastLogin: "2026-03-11 06:57",
    sessions: 14,
    alerts: 3,
  },
  {
    id: "USR-1179",
    name: "Noah Walker",
    email: "noah.walker@example.com",
    role: "Implementation Lead",
    team: "Delivery",
    status: "Review",
    plan: "Business",
    location: "Toronto",
    lastLogin: "2026-03-10 20:09",
    sessions: 6,
    alerts: 1,
  },
]

export const dashboardStats = [
  {
    label: "Managed Accounts",
    value: "1,284",
    delta: "+12.4%",
    tone: "steady",
  },
  {
    label: "Security Alerts",
    value: "18",
    delta: "-8 this week",
    tone: "warning",
  },
  {
    label: "Active Sessions",
    value: "342",
    delta: "+6.1%",
    tone: "steady",
  },
  {
    label: "Pending Reviews",
    value: "7",
    delta: "Needs attention",
    tone: "critical",
  },
] as const

export const recentEvents = [
  "Platform Admin role updated for Lena Foster",
  "Suspicious login blocked for Devon Park",
  "Revenue Ops access package renewed for Marco Liu",
  "Security review requested for Arianna Cole",
]
