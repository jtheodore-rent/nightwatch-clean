const srpPath = '/apartments/Missouri/Kirkwood/'

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
      .url(`${browser.launchUrl}${srpPath}`)
      .waitForElementVisible('#react-view')
      .page.small.gridSearch().section.firstStandardListing.waitForElementVisible('@name')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Click on listing in different city': browser => {
    browser.page.small.gridSearch().openListingInCity(browser, 'Missouri', 'Saint-Louis')
  },

  'Click the close button on the modal': browser => {
    browser.page.small.propertyCard().click('@closeButton')
      .waitForElementNotPresent('@closeButton')
  },

  'Verify the user is returned to the SRP after closing the card': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${srpPath}`)
  },

  'Validate Load More Button Text': browser => {
    browser.page.small.gridSearch().expect.element('@loadMoreButton').text.to.match(/Load \d+ More/)
  },
}
