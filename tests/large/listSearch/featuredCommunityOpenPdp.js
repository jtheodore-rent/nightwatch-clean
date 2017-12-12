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

  'Paginate to Desired Featured Listing': browser => {
    browser.page.large.listSearch().paginateToSpecificFeatured(browser, featuredListingName)
  },

  'Validate Featured Community Click open PDP And match Name': browser => {
    const listSearchPage = browser.page.large.listSearch()
    const featuredListing = listSearchPage.section.featuredListing
    listSearchPage.validateFeaturedCommunityName(browser, featuredListing, '@image')
  },
}
