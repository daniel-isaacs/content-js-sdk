#!/usr/bin/env node
/**
 * scripts/sync-registries.mjs
 *
 * Run after `npx @optimizely/cms-cli config pull` to keep four registry
 * files in sync with whatever the CLI deposited in src/content-types/:
 *
 *   src/content-types/index.ts              — CT exports
 *   src/content-types/displayTemplates/index.ts — DT re-exports
 *   src/components/index.ts                 — component exports
 *   src/optimizely.ts                       — resolver entries
 *
 * The script is additive only — it never removes entries.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = (...parts) => join(ROOT, 'src', ...parts);

function read(path) {
  return readFileSync(path, 'utf-8').replace(/\r\n/g, '\n');
}
function write(path, content) {
  writeFileSync(path, content, 'utf-8');
}
function tsFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter(f => f.endsWith('.ts') && !f.endsWith('.d.ts'));
}
function tsxFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter(f => f.endsWith('.tsx'));
}

/**
 * Scan all .ts files in `dir` for `export const <name><suffix> =` declarations.
 * Returns [{ name, stem }] where stem is the file basename without extension.
 */
function findNamedExports(dir, suffix) {
  const results = [];
  const pattern = new RegExp(`export\\s+const\\s+(\\w+${suffix})\\s*=`, 'g');
  for (const file of tsFiles(dir)) {
    const text = read(join(dir, file));
    let m;
    while ((m = pattern.exec(text)) !== null) {
      results.push({ name: m[1], stem: basename(file, '.ts') });
    }
    pattern.lastIndex = 0;
  }
  return results;
}

// ── Discover content types ───────────────────────────────────────────────────

const componentCTs  = findNamedExports(src('content-types', 'component'),  'CT');
const pageCTs       = findNamedExports(src('content-types', 'page'),       'CT');
const experienceCTs = findNamedExports(src('content-types', 'experience'), 'CT');

// Display templates can live co-located in component/ or as standalone files in displayTemplates/
const componentDTs  = findNamedExports(src('content-types', 'component'),        'DisplayTemplateDT');
const standaloneDTs = findNamedExports(src('content-types', 'displayTemplates'), 'DisplayTemplateDT');

// ── Discover components ──────────────────────────────────────────────────────

const COMPONENT_SUBDIRS = ['blocks', 'elements', 'pages', 'experiences'];
const allComponents = COMPONENT_SUBDIRS.flatMap(dir =>
  tsxFiles(src('components', dir)).map(file => ({
    name: basename(file, '.tsx'),
    importPath: `./${dir}/${basename(file, '.tsx')}`,
  }))
);

// ── 1. src/content-types/index.ts ───────────────────────────────────────────

console.log('\nsrc/content-types/index.ts');
{
  const path = src('content-types', 'index.ts');
  let text = read(path);
  let added = 0;

  for (const { name, stem } of componentCTs) {
    if (text.includes(`{ ${name} }`)) continue;
    text += `export { ${name} } from './component/${stem}';\n`;
    console.log(`  + ${name}`);
    added++;
  }
  for (const { name, stem } of pageCTs) {
    if (text.includes(`{ ${name} }`)) continue;
    text += `export { ${name} } from './page/${stem}';\n`;
    console.log(`  + ${name}`);
    added++;
  }
  for (const { name, stem } of experienceCTs) {
    if (text.includes(`{ ${name} }`)) continue;
    text += `export { ${name} } from './experience/${stem}';\n`;
    console.log(`  + ${name}`);
    added++;
  }

  if (added > 0) write(path, text);
  else console.log('  (nothing to add)');
}

// ── 2. src/content-types/displayTemplates/index.ts ──────────────────────────

console.log('\nsrc/content-types/displayTemplates/index.ts');
{
  const path = src('content-types', 'displayTemplates', 'index.ts');
  let text = read(path);
  let added = 0;

  for (const { name, stem } of componentDTs) {
    if (text.includes(`{ ${name} }`)) continue;
    text += `export { ${name} } from '../component/${stem}';\n`;
    console.log(`  + ${name}  (from component/${stem})`);
    added++;
  }
  for (const { name, stem } of standaloneDTs) {
    if (text.includes(`{ ${name} }`)) continue;
    text += `export { ${name} } from './${stem}';\n`;
    console.log(`  + ${name}  (from ./${stem})`);
    added++;
  }

  if (added > 0) write(path, text);
  else console.log('  (nothing to add)');
}

// ── 3. src/components/index.ts ──────────────────────────────────────────────

console.log('\nsrc/components/index.ts');
{
  const path = src('components', 'index.ts');
  let text = read(path);
  let added = 0;

  for (const { name, importPath } of allComponents) {
    if (text.includes(`as ${name}`)) continue;
    text += `export { default as ${name} } from '${importPath}';\n`;
    console.log(`  + ${name}`);
    added++;
  }

  if (added > 0) write(path, text);
  else console.log('  (nothing to add)');
}

// ── 4. src/optimizely.ts resolver ───────────────────────────────────────────

console.log('\nsrc/optimizely.ts (resolver)');
{
  const path = src('optimizely.ts');
  let text = read(path);
  let added = 0;

  // Only register components that have a corresponding CT defined in code.
  // Components like BlankExperience/BlankSection use SDK-provided types and
  // are registered manually — don't touch them here.
  const ctStems = new Set([...componentCTs, ...pageCTs, ...experienceCTs].map(ct => ct.stem));

  let insertions = '';
  for (const { name } of allComponents) {
    // Already present (active or commented out) — skip
    if (text.includes(`${name}:`)) continue;
    // No matching CT file — skip
    if (!ctStems.has(name)) continue;
    insertions += `    ${name}: components.${name},\n`;
    console.log(`  + ${name}`);
    added++;
  }

  if (added > 0) {
    const CLOSE = '\n  },\n});';
    const pos = text.lastIndexOf(CLOSE);
    if (pos === -1) {
      console.error('  ERROR: cannot locate resolver closing brace — edit src/optimizely.ts manually');
    } else {
      text = text.slice(0, pos) + '\n' + insertions + '  },\n});';
      write(path, text);
    }
  } else {
    console.log('  (nothing to add)');
  }
}

console.log('\nDone.\n');
