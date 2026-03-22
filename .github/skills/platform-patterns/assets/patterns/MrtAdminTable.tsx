import { Chip, IconButton, Paper, Stack } from '@mui/material';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

interface ExampleRow {
  id: string;
  name: string;
  status: 'Active' | 'Paused';
}

export function MrtAdminTable({ data }: { data: ExampleRow[] }) {
  const columns: MRT_ColumnDef<ExampleRow>[] = [
    { accessorKey: 'name', header: 'Name', size: 220 },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 140,
      Cell: ({ cell }) => (
        <Chip
          size="small"
          label={cell.getValue<ExampleRow['status']>()}
          color={cell.getValue<ExampleRow['status']>() === 'Active' ? 'success' : 'default'}
        />
      ),
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data,
    enableStickyHeader: true,
    enableRowActions: true,
    renderRowActions: () => (
      <Stack direction="row" spacing={1}>
        <IconButton size="small" aria-label="More actions">
          <MoreHoriz fontSize="small" />
        </IconButton>
      </Stack>
    ),
    muiTablePaperProps: {
      component: Paper,
      variant: 'outlined',
      sx: { borderRadius: 3, overflow: 'hidden' },
    },
    muiTableContainerProps: {
      sx: { maxHeight: 640 },
    },
  });

  return <MaterialReactTable table={table} />;
}
