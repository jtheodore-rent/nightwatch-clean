const hoodPath = '/apartments/California/Los-Angeles/'

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
      .url(`${browser.launchUrl}${hoodPath}`)
      .waitForElementVisible('#react-view')
      .page.small.gridSearch().section.firstStandardListing.waitForElementVisible('@name')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'validate first link in list': browser => {
    browser.page.small.gridSearch().validateLinkInAccordion(browser, {
      section: 'propertyTypes',
      linkName: '@firstPropertyTypesLink',
    })
  },
}
