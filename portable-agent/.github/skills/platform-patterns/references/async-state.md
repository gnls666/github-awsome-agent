# Async State Pattern

Use this pattern when a page or section must move cleanly between:

- loading
- empty
- error
- ready

## Goals

- avoid one-off spinners and ad hoc error banners
- keep retry behavior consistent
- keep layout from jumping between states

## Recommended Shape

- loading: skeleton or progress UI inside the final container
- empty: explicit message, optional secondary explanation, optional create/import action
- error: concise failure text plus retry
- ready: render the real surface in the same frame

## When to Use

- list pages
- detail pages
- dashboard panels
- rich table wrappers

## Asset

- `assets/patterns/AsyncStatePanel.tsx`
