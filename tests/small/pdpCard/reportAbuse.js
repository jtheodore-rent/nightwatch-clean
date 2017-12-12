const reviewsPath = '/apartments/Alaska/Yakutat/The-Grand-at-Dunwoody/100022110/#reviews'

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
      .url(`${browser.launchUrl}${reviewsPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate initial state': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${reviewsPath}`)
    browser
      .page
      .small
      .pdp()
      .expect.element('@reviews').to.be.visible.after(0)
  },

  'Click report review': browser => {
    const pdp = browser.page.small.pdp()
    const firstReview = pdp.section.firstReview

    pdp.expect.section('@reportReviewForm').to.not.be.present.after(0)
    firstReview.getLocationInView('@reportButton', () => {
      browser.pause(1000).page.small.pdp().section.firstReview.click('@reportButton', () => {
        pdp.section.reportReviewForm.waitForElementVisible('@reasonDishonest')
      })
    })
  },

  'Validate Report Form': browser => {
    const reportReviewForm = browser.page.small.pdp().section.reportReviewForm
    reportReviewForm.expect.element('@reasonDishonest').to.be.visible.after(0)
    reportReviewForm.expect.element('@reasonInappropriate').to.be.visible.after(0)
    reportReviewForm.expect.element('@reasonFake').to.be.visible.after(0)
    reportReviewForm.expect.element('@submit').to.be.visible.after(0)
  },

  'Submit Report Form': browser => {
    const pdp = browser.page.small.pdp()
    const reportReviewForm = pdp.section.reportReviewForm
    reportReviewForm
      .click('@reasonDishonest')
      .click('@submit')
    pdp.waitForElementVisible('@reviews')
  },

  'Validate Flagged Review': browser => {
    const firstReview = browser.page.small.pdp().section.firstReview
    firstReview.expect.element('@reportButton').to.not.be.present.before(1000)
    firstReview.expect.element('@flag').to.be.visible.before(1000)
  },
}
