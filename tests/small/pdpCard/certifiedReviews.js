const basePdpPath = '/apartments/Alaska/Yakutat/Serenity-Place_Villas-at-Dorsey-Ridge/185299/'

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
      .url(`${browser.launchUrl}${basePdpPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate initial state': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${basePdpPath}`)
  },

  'Click reviews tab': browser => {
    browser.page.small.pdp().click('@reviewTabButton')
      .waitForElementVisible('@overallRating')
  },

  'Validate Reviews Tab': browser => {
    const reviewsPath = `${basePdpPath}#reviews`
    browser.assert.urlEquals(`${browser.launchUrl}${reviewsPath}`)
  },

  'Verify Certified Review Link': browser => {
    const certifiedReviews = browser.page.small.certifiedReviews()
    certifiedReviews.expect.element('@certifiedLink').text.to.equal('Certified Resident')
    certifiedReviews.expect.element('@certifiedCheckIcon').to.be.visible.before(6000)
  },

  'Verify Certified Reviews Click and Popup Title': browser => {
    const certifiedReviews = browser.page.small.certifiedReviews()
    certifiedReviews.click('@certifiedText')
    certifiedReviews.click('@certifiedCheckIcon')

    browser.page.small.certifiedReviews().expect.element('@certifiedPopupTitle').text.to
      .equal('What is a Certified Resident?')
  },

  'Close Certified Popup': browser => {
    browser.page.small.certifiedReviews().click('@certifiedCloseButton')
  },

  'Validate Landing Page': browser => {
    const reviewsPath = `${basePdpPath}#reviews`
    browser.assert.urlEquals(`${browser.launchUrl}${reviewsPath}`)
  },
}
