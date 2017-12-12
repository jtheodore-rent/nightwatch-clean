const mapSearchPath = '/map/?city=Los-Angeles&state=California'

module.exports = {
  tags: ['stableChrome', 'stableFirefox', 'stableProd'],
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
      section: 'nearbyZipsModal',
      linkName: '@firstZipsLink',
      menu: '@findApartmentsMenu',
      menuItem: '@nearbyZipsMenu',
    })
  },
}
