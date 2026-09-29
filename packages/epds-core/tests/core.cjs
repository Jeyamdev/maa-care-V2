const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
function load(file) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  new Function('exports', 'require', code)(exports, name => load(path.resolve(path.dirname(file), name + '.ts')));
  return exports;
}
const core = load(path.resolve(__dirname, '../src/index.ts'));
const original = load(path.resolve(__dirname, 'original-questions.txt')).questions;
assert.deepEqual(core.questions, original, 'Original Tamil wording, ordering and scoring directions');
const zero = [0,0,3,0,3,3,3,3,3,3];
for (let total = 0; total <= 30; total++) {
  let remaining = total;
  const answers = original.map(q => { const contribution = Math.min(3, remaining); remaining -= contribution; return q.reverseScore ? contribution : 3-contribution; });
  const result = core.assess(answers);
  assert.equal(result.totalScore, total);
  assert.equal(result.riskLevel, total <= 9 ? 'Low Risk' : total <= 12 ? 'Moderate Risk' : 'High Risk');
}
for (let i=0; i<10; i++) for (let answer=0; answer<4; answer++) {
  const answers = [...zero]; answers[i] = answer;
  assert.equal(core.calculateTotal(answers), [0,1,3].includes(i) ? answer : 3-answer);
  assert.equal(core.hasSafetyAlert(answers), i === 9 && answer < 3);
}
for (let answer=0; answer<4; answer++) {
  const answers = [...zero]; answers[9] = answer;
  assert.equal(core.assess(answers).safetyAlert, answer < 3);
  assert.equal(core.assess(answers).riskLevel, 'Low Risk');
}
for (const answers of [null, undefined, {}, [], zero.slice(1), [...zero, 0], Array(10), [...zero.slice(1), NaN], [...zero.slice(1), '0'], [...zero.slice(1), -1], [...zero.slice(1), 4], [...zero.slice(1), 0.5]]) {
  assert.equal(core.isValidAnswers(answers), false);
  assert.throws(() => core.calculateTotal(answers));
}
for (const score of [-1, 31, NaN, 1.2]) assert.throws(() => core.classifyRisk(score));
assert.equal(core.riskLevelInTamil('Low Risk'), 'குறைந்த ஆபத்து');
assert.equal(core.hasSafetyAlert(null), false);
console.log('PASS: shared core, frozen Tamil content, 31 totals, 40 contributions, independent safety, invalid/incomplete answers.');
// Each safety option against every achievable score for the other nine questions.
for (let safety=0;safety<4;safety++) for (let subtotal=0;subtotal<=27;subtotal++) {
  let remaining=subtotal;
  const answers=zero.slice(0,9).map((_,i)=>{ const score=Math.min(remaining,3);remaining-=score;return [0,1,3].includes(i)?score:3-score; });
  answers.push(safety);
  assert.equal(core.assess(answers).safetyAlert,safety<3);
}
console.log('PASS: independent safety for all 112 combinations of safety response and achievable other-question totals.');
const fixture=ts.createSourceFile('original-results.tsx',fs.readFileSync(path.resolve(__dirname,'original-results.txt'),'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
let messageExpression;
function visit(node) {
  if(ts.isVariableDeclaration(node) && node.name.getText(fixture)==='message') messageExpression=node.initializer.getText(fixture);
  ts.forEachChild(node,visit);
}
visit(fixture);
const originalMessage=new Function('totalScore',`return ${messageExpression};`);
for(let score=0;score<=30;score++) assert.equal(core.interpretation(score),originalMessage(score));
console.log('PASS: all Tamil interpretations match the original mobile implementation.');
