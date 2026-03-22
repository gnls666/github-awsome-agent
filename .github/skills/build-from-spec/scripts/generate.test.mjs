import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const WORKSPACE_ROOT = process.cwd();
const GENERATOR_PATH = path.join(__dirname, 'generate.js');
const GENERATED_DIR = path.join(WORKSPACE_ROOT, 'generated');

function runGeneratorInCwd(args, cwd = WORKSPACE_ROOT) {
  const result = spawnSync(process.execPath, [GENERATOR_PATH, ...args], {
    cwd,
    encoding: 'utf-8',
  });

  assert.equal(
    result.status,
    0,
    `generator failed with args ${args.join(' ')}\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`
  );
}

function runGenerator(args) {
  runGeneratorInCwd(args, WORKSPACE_ROOT);
}

function removeGeneratedProject(projectName) {
  fs.rmSync(path.join(GENERATED_DIR, projectName), { recursive: true, force: true });
}

function removeDirectory(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
}

function removeFile(filePath) {
  fs.rmSync(filePath, { force: true });
}

test('multi-page uses --pages to generate router, sidebar and page files', (t) => {
  const projectName = `skillpack-multi-${randomUUID().slice(0, 8)}`;
  t.after(() => removeGeneratedProject(projectName));

  runGenerator([
    'multi-page',
    projectName,
    '--title',
    'Admin',
    '--pages',
    'Home,Orders,Reports',
  ]);

  const outputDir = path.join(GENERATED_DIR, projectName);
  const pagesDir = path.join(outputDir, 'src', 'pages');
  const routerPath = path.join(outputDir, 'src', 'router.tsx');
  const sidebarPath = path.join(outputDir, 'src', 'Sidebar.tsx');

  assert.deepEqual(
    fs.readdirSync(pagesDir).sort(),
    ['HomePage.tsx', 'OrdersPage.tsx', 'ReportsPage.tsx']
  );

  const routerContent = fs.readFileSync(routerPath, 'utf-8');
  assert.match(routerContent, /import \{ HomePage \} from '\.\/pages\/HomePage';/);
  assert.match(routerContent, /import \{ OrdersPage \} from '\.\/pages\/OrdersPage';/);
  assert.match(routerContent, /import \{ ReportsPage \} from '\.\/pages\/ReportsPage';/);
  assert.match(routerContent, /index: true,\s*element: <HomePage \/>/);
  assert.match(routerContent, /path: '\/orders',\s*element: <OrdersPage \/>/);
  assert.match(routerContent, /path: '\/reports',\s*element: <ReportsPage \/>/);
  assert.doesNotMatch(routerContent, /DashboardPage/);

  const sidebarContent = fs.readFileSync(sidebarPath, 'utf-8');
  assert.match(sidebarContent, /title: 'Home'/);
  assert.match(sidebarContent, /title: 'Orders'/);
  assert.match(sidebarContent, /title: 'Reports'/);
  assert.match(sidebarContent, /path: '\/orders'/);
  assert.match(sidebarContent, /path: '\/reports'/);
});

