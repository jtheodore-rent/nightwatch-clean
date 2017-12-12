const pdpPath = '/apartments/Alaska/Yakutat/EGG-Property-One/185296/'
const submitReviewPath = `${pdpPath}Reviews/new/`

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
  },

  'Click X': browser => {
    browser
      .page
      .small
      .submitReview()
      .click('@closeReviewForm')

    browser
      .page
      .small
      .pdp()
      .waitForElementVisible('@reviews')
  },

  'Validate reviews tab displayed': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${pdpPath}#reviews`)
  },
}
