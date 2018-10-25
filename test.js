const babel = require('@babel/core');
const plugin = require('./src/index.js');

const source = `
(do {
  foo << getFoo();
  bar << getBar;

  baz << getBaz;
  ({foo, bar})
})
`;

const {code} = babel.transform(source, {plugins: [plugin]});
console.log('source: ');
console.log(source);
console.log('result: ');
console.log(code);
