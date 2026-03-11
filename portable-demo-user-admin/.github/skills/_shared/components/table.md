# Table / Material React Table Component Guide

## Overview

Prefer `material-react-table` for rich admin tables in this repository. Use MUI DataGrid only as a fallback when an existing codebase is already committed to DataGrid or the requirement is explicitly DataGrid-specific.

## Recommended MRT Setup

```tsx
import { Chip, IconButton, Stack } from '@mui/material';
import EditOutlined from '@mui/icons-material/EditOutlined';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

interface User {
  id: string;
  name: string;
  email: string;
  status: string;
}

function UserTable({ rows }: { rows: User[] }) {
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      { accessorKey: 'name', header: '姓名', size: 180 },
      { accessorKey: 'email', header: '邮箱', size: 260 },
      {
        accessorKey: 'status',
        header: '状态',
        size: 120,
        Cell: ({ cell }) => (
          <Chip
            label={cell.getValue<string>()}
            color={cell.getValue<string>() === '正常' ? 'success' : 'default'}
            size="small"
          />
        ),
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: rows,
    enableStickyHeader: true,
    enableDensityToggle: true,
    enableColumnOrdering: true,
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Stack direction="row" spacing={1}>
        <IconButton aria-label="编辑" size="small">
          <EditOutlined fontSize="small" />
        </IconButton>
        <IconButton aria-label="更多操作" size="small">
          <MoreHoriz fontSize="small" />
        </IconButton>
      </Stack>
    ),
  });

  return (
    <MaterialReactTable table={table} />
  );
}
```

## Column Definitions

### Preferred Basic Column

```tsx
{ accessorKey: 'name', header: '姓名', size: 160 }
```

### Derived Column

```tsx
{
  accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  id: 'fullName',
  header: '姓名',
}
```

### Custom Rendering

```tsx
{
  accessorKey: 'status',
  header: '状态',
  Cell: ({ cell }) => (
    <Chip
      label={cell.getValue<string>()}
      color={cell.getValue<string>() === '正常' ? 'success' : 'default'}
      size="small"
    />
  ),
}
```

### Value Formatting

```tsx
{
  accessorKey: 'createdAt',
  header: '创建时间',
  Cell: ({ cell }) => dayjs(cell.getValue<string>()).format('YYYY-MM-DD HH:mm'),
}
```

### Actions Column

```tsx
enableRowActions: true,
renderRowActions: ({ row }) => (
  <Stack direction="row" spacing={1}>
    <IconButton aria-label="编辑" size="small" onClick={() => handleEdit(row.original)}>
      <EditOutlined fontSize="small" />
    </IconButton>
    <IconButton aria-label="删除" size="small" onClick={() => handleDelete(row.original.id)}>
      <DeleteOutline fontSize="small" />
    </IconButton>
  </Stack>
)
```

## Server-Side Pagination

```tsx
const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
const [sorting, setSorting] = useState<MRT_SortingState>([]);
const [pagination, setPagination] = useState<MRT_PaginationState>({
  pageIndex: 0,
  pageSize: 20,
});

const { data, isLoading, isRefetching } = useQuery({
  queryKey: ['users', columnFilters, sorting, pagination],
  queryFn: () => fetchUsers({ columnFilters, sorting, pagination }),
});

const table = useMaterialReactTable({
  columns,
  data: data?.rows ?? [],
  rowCount: data?.total ?? 0,
  manualFiltering: true,
  manualSorting: true,
  manualPagination: true,
  state: {
    columnFilters,
    sorting,
    pagination,
    isLoading,
    showProgressBars: isRefetching,
  },
  onColumnFiltersChange: setColumnFilters,
  onSortingChange: setSorting,
  onPaginationChange: setPagination,
});
```

## MRT Styling Hooks

```tsx
const table = useMaterialReactTable({
  columns,
  data,
  muiTablePaperProps: {
    elevation: 0,
    sx: {
      borderRadius: 3,
      border: (theme) => `1px solid ${theme.palette.divider}`,
      overflow: 'hidden',
    },
  },
  muiTopToolbarProps: {
    sx: {
      px: 2,
      py: 1.5,
    },
  },
  muiSearchTextFieldProps: {
    placeholder: '搜索姓名、邮箱或部门',
    size: 'small',
    sx: { minWidth: 280 },
  },
  muiTableContainerProps: {
    sx: { maxHeight: 640 },
  },
});
```

## DataGrid Fallback

Use MUI DataGrid only when you explicitly need to stay inside an existing DataGrid code path.

```tsx
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

const columns: GridColDef<User>[] = [
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 160 },
  { field: 'email', headerName: 'Email', flex: 1, minWidth: 240 },
];

<DataGrid
  rows={rows}
  columns={columns}
  pageSizeOptions={[10, 25, 50]}
  disableRowSelectionOnClick
/>
```

## Best Practices

1. **Prefer MRT for rich admin tables** - Better fit for filter-heavy operational UIs
2. **Keep columns stable** - Memoize `MRT_ColumnDef<T>[]`
3. **Use server-side state intentionally** - `manualPagination`, `manualSorting`, `manualFiltering`
4. **Separate page actions from table actions** - Page header for global create, toolbar for table controls
5. **Keep the table full-width in the work area** - Do not trap wide admin content in a narrow centered column
6. **Use status chips and formatted cells** - Raw strings are rarely enough for business states
7. **Style the table surface** - Paper, toolbar, and search field should match the page shell

## Accessibility

- Ensure column headers are descriptive
- Use `aria-label` for icon-only row actions
- Keep row actions keyboard reachable
- Do not rely on color alone for business status
- Preserve readable hit targets even in dense tables
