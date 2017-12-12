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

  'Navigate to Kitchens Tab': browser => {
    browser.useCss().getLocationInView('h1')
    browser.pause(1000).page.small.gridSearch().click('@kitchensView')
  },

  'Validate Kitchens Tab': browser => {
    const gridSRP = browser.page.small.gridSearch()
    gridSRP.verifyVisualRepresentationOfSelectedCategory(gridSRP, '@kitchensView')
    gridSRP.validateSpotlightListing(gridSRP, false, false)
    const firstStandardListing = gridSRP.section.firstStandardListing
    gridSRP.validateStandardListing(gridSRP, firstStandardListing, false)
  },

  'Verify Listing Opens to Kitchens Photo': browser => {
    browser.page.small.gridSearch()
    .verifyListingPhotoAndCloseListing(browser, 'kitchens', listingPhotoData)
  },

  'Navigate back to Summary Tab': browser => {
    browser.page.small.gridSearch().click('@summaryView')
  },

  'Validate Summary Tab Again': browser => {
    const gridSRP = browser.page.small.gridSearch()
    gridSRP.verifyVisualRepresentationOfSelectedCategory(gridSRP, '@summaryView')
    gridSRP.validateSpotlightListing(gridSRP, false, false)
    const firstStandardListing = gridSRP.section.firstStandardListing
    gridSRP.validateStandardListing(gridSRP, firstStandardListing, false)
    gridSRP.favoriteFirstTwoListingsAndValidateShowFavorites(browser)
  },
}
