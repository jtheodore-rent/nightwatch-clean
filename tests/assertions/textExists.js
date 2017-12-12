exports.assertion = function(pageObjectElement) {
  this.message = 'Testing if the element text exists.'
  this.expected = /\w+/
  this.pass = value => value.match(this.expected)
  this.value = result => result.value

  this.command = callback => {
    const api = this.api
    api.element(pageObjectElement.locateStrategy, pageObjectElement.selector, elementInfo => {
      const elementId = elementInfo.value.ELEMENT
      api.elementIdText(elementId, callback)
    })
    return this
  }
}
