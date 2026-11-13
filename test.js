// Public test runner: node test.js
// Requires ./index.js and checks the 9 public cases from
// github.com/AIProveRH/aiprove/challenges/code-golf-expr/cases.json
// plus extra edge cases (unary minus, whitespace, .5, 1e2, ...).
const { evalExpr } = require('./index.js');
const cases = require('./cases.json');
let ok = 0;
for (const c of cases) {
  let got, err = null;
  try { got = evalExpr(c.in); } catch (e) { err = e; }
  const pass = !err && (Object.is(got, c.out) || got === c.out);
  if (pass) ok++; else console.log('FAIL', JSON.stringify(c.in), 'got', err ? 'THROW ' + err.message : got, 'want', c.out);
}
console.log(`public: ${ok}/${cases.length}`);
const edge = [
  ['-5+3', -2], ['2*-3', -6], [' 1 + 2 ', 3], ['.5+1', 1.5], ['5.', 5],
  ['1e2', 100], ['0.1+0.2', 0.30000000000000004], ['((2))', 2], ['10/3', 10 / 3],
  ['1-2-3', -4], ['(1)', 1], ['0', 0], ['3.14159*2', 6.28318],
  ['2 - -3', 5], ['- 5', -5], ['(2+3)*(4-1)/2', 7.5], ['1/3*3', 1],
  ['2.5*4', 10], ['100/10/2', 5],
];
let eok = 0;
for (const [s, w] of edge) {
  let g, err = null;
  try { g = evalExpr(s); } catch (e) { err = e; }
  if (!err && g === w) eok++; else console.log('EDGE', JSON.stringify(s), 'got', err ? 'THROW ' + err.message : g, 'want', w);
}
console.log(`edge: ${eok}/${edge.length}`);
process.exit(ok === cases.length && eok === edge.length ? 0 : 1);
