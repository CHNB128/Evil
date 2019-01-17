const type = require('./type')

function _readList(reader, startToken, endToken) {
  let ast = []
  let token = reader.next()
  if (token.type !== startToken) {
    throw new Error("expected '" + startToken + "'")
  }
  while ((token = reader.peek()).type !== endToken) {
    if (!token) {
      throw new Error("expected '" + endToken + "', got EOF")
    }
    ast.push(parseForm(reader))
  }
  reader.next()
  return ast
}

function list(reader) {
  const ast = _readList(reader, 'left parentheses', 'right parentheses')
  return ast
  // return {
  //   type: 'list',
  //   value: ast
  // }
}
function vector(reader) {
  const ast = _readList(reader, 'left brackets', 'right brackets')
  return {
    type: 'vector',
    value: ast
  }
}
function hashMap(reader) {
  const ast = _readList(reader, 'left braces', 'right braces')
  if (ast.length % 2 != 0) {
    throw new Error('Odd number of hash map arguments')
  }
  for (let index = 0; index < ast.length; index++) {
    const element = ast[index]
    if (index % 2 == 0 && !['string', 'keyword'].includes(element.type)) {
      throw new Error(
        `Expected string or keyword as hash-map key argument, got
        ${element.type}`
      )
    }
  }
  return {
    type: 'hash-map',
    value: ast
  }
}

function atom(reader) {
  const token = reader.next()
  return {
    type: token.type,
    value: token.value
  }
}

function parseForm(reader) {
  let token = reader.peek()
  switch (token.type) {
    // reader macros/transforms
    case 'quote':
      return atom(reader)
    case 'quasiquote':
      return atom(reader)
    case 'unquote':
      return atom(reader)
    case 'splice unquote':
      return atom(reader)
    case 'deref':
      return atom(reader)

    case 'with-meta':
      reader.next()
      var meta = parseForm(reader)
      return { type: 'with-meta', value: parseForm(reader), meta }

    // list
    case 'right parentheses':
      throw new Error(`unexpected ')' on ${token.line}:${token.col}`)
    case 'left parentheses':
      return list(reader)

    // vector
    case 'right brackets':
      throw new Error(`unexpected ']' on ${token.line}:${token.col}`)
    case 'left brackets':
      return vector(reader)

    // hash-map
    case 'right braces':
      throw new Error(`unexpected '}' on ${token.line}:${token.col}`)
    case 'left braces':
      return hashMap(reader)

    // atom
    default:
      return atom(reader)
  }
}

module.exports = parseForm
