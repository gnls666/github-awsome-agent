# Migration Schema

Migration tasks use:

- `plans/<task-id>/plan.md`
- `plans/<task-id>/migration.json`

Use this structure for `migration.json`:

```json
{
  "taskId": "users-module-platform-mui-migration",
  "status": "draft",
  "mode": "migration-to-platform-mui",
  "currentStack": {
    "framework": "react",
    "language": "javascript",
    "uiLibraries": ["antd"],
    "iconLibraries": ["@ant-design/icons"],
    "tableLibraries": ["antd-table"],
    "sourceRoots": ["src"],
    "entrypoints": ["src/main.jsx"]
  },
  "targetProfile": {
    "framework": "react",
    "uiLibrary": "mui-v6",
    "provider": "@platform/theme-provider",
    "iconLibrary": "@platform/icons",
    "tableLibrary": "material-react-table",
    "typescriptMode": "unchanged"
  },
  "primaryScenario": "react-ui-library-replacement",
  "tracks": {
    "providerAdoption": true,
    "uiLibraryReplacement": true,
    "iconReplacement": true,
    "tableStandardization": true,
    "incrementalTypescript": false
  },
  "scope": {
    "includePaths": ["src/pages/users", "src/components/users"],
    "excludePaths": ["src/legacy"],
    "pilotTarget": "src/pages/users"
  },
  "strategy": {
    "executionMode": "phased-in-place",
    "coexistenceAllowed": true,
    "removeOldUiLibrary": "touched-scope-only",
    "generatePilotSubtree": false,
    "outputDir": ""
  },
  "verification": {
    "typecheck": true,
    "test": true,
    "build": true
  },
  "postMigration": {
    "tasks": []
  },
  "openQuestions": []
}
```

## Notes

- `taskId` should be a stable kebab-case identifier for the migration scope.
- `primaryScenario` must be one of the scenarios in `scenario-matrix.md`.
- `tracks` express concurrent migration concerns without inventing multiple top-level tasks.
- `scope.includePaths` defines the intended migration boundary. Do not silently expand beyond it.
- `strategy.generatePilotSubtree` should stay `false` unless the user explicitly wants a standalone pilot.
- `postMigration.tasks` is only for follow-up work after the main migration phases complete.
- Default `targetProfile.typescriptMode` to `unchanged`. Only switch it to `incremental` when the user explicitly asks for JS-to-TS migration or when the existing repository already requires mixed JS/TS support in the touched scope.
- Discover `provider`, `iconLibrary`, and other target entrypoints from the repository first. Use placeholders only in examples or before discovery is complete.
