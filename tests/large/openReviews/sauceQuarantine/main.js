const openReviewsPath = '/reviews/'

module.exports = {
  tags: ['quarantineQA', 'quarantineProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'ui',
        value: 'adaptive',
        path: '/',
      })
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Go to Open Reviews': browser => {
    browser
    .url(`${browser.launchUrl}${openReviewsPath}`)
    .waitForURLEquals(`${browser.launchUrl}${openReviewsPath}`)
    .waitForElementVisible('#react-view')
    .page.shared.openReviews().waitForElementVisible('@openReviewsContainer')
  },

  'Validate meta': browser => {
    browser.page.shared.headTags().validate({
      meta: { robots: 'noindex,nofollow' },
    })
  },

  'Search For Listings to Review': browser => {
    const openReviews = browser.page.shared.openReviews()
    openReviews.setValue('@location', 'Yakutat, AK')
      .waitForElementVisible('@firstSearchOption').click('@firstSearchOption', () => {
        openReviews.setValue('@propertyName', 'Oaks').click('@submit', () => {
          browser.waitForElementVisible('a[href*=Oaks]')
        })
      })
  },

  'Validate Search Results': browser => {
    const firstListing = browser.page.shared.openReviews().section.firstListing
    firstListing.expect.element('@name').text.to.include('Oaks')
  },

  'Rate listing': browser => {
    const firstListing = browser.page.shared.openReviews().section.firstListing
    firstListing.click('@firstStar')
    browser.page.large.submitReview()
      .waitForElementVisible('@reviewForm')
  },

  'Verify Submit Review Page': browser => {
    browser.page.large.submitReview()
      .expect.element('@propertyName').text.to.include('Oaks')
  },
}
