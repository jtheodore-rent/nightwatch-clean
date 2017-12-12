const listSearchPath = '/saint-louis-mo/houses/'
const secondListSearchPath = '/seattle-wa/houses/'
const mapPath = '/map/?city=Seattle&state=Washington&refinements=2-beds-from-500-under-1500-1z141y8'

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
      .waitForElementVisible('@name')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Set Up Basic Filters': browser => {
    listSearchPage(browser).setupBasicFilters(browser, listSearchPath)
  },

  'Validate Basic Filter': browser => {
    const firstListing = listSearchPage(browser).section.firstStandardListing
    listSearchPage(browser).validateBasicFilters(browser, firstListing, listSearchPath)
  },

  'Change to a second city and Setup Filters': browser => {
    browser
      .url(`${browser.launchUrl}${secondListSearchPath}`)
      .waitForElementVisible('#react-view')
      .page.large.listSearch().section.firstStandardListing
      .waitForElementVisible('@name')
    listSearchPage(browser).setupBasicFilters(browser, secondListSearchPath)
  },

  'Validate Change to second city': browser => {
    const firstListing = listSearchPage(browser).section.firstStandardListing
    listSearchPage(browser).validateBasicFilters(browser, firstListing, secondListSearchPath)
  },

  'Validate Url on Map View': browser => {
    listSearchPage(browser).validateMapViewUrl(browser, mapPath)
  },
}
