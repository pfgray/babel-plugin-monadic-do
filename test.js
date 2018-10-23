const babel = require('@babel/core');
const plugin = require('./src/index.js');

const source = `
const wut = do {
  foo << getFoo()
  bar << getBar
  const lol = bar.name
  foo << getFoo()
  baz << getBaz
  1;
};
`;




const {code} = babel.transform(source, {plugins: [plugin]});
console.log('source: ');
console.log(source);
console.log('result: ');
console.log(code);
