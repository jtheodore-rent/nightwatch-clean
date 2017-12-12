const mapSearchPath = '/map/?city=Los-Angeles&state=California'

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
      .url(`${browser.launchUrl}${mapSearchPath}`)
      .waitForURLEquals(`${browser.launchUrl}${mapSearchPath}`)
      .waitForElementVisible('#react-view')
      .page.large.mapSearch().section.firstStandardListing
      .waitForElementVisible('@image0')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'validate apartment types modal': browser => {
    const mapSearch = browser.page.large.mapSearch()
    mapSearch.validateCollegeSearch(browser)
    browser.page.large.mapSearch().section.firstStandardListing
      .waitForElementVisible('@image0')

    mapSearch.validateMilitarySearch(browser)
    browser.page.large.mapSearch().section.firstStandardListing
      .waitForElementVisible('@image0')

    mapSearch.validateCorporateSearch(browser)
    browser.page.large.mapSearch().section.firstStandardListing
      .waitForElementVisible('@image0')

    mapSearch.validateSeniorSearch(browser)
    browser.page.large.mapSearch().section.firstStandardListing
      .waitForElementVisible('@image0')
  },
}
