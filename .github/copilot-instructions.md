# UX Standard - Global Copilot Instructions

This repository is configured for VS Code Copilot Agent Mode with a single orchestrator agent plus reusable skills.

## Platform

- Target: VS Code Copilot (version 1.109 or later)
- Primary agent: `@ux-standard`
- Skill location: `.github/skills/`

## Language

- Default output language: English.
- If the user writes in another language, respond in that language.

## Working Model

1. Understand requirements and fill missing inputs.
2. Select template (`list-page`, `detail-page`, `multi-page`).
3. Generate project with `.github/skills/_shared/scripts/generate.js`.
4. Apply requested customization.
5. Verify with quality checks when applicable.

Use skills by intent, and prefer automatic skill triggering over explicit slash commands.

## Tech Stack

- React 18
- Vite 5.4
- MUI 7
- TypeScript (strict)
- pnpm

## Repository Anchors

- Skillpack assets (portable): `.github/skills/_shared/`
- Templates: `.github/skills/_shared/templates/`
- Component standards: `.github/skills/_shared/components/`
- Generator: `.github/skills/_shared/scripts/generate.js`
- Generated output: `generated/`
