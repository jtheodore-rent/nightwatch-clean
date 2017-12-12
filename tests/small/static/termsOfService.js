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

  'Open Menu And Click Terms Link ': browser => {
    browser.page.small.navMenu().openNavMenuAndClickLink(browser, '@termsLink')
  },

  'Validate URL': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/legal/terms-of-service/`)
  },

  'Validate page content': browser => {
    const content = browser.page.small.termsOfService()
    browser.assert.textExists(content.elements.articleBody)
  },

  'Validate header': browser => {
    browser.page.small.header().validate(`${browser.launchUrl}/`, browser)
  },

  'Validate page footer': browser => {
    browser.page.small.footer().validate(`${browser.launchUrl}/`)
  },
}
