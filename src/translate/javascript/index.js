function translateToJS(asg) {
  let jsSample = ''
  asg.forEach(element => {
    switch (element.action) {
      case 'definition':
        jsSample += define(element) + '\n'
        break
      case 'function call':
        jsSample += functionCall(element) + '\n'
        break
      default:
        break
    }
  })
  return jsSample
}

let functionAlias = {
  print: 'console.log'
}

function define(element) {
  let value = atom({ type: element.type, value: element.value })
  return `const ${element.name} = ${value}`
}

function vector(element) {
  let nodes = element.value.map(e => atom(e))
  return `[${nodes}]`
}

function print(element) {
  let message = element[1].value
  return `console.log(${message})`
}

function hashMap(element) {
  let body = []
  let args = element.value
  for (let index = 0; index < args.length; index++) {
    const key = args[index].value
    const value = atom(args[++index])
    body.push(`${key}: ${value}`)
  }
  body.join(', ')
  return `{${body}}`
}

function functionCall(element) {
  let functionArguments = element.arguments.map(e => atom(e))
  if (functionArguments.length > 1) {
    functionArguments.join(', ')
  } else {
    functionArguments = functionArguments[0]
  }
  let name = functionAlias[element.name]
  return `${name}(${functionArguments})`
}

function atom(element) {
  switch (element.type) {
    case 'list':
      return null //list(element)
    case 'vector':
      return vector(element)
    case 'hash-map':
      return hashMap(element)
    case 'string':
      return `'${element.value}'`
    case 'identifier':
      return element.value
    default:
      return element.value
  }
}

module.exports = translateToJS
