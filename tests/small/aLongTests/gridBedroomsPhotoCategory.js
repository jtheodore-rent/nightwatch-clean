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

  'Navigate to Bedrooms Tab': browser => {
    browser.page.small.gridSearch().click('@bedroomsView')
  },

  'Validate Bedrooms Tab': browser => {
    const gridSRP = browser.page.small.gridSearch()
    gridSRP.verifyVisualRepresentationOfSelectedCategory(gridSRP, '@bedroomsView')
    gridSRP.validateSpotlightListing(gridSRP, false, false)
    const firstStandardListing = gridSRP.section.firstStandardListing
    gridSRP.validateStandardListing(gridSRP, firstStandardListing, false)
  },

  'Verify Listing Opens to Bedrooms Photo': browser => {
    browser.page.small.gridSearch()
    .verifyListingPhotoAndCloseListing(browser, 'bedrooms', listingPhotoData)
  },
}
