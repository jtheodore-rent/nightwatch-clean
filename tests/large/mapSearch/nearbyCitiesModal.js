const mapSearchPath = '/map/?city=Los-Angeles&state=California'

module.exports = {
  tags: ['stableChrome', 'stableFirefox', 'critical', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${mapSearchPath}`)
      .waitForURLEquals(`${browser.launchUrl}${mapSearchPath}`)
      .waitForElementVisible('#react-view')
      .page.large.mapSearch().section.firstStandardListing
      .waitForElementVisible('@image0')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'validate first link in modal': browser => {
    browser.page.large.mapSearch().validateLinkInModal(browser, {
      section: 'nearbyCitiesModal',
      linkName: '@firstCitiesLink',
      menu: '@findApartmentsMenu',
      menuItem: '@nearbyCitiesMenu',
    })
  },
}
