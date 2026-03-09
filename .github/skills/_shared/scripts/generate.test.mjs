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

function runGenerator(args) {
  const result = spawnSync(process.execPath, [GENERATOR_PATH, ...args], {
    cwd: WORKSPACE_ROOT,
    encoding: 'utf-8',
  });

  assert.equal(
    result.status,
    0,
    `generator failed with args ${args.join(' ')}\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`
  );
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

  const detailPageContent = fs.readFileSync(detailPagePath, 'utf-8');
  assert.match(detailPageContent, /import \{ ProductForm \} from '\.\/Form';/);
  assert.doesNotMatch(detailPageContent, /from '\.\/ProductForm';/);

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  assert.equal(packageJson.dependencies['@mui/icons-material'], '^6.0.0');
  assert.equal(packageJson.pnpm.overrides['react-is'], '18.3.0');
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
