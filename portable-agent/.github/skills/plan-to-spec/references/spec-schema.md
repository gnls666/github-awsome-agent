# Spec Schema

Use this structure for `plans/<project-name>/spec.json`:

```json
{
  "projectName": "user-admin",
  "template": "list-page",
  "title": "用户管理",
  "entityName": "User",
  "pages": [],
  "outputDir": "standalone/user-admin",
  "constraints": [],
  "customizations": [],
  "postGeneration": {
    "tasks": []
  },
  "verification": {
    "typecheck": true,
    "test": false,
    "build": false
  }
}
```

## Notes

- `template` must be one of `list-page`, `detail-page`, or `multi-page`.
- `projectName` should be kebab-case because it becomes the generated directory name.
- `entityName` is usually needed for `list-page` and `detail-page`.
- `pages` is only used for `multi-page`.
- `outputDir` is optional. Use it only when the user explicitly wants a standalone generated subtree.
- Do not assume the repository already has an `app` or `apps` directory.
- `constraints` captures non-functional limits that affect implementation.
- `customizations` captures user-facing requirements beyond the base template.
- `postGeneration.tasks` should list only work the base generator cannot express directly.
- `verification` is optional; use it to indicate how far validation should go after generation.
