
const pJson = require('./package.json')
const banner = `
/**
* ${pJson.name} V${pJson.version}
* (c) 2018-${new Date().getFullYear()}
* Copyright all contributors
* @license Released under ${pJson.license} license.
*/`
const footer = ``
exports.banner = banner
exports.footer = footer
exports.name = pJson.name
module.exports