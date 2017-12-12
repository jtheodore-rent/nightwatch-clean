const listSearchPath = '/apartments/California/Los-Angeles/'

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
      .url(`${browser.launchUrl}${listSearchPath}`)
      .waitForURLEquals(`${browser.launchUrl}${listSearchPath}`)
      .waitForElementVisible('#react-view')
      .page.large.listSearch().section.firstStandardListing
      .waitForElementVisible('@image0')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'validate first link in modal': browser => {
    browser.page.large.listSearch().validateLinkInModal(browser, {
      section: 'nearbyNeighborhoodsModal',
      linkName: '@firstNeighborhoodsLink',
      menu: '@findApartmentsMenu',
      menuItem: '@nearbyNeighborhoodsMenu',
    })
  },

  'validate All Neighborhoods Link': browser => {
    browser.page.large.listSearch().validateLinkInModal(browser, {
      section: 'nearbyNeighborhoodsModal',
      linkName: '@allHoodsLink',
      menu: '@findApartmentsMenu',
      menuItem: '@nearbyNeighborhoodsMenu',
    })
  },
}
