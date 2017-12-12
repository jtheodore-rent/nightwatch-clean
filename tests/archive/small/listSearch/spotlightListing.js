const listSearchPath = '/apartments/Alaska/Yakutat/'
const backgroundRGBA = 'rgba(74, 144, 226, 1)'
const listingInnerStyles = {
  textRGBA: 'rgba(255, 255, 255, 1)',
  linkRGBA: 'rgba(255, 255, 255, 1)',
  buttonBackgroundRGBA: 'rgba(255, 255, 255, 1)',
  buttonTextRGBA: 'rgba(194, 12, 19, 1)',
}

module.exports = {
  before: browser => {
    browser
      .url(`${browser.launchUrl}${listSearchPath}`)
      .waitForElementVisible('#react-view')
      .page.small.listSearch().section.spotlightListing
      .waitForElementVisible('@image')
  },

  after: browser => {
    browser.end()
  },

  'Validate key elements of spotlight listing': browser => {
    const listSearchPage = browser.page.small.listSearch()
    const spotlightListing = listSearchPage.section.spotlightListing
    listSearchPage.validateListingHref(spotlightListing, browser.launchUrl)
    listSearchPage.validateListingDetails(spotlightListing)
    listSearchPage.expect.section('@spotlightListing').to.have.css('background-color').which
      .equals(backgroundRGBA)
    listSearchPage.validateListingStyling(spotlightListing, listingInnerStyles)
  },
}
