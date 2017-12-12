module.exports = {
  before: browser => {
    browser
      .url(`${browser.launchUrl}/map/?city=Atlanta&state=Georgia`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.end()
  },

  'Dump Listings': browser => {
    browser.elements('css selector', "[data-test-id='listingResult']", result => {
      // NOTE: for...of is not supported by default in Chrome!
      result.value.forEach(elementInfo => {
        browser.elementIdText(elementInfo.ELEMENT, textResult => {
          console.log(textResult.value) // eslint-disable-line no-console
        })
      })
    })
  },
}
