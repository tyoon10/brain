import { loadCollection, listEntryFiles } from '../lib/load.mjs';
import { collectionSchemas } from '../lib/schemas.mjs';

const folders = Object.keys(collectionSchemas);
let failed = 0;

for (const folder of folders) {
  const files = listEntryFiles(folder);
  if (files.length === 0) {
    console.log(`ok  ${folder} (empty — allowed)`);
    continue;
  }
  try {
    const records = loadCollection(folder);
    for (const record of records) {
      console.log(`ok   data/${folder} ${record.title || record.name || record.id}`);
    }
  } catch (error) {
    failed += 1;
    console.error(`fail ${folder}`);
    console.error(`     ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failed > 0) {
  console.error(`\n${failed} collection(s) failed Zod validation.`);
  process.exit(1);
}

console.log('\nAll public data files passed.');
