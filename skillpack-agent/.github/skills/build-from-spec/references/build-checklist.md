# Build Checklist

## Inputs

- Human-readable plan: `plans/<project-name>/plan.md`
- Primary source: `plans/<project-name>/spec.json`
- Generated output: `generated/<projectName>/`

## Steps

1. Confirm the spec has `projectName`, `template`, and `title`.
2. Run `node .github/skills/build-from-spec/scripts/generate.js --spec-file plans/<project-name>/spec.json`.
3. Use the bundled templates under `assets/templates/`.
4. Use `--dry-run` first when:
   - the output directory may already exist
   - the spec was just created or heavily edited
   - the request includes broad post-generation work
5. Apply template-specific customization only when `postGeneration.tasks` is non-empty.
6. Report the generated path, template, spec files written, and any remaining follow-up.
