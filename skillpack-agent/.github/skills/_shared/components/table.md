# Table / DataGrid Component Guide

## Overview

Use MUI DataGrid for displaying tabular data with features like sorting, filtering, and pagination.

## Basic DataGrid

```tsx
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
}

const columns: GridColDef<User>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'status', headerName: 'Status', width: 120 },
];

function UserTable({ rows }: { rows: User[] }) {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSizeOptions={[10, 25, 50]}
      disableRowSelectionOnClick
    />
  );
}
```

## Column Definitions

### Basic Column

```tsx
{ field: 'name', headerName: 'Name', width: 150 }
```

### Flexible Width

```tsx
{ field: 'description', headerName: 'Description', flex: 1, minWidth: 200 }
```

### Custom Rendering

```tsx
{
  field: 'status',
  headerName: 'Status',
  renderCell: (params) => (
    <Chip
      label={params.value}
      color={params.value === 'active' ? 'success' : 'default'}
      size="small"
    />
  ),
}
```

### Value Formatting

```tsx
{
  field: 'createdAt',
  headerName: 'Created',
  valueFormatter: (value: string) => new Date(value).toLocaleDateString(),
}
```

### Actions Column

```tsx
{
  field: 'actions',
  headerName: 'Actions',
  sortable: false,
  renderCell: (params) => (
    <Box>
      <IconButton onClick={() => handleEdit(params.row)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => handleDelete(params.row.id)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  ),
}
```

## Server-Side Pagination

```tsx
function ServerPaginatedTable() {
  const [rows, setRows] = useState<User[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    loadData();
  }, [paginationModel]);

  async function loadData() {
    setLoading(true);
    const response = await fetchUsers(paginationModel);
    setRows(response.items);
    setRowCount(response.total);
    setLoading(false);
  }

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      rowCount={rowCount}
      paginationMode="server"
      pageSizeOptions={[10, 25, 50]}
    />
  );
}
```

## Loading State

```tsx
<DataGrid
  loading={loading}
  slots={{
    loadingOverlay: () => (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    ),
  }}
/>
```

## Empty State

```tsx
<DataGrid
  slots={{
    noRowsOverlay: () => (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
        <Typography>No data available</Typography>
      </Box>
    ),
  }}
/>
```

## Best Practices

1. **Use flex for variable width columns** - Ensures responsive behavior
2. **Set minWidth with flex** - Prevents columns from becoming too narrow
3. **Server-side pagination for large datasets** - Better performance
4. **Disable row selection when not needed** - Cleaner UX
5. **Custom loading overlay** - Consistent with app design

## Accessibility

- Ensure column headers are descriptive
- Provide keyboard navigation support (built-in)
- Use `aria-label` for icon-only action buttons
- Consider screen reader users when using custom cell renderers
