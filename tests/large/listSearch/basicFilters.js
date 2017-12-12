const listSearchPath = '/apartments/Alaska/Yakutat/'
const chicagoPath = '/apartments/Illinois/Chicago/'
const mapPath = '/map/?city=Chicago&state=Illinois&refinements=2-beds-from-500-under-1500-1z141y8'

const listSearchPage = browser => browser.page.large.listSearch()

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
    const url = '/apartments/Alaska/Yakutat/'
    const firstListing = listSearchPage(browser).section.firstStandardListing
    listSearchPage(browser).validateBasicFilters(browser, firstListing, url)
    listSearchPage(browser).verifyFirstListingPlusFormat(browser, 1500)
  },

  'Validate clearing sort when updating refinement': browser => {
    const params = '?sortby=listingpricelow_desc'
    browser
      .url(`${browser.launchUrl}${listSearchPath}${params}`)
      .waitForURLEquals(`${browser.launchUrl}${listSearchPath}${params}`)
      .waitForElementVisible('#react-view')
      .page.large.listSearch().section.firstStandardListing
      .waitForElementVisible('@image0')
    listSearchPage(browser).validateClearSort(browser, listSearchPath)
  },

  'Change to Chicago and Setup Filters': browser => {
    browser
      .url(`${browser.launchUrl}${chicagoPath}`)
      .waitForURLEquals(`${browser.launchUrl}${chicagoPath}`)
      .waitForElementVisible('#react-view')
      .page.large.listSearch().section.firstStandardListing
      .waitForElementVisible('@image0')
    listSearchPage(browser).setupBasicFilters(browser, chicagoPath)
  },

  'Validate Change to Chicago': browser => {
    const url = '/apartments/Illinois/Chicago/'
    const firstListing = listSearchPage(browser).section.firstStandardListing
    listSearchPage(browser).validateBasicFilters(browser, firstListing, url)
  },

  'Validate Url on Map View': browser => {
    listSearchPage(browser).validateMapViewUrl(browser, mapPath)
  },
}
