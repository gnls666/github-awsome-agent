# Scenario Matrix

Use these scenarios to classify the migration before editing.

## 1. `mui-react-normalization`

Use when the project already uses React and Material UI, but needs to converge on:

- the shared `ThemeProvider`
- platform icon entrypoints
- consistent layout, spacing, and theme usage
- Material React Table for admin/data-heavy tables

This is the safest executable migration scenario and should be preferred when it fits.

## 2. `react-ui-library-replacement`

Use when the project already uses React, but the touched scope depends on another component library.

Typical examples:

- Ant Design to MUI
- Chakra UI to MUI
- Mantine to MUI
- mixed custom components plus a third-party UI kit

This is a first-class executable scenario for the skill.

## 3. `react-incremental-typescript`

Use when the project already uses React and the migration focus is incremental JS to TS adoption with minimal structural churn.

This scenario can stand alone or be combined with another scenario through `tracks.incrementalTypescript`.

## 4. `react-combined-migration`

Use when the same scope needs multiple coordinated changes:

- provider adoption
- component-library replacement
- icon replacement
- table standardization
- incremental TypeScript

This is still executable, but must follow the fixed migration phases.

## 5. `framework-modernization-plan-only`

Use when the repository is Angular or Vue and the request is to migrate toward React + platform MUI.

For MVP:

- produce the migration contract
- inventory the current UI stack and route structure
- map representative screens to React/MUI equivalents
- define a pilot target

Do not attempt automatic full in-place framework conversion.

## Priority Order

1. `mui-react-normalization`
2. `react-ui-library-replacement`
3. `react-incremental-typescript`
4. `react-combined-migration`
5. `framework-modernization-plan-only`
