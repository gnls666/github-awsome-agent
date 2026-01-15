---
agent: ux-standard
description: Only create a plan without executing - analyze requirements and output structured steps
---

# /plan - Plan Only Mode

You are in **Plan Only Mode**. Your task is to analyze the user's request and output a structured plan, but **DO NOT execute anything**.

## Rules

1. **NO EXECUTION** - Do not run any commands, create files, or make changes
2. **ANALYZE DEEPLY** - Read the entire request and identify all requirements
3. **OUTPUT PLAN** - Present a clear, structured, step-by-step plan
4. **WAIT FOR APPROVAL** - End with asking user to confirm or adjust

## Plan Output Format

```markdown
## 📋 Plan

**Goal:** [One sentence summary]

**Analysis:**

- [Requirement 1]
- [Requirement 2]
- [Inferred requirement]

---

### Steps

- [ ] **Step 1:** [Action]

  - [Detail]

- [ ] **Step 2:** [Action]

  - [Detail]

- [ ] **Step 3:** [Action]

---

**Files to create/modify:**

- `path/to/file` - [what changes]

---

**Estimated complexity:** [Simple / Medium / Complex]

---

Ready to execute? Reply **"go"** to proceed, or let me know if you'd like to adjust the plan.
```

## What You CAN Do

- Read files to understand current state
- Search codebase for context
- Ask clarifying questions
- Propose alternative approaches

## What You CANNOT Do

- Run `node scripts/generate.js` or any commands
- Create or modify any files
- Execute any scripts
- Make any changes to the codebase

## After User Approves

When user says "go", "proceed", "ok", "yes", etc.:

1. Switch to Execute Mode
2. Follow the plan step by step
3. Report progress after each step
4. Use the todo tool to track completion

---

## Example

**User input:** `/plan Create a product management page with product name, type, price, and stock status`

**Your response:**

```markdown
## 📋 Plan

**Goal:** Create a product management list page with product info display

**Analysis:**

- Product fields: name, type, price, stockStatus
- Need list-page template
- Need custom Product interface and table columns

---

### Steps

- [ ] **Step 1:** Generate list-page project

  - Project name: product-management
  - Entity: Product
  - Title: Product Management

- [ ] **Step 2:** Update types.ts

  - Define Product interface: id, name, type, price, stockStatus
  - Define StockStatus enum: InStock, LowStock, OutOfStock

- [ ] **Step 3:** Update ProductListPage.tsx

  - Configure table columns: product name, type, price, stock status
  - Format price column as currency
  - Display stock status with Chip component

- [ ] **Step 4:** Update mock data
  - Generate 10 product test records

---

**Files to create/modify:**

- `generated/product-management/` - New project
- `src/types.ts` - Product interface
- `src/pages/ProductListPage.tsx` - Table configuration
- `src/api.ts` - Mock data

---

**Estimated complexity:** Medium

---

Ready to execute? Reply **"go"** to proceed.
```
