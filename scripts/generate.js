#!/usr/bin/env node

/**
 * Template Generator Script
 *
 * Usage:
 *   node scripts/generate.js <template> <project-name> [options]
 *
 * Examples:
 *   node scripts/generate.js list-page my-users --entity User --title "User Management"
 *   node scripts/generate.js detail-page my-product --entity Product --title "Product Details"
 *   node scripts/generate.js multi-page my-admin --title "Admin Panel" --pages "Dashboard,Users,Products"
 *
 * Options:
 *   --entity <name>   Entity name in PascalCase (e.g., User, Product)
 *   --title <text>    Page title (can be Chinese/English)
 *   --pages <list>    Comma-separated page names for multi-page template
 *   --dry-run         Show what would be generated without creating files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Parse command line arguments
function parseArgs(args) {
  const result = {
    template: args[0],
    projectName: args[1],
    entity: '',
    title: '',
    pages: '',
    dryRun: false,
  };

  for (let i = 2; i < args.length; i++) {
    switch (args[i]) {
      case '--entity':
        result.entity = args[++i];
        break;
      case '--title':
        result.title = args[++i];
        break;
      case '--pages':
        result.pages = args[++i];
        break;
      case '--dry-run':
        result.dryRun = true;
        break;
    }
  }

  return result;
}

// Derive variables from user input
function deriveVariables(config) {
  const vars = {
    '{{PROJECT_NAME}}': config.projectName || 'my-project',
    '{{TITLE}}': config.title || 'Page Title',
    '{{ENTITY_NAME}}': config.entity || 'Item',
    '{{ENTITY_NAME_LOWER}}': (config.entity || 'Item').toLowerCase(),
  };

  // Parse pages for multi-page template
  if (config.pages) {
    vars['{{PAGES}}'] = config.pages;
  }

  return vars;
}

// Replace all variables in content
function replaceVariables(content, variables) {
  let result = content;
  for (const [key, value] of Object.entries(variables)) {
    result = result.split(key).join(value);
  }
  return result;
}

// Get target filename (remove .template extension)
function getTargetFilename(filename) {
  return filename.replace(/\.template$/, '');
}

// Recursively copy and process template directory
function processTemplate(srcDir, destDir, variables, dryRun) {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);

    if (entry.isDirectory()) {
      // Skip _shared directory
      if (entry.name === '_shared') continue;

      const destSubDir = path.join(destDir, entry.name);

      if (dryRun) {
        console.log(`📁 [DIR]  ${destSubDir}`);
      } else {
        fs.mkdirSync(destSubDir, { recursive: true });
      }

      processTemplate(srcPath, destSubDir, variables, dryRun);
    } else {
      // Process file
      const targetName = getTargetFilename(entry.name);
      const destPath = path.join(destDir, targetName);

      // Read file content
      const content = fs.readFileSync(srcPath, 'utf-8');

      // Replace variables if it's a template file
      const processedContent = entry.name.endsWith('.template')
        ? replaceVariables(content, variables)
        : content;

      if (dryRun) {
        console.log(`📄 [FILE] ${destPath}`);
        // Show variable replacements for template files
        if (entry.name.endsWith('.template')) {
          const usedVars = Object.keys(variables).filter(v => content.includes(v));
          if (usedVars.length > 0) {
            console.log(`         Variables: ${usedVars.join(', ')}`);
          }
        }
      } else {
        fs.writeFileSync(destPath, processedContent, 'utf-8');
        console.log(`✅ ${destPath}`);
      }
    }
  }
}

// Main function
function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log(`
Usage: node scripts/generate.js <template> <project-name> [options]

Templates:
  list-page    - Data list page with search and pagination
  detail-page  - Detail/form page for viewing/editing
  multi-page   - Multi-page site with Header, Sidebar, Router

Options:
  --entity <name>   Entity name in PascalCase (e.g., User, Product)
  --title <text>    Page title
  --pages <list>    Comma-separated page names (multi-page only)
  --dry-run         Preview without creating files

Examples:
  node scripts/generate.js list-page user-admin --entity User --title "用户管理"
  node scripts/generate.js multi-page my-dashboard --pages "Dashboard,Users,Settings"
`);
    process.exit(1);
  }

  const config = parseArgs(args);

  // Validate template exists
  const templateDir = path.join(ROOT_DIR, 'templates', config.template);
  if (!fs.existsSync(templateDir)) {
    const available = fs.readdirSync(path.join(ROOT_DIR, 'templates'))
      .filter(d => !d.startsWith('_') && fs.statSync(path.join(ROOT_DIR, 'templates', d)).isDirectory());
    console.error(`❌ Template "${config.template}" not found.`);
    console.error(`   Available templates: ${available.join(', ')}`);
    process.exit(1);
  }

  // Set up output directory
  const outputDir = path.join(ROOT_DIR, 'generated', config.projectName);

  // Check if output already exists
  if (!config.dryRun && fs.existsSync(outputDir)) {
    console.error(`❌ Output directory already exists: ${outputDir}`);
    console.error(`   Remove it first or choose a different project name.`);
    process.exit(1);
  }

  // Derive variables
  const variables = deriveVariables(config);

  console.log('');
  console.log('🚀 Template Generator');
  console.log('━'.repeat(50));
  console.log(`Template:    ${config.template}`);
  console.log(`Project:     ${config.projectName}`);
  console.log(`Output:      ${outputDir}`);
  console.log('');
  console.log('Variables:');
  for (const [key, value] of Object.entries(variables)) {
    console.log(`  ${key} → ${value}`);
  }
  console.log('━'.repeat(50));
  console.log('');

  if (config.dryRun) {
    console.log('🔍 DRY RUN - No files will be created\n');
  }

  // Create output directory
  if (!config.dryRun) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Process template
  processTemplate(templateDir, outputDir, variables, config.dryRun);

  console.log('');
  if (config.dryRun) {
    console.log('✅ Dry run complete. Run without --dry-run to generate files.');
  } else {
    console.log('✅ Generation complete!');
    console.log('');
    console.log('Next steps:');
    console.log(`  cd generated/${config.projectName}`);
    console.log('  pnpm install');
    console.log('  pnpm dev');
  }
}

main();
