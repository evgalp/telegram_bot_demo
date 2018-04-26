function debug (obj = {}) {
    return JSON.stringify(obj, null, 4)
}

function helloWorld () {
  return "helloWorld from helpers.js";
}

module.exports = {debug, helloWorld};
