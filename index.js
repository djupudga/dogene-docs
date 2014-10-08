#!/usr/bin/env node

var fs = require('fs')
var _ = require('underscore')
var argv = require('optimist')
  .usage('Usage: $0 -f <JSON> -c <config>')



function checkErrorThen(next) {
  return function(error) {
    if (error) {
      throw error
    }
    next.apply(this, Array.prototype.slice.call(arguments, 1))
  }
}

function readJSON(cb) {
  var input = ''
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', function(buffer) {
    input += buffer.toString()
  })
  process.stdin.on('end', function() {
    // generate docs
    cb(null, input)
  })
  process.stdin.on('error', function(error) {
    cb(error, input)
  })
}

function buildDocs(json) {
  var tree = JSON.parse(json)
  var template = _.template(fs.readFileSync('template.html').toString())
  console.log(template({tree: tree}))
}

readJSON(
  checkErrorThen(buildDocs)
)