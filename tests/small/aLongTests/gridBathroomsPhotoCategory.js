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

  'Navigate to Bathrooms Tab': browser => {
    browser.page.small.gridSearch().click('@bathroomsView')
  },

  'Validate Bathrooms Tab': browser => {
    const gridSRP = browser.page.small.gridSearch()
    gridSRP.verifyVisualRepresentationOfSelectedCategory(gridSRP, '@bathroomsView')
    gridSRP.validateSpotlightListing(gridSRP, false, false)
    const firstStandardListing = gridSRP.section.firstStandardListing
    gridSRP.validateStandardListing(gridSRP, firstStandardListing, false)
    gridSRP.favoriteFirstTwoListingsAndValidateShowFavorites(browser)
  },

  'Clear Favorites Bathrooms Tab': browser => {
    const gridSRP = browser.page.small.gridSearch()
    gridSRP.clearTwoFavoritedPropertiesAndVerifyFavoritesEmpty(browser)
  },

  'Verify Listing Opens to Bathrooms Photo': browser => {
    browser.page.small.gridSearch()
    .verifyListingPhotoAndCloseListing(browser, 'bathrooms', listingPhotoData)
  },
}