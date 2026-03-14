#!/usr/bin/env node

/**
 * Template Generator Script
 *
 * Usage:
 *   node .github/skills/_shared/scripts/generate.js <template> <project-name> [options]
 *   node .github/skills/_shared/scripts/generate.js --spec-file plans/<project-name>/spec.json [options]
 *
 * Examples:
 *   node .github/skills/_shared/scripts/generate.js list-page my-users --entity User --title "User Management"
 *   node .github/skills/_shared/scripts/generate.js detail-page my-product --entity Product --title "Product Details"
 *   node .github/skills/_shared/scripts/generate.js multi-page my-admin --title "Admin Panel" --pages "Dashboard,Users,Products"
 *   node .github/skills/_shared/scripts/generate.js --spec-file plans/<project-name>/spec.json --dry-run
 *
 * Options:
 *   --entity <name>   Entity name in PascalCase (e.g., User, Product)
 *   --title <text>    Page title (can be Chinese/English)
 *   --pages <list>    Comma-separated page names for multi-page template
 *   --spec-file <path>  Read generation inputs from a JSON spec file
 *   --output <path>   Write files to a custom output directory
 *   --dry-run         Show what would be generated without creating files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SKILLPACK_ROOT = path.resolve(__dirname, '..');
const WORKSPACE_ROOT = process.cwd();
const DEFAULT_MULTI_PAGES = ['Dashboard', 'Users', 'Products'];

function toPascalCase(value) {
  return value
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

function parsePages(pagesArg) {
  if (Array.isArray(pagesArg)) {
    const pages = pagesArg
      .map((page) => toPascalCase(String(page)))
      .filter(Boolean);

    return pages.length > 0 ? Array.from(new Set(pages)) : DEFAULT_MULTI_PAGES;
  }

  if (!pagesArg) {
    return DEFAULT_MULTI_PAGES;
  }

  const pages = pagesArg
    .split(',')
    .map((page) => toPascalCase(page))
    .filter(Boolean);

  if (pages.length === 0) {
    return DEFAULT_MULTI_PAGES;
  }

  return Array.from(new Set(pages));
}

function normalizeStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => String(item).trim())
    .filter(Boolean);
}

function toKebabCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function getPageRoute(pageName, index) {
  if (index === 0) {
    return '/';
  }
  const route = toKebabCase(pageName);
  return `/${route || 'page'}`;
}

function getSidebarIconName(pageName) {
  const normalized = pageName.toLowerCase();

  if (normalized.includes('dashboard')) return 'DashboardIcon';
  if (normalized.includes('home')) return 'HomeIcon';
  if (normalized.includes('user') || normalized.includes('customer') || normalized.includes('member')) return 'PeopleIcon';
  if (normalized.includes('product') || normalized.includes('inventory') || normalized.includes('catalog')) return 'InventoryIcon';
  if (normalized.includes('order') || normalized.includes('purchase')) return 'ReceiptLongIcon';
  if (normalized.includes('setting') || normalized.includes('config')) return 'SettingsIcon';
  if (normalized.includes('report') || normalized.includes('analytic') || normalized.includes('metric')) return 'BarChartIcon';

  return 'DescriptionIcon';
}

function buildMultiPageTemplateVariables(pages) {
  const routerImports = pages
    .map((page) => `import { ${page}Page } from './pages/${page}Page';`)
    .join('\n');

  const routes = pages
    .map((page, index) => {
      if (index === 0) {
        return [
          '      {',
          '        index: true,',
          `        element: <${page}Page />,`,
          '      },',
        ].join('\n');
      }

      return [
        '      {',
        `        path: '${getPageRoute(page, index)}',`,
        `        element: <${page}Page />,`,
        '      },',
      ].join('\n');
    })
    .join('\n');

  const iconNames = Array.from(new Set(pages.map(getSidebarIconName)));
  const sidebarIconImports = iconNames
    .map((icon) => `import ${icon} from '@mui/icons-material/${icon.replace(/Icon$/, '')}';`)
    .join('\n');

  const navItems = pages
    .map((page, index) => {
      const icon = getSidebarIconName(page);
      return `  { path: '${getPageRoute(page, index)}', title: '${page}', icon: <${icon} /> },`;
    })
    .join('\n');

  return {
    '{{ROUTER_IMPORTS}}': routerImports,
    '{{ROUTES}}': routes,
    '{{SIDEBAR_ICON_IMPORTS}}': sidebarIconImports,
    '{{NAV_ITEMS}}': navItems,
  };
}

function createGenericPageContent(pageName) {
  return `import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export function ${pageName}Page(): React.ReactElement {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        ${pageName}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" color="text.secondary">
          This is the ${pageName} page.
        </Typography>
      </Paper>
    </Box>
  );
}
`;
}

// Parse command line arguments
function parseArgs(args) {
  const result = {
    template: '',
    projectName: '',
    entity: '',
    title: '',
    pages: '',
    dryRun: false,
    specFile: '',
    output: '',
  };

  const positionals = [];

  for (let i = 0; i < args.length; i++) {
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
      case '--spec-file':
        result.specFile = args[++i];
        break;
      case '--output':
        result.output = args[++i];
        break;
      case '--dry-run':
        result.dryRun = true;
        break;
      default:
        if (args[i].startsWith('--')) {
          console.error(`❌ Unknown option: ${args[i]}`);
          process.exit(1);
        }
        positionals.push(args[i]);
        break;
    }
  }

  result.template = positionals[0] || '';
  result.projectName = positionals[1] || '';

  return result;
}

function loadSpecFile(specFilePath) {
  const resolvedPath = path.resolve(WORKSPACE_ROOT, specFilePath);

  if (!fs.existsSync(resolvedPath)) {
    console.error(`❌ Spec file not found: ${resolvedPath}`);
    process.exit(1);
  }

  let parsedSpec;
  try {
    parsedSpec = JSON.parse(fs.readFileSync(resolvedPath, 'utf-8'));
  } catch (error) {
    console.error(`❌ Spec file must be valid JSON: ${resolvedPath}`);
    console.error(`   ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }

  if (!parsedSpec || typeof parsedSpec !== 'object' || Array.isArray(parsedSpec)) {
    console.error(`❌ Spec file must contain a JSON object: ${resolvedPath}`);
    process.exit(1);
  }

  return {
    resolvedPath,
    spec: parsedSpec,
  };
}

function mergeConfigWithSpec(config) {
  if (!config.specFile) {
    return {
      ...config,
      rawSpec: null,
      specSourcePath: '',
    };
  }

  const { resolvedPath, spec } = loadSpecFile(config.specFile);

  return {
    ...config,
    template: config.template || spec.template || '',
    projectName: config.projectName || spec.projectName || '',
    entity: config.entity || spec.entityName || spec.entity || '',
    title: config.title || spec.title || '',
    pages: config.pages || spec.pages || '',
    dryRun: config.dryRun || spec.dryRun === true,
    output: config.output || spec.outputDir || spec.output?.targetDir || '',
    rawSpec: spec,
    specSourcePath: resolvedPath,
  };
}

// Derive variables from user input
function deriveVariables(config, pages = []) {
  const vars = {
    '{{PROJECT_NAME}}': config.projectName || 'my-project',
    '{{TITLE}}': config.title || 'Page Title',
    '{{ENTITY_NAME}}': config.entity || 'Item',
    '{{ENTITY_NAME_LOWER}}': (config.entity || 'Item').toLowerCase(),
  };

  if (config.template === 'multi-page') {
    vars['{{PAGES}}'] = pages.join(',');
  }

  return vars;
}

function buildProjectSpec(config, pages = []) {
  const baseSpec =
    config.rawSpec && typeof config.rawSpec === 'object' && !Array.isArray(config.rawSpec)
      ? { ...config.rawSpec }
      : {};
  const basePostGeneration =
    baseSpec.postGeneration && typeof baseSpec.postGeneration === 'object' && !Array.isArray(baseSpec.postGeneration)
      ? { ...baseSpec.postGeneration }
      : {};
  const baseVerification =
    baseSpec.verification && typeof baseSpec.verification === 'object' && !Array.isArray(baseSpec.verification)
      ? { ...baseSpec.verification }
      : {};

  const projectSpec = {
    ...baseSpec,
    projectName: config.projectName,
    template: config.template,
    title: config.title || baseSpec.title || 'Page Title',
    constraints: normalizeStringArray(baseSpec.constraints),
    customizations: normalizeStringArray(baseSpec.customizations),
    postGeneration: {
      ...basePostGeneration,
      tasks: normalizeStringArray(basePostGeneration.tasks),
    },
    verification: {
      ...baseVerification,
    },
  };

  if (config.entity) {
    projectSpec.entityName = config.entity;
  } else {
    delete projectSpec.entityName;
  }

  delete projectSpec.entity;

  if (config.template === 'multi-page') {
    projectSpec.pages = pages;
  } else {
    delete projectSpec.pages;
  }

  return projectSpec;
}

function formatBulletList(items) {
  if (!items.length) {
    return '- None';
  }

  return items.map((item) => `- ${item}`).join('\n');
}

function formatVerificationSummary(verification) {
  const entries = Object.entries(verification)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `- ${key}: ${value}`);

  return entries.length > 0 ? entries.join('\n') : '- None specified';
}

function formatSpecMarkdown(projectSpec, specSourcePath = '') {
  const lines = [
    '# Project Spec',
    '',
    '## Summary',
    `- Project: ${projectSpec.projectName}`,
    `- Template: ${projectSpec.template}`,
    `- Title: ${projectSpec.title}`,
  ];

  if (projectSpec.entityName) {
    lines.push(`- Entity: ${projectSpec.entityName}`);
  }

  if (Array.isArray(projectSpec.pages) && projectSpec.pages.length > 0) {
    lines.push(`- Pages: ${projectSpec.pages.join(', ')}`);
  }

  if (specSourcePath) {
    lines.push(`- Source spec: ${path.relative(WORKSPACE_ROOT, specSourcePath)}`);
  }

  lines.push(
    '',
    '## Constraints',
    formatBulletList(normalizeStringArray(projectSpec.constraints)),
    '',
    '## Customizations',
    formatBulletList(normalizeStringArray(projectSpec.customizations)),
    '',
    '## Post-Generation Tasks',
    formatBulletList(normalizeStringArray(projectSpec.postGeneration?.tasks)),
    '',
    '## Verification',
    formatVerificationSummary(projectSpec.verification || {}),
    ''
  );

  return `${lines.join('\n')}\n`;
}

function writeProjectSpecArtifacts(outputDir, projectSpec, dryRun, specSourcePath = '') {
  const specJsonPath = path.join(outputDir, 'spec.json');
  const specMarkdownPath = path.join(outputDir, 'spec.md');
  const specJsonContent = JSON.stringify(projectSpec, null, 2);
  const specMarkdownContent = formatSpecMarkdown(projectSpec, specSourcePath);

  if (dryRun) {
    console.log(`📄 [FILE] ${specJsonPath}`);
    console.log(`📄 [FILE] ${specMarkdownPath}`);
    return;
  }

  fs.writeFileSync(specJsonPath, `${specJsonContent}\n`, 'utf-8');
  console.log(`✅ ${specJsonPath}`);
  fs.writeFileSync(specMarkdownPath, specMarkdownContent, 'utf-8');
  console.log(`✅ ${specMarkdownPath}`);
}

function resolveOutputDir(config) {
  if (!config.output) {
    return path.join(WORKSPACE_ROOT, 'generated', config.projectName);
  }

  return path.resolve(WORKSPACE_ROOT, config.output);
}

function isAllowedBootstrapEntry(entryName) {
  return (
    entryName === '.git' ||
    entryName === '.github' ||
    entryName === 'plans' ||
    entryName === '.gitignore' ||
    entryName === '.DS_Store' ||
    /^README(\..+)?$/i.test(entryName) ||
    /^LICENSE(\..+)?$/i.test(entryName)
  );
}

function isBootstrapRootAllowed(outputDir, config) {
  if (config.output !== '.' || !fs.existsSync(outputDir)) {
    return false;
  }

  const entries = fs.readdirSync(outputDir);
  return entries.every(isAllowedBootstrapEntry);
}

function getAvailableTemplates() {
  return fs.readdirSync(path.join(SKILLPACK_ROOT, 'templates'))
    .filter((dir) => !dir.startsWith('_') && fs.statSync(path.join(SKILLPACK_ROOT, 'templates', dir)).isDirectory());
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
function processTemplate(srcDir, destDir, variables, dryRun, options = {}) {
  const skipDirectories = options.skipDirectories || new Set();
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);

    if (entry.isDirectory()) {
      // Skip _shared directory
      if (entry.name === '_shared') continue;
      if (skipDirectories.has(srcPath)) continue;

      const destSubDir = path.join(destDir, entry.name);

      if (dryRun) {
        console.log(`📁 [DIR]  ${destSubDir}`);
      } else {
        fs.mkdirSync(destSubDir, { recursive: true });
      }

      processTemplate(srcPath, destSubDir, variables, dryRun, options);
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

function generateMultiPageFiles(outputDir, pages, variables, dryRun) {
  const pagesDir = path.join(outputDir, 'src', 'pages');

  if (dryRun) {
    console.log(`📁 [DIR]  ${pagesDir}`);
  } else {
    fs.mkdirSync(pagesDir, { recursive: true });
  }

  for (const pageName of pages) {
    const destPath = path.join(pagesDir, `${pageName}Page.tsx`);
    const templatePath = path.join(SKILLPACK_ROOT, 'templates', 'multi-page', 'src', 'pages', `${pageName}Page.tsx.template`);

    let content;
    if (fs.existsSync(templatePath)) {
      content = fs.readFileSync(templatePath, 'utf-8');
    } else {
      content = createGenericPageContent(pageName);
    }

    const processedContent = replaceVariables(content, variables);

    if (dryRun) {
      console.log(`📄 [FILE] ${destPath}`);
    } else {
      fs.writeFileSync(destPath, processedContent, 'utf-8');
      console.log(`✅ ${destPath}`);
    }
  }
}

// Main function
function main() {
  const args = process.argv.slice(2);
  const initialConfig = parseArgs(args);
  const config = mergeConfigWithSpec(initialConfig);

  if (!config.template || !config.projectName) {
    console.log(`
Usage: node .github/skills/_shared/scripts/generate.js <template> <project-name> [options]
   or: node .github/skills/_shared/scripts/generate.js --spec-file plans/<project-name>/spec.json [options]

Templates:
  list-page    - Data list page with search and pagination
  detail-page  - Detail/form page for viewing/editing
  multi-page   - Multi-page site with Header, Sidebar, Router

Options:
  --entity <name>   Entity name in PascalCase (e.g., User, Product)
  --title <text>    Page title
  --pages <list>    Comma-separated page names (multi-page only)
  --spec-file <path>  Read generation inputs from a JSON spec file
  --output <path>   Write files to a custom output directory
  --dry-run         Preview without creating files

Examples:
  node .github/skills/_shared/scripts/generate.js list-page user-admin --entity User --title "用户管理"
  node .github/skills/_shared/scripts/generate.js multi-page my-dashboard --pages "Dashboard,Users,Settings"
  node .github/skills/_shared/scripts/generate.js list-page user-admin --output apps/user-admin
  node .github/skills/_shared/scripts/generate.js --spec-file plans/<project-name>/spec.json
`);
    process.exit(1);
  }

  const pages = config.template === 'multi-page' ? parsePages(config.pages) : [];
  const projectSpec = buildProjectSpec(config, pages);

  // Validate template exists
  const templateDir = path.join(SKILLPACK_ROOT, 'templates', config.template);
  if (!fs.existsSync(templateDir)) {
    const available = getAvailableTemplates();
    console.error(`❌ Template "${config.template}" not found.`);
    console.error(`   Available templates: ${available.join(', ')}`);
    process.exit(1);
  }

  // Set up output directory
  const outputDir = resolveOutputDir(config);
  const outputDisplayPath = path.relative(WORKSPACE_ROOT, outputDir) || '.';

  // Check if output already exists
  if (!config.dryRun && fs.existsSync(outputDir) && !isBootstrapRootAllowed(outputDir, config)) {
    console.error(`❌ Output directory already exists: ${outputDir}`);
    console.error(`   Remove it first or choose a different project name.`);
    process.exit(1);
  }

  // Derive variables
  const variables = deriveVariables(config, pages);
  if (config.template === 'multi-page') {
    Object.assign(variables, buildMultiPageTemplateVariables(pages));
  }

  console.log('');
  console.log('🚀 Template Generator');
  console.log('━'.repeat(50));
  console.log(`Template:    ${config.template}`);
  console.log(`Project:     ${config.projectName}`);
  console.log(`Output:      ${outputDisplayPath}`);
  if (config.specSourcePath) {
    console.log(`Spec:        ${path.relative(WORKSPACE_ROOT, config.specSourcePath)}`);
  }
  console.log('');
  console.log('Variables:');
  const displayVariableKeys = ['{{PROJECT_NAME}}', '{{TITLE}}', '{{ENTITY_NAME}}', '{{ENTITY_NAME_LOWER}}', '{{PAGES}}'];
  for (const key of displayVariableKeys) {
    if (key in variables) {
      console.log(`  ${key} → ${variables[key]}`);
    }
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
  const options = {
    skipDirectories: config.template === 'multi-page'
      ? new Set([path.join(templateDir, 'src', 'pages')])
      : new Set(),
  };
  processTemplate(templateDir, outputDir, variables, config.dryRun, options);

  if (config.template === 'multi-page') {
    generateMultiPageFiles(outputDir, pages, variables, config.dryRun);
  }

  writeProjectSpecArtifacts(outputDir, projectSpec, config.dryRun, config.specSourcePath);

  console.log('');
  if (config.dryRun) {
    console.log('✅ Dry run complete. Run without --dry-run to generate files.');
  } else {
    console.log('✅ Generation complete!');
    console.log('');
    console.log('Next steps:');
    console.log(`  cd ${outputDisplayPath}`);
    console.log('  pnpm install');
    console.log('  pnpm dev');
  }
}

main();
