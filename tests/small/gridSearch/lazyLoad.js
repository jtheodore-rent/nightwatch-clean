const listSearchPath = '/apartments/California/Los-Angeles/'

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

  'Confirm first image for first listing is visible': browser => {
    browser.page.small.gridSearch().section.firstStandardListing
      .expect.element('@image').to.be.visible.after(0)
  },

  'Confirm tenth listing image is not present': browser => {
    browser.page.small.gridSearch().section.tenthStandardListing
      .expect.element('@image').not.to.be.present.after(0)
  },

  'Confirm tenth listing image is visible after scroll': browser => {
    browser.page.small.gridSearch().section.tenthStandardListing
      .getLocationInView('@name', () => {
        browser.page.small.gridSearch().section.tenthStandardListing
          .waitForElementVisible('@image')
      })
  },
}
