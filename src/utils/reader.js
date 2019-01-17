/**
  @Name
    Reader
  @Description
    Use to comfortable read array of tokens or somethin else :)
*/

function Reader(tokens) {
  // copy array
  this.tokens = tokens.slice()
  this.position = 0
}
Reader.prototype.next = function() {
  return this.tokens[this.position++]
}
Reader.prototype.peek = function() {
  return this.tokens[this.position]
}

module.exports = Reader
