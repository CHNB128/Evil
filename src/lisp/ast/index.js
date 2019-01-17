const parseForm = require('./form')

/**
  @Definition
    Abstract Syntax Tree Parser
  @Description
    Tree of tokens
 */

function ASTparser(reader) {
  let ast = []
  while (reader.peek() != undefined) {
    let token
    token = parseForm(reader)
    ast.push(token)
  }
  return ast
}

module.exports = ASTparser
