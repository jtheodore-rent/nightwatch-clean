const basePdpPath = '/apartments/Alaska/Yakutat/EGG-Property-One/185296/'
const reviewsPath = `${basePdpPath}#reviews`
const submitReviewPath = `${basePdpPath}Reviews/new/`
const rating = 2

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
      .url(`${browser.launchUrl}${basePdpPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate initial state': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${basePdpPath}`)
    browser
      .page
      .small
      .pdp()
      .expect
      .element('@rateWithStars').to.not.be.visible.after(0)
  },

  'Validate URL changes when clicking reviews button': browser => {
    browser
      .page
      .small
      .pdp()
      .click('@reviewTabButton')
      .waitForElementVisible('@rateWithStars')
  },

  'Validate Rate By Stars section present': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${reviewsPath}`)
    browser
      .page
      .small
      .pdp()
      .expect
      .element('@rateWithStars').to.be.visible.after(0)
  },

  'Rate by clicking star': browser => {
    browser
      .page
      .small
      .pdp()
      .rate(rating)
  },

  'Validate submit review url': browser => {
    browser.page.small.submitReview().waitForElementVisible('@reviewForm')
    browser.assert.urlEquals(`${browser.launchUrl}${submitReviewPath}?rating=${rating}`)
  },
}
