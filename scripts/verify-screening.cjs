// Regression checks against the app's actual scoring expressions and storage service.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function moduleFrom(file, requireMock = require) {
  const exports = {};
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  vm.runInNewContext(js, { exports, require: requireMock, console });
  return exports;
}
const { questions } = moduleFrom('packages/epds-core/tests/original-questions.txt');
assert.equal(questions.length, 10);
assert.deepEqual(Array.from(questions, q => q.id), [1,2,3,4,5,6,7,8,9,10]);
assert.deepEqual(Array.from(questions, q => q.reverseScore), [true,true,false,true,false,false,false,false,false,false]);
questions.forEach(q => assert.equal(q.options.length, 4));
const file = ts.createSourceFile('results.tsx', fs.readFileSync('packages/epds-core/tests/original-results.txt','utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const expressions = {};
function visit(node) {
  if (ts.isVariableDeclaration(node) && ['totalScore','riskLevel','showSafetyAlert'].includes(node.name.getText(file))) expressions[node.name.getText(file)] = node.initializer.getText(file);
  ts.forEachChild(node, visit);
}
visit(file);
const evaluate = new Function('answers','questions', `${Object.entries(expressions).map(([name,expression])=>`const ${name} = ${expression};`).join('\n')} return { totalScore, riskLevel, showSafetyAlert };`);
const zero = Array.from(questions, q => q.reverseScore ? 0 : 3);
for (let total = 0; total <= 30; total++) {
  let remaining = total;
  const answers = Array.from(questions, q => { const score = Math.min(remaining,3); remaining -= score; return q.reverseScore ? score : 3-score; });
  const result = evaluate(answers, questions);
  assert.equal(result.totalScore, total);
  assert.equal(result.riskLevel, total <= 9 ? 'Low Risk' : total <= 12 ? 'Moderate Risk' : 'High Risk');
}
for (let question = 0; question < 10; question++) {
  for (let answer = 0; answer < 4; answer++) {
    const answers = [...zero]; answers[question] = answer;
    const result = evaluate(answers, questions);
    assert.equal(result.totalScore, questions[question].reverseScore ? answer : 3-answer);
    assert.equal(result.showSafetyAlert, question === 9 && answer < 3);
  }
}
assert.equal(evaluate(null, questions).showSafetyAlert, false);
const safetyOnly = [...zero]; safetyOnly[9] = 2;
assert.deepEqual(evaluate(safetyOnly, questions), { totalScore: 1, riskLevel: 'Low Risk', showSafetyAlert: true });
(async () => {
  const data = new Map();
  const storage = { getItem: async k => data.get(k) ?? null, setItem: async (k,v) => data.set(k,v), removeItem: async k => data.delete(k) };
  const service = moduleFrom('apps/mobile/src/services/storageService.ts', name => name.includes('async-storage') ? { __esModule: true, default: storage } : { STORAGE_KEYS: { HISTORY: 'EPDS_HISTORY' } });
  const legacy = { id:'legacy', createdAt:'2026-01-01T00:00:00Z', score:0, riskLevel:'Low Risk', answers:zero };
  data.set('EPDS_HISTORY', JSON.stringify([legacy]));
  assert.equal((await service.getAssessmentHistory())[0].id,'legacy');
  const entry = { id:'new', createdAt:'2026-09-29T00:00:00Z', score:1, riskLevel:'Low Risk', safetyAlert:true, answers:safetyOnly };
  assert.equal(await service.saveAssessment(entry),true);
  assert.equal(await service.saveAssessment(entry),true);
  assert.equal((await service.getAssessmentHistory()).length,2);
  assert.equal((await service.getAssessmentHistory())[0].safetyAlert,true);
  assert.equal(await service.deleteAssessment('new'),true);
  assert.equal((await service.getAssessmentHistory())[0].id,'legacy');
  assert.equal(await service.clearAssessmentHistory(),true);
  assert.equal((await service.getAssessmentHistory()).length,0);
  console.log('PASS: 31 score totals/risk boundaries, all 40 answer contributions, independent safety handling, legacy storage, deduplication, deletion, and clear history.');
})().catch(error => { console.error(error); process.exitCode=1; });
