const srpPath = '/apartments/Alaska/Yakutat/'

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
      .page.small.gridSearch().section.spotlightListing.waitForElementVisible('@name')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Locate Spotlight with Phone': browser => {
    browser.page.small.gridSearch().locateSpotlightWithPhone(browser)
  },

  'Validate Spotlight Listing': browser => {
    const gridSRP = browser.page.small.gridSearch()
    gridSRP.validateSpotlightListing(gridSRP, false, true)
  },

  'Click on the spotlight listing': browser => {
    browser.page.small.gridSearch().section.spotlightListing.click('@name')
    browser.page.small.propertyCard().waitForElementVisible('@closeButton', () => {
      browser.pause(500) // This allows the animation to complete
    })
  },

  'Verify spotlight property name on VS card': browser => {
    browser.page.small.propertyCard().expect.element('@propertyName').text.to
      .match(/\w+\D+/)
  },

  'Click the close button on the modal': browser => {
    browser.page.small.propertyCard().click('@closeButton')
      .waitForElementNotPresent('@closeButton')
  },

  'Verify the user is returned to the SRP after closing the card': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${srpPath}`)
  },
}
