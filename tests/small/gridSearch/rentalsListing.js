const startingListPath = '/apartments/Texas/San-Antonio/?page=10'

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

  'Load More Listings until Rentals Listing found': browser => {
    browser.page.small.gridSearch().loadMoreListingsUntilListingFromSourceFound(browser, 'RENTALS')
  },

  'Open first Rentals Listing and submit lead': browser => {
    browser.page.small.gridSearch().openAndContactFirstListingFromSource(browser, 'RENTALS')
  },

  'Close Success Modal': browser => {
    browser.page.small.leadSuccessModal().click('@closeButton')
      .waitForElementNotPresent('@heading', () => {
        browser.page.small.propertyCard().expect.element('@propertyName').to.be.visible.before(3000)
      })
  },
}
