# Design Anti-Patterns

These patterns are adapted for Material UI-heavy product work. Avoid them when designing or refining UI in this repository.

## Generic AI UI Tells

- Do not leave the default MUI look untouched and call it a design system.
- Do not rely on the same dashboard pattern everywhere: four metric cards, one chart card, one table card.
- Do not stack cards inside cards or wrap every section in a bordered paper without hierarchy.
- Do not use identical card grids with the same padding, icon badge, heading, and helper copy repeated across the page.
- Do not center everything. Enterprise interfaces read better when titles, filters, and tables align to a strong left edge.

## Color Mistakes

- Do not spray the primary color across every button, chip, heading, and icon container.
- Do not use washed-out gray text on tinted or colored surfaces.
- Do not use decorative gradients as a shortcut for “premium”.
- Do not rely on pure white surfaces on pure gray backgrounds with no tonal structure.

## Layout Mistakes

- Do not use the same spacing everywhere. Uniform `p: 2` and `gap: 2` across the full page makes the UI feel mechanical.
- Do not trap wide admin content in a narrow centered frame while a sidebar already consumes horizontal space.
- Do not leave oversized empty margins on both sides of the main workspace when the primary content is a table, dashboard, or multi-filter management view.
- Do not push filters, summary blocks, and tables into a single undifferentiated slab.
- Do not let a table consume the page with no framing, supporting context, or empty-state guidance.
- Do not create headers that repeat the page title and then restate the same sentence underneath.

## Interaction Mistakes

- Do not make every action a contained primary button.
- Do not leave loading, empty, and error states visually disconnected from the rest of the page.
- Do not hide important statuses as plain text when a chip, badge, or structured emphasis would improve scanning.
- Do not use modals as a default answer when inline editing, drawers, or secondary sections are clearer.

## Typography Mistakes

- Do not let every heading use the same scale and weight.
- Do not use tiny secondary copy to simulate sophistication.
- Do not make page intros longer than the actual user task.

## Final Test

Ask this before shipping:

- Does this page look like a generic generated admin screen?
- Is there one thing that feels intentional beyond “it is neatly spaced”?
- If the answer is no, improve the composition, type hierarchy, or surface system before handoff.
