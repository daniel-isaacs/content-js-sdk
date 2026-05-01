#!/usr/bin/env node
/**
 * scripts/scaffold-component.mjs
 *
 * Generates a React component shell for content types that don't already
 * have a matching component file. The shell imports the content type, types
 * the props, and renders the content type name and each property.
 *
 * Usage:
 *   node scripts/scaffold-component.mjs             # scaffold all missing
 *   node scripts/scaffold-component.mjs MyBlock     # scaffold a specific type
 *
 * After running, execute `npm run sync` to register the new components.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = (...parts) => join(ROOT, 'src', ...parts);

function read(path) { return readFileSync(path, 'utf-8').replace(/\r\n/g, '\n'); }
function write(path, content) { writeFileSync(path, content, 'utf-8'); }
function tsFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter(f => f.endsWith('.ts') && !f.endsWith('.d.ts'));
}
function tsxFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter(f => f.endsWith('.tsx'));
}

// ── Parse a content type file ────────────────────────────────────────────────

function parseCT(text, stem) {
  const ctMatch = text.match(/export\s+const\s+(\w+CT)\s*=/);
  if (!ctMatch) return null;

  const dtMatch = text.match(/export\s+const\s+(\w+DisplayTemplateDT)\s*=/);

  // Extract the properties: { ... } block using a brace-depth scan
  const propertiesStart = text.match(/\bproperties\s*:\s*\{/);
  const props = [];
  if (propertiesStart) {
    const startIdx = propertiesStart.index + propertiesStart[0].length;
    let depth = 1, i = startIdx;
    while (i < text.length && depth > 0) {
      if (text[i] === '{') depth++;
      else if (text[i] === '}') depth--;
      i++;
    }
    const block = text.slice(startIdx, i - 1);

    // Match each property: name: { ...body... }
    // [^}]* matches anything except }, (?:\[[^\]]*\][^}]*)* handles [] arrays inside the body
    const propRe = /(\w+)\s*:\s*\{([^}]*(?:\[[^\]]*\][^}]*)*)\}/g;
    let m;
    while ((m = propRe.exec(block)) !== null) {
      const body = m[2];
      const typeM        = body.match(/\btype\s*:\s*['"](\w+)['"]/);
      const displayNameM = body.match(/\bdisplayName\s*:\s*['"]([^'"]+)['"]/);
      const allowedM     = body.match(/\ballowedTypes\s*:\s*\[([^\]]*)\]/);
      props.push({
        name:        m[1],
        type:        typeM?.[1] ?? 'string',
        displayName: displayNameM?.[1] ?? m[1],
        isImage:     (allowedM?.[1] ?? '').includes('_image'),
      });
    }
  }

  return {
    ctExport: ctMatch[1],
    dtExport: dtMatch?.[1] ?? null,
    stem,
    props,
  };
}

// ── Determine component output directory from name convention ────────────────

function getSubdir(name) {
  if (/Element$/.test(name))             return 'elements';
  if (/(Experience|Section)$/.test(name)) return 'experiences';
  if (/Page$/.test(name))                return 'pages';
  return 'blocks';
}

// ── Generate JSX for a single property ──────────────────────────────────────

function propLine(prop) {
  const { name, type, isImage } = prop;
  const label = `<span className="font-medium">${name}:</span>`;

  switch (type) {
    case 'richText':
      return [
        `        {/* TODO: <RichText content={content.${name}?.json} /> */}`,
        `        <li {...pa('${name}')}>${label} <span className="text-muted-foreground">[richText]</span></li>`,
      ].join('\n');

    case 'contentReference':
      if (isImage) {
        return [
          `        {/* TODO: <Image src={src(content.${name})!} alt="..." fill /> */}`,
          `        <li {...pa('${name}')}>${label} <span className="text-muted-foreground">[image]</span></li>`,
        ].join('\n');
      }
      return `        <li {...pa('${name}')}>${label} <span className="text-muted-foreground">[contentReference]</span></li>`;

    case 'url':
      return `        <li {...pa('${name}')}>${label} {content.${name}?.default}</li>`;

    case 'boolean':
      return `        <li {...pa('${name}')}>${label} {String(content.${name} ?? '')}</li>`;

    default:
      return `        <li {...pa('${name}')}>${label} {content.${name}}</li>`;
  }
}

// ── Build the component source ───────────────────────────────────────────────

function generateComponent(name, ct, ctGroup) {
  const importPath = `@/content-types/${ctGroup}/${ct.stem}`;
  const hasDT = !!ct.dtExport;
  const params = hasDT ? `{ content, displaySettings }: Props` : `{ content }: Props`;

  const lines = [
    `import { ContentProps } from '@optimizely/cms-sdk';`,
    `import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';`,
    `import { ${ct.ctExport} } from '${importPath}';`,
  ];
  if (hasDT) {
    lines.push(`import { ${ct.dtExport} } from '${importPath}';`);
  }
  lines.push('');
  lines.push('type Props = {');
  lines.push(`  content: ContentProps<typeof ${ct.ctExport}>;`);
  if (hasDT) {
    lines.push(`  displaySettings?: ContentProps<typeof ${ct.dtExport}>;`);
  }
  lines.push('};');
  lines.push('');
  lines.push(`export default function ${name}(${params}) {`);
  lines.push(`  const { pa } = getPreviewUtils(content);`);
  lines.push('');
  lines.push('  return (');
  lines.push('    <div className="p-4 border border-dashed border-border rounded text-sm">');
  lines.push(`      <p className="font-mono text-xs text-muted-foreground mb-2">${name}</p>`);

  if (ct.props.length > 0) {
    lines.push('      <ul className="space-y-1">');
    for (const prop of ct.props) {
      lines.push(propLine(prop));
    }
    lines.push('      </ul>');
  }

  lines.push('    </div>');
  lines.push('  );');
  lines.push('}');
  lines.push('');

  return lines.join('\n');
}

