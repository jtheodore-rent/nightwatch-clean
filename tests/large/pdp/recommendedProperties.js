const pdpPath = '/apartments/Alaska/Yakutat/Ashley-Park-Retirement-Community-55+-Restricted/184402/'

module.exports = {
  tags: ['stableChrome', 'stableFirefox', 'stableProd'],
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

  'Contains recommended properties': browser => {
    browser.page.large.pdp().expect.element('@recommendedProperties').to.be.present()
    browser.page.large.pdp().expect.element('@portfolioPromoter').not.to.be.present()
  },
}
