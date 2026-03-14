# Table Operation Errors

Use this pattern when a page has a primary working table and operations on that table can produce multiple durable failures.

This is not the same as:

- page-level loading or error state
- a one-line alert
- a transient toast

It is a **persistent bottom panel** that behaves more like an IDE terminal or output panel:

- attached to the page layout
- anchored below the main table
- collapsible
- vertically resizable
- able to show grouped error results from row actions or batch runs

## Typical Use Cases

- bulk status updates
- batch imports or exports
- user-management actions
- row-level operational commands that can fail independently
- long-running table workflows that return a set of partial failures

## Core Structure

### Main table stays primary

The main working surface remains the table or list.

### Bottom panel appears when needed

The error panel should appear under the main work area once there are grouped failures to show.

### Groups

Each group represents an error type or execution category, for example:

- permission errors
- validation errors
- network errors
- business-rule conflicts
- unknown server failures

### Rows inside each group

Each item should normally show:

- entity or row label
- action
- error message
- timestamp
- optional code
- optional retry affordance

## Interaction Rules

- The panel should be collapsible.
- The panel should be vertically resizable.
- The panel should remain visually attached to the main page shell.
- It should feel persistent and inspectable, not like a toast graveyard.
- A clear-all or dismiss-all action is useful when the errors are no longer relevant.

## When to Use This Instead of a Toast

Prefer this pattern when:

- more than one failure can happen at once
- failures belong to different categories
- the user needs to inspect or act on the failures
- the errors should remain visible while the user continues working in the table

Use a toast instead when:

- the error is singular
- the feedback is ephemeral
- no grouped follow-up inspection is needed

## Asset

- `assets/patterns/TableOperationErrorsPanel.tsx`
- `assets/patterns/UserManagementOperationErrorsExample.tsx`

## Concrete Example

Use `assets/patterns/UserManagementOperationErrorsExample.tsx` when the task is close to:

- a user-management list
- row or batch actions such as disable, department reassignment, MFA reset, or unlock
- grouped permission and business-conflict failures
- a need for a terminal-like bottom panel that stays attached to the page while the operator keeps working
