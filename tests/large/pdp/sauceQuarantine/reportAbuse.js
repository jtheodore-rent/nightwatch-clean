const reviewsPath = '/apartments/Alaska/Yakutat/The-Grand-at-Dunwoody/100022110/#reviews'

module.exports = {
  tags: ['quarantineChrome', 'quarantineFirefox', 'critical', 'quarantineProd'],
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
      .url(`${browser.launchUrl}${reviewsPath}`)
      .waitForURLEquals(`${browser.launchUrl}${reviewsPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate initial state': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${reviewsPath}`)
    browser
      .page
      .large
      .pdp()
      .expect.element('@ratingsSection').to.be.visible.after(0)
  },

  'Click report review': browser => {
    const pdp = browser.page.large.pdp()
    const firstReview = pdp.section.firstReview

    pdp.expect.section('@reportReviewForm').to.not.be.present.after(0)
    firstReview.getLocationInView('@reportButton', () => {
      browser.pause(1000).page.large.pdp().section.firstReview.click('@reportButton', () => {
        pdp.section.reportReviewForm.waitForElementVisible('@reasonDishonest')
      })
    })
  },

  'Validate Report Form': browser => {
    const reportReviewForm = browser.page.large.pdp().section.reportReviewForm
    reportReviewForm.expect.element('@reasonDishonest').to.be.visible.after(0)
    reportReviewForm.expect.element('@reasonInappropriate').to.be.visible.after(0)
    reportReviewForm.expect.element('@reasonFake').to.be.visible.after(0)
    reportReviewForm.expect.element('@submit').to.be.visible.after(0)
  },

  'Submit Report Form': browser => {
    const pdp = browser.page.large.pdp()
    const reportReviewForm = pdp.section.reportReviewForm
    reportReviewForm
      .click('@reasonDishonest')
      .click('@submit')
    pdp.waitForElementVisible('@ratingsSection')
  },

  'Validate Flagged Review': browser => {
    const firstReview = browser.page.large.pdp().section.firstReview
    firstReview.expect.element('@flag').to.be.visible.before(1000)
  },
}