test('detail-page keeps Form import and icons dependency', (t) => {
  const projectName = `skillpack-detail-${randomUUID().slice(0, 8)}`;
  t.after(() => removeGeneratedProject(projectName));

  runGenerator([
    'detail-page',
    projectName,
    '--entity',
    'Product',
    '--title',
    'Product Detail',
  ]);

  const outputDir = path.join(GENERATED_DIR, projectName);
  const detailPagePath = path.join(outputDir, 'src', 'DetailPage.tsx');
  const packageJsonPath = path.join(outputDir, 'package.json');
  const appPath = path.join(outputDir, 'src', 'App.tsx');
  const mainPath = path.join(outputDir, 'src', 'main.tsx');
  const tsconfigPath = path.join(outputDir, 'tsconfig.json');
  const testPath = path.join(outputDir, 'src', 'App.test.tsx');
  const agentsPath = path.join(outputDir, 'AGENTS.md');

  const detailPageContent = fs.readFileSync(detailPagePath, 'utf-8');
  assert.match(detailPageContent, /import \{ ProductForm \} from '\.\/Form';/);
  assert.doesNotMatch(detailPageContent, /from '\.\/ProductForm';/);
  assert.equal(fs.existsSync(appPath), true);
  assert.equal(fs.existsSync(mainPath), true);
  assert.equal(fs.existsSync(tsconfigPath), true);
  assert.equal(fs.existsSync(testPath), true);
  assert.equal(fs.existsSync(agentsPath), true);

  const agentsContent = fs.readFileSync(agentsPath, 'utf-8');
  assert.match(agentsContent, /generated React detail page/i);
  assert.match(agentsContent, /Product/);

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  assert.equal(packageJson.dependencies['@mui/icons-material'], '^6.0.0');
  assert.equal(packageJson.devDependencies['@testing-library/jest-dom'], '^6.9.1');
  assert.equal(packageJson.pnpm.overrides['react-is'], '18.3.0');
});

test('list-page generates Material React Table defaults instead of DataGrid', (t) => {
  const projectName = `skillpack-list-${randomUUID().slice(0, 8)}`;
  t.after(() => removeGeneratedProject(projectName));

  runGenerator([
    'list-page',
    projectName,
    '--entity',
    'User',
    '--title',
    'User Directory',
  ]);

  const outputDir = path.join(GENERATED_DIR, projectName);
  const listPagePath = path.join(outputDir, 'src', 'ListPage.tsx');
  const packageJsonPath = path.join(outputDir, 'package.json');
  const testPath = path.join(outputDir, 'src', 'App.test.tsx');
  const tsconfigPath = path.join(outputDir, 'tsconfig.json');
  const agentsPath = path.join(outputDir, 'AGENTS.md');

  const listPageContent = fs.readFileSync(listPagePath, 'utf-8');
  assert.match(listPageContent, /MaterialReactTable/);
  assert.match(listPageContent, /useMaterialReactTable/);
  assert.doesNotMatch(listPageContent, /DataGrid/);
  assert.equal(fs.existsSync(testPath), true);
  assert.equal(fs.existsSync(tsconfigPath), true);
  assert.equal(fs.existsSync(agentsPath), true);

  const agentsContent = fs.readFileSync(agentsPath, 'utf-8');
  assert.match(agentsContent, /generated React admin list page/i);
  assert.match(agentsContent, /Material React Table/);

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  assert.equal(packageJson.dependencies['material-react-table'], '^3.2.1');
  assert.equal(packageJson.dependencies['@mui/x-date-pickers'], '^7.0.0');
  assert.equal(packageJson.dependencies['@mui/icons-material'], '^6.0.0');
  assert.equal(packageJson.devDependencies['@testing-library/jest-dom'], '^6.9.1');
  assert.equal(packageJson.dependencies['@mui/x-data-grid'], undefined);
});

