const reviewsPdpPath = '/apartments/Alaska/Yakutat/EGG-Property-One/185296/#reviews'

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
      .url(`${browser.launchUrl}${reviewsPdpPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate Reviews Tab': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${reviewsPdpPath}`)
    const pdp = browser.page.small.pdp()
    pdp.expect.element('@ratingsAndReviews').to.not.be.present.after(0)
    pdp.expect.element('@overallRating').to.be.present.after(0)
    pdp.expect.element('@rateWithStars').to.be.present.after(0)
    pdp.expect.element('@reviews').to.be.present.after(0)
    pdp.expect.element('@ratingsByCategory').to.not.be.present.after(0)
  },
}
