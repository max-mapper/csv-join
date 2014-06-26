#!/usr/bin/env node

var join = require('./')
var fs = require('fs')
var csvWriter = require('csv-write-stream')
var request = require('request')
var args = require('minimist')(process.argv.slice(2))

run()

function run() {
  if (args._.length < 3) return console.error('Usage: csv-join <source.csv> <source-column> <target.csv> <target-column>')
  if (!args.firstColumn) args.firstColumn = args._[1]
  if (!args.secondColumn) args.secondColumn = args._[3]
  var first = args._[0]
  var second = args._[2]
  var joiner = join(getStream(first), getStream(second), args)
  joiner.pipe(csvWriter()).pipe(process.stdout)
}

function getStream(uri) {
  if (uri.match(/^http\:\/\//)) return request(uri)
  else return fs.createReadStream(uri)
}
