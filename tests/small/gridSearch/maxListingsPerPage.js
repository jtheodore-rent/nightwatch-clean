const listSearchPath = '/apartments/California/San-Francisco/'

module.exports = {
  tags: ['critical', 'stableAndroid', 'stableIOS', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${listSearchPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Verify 50th listing is present': browser => {
    browser.page.small.gridSearch().section.fiftiethStandardListing.expect.element('@name')
      .to.be.visible.before(1000)
  },

  'Verify 51st listing is not present': browser => {
    browser.page.small.gridSearch().section.fiftyfirstStandardListing.expect.element('@name')
      .to.not.be.present.after(0)
  },
}
