var get = require('lodash/get')
var every = require('lodash/every')
var first = require('lodash/head')
var uniq = require('lodash/uniq')
var map = require('lodash/fp/map')
var flow = require('lodash/fp/flow')
var microdataNode = require('microdata-node')
var reduce = require('lodash/reduce')

function getMicrodata(browser) {
  return new Promise((resolve, reject) => {
    try {
      browser.source(result => {
        var micro = microdataNode.toJson(result.value, { base: browser.launchUrl })
        resolve(micro)
      })
    } catch (e) {
      reject(e)
    }
  })
}

const shortenedProperties = properties => reduce(
  properties,
  (acc, v, k) => {
    const key = k.replace('https://schema.org/', '')
    acc[key] = v
    return acc
  },
  {},
)

// This assertion can be used to test structured data within the page
//
// TODO:
//  * Support doubly-nested properties (not just singly nested ones)
//  * Check types, not just presence
//  * Check actual values of schema data
exports.assertion = function(itemType, propList) {
  this.message = 'Testing presence of desired items in schema.'
  this.expected = propList
  this.pass = value => value
  this.value = value => value
  var _assertion = this

  this.command = callback => {
    getMicrodata(this.api).then(microdata => {
      var fullSchemaItem = null
      var topLevelItemprops = flow(map(first), uniq)(propList)

      // find item with all the top-level properties given
      for (var i = 0; i < microdata.items.length; i++) {
        var item = microdata.items[i]
        item.properties = shortenedProperties(item.properties)
        if (every(topLevelItemprops, p => (
          item.properties.hasOwnProperty(p)
        ))) {
          if (item.type[0].match(new RegExp(`${itemType}$`))) {
            fullSchemaItem = i
            break
          }
        }
      }

      // return false if no such item found
      if (fullSchemaItem === null) {
        _assertion.message = 'Looking for item with given top-level properties.'
        _assertion.expected = `Item with [${topLevelItemprops.join(',')}]`
        callback(false)
      }

      // search for each low-level property in item
      for (var i = 0; i < propList.length; i++) {
        var prop = propList[i]

        // check if property is nested in another property or by itself
        if (prop.length > 1) {
          var propPath = `items[${fullSchemaItem}].properties.` +
            `${prop[0]}[0].properties.${prop[1]}[0]`

          // return false if nested property not found in item
          if (get(microdata, propPath, null) === null) {
            _assertion.message = 'Looking for path'
            _assertion.expected = propPath
            callback(false)
          }
        } else {
          var propPath = `items[${fullSchemaItem}].properties.${prop[0]}[0]`
          var altPropPath = ['items', `${fullSchemaItem}`, 'properties',
            `https://schema.org/${prop[0]}`, '0']

          // return false if property not found in item
          if (get(microdata, propPath, null) === null) {
            if (get(microdata, altPropPath, null) === null) {
              _assertion.message = 'Looking for path'
              _assertion.expected = propPath
              callback(false)
            }
          }
        }
      }

      callback(true)
    })

    return this
  }
}
