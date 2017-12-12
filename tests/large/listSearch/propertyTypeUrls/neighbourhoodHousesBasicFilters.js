const neighborhoodSearchPath = '/neighborhoods/Georgia/Atlanta/Buckhead/'
const housesPath = '/buckhead-atlanta-ga/houses/'
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
      .url(`${browser.launchUrl}${neighborhoodSearchPath}`)
      .waitForURLEquals(`${browser.launchUrl}${neighborhoodSearchPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Click Property Type Houses': browser => {
    listSearchPage(browser).section.propertyType.waitForElementVisible('@housesLink')
      .click('@housesLink')
  },

  'Set Up Basic Filters': browser => {
    listSearchPage(browser).setupBasicFilters(browser, housesPath)
  },

  'Validate Basic Filter': browser => {
    const firstListing = listSearchPage(browser).section.firstStandardListing
    listSearchPage(browser).validateBasicFilters(browser, firstListing, housesPath)
  },

  'Validate Page Title': browser => {
    listSearchPage(browser).expect.element('@h1Tag').text.to
      .equal('Houses for rent in Buckhead, Atlanta, GA')
  },

  'Validate Property Type Title': browser => {
    listSearchPage(browser).section.propertyType.expect.element('@h2Tag').text.to
      .equal('Property Type')
  },
}
