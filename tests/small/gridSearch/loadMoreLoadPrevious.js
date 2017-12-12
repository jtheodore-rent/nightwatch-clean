const losAngelesListPath = '/apartments/California/Los-Angeles/'

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
      .url(`${browser.launchUrl}${losAngelesListPath}`)
      .waitForElementVisible('#react-view')
      .page.small.gridSearch().section.firstStandardListing.waitForElementVisible('@name')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Verify starting state': browser => {
    browser.page.small.gridSearch().verifyNumDisplayedListingsMatchesExpectation(browser)
  },

  'Click Load More Button': browser => {
    browser.page.small.gridSearch().loadMoreResults(browser)
  },

  'Verify state after loading more': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${losAngelesListPath}?page=2`)
    browser.page.small.gridSearch().verifyNumDisplayedListingsMatchesExpectation(browser)
  },

  'Open and close property card': browser => {
    browser.page.small.gridSearch().section.firstStandardListing.getLocationInView('@name', () => {
      browser.page.small.gridSearch().section.sixthStandardListing.click('@name', () => {
        browser.page.small.propertyCard().section.photos
          .waitForElementVisible('@photoGalleryImage', () => {
            browser.pause(1000).page.small.propertyCard().click('@closeButton')
              .waitForElementNotPresent('@closeButton')
          })
      })
    })
  },

  'Refresh Page and Validate': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${losAngelesListPath}?page=2`)
    browser.page.small.gridSearch().refreshPageAndVerifyLoadState(browser)
  },

  'Click Load Previous Button': browser => {
    browser.page.small.gridSearch().loadPreviousResults(browser)
  },

  'Verify Final State': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${losAngelesListPath}`)
    browser.page.small.gridSearch().verifyNumDisplayedListingsMatchesExpectation(browser)
  },
}
