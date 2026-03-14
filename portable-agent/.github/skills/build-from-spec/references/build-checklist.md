# Build Checklist

## Inputs

- Human-readable plan: `plans/<project-name>/plan.md`
- Primary source: `plans/<project-name>/spec.json`
- Output:
  - `.` for empty-workspace bootstrap
  - `spec.outputDir` for explicit standalone subtree generation inside an existing project

## Steps

1. Confirm the spec has `projectName`, `template`, and `title`.
2. Confirm whether the current workspace is an empty bootstrap location or an existing project workspace.
3. Use the bundled generator script at `scripts/generate.js`.
4. Use the bundled templates under `assets/templates/` instead of inventing a one-off scaffold when an existing template fits.
5. Use `--output .` when the current empty workspace itself should become the generated project.
6. Use `--output <dir>` when generating a standalone subtree inside an existing project workspace.
7. Do not rely on `generated/<projectName>/` as the portable workflow default for existing-project generation.
8. Use `--dry-run` first when:
   - the output directory may already exist
   - the spec was just created or heavily edited
   - the request includes broad post-generation work
9. Apply template-specific customization only when `postGeneration.tasks` is non-empty.
10. Report the generated path, template, spec files written, and any remaining follow-up.
