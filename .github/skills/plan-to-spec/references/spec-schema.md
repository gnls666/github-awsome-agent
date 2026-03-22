# Spec Schema

Use this structure for `plans/<project-name>/spec.json`:

```json
{
  "projectName": "user-admin",
  "template": "list-page",
  "title": "用户管理",
  "entityName": "User",
  "pages": [],
  "outputDir": ".",
  "constraints": [],
  "customizations": [],
  "postGeneration": {
    "tasks": []
  },
  "verification": {
    "typecheck": true,
    "test": true,
    "build": true
  }
}
```

## Notes

- `template` must be one of `list-page`, `detail-page`, or `multi-page`.
- `projectName` should be kebab-case because it becomes the generated directory name.
- `entityName` is usually needed for `list-page` and `detail-page`.
- `pages` is only used for `multi-page`, and it should stay a simple array of page names.
- `outputDir` is optional.
- Use `"."` when an empty workspace itself should become the generated project root.
- Use an explicit relative path when generating a standalone subtree inside an existing project workspace.
- Do not assume the repository already has an `app` or `apps` directory.
- `constraints` captures non-functional limits that affect implementation.
- `customizations` captures user-facing requirements beyond the base template.
- `postGeneration.tasks` should list only work the base generator cannot express directly, and each task should be narrow enough to verify.
- `verification` is optional; use it to indicate how far validation should go after generation.
- For empty-workspace bootstrap, prefer `verification` with `typecheck`, `test`, and `build` all enabled.
- Put richer design notes, page descriptions, and component lists in `plan.md` instead of expanding `spec.json` into a second planning document.
