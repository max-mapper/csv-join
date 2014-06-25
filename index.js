var through = require('through2')
var csvParser = require('csv-parser')
var concat = require('concat-stream')

module.exports = function(a, b, opts) {
  var column = opts.column
  var rows = {}
  
  var joiner = through.obj(function(ch, enc, next) {
    var val = ch[opts.secondColumn]
    var foreign = rows[val]
    if (!foreign) {
      joiner.push(ch)
      next()
      return
    }
    var keys = Object.keys(foreign)
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      var y = 0
      while (ch[key]) {
        // this line looks like ascii art :)
        key = keys[i] + '-' + ++y
      }
      ch[key] = foreign[keys[i]]
    }
    joiner.push(ch)
    next()
  })
  
  a.pipe(csvParser()).pipe(concat(function(data) {
    for (var i = 0; i < data.length; i++)
      rows[data[i][opts.firstColumn]] = data[i]
    b.pipe(csvParser()).pipe(joiner)
  }))
  
  return joiner
}
