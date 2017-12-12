const openReviewsPath = '/reviews/'

module.exports = {
  tags: ['critical', 'stableAndroid', 'quarantineIOS', 'stableProd'],
  before: browser => {
    // Visit a couple pdps to setup recently viewed listings
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${openReviewsPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate URL and container': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${openReviewsPath}`)
    browser.page.shared.openReviews().waitForElementVisible('@openReviewsContainer')
  },

  'Validate meta': browser => {
    browser.page.shared.headTags().validate({
      meta: { robots: 'noindex,nofollow' },
    })
  },

  'Search For Listings to Review': browser => {
    const openReviews = browser.page.shared.openReviews()
    openReviews.setValue('@location', 'Yakutat, AK')
        .waitForElementVisible('@firstSearchOption', 7000)
        .click('@firstSearchOption')
        .setValue('@propertyName', 'The Oaks')
        .click('@submit')
    openReviews.section.firstListing.waitForElementVisible('@name')
  },

  'Validate Search Results': browser => {
    const firstListing = browser.page.shared.openReviews().section.firstListing
    firstListing.expect.element('@name').text.to.include('The Oaks')
  },

  'Rate listing': browser => {
    const firstListing = browser.page.shared.openReviews().section.firstListing
    firstListing.click('@firstStar')
    browser.page.small.submitReview()
      .waitForElementVisible('@reviewForm')
  },

  'Verify Submit Review Page': browser => {
    browser.page.small.submitReview()
      .expect.element('@propertyName').text.to.include('The Oaks')
  },
}
