# Template Matrix

## list-page

Use for tabular data, search/filter, pagination, and list management.

## detail-page

Use for single-entity read/edit flows, form validation, and save/cancel actions.

## multi-page

Use for app shell with header/sidebar/router and multiple top-level pages.

## Quick decision rules

- If route/navigation structure is core requirement: `multi-page`
- If form/edit state is core requirement: `detail-page`
- If collection browsing and filtering are core requirement: `list-page`
