const pdpPath = '/apartments/Alaska/Yakutat/The-Grand-at-Dunwoody/100022110/'

module.exports = {
  tags: ['stableChrome', 'stableFirefox', 'critical', 'stableProd'],
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
      .url(`${browser.launchUrl}${pdpPath}`)
      .waitForURLEquals(`${browser.launchUrl}${pdpPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate CTA star click': browser => {
    const pdp = browser.page.large.pdp()
    pdp.validateRatingsStarClick(pdp, browser)
    browser.back()
  },

  'Validate Certified Resident mouseover functions': browser => {
    const reviews = browser.page.large.pdp().section.reviews

    reviews.expect.element('@certifiedResidentTooltip').not.to.be.present.before(1000)
    reviews.getLocationInView('@firstCertifiedBadge')
      .moveToElement('@firstCertifiedBadge', 3, 3, () => {
        reviews.expect.element('@certifiedResidentTooltip').to.be.visible.before(1000)
      })
  },

  'Validate Date is formatted correctly': browser => {
    const review = browser.page.large.pdp().section.firstReview
    review.expect.element('@date').text.to.match(/\d{2}-\d{2}-\d{4}/)
  },

  'Validate Review text is not empty': browser => {
    const review = browser.page.large.pdp().section.firstReview
    review.expect.element('@text').text.to.not.equal('')
  },

  'Validate Lead Modal appears when the Schools Lead button is pressed': browser => {
    browser.page.large.pdp().validateCheckAvailabilityButton(browser, 'reviews')
  },

  'Validate starting number of reviews': browser => {
    const reviews = browser.page.large.pdp().section.reviews
    reviews.expect.element('@fifthReview').to.be.visible.before(1000)
    reviews.expect.element('@sixthReview').to.not.be.present.before(1000)
  },

  'Validate clicking on "Load More" button loads more reviews': browser => {
    const reviews = browser.page.large.pdp().section.reviews

    reviews
      .click('@loadMoreButton')
      .waitForElementVisible('@sixthReview')
  },
}
