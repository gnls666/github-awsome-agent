# Verification Checklist

## Run inside generated project root

1. `pnpm install` (if dependencies are missing)
2. `pnpm typecheck`
3. `pnpm test`
4. `pnpm build`

## Notes

- Prefer failing fast: stop and report on first blocking error if user did not request full run.
- Include path-oriented fixes instead of generic advice.
