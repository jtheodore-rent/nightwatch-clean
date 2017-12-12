exports.assertion = function(pageObjectLinks, regex) {
  this.message = `Testing if the link href matches ${regex}.`
  this.expected = regex
  this.pass = value => value.match(this.expected)
  this.value = result => result.value

  this.command = callback => {
    const api = this.api
    api.elements(pageObjectLinks.locateStrategy, pageObjectLinks.selector, links => {
      links.value.forEach(linkObject => {
        api.elementIdAttribute(linkObject.ELEMENT, 'href', hrefResult => callback(hrefResult))
      })
    })
    return this
  }
}
