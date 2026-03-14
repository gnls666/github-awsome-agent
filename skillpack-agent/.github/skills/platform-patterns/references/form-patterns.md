# Form Patterns

Use this pattern family for structured edit, create, and settings flows.

## First-Class Variants

### Page Form

Use for record creation or editing on a dedicated route.

### Dialog Form

Use for compact, high-frequency edits that do not justify navigation away from the current page.

### Sectioned Settings Form

Use for settings pages with grouped controls and explanatory text.

## Core Rules

- prefer clear section grouping over one long undifferentiated form
- use standard submit, cancel, error, and loading behavior
- keep validation feedback close to the field
- in admin contexts, default to compact density unless readability clearly suffers

## Asset

- `assets/patterns/SectionForm.tsx`
