# API Design & Integration Guide

## Overview

This guide defines the standard patterns for handling API requests in our application. Since we operate in an offline/intranet environment, strict adherence to these patterns is required to ensure stability.

## Core Rules

1.  **Centralized Client**: All requests MUST use the `apiClient` from `@/utils/api`.
2.  **Error Handling**: Global error handling is managed by the client. Do not try-catch 401 errors manually; let the interceptor handle it.
3.  **Type Safety**: All API responses must be typed using Zod schemas.

## Patterns

### Fetching Data

Use React Query (`useQuery`) for all GET requests.

```tsx
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/utils/api';
import { UserSchema } from '@/types/user';

export function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const { data } = await apiClient.get(\`/users/\${id}\`);
      return UserSchema.parse(data);
    },
  });
}
```

### Mutating Data

Use React Query (`useMutation`) for POST/PUT/DELETE.

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/utils/api';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserUpdateInput) => apiClient.put('/users', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}
```
