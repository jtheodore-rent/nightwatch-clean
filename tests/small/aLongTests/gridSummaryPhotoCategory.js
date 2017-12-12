const listSearchPath = '/apartments/Alaska/Yakutat/'
const listingPhotoData = {
  listingID: '100022110',
  summary: '1',
  kitchens: '6',
  bathrooms: '11',
  bedrooms: '8',
  livingRooms: '2',
  pools: '15',
}

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

  'Validate Summary Tab': browser => {
    const gridSRP = browser.page.small.gridSearch()
    gridSRP.verifyVisualRepresentationOfSelectedCategory(gridSRP, '@summaryView')
    gridSRP.validateSpotlightListing(gridSRP, false, false)
    const firstStandardListing = gridSRP.section.firstStandardListing
    gridSRP.validateStandardListing(gridSRP, firstStandardListing, false)
    gridSRP.favoriteFirstTwoListingsAndValidateShowFavorites(browser)
  },

  'Switch back to Grid View': browser => {
    browser.page.small.gridSearch().click('@showAll')
      .waitForElementVisible('@showFavorites').section.firstStandardListing
      .waitForElementVisible('@name')
  },

  'Verify Listing Opens to First Photo': browser => {
    browser.page.small.gridSearch()
    .verifyListingPhotoAndCloseListing(browser, 'summary', listingPhotoData)
  },

  'Verify Favorites Link in Nav Menu': browser => {
    const navMenu = browser.page.small.navMenu()
    navMenu.click('@mainMenu').waitForElementVisible('@myPlacesButton', () => {
      navMenu.expect.element('@myPlacesButton').text.to.equal('Favorite Properties (2)')
      navMenu.click('@myPlacesButton', () => {
        browser.page.small.gridSearch().section.firstStandardListing
        .waitForElementVisible('@name', () => {
          browser.assert.urlEquals(`${browser.launchUrl}/myplaces/`)
        })
      })
    })
  },
}
