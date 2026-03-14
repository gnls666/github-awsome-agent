# MRT Admin Table Pattern

Use this pattern when the page needs a rich admin table surface, not just a bare MRT instance.

## Includes

- framed table container
- toolbar/search/filter integration
- row actions
- status chips
- density controls
- empty/loading/error behavior around the table

## Rules

- prefer full-width work surfaces
- keep horizontal overflow contained to the table area
- keep status presentation visual, not just raw strings
- keep page-level create actions outside the row-action area

## Asset

- `assets/patterns/MrtAdminTable.tsx`
