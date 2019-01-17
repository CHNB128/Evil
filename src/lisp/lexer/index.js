const moo = require('moo')

let lexer = moo.compile({
  space: /[ \t]+/,
  comment: /\;.+/,
  float: /0|[1-9][0-9]*\.[0-9]*/,
  integer: /0|[1-9][0-9]*/,
  string: { match: /"(?:\\["\\]|[^\n"\\])*"/, value: s => s.slice(1, -1) },
  keyword: {
    match: /:[a-zA-Z_!?$%&#|~*+\-=\/<>^]+/,
    value: s => s.slice(1)
  },
  // reserved: ['namespace', 'define'],
  'with-meta': '^',
  identifier: /[a-zA-Z_!?$%&#|~*+\-=\/<>^]+/,
  'left parentheses': '(',
  'right parentheses': ')',
  'left brackets': '[',
  'right brackets': ']',
  'left braces': '{',
  'right braces': '}',
  quote: "'",
  quasiquote: '`',
  unquote: '~',
  'splice unquote': '~@',
  deref: '@',
  nil: 'nil',
  // identifier: /^([a-zA-Z_!?$%&#|~*+\-=\/<>^][a-zA-Z0-9_!?$%&#|~*+\-=\/<>^]*)(\.{3})?/,
  'new line': { match: /\n/, lineBreaks: true }
})

module.exports = lexer
