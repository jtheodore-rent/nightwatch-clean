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
      .refresh()
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate URL and Title': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/`)
    // place holder (currently home page does not have page title)
    browser.expect.element('title').attribute('text').to.equal('')
  },

  'Validate meta': browser => {
    browser.page.shared.headTags().validate({
      meta: { robots: false },
    })
  },

  'Validate header': browser => {
    const header = browser.page.small.header()
    header.validate(`${browser.launchUrl}/`, browser)
  },

  'Validate page footer': browser => {
    browser.page.small.footer().validate(`${browser.launchUrl}/`)
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
