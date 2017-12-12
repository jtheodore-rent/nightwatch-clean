const gridSearchPath = '/apartments/Alaska/Yakutat/'

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
      .setCookie({
        name: 'featureFlips',
        value: 'reviewsInterceptSrpSmall',
        path: '/',
      })
      .url(`${browser.launchUrl}${gridSearchPath}`)
      .waitForElementVisible('#react-view')
      .page.small.gridSearch().section.firstStandardListing.waitForElementVisible('@name')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate key elements of review ad': browser => {
    browser.page.small.gridSearch().expect.element('@reviewAd').to.be.visible.after(6000)
  },

  'Verify clicking review ad opens Reviews page': browser => {
    browser.page.small.gridSearch().waitForElementVisible('@reviewAd')
       .click('@reviewAd')
       .waitForURLEquals(`${browser.launchUrl}/reviews`)
  },
}