test('spec-file generation writes spec.json and spec.md into the project', (t) => {
  const projectName = `skillpack-spec-${randomUUID().slice(0, 8)}`;
  const specPath = path.join(WORKSPACE_ROOT, `.tmp-spec-${randomUUID().slice(0, 8)}.json`);

  t.after(() => removeGeneratedProject(projectName));
  t.after(() => removeFile(specPath));

  fs.writeFileSync(
    specPath,
    JSON.stringify({
      projectName,
      template: 'multi-page',
      title: 'Spec Driven Admin',
      pages: ['Overview', 'Users', 'Audit Logs'],
      customizations: ['Use audit-oriented copy'],
      postGeneration: {
        tasks: ['Add audit summary cards to the overview page'],
      },
      verification: {
        typecheck: true,
      },
    }),
    'utf-8'
  );

  runGenerator(['--spec-file', specPath]);

  const outputDir = path.join(GENERATED_DIR, projectName);
  const specJsonPath = path.join(outputDir, 'spec.json');
  const specMarkdownPath = path.join(outputDir, 'spec.md');
  const routerPath = path.join(outputDir, 'src', 'router.tsx');

  const generatedSpec = JSON.parse(fs.readFileSync(specJsonPath, 'utf-8'));
  assert.equal(generatedSpec.projectName, projectName);
  assert.equal(generatedSpec.template, 'multi-page');
  assert.deepEqual(generatedSpec.pages, ['Overview', 'Users', 'AuditLogs']);
  assert.deepEqual(generatedSpec.postGeneration.tasks, ['Add audit summary cards to the overview page']);

  const specMarkdown = fs.readFileSync(specMarkdownPath, 'utf-8');
  assert.match(specMarkdown, /# Project Spec/);
  assert.match(specMarkdown, /Spec Driven Admin/);
  assert.match(specMarkdown, /Add audit summary cards to the overview page/);

  const routerContent = fs.readFileSync(routerPath, 'utf-8');
  assert.match(routerContent, /OverviewPage/);
  assert.match(routerContent, /AuditLogsPage/);
});

test('spec-file generation accepts page objects and derives a readable title fallback', (t) => {
  const projectName = `rich-spec-admin-${randomUUID().slice(0, 8)}`;
  const specPath = path.join(WORKSPACE_ROOT, `.tmp-rich-spec-${randomUUID().slice(0, 8)}.json`);

  t.after(() => removeGeneratedProject(projectName));
  t.after(() => removeFile(specPath));

  fs.writeFileSync(
    specPath,
    JSON.stringify({
      projectName,
      template: 'multi-page',
      pages: [
        { name: 'Dashboard', path: '/' },
        { name: 'Users Management', path: '/users' },
        { name: 'Settings', path: '/settings' },
      ],
      postGeneration: {
        tasks: [],
      },
      verification: {
        typecheck: true,
        test: true,
        build: true,
      },
    }),
    'utf-8'
  );

  runGenerator(['--spec-file', specPath]);

  const outputDir = path.join(GENERATED_DIR, projectName);
  const pagesDir = path.join(outputDir, 'src', 'pages');
  const specMarkdownPath = path.join(outputDir, 'spec.md');
  const specMarkdown = fs.readFileSync(specMarkdownPath, 'utf-8');

  assert.deepEqual(
    fs.readdirSync(pagesDir).sort(),
    ['DashboardPage.tsx', 'SettingsPage.tsx', 'UsersManagementPage.tsx']
  );
  assert.match(specMarkdown, /- Title: Rich Spec Admin [A-Fa-f0-9]{8}/);
  assert.match(specMarkdown, /- Pages: Dashboard, UsersManagement, Settings/);
});

test('multi-page default operational pages use Material React Table', (t) => {
  const projectName = `skillpack-mrt-multi-${randomUUID().slice(0, 8)}`;
  t.after(() => removeGeneratedProject(projectName));

  runGenerator([
    'multi-page',
    projectName,
    '--title',
    'Ops Workspace',
    '--pages',
    'Dashboard,Users,Products',
  ]);

  const outputDir = path.join(GENERATED_DIR, projectName);
  const usersPagePath = path.join(outputDir, 'src', 'pages', 'UsersPage.tsx');
  const productsPagePath = path.join(outputDir, 'src', 'pages', 'ProductsPage.tsx');
  const packageJsonPath = path.join(outputDir, 'package.json');
  const appTestPath = path.join(outputDir, 'src', 'App.test.tsx');
  const agentsPath = path.join(outputDir, 'AGENTS.md');

  const usersPageContent = fs.readFileSync(usersPagePath, 'utf-8');
  const productsPageContent = fs.readFileSync(productsPagePath, 'utf-8');

  assert.match(usersPageContent, /MaterialReactTable/);
  assert.match(productsPageContent, /MaterialReactTable/);
  assert.doesNotMatch(usersPageContent, /<TableContainer|import\s+\{[^}]*TableContainer/);
  assert.doesNotMatch(productsPageContent, /<TableContainer|import\s+\{[^}]*TableContainer/);
  assert.equal(fs.existsSync(appTestPath), true);
  assert.equal(fs.existsSync(agentsPath), true);

  const agentsContent = fs.readFileSync(agentsPath, 'utf-8');
  assert.match(agentsContent, /generated multi-page React admin application/i);
  assert.match(agentsContent, /Dashboard,Users,Products/);

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  assert.equal(packageJson.dependencies['material-react-table'], '^3.2.1');
  assert.equal(packageJson.dependencies['@mui/x-date-pickers'], '^7.0.0');
  assert.equal(packageJson.dependencies['@mui/x-data-grid'], undefined);
});

test('multi-page dashboard page avoids unused imports in generated output', (t) => {
  const projectName = `skillpack-dashboard-${randomUUID().slice(0, 8)}`;
  t.after(() => removeGeneratedProject(projectName));

  runGenerator([
    'multi-page',
    projectName,
    '--title',
    'Admin Dashboard',
    '--pages',
    'Dashboard,Users,Settings',
  ]);

  const outputDir = path.join(GENERATED_DIR, projectName);
  const dashboardPagePath = path.join(outputDir, 'src', 'pages', 'DashboardPage.tsx');
  const dashboardPageContent = fs.readFileSync(dashboardPagePath, 'utf-8');

  assert.doesNotMatch(
    dashboardPageContent,
    /import \{[^}]*Avatar[^}]*\} from '@mui\/material';/
  );
});

