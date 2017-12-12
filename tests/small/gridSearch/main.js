const listSearchPath = '/apartments/Georgia/Atlanta/'

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
      .url(`${browser.launchUrl}${listSearchPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate URL': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${listSearchPath}`)
  },

  'Validate meta': browser => {
    browser.page.shared.headTags().validate({
      meta: { robots: false },
    })
  },

  'Validate header': browser => {
    browser.page.small.header().validate(`${browser.launchUrl}/`, browser, 'Atlanta, GA')
  },

  'Validate Navigation Menu': browser => {
    browser.page.small.navMenu().menuValidation(browser)
  },

  'Click Home Button and Verify HomePage URL ': browser => {
    browser.page.small.navMenu().openNavMenuAndClickLink(browser, '@homeButton')
  },

  'Click Nearby By link and Verify URL ': browser => {
    browser.page.small.navMenu().openNavMenuAndClickLink(browser, '@dealsNearbyButton')
  },

  'Click AG Logo and Verify HomePage URL': browser => {
    browser.page.small.header().click('@agLogoHeader').waitForURLEquals(`${browser.launchUrl}/`)
  },

  'Validate Footer': browser => {
    browser.page.small.navMenu().footerCopyrightValidation(browser)
  },
}
