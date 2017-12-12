const openReviewsPath = '/reviews/'

module.exports = {
  tags: ['stableAndroid', 'quarantineIOS', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${openReviewsPath}`)
      .page.shared.openReviews().waitForElementVisible('@openReviewsContainer')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate initial state': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${openReviewsPath}`)
    browser
      .page
      .shared
      .openReviews()
      .expect.element('@openReviewsContainer').to.be.visible.after(0)
  },

  'Search For Listings to Review': browser => {
    const openReviews = browser.page.shared.openReviews()

    openReviews
      .setValue('@location', 'Yakutat, AK')
      .waitForElementVisible('@firstSearchOption')
      .click('@firstSearchOption')
      .click('@submit')

    openReviews.section.firstListing.waitForElementVisible('@name')
  },

  'Click on listing to trigger pdp card': browser => {
    browser.page.shared.openReviews().section.firstListing
      .waitForElementVisible('@pdpLink').click('@pdpLink')
  },

  'Click the close button on the modal': browser => {
    browser.page.small.propertyCard()
    .waitForElementVisible('@closeButton')
    .click('@closeButton')
    .waitForElementNotPresent('@closeButton')
  },

  'Verify the user is returned to the SRP after closing the card': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${openReviewsPath}`)
  },
}
