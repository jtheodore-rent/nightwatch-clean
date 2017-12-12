const listSearchPath = '/apartments/California/Los-Angeles/'

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

  'Validate College Apartments': browser => {
    const listSearchPage = browser.page.large.listSearch()
    listSearchPage.validateCollegeSearch(browser)
    listSearchPage.section.firstStandardListing.waitForElementVisible('@image0')
  },

  'Validate Military Apartments': browser => {
    const listSearchPage = browser.page.large.listSearch()
    listSearchPage.validateMilitarySearch(browser)
    listSearchPage.section.firstStandardListing.waitForElementVisible('@image0')
  },

  'Validate Corporate Apartments': browser => {
    const listSearchPage = browser.page.large.listSearch()
    listSearchPage.validateCorporateSearch(browser)
    listSearchPage.section.firstStandardListing.waitForElementVisible('@image0')
  },

  'Validate Senior Apartments': browser => {
    const listSearchPage = browser.page.large.listSearch()
    listSearchPage.validateSeniorSearch(browser)
    listSearchPage.section.firstStandardListing.waitForElementVisible('@image0')
  },
}
