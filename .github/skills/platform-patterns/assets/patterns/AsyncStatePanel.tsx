import { Alert, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';

type AsyncState = 'loading' | 'empty' | 'error' | 'ready';

interface AsyncStatePanelProps {
  state: AsyncState;
  title?: string;
  description?: string;
  onRetry?: () => void;
  children?: React.ReactNode;
}

export function AsyncStatePanel({
  state,
  title,
  description,
  onRetry,
  children,
}: AsyncStatePanelProps) {
  if (state === 'loading') {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 240 }}>
        <Stack spacing={2} alignItems="center">
          <CircularProgress size={28} />
          <Typography variant="body2" color="text.secondary">
            {description ?? 'Loading...'}
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (state === 'error') {
    return (
      <Alert
        severity="error"
        action={
          onRetry ? (
            <Button color="inherit" size="small" onClick={onRetry}>
              Retry
            </Button>
          ) : undefined
        }
      >
        {description ?? 'Something went wrong while loading this content.'}
      </Alert>
    );
  }

  if (state === 'empty') {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 240 }}>
        <Stack spacing={1.5} alignItems="center" sx={{ textAlign: 'center', maxWidth: 420 }}>
          <Typography variant="h6">{title ?? 'No results yet'}</Typography>
          <Typography variant="body2" color="text.secondary">
            {description ?? 'Adjust the filters or create a new item to get started.'}
          </Typography>
        </Stack>
      </Box>
    );
  }

  return <>{children}</>;
}
