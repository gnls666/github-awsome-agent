import { Box, Button, Paper, Stack, TextField } from '@mui/material';

interface FilterToolbarProps {
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  onReset?: () => void;
}

export function FilterToolbar({ filters, actions, onReset }: FilterToolbarProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 3,
      }}
    >
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', lg: 'center' }}
        justifyContent="space-between"
      >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ flex: 1 }}>
          <TextField size="small" placeholder="Search..." sx={{ minWidth: { md: 280 } }} />
          {filters}
        </Stack>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {onReset ? (
            <Button variant="text" color="inherit" onClick={onReset}>
              Reset
            </Button>
          ) : null}
          {actions}
        </Box>
      </Stack>
    </Paper>
  );
}
