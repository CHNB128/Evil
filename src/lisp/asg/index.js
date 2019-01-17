const ASTparser = require('../ast/index')
const lispParse = require('../index')
// TODO: separate into global
const sourceFolder = './src/evil'

/**
  @Definition
    Abstract Semantic Graph Parser
  @Description
    Same as AST by with context as type variable or function call
 */

function namespace(name, data) {
  let _data = {
    action: 'define namespace',
    name: name,
    require: []
  }
  for (let index = 0; index < data.length; index++) {
    const element = data[index]
    if (element.value == 'require') {
      let requiredNameSpace = data[++index].value
      requiredNameSpace.map(namespace => {
        _data.require.push(namespace.value)
        // TODO: see line 3 of current file
        // _data.require.push({
        //   name: namespace.value,
        //   value: `${sourceFolder}/${namespace.value}.clj`
        // })
      })
    }
  }
  return _data
}

function define(ast) {
  let value
  if (ast[2].length != null) {
    value = parser(ast[2])
  } else {
    value = ast[2].value
  }
  if (ast[1].type == 'with-meta') {
    let metaToken = ast[1]
    let metaData = {}
    for (let index = 0; index < metaToken.meta.value.length; index++) {
      const key = metaToken.meta.value[index].value
      const value = metaToken.meta.value[++index].value
      metaData[key] = value
    }
    return {
      action: 'definition',
      name: metaToken.value.value,
      meta: metaData,
      type: ast[2].type,
      value
    }
  } else {
    return {
      action: 'definition',
      name: ast[1].value,
      type: ast[2].type,
      value
    }
  }
}

function functionCall(name, args) {
  let _args = args
  for (let index = 0; index < _args.length; index++) {
    const element = _args[index]
    if (element.length != null) {
      _args[index] = parser(element)
    }
  }
  return {
    action: 'function call',
    name: name,
    arguments: _args
  }
}

function parser(ast) {
  switch (ast[0].value) {
    case 'namespace':
      return namespace(ast[1].value, ast[2])
    case 'define':
      return define(ast)
    case 'lambda':
      return {
        action: 'anonimus function',
        arguments: ast[1].value,
        body: parser(ast[2])
      }
    default:
      return functionCall(ast[0].value, ast.slice(1))
  }
}

function ASGparser(ast) {
  let asg = ast.slice()
  for (let index = 0; index < asg.length; index++) {
    const element = asg[index]
    asg[index] = parser(element)
  }
  console.log({ ast })
  console.log({ asg })
  return asg
}

module.exports = ASGparser
