import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Collapse,
  Divider,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import ExpandLessOutlined from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlined from '@mui/icons-material/ExpandMoreOutlined';
import DragIndicatorOutlined from '@mui/icons-material/DragIndicatorOutlined';

export interface OperationErrorItem {
  id: string;
  entityLabel: string;
  actionLabel: string;
  message: string;
  timeLabel: string;
  code?: string;
}

export interface OperationErrorGroup {
  id: string;
  label: string;
  severity?: 'error' | 'warning' | 'info';
  items: OperationErrorItem[];
}

interface TableOperationErrorsPanelProps {
  groups: OperationErrorGroup[];
  defaultHeight?: number;
  minHeight?: number;
  maxHeight?: number;
  onClearAll?: () => void;
}

export function TableOperationErrorsPanel({
  groups,
  defaultHeight = 280,
  minHeight = 180,
  maxHeight = 520,
  onClearAll,
}: TableOperationErrorsPanelProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [height, setHeight] = useState(defaultHeight);

  const totalCount = useMemo(
    () => groups.reduce((sum, group) => sum + group.items.length, 0),
    [groups],
  );

  useEffect(() => {
    if (!groups.length) {
      setCollapsed(true);
    }
  }, [groups.length]);

  const startResize = (event: React.PointerEvent<HTMLDivElement>) => {
    const startY = event.clientY;
    const startHeight = height;

    const onMove = (moveEvent: PointerEvent) => {
      const delta = startY - moveEvent.clientY;
      const nextHeight = Math.min(maxHeight, Math.max(minHeight, startHeight + delta));
      setHeight(nextHeight);
    };

    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  if (!groups.length) {
    return null;
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 0,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        overflow: 'hidden',
      }}
    >
      <Box
        onPointerDown={startResize}
        sx={{
          height: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'ns-resize',
          bgcolor: 'action.hover',
        }}
      >
        <DragIndicatorOutlined fontSize="inherit" />
      </Box>

      <Box sx={{ px: 2, py: 1.5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography variant="subtitle1" fontWeight={700}>
              Operation Errors
            </Typography>
            <Chip label={`${totalCount} issues`} size="small" color="error" />
            <Chip label={`${groups.length} groups`} size="small" variant="outlined" />
          </Stack>

          <Stack direction="row" spacing={1}>
            {onClearAll ? (
              <Button variant="text" size="small" color="inherit" onClick={onClearAll}>
                Clear all
              </Button>
            ) : null}
            <IconButton size="small" onClick={() => setCollapsed((value) => !value)}>
              {collapsed ? <ExpandMoreOutlined fontSize="small" /> : <ExpandLessOutlined fontSize="small" />}
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      <Collapse in={!collapsed}>
        <Divider />
        <Box sx={{ height, overflow: 'auto', bgcolor: 'background.default' }}>
          <Stack spacing={2} sx={{ p: 2 }}>
            {groups.map((group) => (
              <Paper key={group.id} variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ px: 2, py: 1.5, bgcolor: 'background.paper' }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Typography variant="subtitle2" fontWeight={700}>
                      {group.label}
                    </Typography>
                    <Chip
                      size="small"
                      variant="outlined"
                      color={group.severity === 'warning' ? 'warning' : group.severity === 'info' ? 'info' : 'error'}
                      label={`${group.items.length} items`}
                    />
                  </Stack>
                </Stack>

                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Entity</TableCell>
                      <TableCell>Action</TableCell>
                      <TableCell>Error</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Code</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {group.items.map((item) => (
                      <TableRow key={item.id} hover>
                        <TableCell>{item.entityLabel}</TableCell>
                        <TableCell>{item.actionLabel}</TableCell>
                        <TableCell>{item.message}</TableCell>
                        <TableCell>{item.timeLabel}</TableCell>
                        <TableCell>{item.code ?? '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            ))}
          </Stack>
        </Box>
      </Collapse>
    </Paper>
  );
}
