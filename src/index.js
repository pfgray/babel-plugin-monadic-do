const types = require("@babel/types");
const syntaxDoExpressions = require("@babel/plugin-syntax-do-expressions");

module.exports = function({types: t}){
  return {
    inherits: syntaxDoExpressions.default,
    visitor: {
      DoExpression: function(path) {
        // find the expressions that are '<<'
        const binds = path.node.body.body.filter(e => {
          return e.expression && e.expression.operator === '<<'; //true //e.expression
        });

        // todo: fail if first expr is not bind expr
        path.replaceWith((formatChain(t, binds.length, path.node.body.body))[0]);
      }
    }
  };
}

function formatChain(t, bindsLeft, oldBody) {
  const [currExpr, ...restExpr] = oldBody;
  if(isBind(currExpr)) {
    const memberFunc = bindsLeft === 0 ? "map" : "chain";
    const {left, right} = currExpr.expression;
    return [t.returnStatement(t.callExpression(t.memberExpression(right, t.identifier(memberFunc)), [
      t.arrowFunctionExpression([left], t.blockStatement(formatChain(t, bindsLeft - 1, restExpr)))
    ]))]
  } else if(restExpr.length !== 0) {
    return [currExpr, ...formatChain(t, bindsLeft, restExpr)];
  } else {
    // todo: what happens if last statement is not an expression?
    return [t.returnStatement(currExpr.expression)];
  }
}

function isBind(expr) {
  return expr.expression && expr.expression.operator === '<<';
}
