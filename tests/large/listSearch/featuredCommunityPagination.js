const listSearchPath = '/apartments/Alaska/Yakutat/'
const featuredListingName = 'The Grand at Merrimack'

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
      .url(`${browser.launchUrl}${listSearchPath}`)
      .waitForURLEquals(`${browser.launchUrl}${listSearchPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Verify Search Page URL': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${listSearchPath}`)
  },

  'Paginate Featured Listing': browser => {
    const listSearchPage = browser.page.large.listSearch()
    listSearchPage.paginateFeaturedListings(browser, featuredListingName)
  },

  'Validate Featured Listing Data': browser => {
    const listSearchPage = browser.page.large.listSearch()
    const featuredListing = listSearchPage.section.featuredListing
    listSearchPage.validateFeaturedCommunityName(browser, featuredListing, '@image')
  },
}
