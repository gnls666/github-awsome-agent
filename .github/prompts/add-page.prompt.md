---
name: add-page
description: Add a new page to an existing project
agent: agent
argument-hint: "projectName=my-app pageName=Orders"
---

# Add Page to Existing Project

Add a new page component to an existing project in `generated/`.

## User Parameters

- **projectName**: ${input:projectName:Existing project name in generated/}
- **pageName**: ${input:pageName:New page name (PascalCase, e.g., Orders)}

## Steps

1. **Verify project exists** - Check `generated/{{projectName}}/` exists
2. **Read existing structure** - Understand current router and pages
3. **Generate page component** - Create `{{pageName}}Page.tsx`
4. **Update router** - Add new route to `router.tsx`
5. **Update sidebar** - Add navigation item to `Sidebar.tsx`

## Page Template

```tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

export function {{pageName}}Page(): React.ReactElement {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {{pageName}}
      </Typography>
      {/* Page content here */}
    </Box>
  );
}
```

## Router Update

Add to existing routes in `router.tsx`:
```tsx
{
  path: '/{{pageName_lower}}',
  element: <{{pageName}}Page />,
}
```

## Sidebar Update

Add navigation item:
```tsx
{ path: '/{{pageName_lower}}', title: '{{pageName}}', icon: <Icon /> }
```

## Output

Files to create/modify:
- `generated/{{projectName}}/src/pages/{{pageName}}Page.tsx` (new)
- `generated/{{projectName}}/src/router.tsx` (modify)
- `generated/{{projectName}}/src/Sidebar.tsx` (modify)
