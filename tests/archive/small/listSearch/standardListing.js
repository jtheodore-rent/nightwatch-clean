const listSearchPath = '/apartments/Alaska/Yakutat/'
const backgroundRGBA = 'rgba(255, 255, 255, 1)'
const listingInnerStyles = {
  textRGBA: 'rgba(74, 74, 74, 1)',
  linkRGBA: 'rgba(2, 122, 194, 1)',
  buttonBackgroundRGBA: 'rgba(2, 122, 194, 1)',
  buttonTextRGBA: 'rgba(255, 255, 255, 1)',
}

module.exports = {
  before: browser => {
    browser
      .url(`${browser.launchUrl}${listSearchPath}`)
      .waitForElementVisible('#react-view')
      .page.small.listSearch().section.firstStandardListing
      .waitForElementVisible('@image')
  },

  after: browser => {
    browser.end()
  },

  'Validate key elements of first listing': browser => {
    const listSearchPage = browser.page.small.listSearch()
    const firstListing = listSearchPage.section.firstStandardListing
    listSearchPage.validateListingHref(firstListing, browser.launchUrl)
    listSearchPage.validateListingDetails(firstListing)
    listSearchPage.expect.section('@firstStandardListing').to.have.css('background-color').which
      .equals(backgroundRGBA)
    listSearchPage.validateListingStyling(firstListing, listingInnerStyles)
  },
}
