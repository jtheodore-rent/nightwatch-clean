const listSearchPath = '/apartments/Alaska/Yakutat/'

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
      .page.small.gridSearch().section.firstStandardListing
      .waitForElementVisible('@name')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Favorite First Listing': browser => {
    const gridSRP = browser.page.small.gridSearch()
    gridSRP.section.firstStandardListing.click('@heartUnsaved', () => {
      browser.page.small.header().section.favorites.waitForElementVisible('@firstFavoriteListing')
    })
  },

  'Favorite Second Listing': browser => {
    const gridSRP = browser.page.small.gridSearch()
    gridSRP.section.secondStandardListing.click('@heartUnsaved', () => {
      browser.page.small.header().section.favorites.waitForElementVisible('@secondFavoriteListing')
    })
  },

  'Navigate to Map View': browser => {
    browser.page.small.gridSearch().click('@mapViewButton', () => {
      browser.page.small.mapSearch().waitForElementVisible('@listViewButton')
    })
  },

  'Verify Favorites on Map Tab': browser => {
    const favoritesSection = browser.page.small.header().section.favorites
    favoritesSection.expect.element('@firstFavoriteListing').to.be.visible.before(1000)
    favoritesSection.expect.element('@secondFavoriteListing').to.be.visible.before(1000)
  },
}
