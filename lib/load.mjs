import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { collectionSchemas } from './schemas.mjs';

const root = join(import.meta.dirname, '..');

const skipEntryNames = new Set(['README.md', 'SOURCES.md', '.gitkeep']);

export function listEntryFiles(folder) {
  const dir = join(root, 'data', folder);
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (skipEntryNames.has(entry.name)) return [];
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return listEntryFiles(join(folder, entry.name));
    if (!/\.(yml|yaml|md|json)$/.test(entry.name)) return [];
    return [path];
  });
}

export function parseEntryFile(path) {
  const raw = readFileSync(path, 'utf8');
  const ext = extname(path).toLowerCase();
  if (ext === '.json') return JSON.parse(raw);
  if (ext === '.md') {
    const match = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!match) throw new Error(`${path}: markdown needs YAML frontmatter`);
    return parseYaml(match[1]);
  }
  return parseYaml(raw);
}

export function loadCollection(folder) {
  const schema = collectionSchemas[folder];
  if (!schema) throw new Error(`Unknown collection: ${folder}`);
  const files = listEntryFiles(folder);
  return files.map((file) => {
    const parsed = parseEntryFile(file);
    const result = schema.safeParse(parsed);
    if (!result.success) {
      const details = result.error.issues
        .map((issue) => `${issue.path.join('.') || 'root'}: ${issue.message}`)
        .join('; ');
      throw new Error(`${file}: ${details}`);
    }
    return { ...result.data, _file: file };
  });
}
