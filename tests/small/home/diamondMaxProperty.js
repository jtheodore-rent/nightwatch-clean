const listPath = '/apartments/North-Carolina/Charlotte/'
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
      .url(`${browser.launchUrl}${listPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Verify SRP URL': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${listPath}`)
    browser.page.small.gridSearch().section.firstStandardListing
      .waitForElementVisible('@name')
  },

  'Click AG Logo': browser => {
    browser.page.small.header().click('@agLogoHeader')
  },

  'Verify DiamondMax Property Infomation': browser => {
    const homePage = browser.page.small.homePage()
    browser.waitForURLEquals(`${browser.launchUrl}/`)
    homePage.expect.element('@backgroundImage').to.be.visible.before(1000)
    homePage.expect.element('@diamondMaxTitle').text.to
      .equal('The Lexington Dilworth').before(6000)
    homePage.expect.element('@diamondMaxAddress').text.to
      .equal('Charlotte, North Carolina 28203').before(6000)
    homePage.expect.element('@diamondMaxPrice').text.to
      .equal('$1205–$2845').before(6000)
    homePage.expect.element('@diamondMaxBeds').text.to
      .equal('Studio–2 Beds').before(6000)
    homePage.expect.element('@diamondMaxBaths').text.to
      .equal('1–2 Baths').before(6000)
  },

  'Click On DiamondMax Listing': browser => {
    browser.page.small.homePage().click('@diamondMaxTitle')
  },

  'Verify Property Name On VS Card': browser => {
    browser.page.small.propertyCard().expect.element('@propertyName').text.to
      .equal('The Lexington Dilworth')
  },
  'Close VS Card': browser => {
    const propertyCard = browser.page.small.propertyCard()
    propertyCard.waitForElementVisible('@closeButton')
      .click('@closeButton')
  },

  'Verify Home Page URL': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/`)
  },
}
