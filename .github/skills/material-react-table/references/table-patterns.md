# Table Patterns

## Default Page Composition

For admin pages, use this order:

1. Page header with title, summary, and page-level actions
2. Filter or summary surface
3. Main table surface
4. Empty, loading, or error state inside the table region

Avoid placing the page's primary "create" action inside the MRT toolbar unless the action is clearly table-scoped.

## Column Pattern

```tsx
const columns = useMemo<MRT_ColumnDef<User>[]>(() => [
  {
    accessorKey: 'name',
    header: '姓名',
    size: 180,
  },
  {
    accessorKey: 'email',
    header: '邮箱',
    size: 260,
  },
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
], []);
```

Use chips, soft badges, and formatted typography for business state columns instead of raw text.

## Table Instance Pattern

```tsx
const table = useMaterialReactTable({
  columns,
  data,
  enableStickyHeader: true,
  enableDensityToggle: true,
  enableColumnOrdering: true,
  enableRowActions: true,
  positionActionsColumn: 'last',
  renderRowActions: ({ row }) => (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="编辑" size="small" onClick={() => onEdit(row.original)}>
        <EditOutlined fontSize="small" />
      </IconButton>
      <IconButton aria-label="更多操作" size="small" onClick={() => onMore(row.original)}>
        <MoreHoriz fontSize="small" />
      </IconButton>
    </Stack>
  ),
  muiTablePaperProps: {
    elevation: 0,
    sx: {
      borderRadius: 3,
      border: (theme) => `1px solid ${theme.palette.divider}`,
      overflow: 'hidden',
    },
  },
  muiTableContainerProps: {
    sx: {
      maxHeight: 640,
    },
  },
});
```

## Remote Data Pattern

Use MRT table state as input to your query, not as a disconnected local UI.

```tsx
const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
const [globalFilter, setGlobalFilter] = useState('');
const [sorting, setSorting] = useState<MRT_SortingState>([]);
const [pagination, setPagination] = useState<MRT_PaginationState>({
  pageIndex: 0,
  pageSize: 20,
});

const { data, isLoading, isRefetching } = useQuery({
  queryKey: ['users', columnFilters, globalFilter, sorting, pagination],
  queryFn: () => fetchUsers({ columnFilters, globalFilter, sorting, pagination }),
});

const table = useMaterialReactTable({
  columns,
  data: data?.rows ?? [],
  manualFiltering: true,
  manualSorting: true,
  manualPagination: true,
  rowCount: data?.total ?? 0,
  state: {
    columnFilters,
    globalFilter,
    sorting,
    pagination,
    isLoading,
    showProgressBars: isRefetching,
  },
  onColumnFiltersChange: setColumnFilters,
  onGlobalFilterChange: setGlobalFilter,
  onSortingChange: setSorting,
  onPaginationChange: setPagination,
});
```

## Styling Pattern

- Keep table surfaces full-width inside the working area.
- Use `muiTablePaperProps`, `muiTopToolbarProps`, `muiBottomToolbarProps`, and `muiSearchTextFieldProps` to align MRT with the repository theme.
- Avoid default-looking flat tables. Use controlled surface borders, radius, and toolbar spacing.
- Keep dense operational tables readable. Density is not an excuse for cramped columns or tiny hit targets.