// ── Main ─────────────────────────────────────────────────────────────────────

const requested = new Set(process.argv.slice(2));

const GROUPS = [
  { dir: src('content-types', 'component'),  ctGroup: 'component' },
  { dir: src('content-types', 'page'),       ctGroup: 'page' },
  { dir: src('content-types', 'experience'), ctGroup: 'experience' },
];

const COMPONENT_SUBDIRS = ['blocks', 'elements', 'pages', 'experiences'];
const existing = new Set(
  COMPONENT_SUBDIRS.flatMap(dir =>
    tsxFiles(src('components', dir)).map(f => basename(f, '.tsx'))
  )
);

let created = 0;

for (const { dir, ctGroup } of GROUPS) {
  for (const file of tsFiles(dir)) {
    const stem = basename(file, '.ts');

    if (requested.size > 0 && !requested.has(stem)) continue;
    if (/^Base/.test(stem)) continue; // abstract base types — no component
    if (existing.has(stem)) {
      if (requested.has(stem)) console.log(`  skipping ${stem} — component already exists`);
      continue;
    }

    const text = read(join(dir, file));
    const ct = parseCT(text, stem);
    if (!ct) {
      console.log(`  skipping ${stem} — could not parse content type`);
      continue;
    }

    const subdir = getSubdir(stem);
    const outDir = src('components', subdir);
    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

    const outPath = join(outDir, `${stem}.tsx`);
    write(outPath, generateComponent(stem, ct, ctGroup));

    const dtNote = ct.dtExport ? ` + ${ct.dtExport}` : '';
    console.log(`  created  src/components/${subdir}/${stem}.tsx  [${ct.props.map(p => p.name).join(', ')}]${dtNote}`);
    created++;
  }
}

if (created === 0) {
  console.log('  Nothing to scaffold — all content types already have components.');
} else {
  console.log(`\n  ${created} component(s) created. Run \`npm run sync\` to register them.`);
}
