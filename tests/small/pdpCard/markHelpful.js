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
      .page.small.pdp().section.firstReview.waitForElementVisible('@markAsHelpful')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate initial state': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${reviewsPath}`)
    const firstReview = browser.page.small.pdp().section.firstReview

    firstReview.expect.element('@markAsHelpful').to.be.visible.after(0)
    firstReview.expect.element('@markedAsHelpful').to.not.be.present.after(0)
  },

  'Click mark helpful': browser => {
    const firstReview = browser.page.small.pdp().section.firstReview

    firstReview.click('@markAsHelpful').waitForElementVisible('@markedAsHelpful')
  },
}
