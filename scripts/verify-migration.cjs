// Run against the local pre-migration snapshot, when available.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const baseline = 'output/migration-baseline/';
if (!fs.existsSync(baseline + 'hashes.json')) {
  console.log('Local migration snapshot unavailable; use npm test for portable regression checks.');
  process.exit(0);
}
const changed = new Set(['src/constants/questions.ts','src/constants/localization.ts','src/app/assessment.tsx','src/app/results.tsx','src/app/assessment-detail.tsx','package.json','scripts/verify-screening.cjs']);
let checked = 0;
for (const [file, hash] of Object.entries(JSON.parse(fs.readFileSync(baseline+'hashes.json')))) {
  if (changed.has(file)) continue;
  const actual = crypto.createHash('sha256').update(fs.readFileSync('apps/mobile/'+file)).digest('hex');
  assert.equal(actual, hash, file+' preserved byte-for-byte'); checked++;
}
const old = JSON.parse(fs.readFileSync(baseline+'package.json'));
const mobile = JSON.parse(fs.readFileSync('apps/mobile/package.json'));
for (const [name, version] of Object.entries(old.dependencies)) assert.equal(mobile.dependencies[name], version);
console.log(`PASS: ${checked} mobile files/assets/configs byte-identical; all original dependency ranges retained.`);
