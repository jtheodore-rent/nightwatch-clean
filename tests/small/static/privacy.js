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

  'Open Nav Menu and click Privacy link': browser => {
    browser.page.small.navMenu().openNavMenuAndClickLink(browser, '@privacyLink')
  },

  'Validate URL': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/legal/privacy/`)
  },

  'Validate header': browser => {
    browser.page.small.header().validate(`${browser.launchUrl}/`, browser)
  },

  'Validate page content': browser => {
    const content = browser.page.small.privacyPolicy()
    browser.assert.textExists(content.elements.articleHeadline)
    browser.assert.textExists(content.elements.articleBody)
  },

  'Validate page footer': browser => {
    browser.page.small.footer().validate(`${browser.launchUrl}/`)
  },
}
