import { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import PlayArrowOutlined from '@mui/icons-material/PlayArrowOutlined';
import SyncProblemOutlined from '@mui/icons-material/SyncProblemOutlined';
import {
  TableOperationErrorsPanel,
  type OperationErrorGroup,
} from '../patterns/TableOperationErrorsPanel';

const users = [
  { id: 'u-101', name: '张三', role: '管理员', status: '正常' },
  { id: 'u-102', name: '李四', role: '经理', status: '正常' },
  { id: 'u-103', name: '王五', role: '审计员', status: '待审核' },
  { id: 'u-104', name: '赵六', role: '普通用户', status: '暂停' },
];

const initialGroups: OperationErrorGroup[] = [
  {
    id: 'permission-errors',
    label: '权限错误',
    severity: 'error',
    items: [
      {
        id: 'err-1',
        entityLabel: '张三',
        actionLabel: '停用账号',
        message: '当前操作者没有停用管理员账号的权限。',
        timeLabel: '10:42:18',
        code: 'AUTH_403',
      },
      {
        id: 'err-2',
        entityLabel: '李四',
        actionLabel: '重置双因子',
        message: '仅安全管理员可以重置高风险角色的双因子配置。',
        timeLabel: '10:42:21',
        code: 'AUTH_403',
      },
    ],
  },
  {
    id: 'business-conflicts',
    label: '业务冲突',
    severity: 'warning',
    items: [
      {
        id: 'err-3',
        entityLabel: '王五',
        actionLabel: '批量分配部门',
        message: '用户仍有待审批工单，暂时不能迁移到新部门。',
        timeLabel: '10:42:28',
        code: 'USER_PENDING_TASKS',
      },
      {
        id: 'err-4',
        entityLabel: '赵六',
        actionLabel: '恢复账号',
        message: '账号处于合规冻结状态，需要先解除风控锁定。',
        timeLabel: '10:42:33',
        code: 'COMPLIANCE_LOCK',
      },
    ],
  },
];

export function UserManagementOperationErrorsExample() {
  const [errorGroups, setErrorGroups] = useState<OperationErrorGroup[]>(initialGroups);

  return (
    <Stack spacing={0} sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ px: 3, pt: 3, pb: 2 }}>
        <Stack spacing={2.5}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
            spacing={2}
          >
            <Box>
              <Typography variant="h4" fontWeight={800}>
                用户管理
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 0.75 }}>
                上方是主工作表格，下方是持续可见的批量操作错误面板。
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.25}>
              <Button
                variant="outlined"
                startIcon={<PlayArrowOutlined />}
                onClick={() => setErrorGroups(initialGroups)}
              >
                重新模拟失败批次
              </Button>
              <Button variant="contained" startIcon={<SyncProblemOutlined />}>
                执行批量停用
              </Button>
            </Stack>
          </Stack>

          <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <Box sx={{ px: 2.5, py: 2, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
              <Stack direction="row" spacing={1.25} alignItems="center">
                <Typography variant="subtitle1" fontWeight={700}>
                  当前用户
                </Typography>
                <Chip size="small" label={`${users.length} 条记录`} variant="outlined" />
              </Stack>
            </Box>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>姓名</TableCell>
                  <TableCell>角色</TableCell>
                  <TableCell>状态</TableCell>
                  <TableCell align="right">操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={user.status}
                        color={user.status === '正常' ? 'success' : user.status === '待审核' ? 'warning' : 'default'}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small" color="inherit">
                        查看
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Stack>
      </Box>

      <Box sx={{ mt: 'auto' }}>
        <TableOperationErrorsPanel
          groups={errorGroups}
          onClearAll={() => setErrorGroups([])}
        />
      </Box>
    </Stack>
  );
}
