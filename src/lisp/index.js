const Reader = require('../utils/reader')
const lexer = require('./lexer/index')
const ASTparser = require('./ast/index')
const ASGparser = require('./asg/index')

module.exports = function(source) {
  let tokens, reader, ast, asg
  lexer.reset(source)
  tokens = Array.from(lexer)
  tokens = tokens.filter(e => {
    let ignoreTokens = ['comment', 'space', 'new line']
    return ignoreTokens.indexOf(e.type) == -1
  })
  reader = new Reader(tokens)
  ast = ASTparser(reader)
  asg = ASGparser(ast)
  return asg
}
