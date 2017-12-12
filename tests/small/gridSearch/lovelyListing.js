const startingListPath = '/apartments/California/San-Francisco/?page=3'

module.exports = {
  tags: ['critical', 'stableAndroid', 'quarantineIOS', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${startingListPath}`)
      .waitForElementVisible('#react-view')
      .page.small.gridSearch().section.firstStandardListing.waitForElementVisible('@name')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Load More Listings until Lovely Listing found': browser => {
    browser.page.small.gridSearch().loadMoreListingsUntilListingFromSourceFound(browser, 'LOVELY')
  },

  'Open first Lovely Listing and submit lead': browser => {
    browser.page.small.gridSearch().openAndContactFirstListingFromSource(browser, 'LOVELY')
  },

  'Close Success Modal': browser => {
    browser.page.small.leadSuccessModal().click('@closeButton')
      .waitForElementNotPresent('@heading', () => {
        browser.page.small.propertyCard().expect.element('@propertyName').to.be.visible.before(3000)
      })
  },
}
