import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline, createTheme } from "@mui/material"
import type { ReactNode } from "react"

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
})

export function MuiThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