test('generated vitest config excludes bundle files under .github', (t) => {
  const projectName = `skillpack-vitest-${randomUUID().slice(0, 8)}`;
  t.after(() => removeGeneratedProject(projectName));

  runGenerator([
    'multi-page',
    projectName,
    '--title',
    'Vitest Scoped Admin',
    '--pages',
    'Dashboard,Users,Settings',
  ]);

  const outputDir = path.join(GENERATED_DIR, projectName);
  const vitestConfigPath = path.join(outputDir, 'vitest.config.ts');
  const vitestConfig = fs.readFileSync(vitestConfigPath, 'utf-8');

  assert.match(vitestConfig, /exclude:\s*\[[^\]]*["']\.github\/\*\*["']/);
});

test('custom output directory writes the project outside generated', (t) => {
  const projectName = `portable-output-${randomUUID().slice(0, 8)}`;
  const outputDir = path.join(WORKSPACE_ROOT, '.tmp-portable-output', projectName);

  t.after(() => removeDirectory(path.join(WORKSPACE_ROOT, '.tmp-portable-output')));

  runGenerator([
    'list-page',
    projectName,
    '--entity',
    'User',
    '--title',
    'Portable Output',
    '--output',
    path.relative(WORKSPACE_ROOT, outputDir),
  ]);

  assert.equal(fs.existsSync(path.join(outputDir, 'package.json')), true);
  assert.equal(fs.existsSync(path.join(outputDir, 'src', 'ListPage.tsx')), true);
  assert.equal(fs.existsSync(path.join(GENERATED_DIR, projectName)), false);
});

test('empty-workspace bootstrap can generate directly to the current root', (t) => {
  const tempWorkspace = path.join(WORKSPACE_ROOT, `.tmp-empty-workspace-${randomUUID().slice(0, 8)}`);

  t.after(() => removeDirectory(tempWorkspace));

  fs.mkdirSync(path.join(tempWorkspace, '.github'), { recursive: true });

  runGeneratorInCwd(
    [
      'list-page',
      'bootstrap-admin',
      '--entity',
      'User',
      '--title',
      'Bootstrap Admin',
      '--output',
      '.',
    ],
    tempWorkspace
  );

  assert.equal(fs.existsSync(path.join(tempWorkspace, 'package.json')), true);
  assert.equal(fs.existsSync(path.join(tempWorkspace, 'src', 'ListPage.tsx')), true);
  assert.equal(fs.existsSync(path.join(tempWorkspace, 'AGENTS.md')), true);
  assert.equal(fs.existsSync(path.join(tempWorkspace, 'spec.json')), true);
  assert.equal(fs.existsSync(path.join(tempWorkspace, 'generated')), false);
});
