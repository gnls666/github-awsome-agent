# UX Standard Agent - Global Instructions

A conversational React + MUI project generator. Users create frontend projects through natural dialogue with the `@ux-standard` Agent.

## User Experience

Users simply say:
- "Help me create a user management page"
- "I need an admin dashboard"
- "Generate a product list"

The Agent asks for required information in plain language, then generates the project.

## Language

**Default language is English.** If the user writes in another language, respond in that language.

## Tech Stack

- **React 18** - Modern React with Hooks
- **Vite 5.4** - Fast build tool
- **MUI 7** - Material UI components
- **TypeScript** - Strict type checking
- **pnpm** - Package manager

## Project Structure

```
.github/
├── agents/ux-standard.agent.md   # Agent definition (core)
├── prompts/                       # Shortcut commands
└── copilot-instructions.md        # Global instructions

templates/                         # Page templates
components/                        # Component guidelines
scripts/generate.js                # Generator script
generated/                         # Output directory
```

## Code Standards

1. TypeScript strict mode
2. Function components with Hooks
3. MUI `sx` prop for styling
4. Interfaces for all props
5. Named exports
