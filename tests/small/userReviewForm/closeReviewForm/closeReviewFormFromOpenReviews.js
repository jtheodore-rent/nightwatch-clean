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

  'Click on stars to trigger review form': browser => {
    const firstListing = browser.page.shared.openReviews().section.firstListing
    firstListing.waitForElementVisible('@firstStar')
    firstListing.waitForElementVisible('@firstStar').click('@firstStar', () => {
      browser.page.small.submitReview().waitForElementVisible('@reviewForm')
    })
  },

  'Click X': browser => {
    browser
      .page
      .small
      .submitReview()
      .click('@closeReviewForm')
      .waitForElementNotPresent('@closeReviewForm')
  },

  'Validate url is open reviews path': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${openReviewsPath}`)
  },
}
