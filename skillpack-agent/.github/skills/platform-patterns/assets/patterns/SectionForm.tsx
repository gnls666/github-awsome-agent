import { Button, Divider, Paper, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

export function SectionForm() {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Stack component="form" spacing={3}>
        <Stack spacing={0.5}>
          <Typography variant="h6">Basic Information</Typography>
          <Typography variant="body2" color="text.secondary">
            Group fields into clear sections instead of one long uninterrupted form.
          </Typography>
        </Stack>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth size="small" label="Name" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth size="small" label="Code" />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField fullWidth size="small" label="Description" multiline minRows={4} />
          </Grid>
        </Grid>

        <Divider />

        <Stack direction="row" spacing={1.5} justifyContent="flex-end">
          <Button variant="text" color="inherit">
            Cancel
          </Button>
          <Button variant="contained">Save</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
