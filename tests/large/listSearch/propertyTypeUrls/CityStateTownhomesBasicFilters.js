const listSearchPath = '/bloomington-in/townhomes/'

const listSearchPage = browser => browser.page.large.listSearch()

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

  'Set Up Basic Filters': browser => {
    listSearchPage(browser).setupBasicFilters(browser, listSearchPath)
  },

  'Validate Basic Filter': browser => {
    const url = '/bloomington-in/townhomes/'
    const firstListing = listSearchPage(browser).section.firstStandardListing
    listSearchPage(browser).validateBasicFilters(browser, firstListing, url)
  },

  'Validate Page Title': browser => {
    listSearchPage(browser).expect.element('@h1Tag').text.to
      .equal('Townhomes for rent in Bloomington, IN')
  },
}
