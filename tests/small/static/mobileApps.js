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

  'Open Nav Menu and click Mobile Apps link': browser => {
    browser.page.small.navMenu().openNavMenuAndClickLink(browser, '@mobileAppLink')
  },

  'Validate URL': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/mobile-app/`)
  },

  'Validate header': browser => {
    browser.page.small.header().validate(`${browser.launchUrl}/`, browser)
  },

  'Validate page content': browser => {
    const mobileDeviceType = browser.options.desiredCapabilities.mobileDeviceType
    const mobileAppsPage = browser.page.small.mobileApps()
    mobileAppsPage.expect.element('@articleHeadline').to.be.visible.before(1000)
    mobileAppsPage.expect.element('@articleHeadline').text.to.be
      .equal('Never Be Without the Tools to Find Your New Home.')
    mobileAppsPage.expect.element('@articleSubHeadline').to.be.visible.before(1000)
    mobileAppsPage.expect.element('@articleSubHeadline').text.to.be
      .equal('Seamlessly connect your apartment search on desktop, tablet, and mobile.')
    if (mobileDeviceType) {
      mobileAppsPage.expect.element(`@${mobileDeviceType}Image`).to.be.visible.before(1000)
      mobileAppsPage.expect.element(`@${mobileDeviceType}DownloadButton`)
        .to.be.visible.before(1000)
    } else {
      console.log('!!!WARNING: mobileDeviceType not specified!!!') // eslint-disable-line no-console
    }
  },

  'Validate page footer': browser => {
    browser.page.small.footer().validate(`${browser.launchUrl}/`)
  },
}
