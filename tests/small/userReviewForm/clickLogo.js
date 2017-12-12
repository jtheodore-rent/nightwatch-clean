const submitReviewPath = '/apartments/Alaska/Yakutat/EGG-Property-One/185296/Reviews/new/'

module.exports = {
  tags: ['stableAndroid', 'stableIOS', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${submitReviewPath}`)
      .page.small.submitReview().waitForElementVisible('@reviewForm')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate initial state': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${submitReviewPath}`)
    browser
      .page
      .small
      .submitReview()
      .expect.element('@reviewForm').to.be.visible.after(0)
    browser.page.small.submitReview().expect.element('@AgLogo').to.be.visible.after(0)
  },

  'Validate clicking Logo navigates to the homepage': browser => {
    browser.page.small.submitReview().click('@AgLogo').waitForURLEquals(`${browser.launchUrl}/`)
  },
}
