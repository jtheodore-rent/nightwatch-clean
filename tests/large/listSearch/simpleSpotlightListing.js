const listSearchPath = '/apartments/Illinois/Chicago/'

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
      .setCookie({
        name: 'ui',
        value: 'adaptive',
        path: '/',
      })
      .setCookie({
        name: 'featureFlips',
        value: 'simpleSpotlight',
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

  'Validate key elements of spotlight listing': browser => {
    const listSearchPage = browser.page.large.listSearch()
    const spotlight = listSearchPage.section.spotlightListing
    listSearchPage.validateListingDetails(spotlight, 'Illinois', 'simple')
  },

  'Validate spotlight check availability button': browser => {
    const listSearchPage = browser.page.large.listSearch()
    const spotlight = listSearchPage.section.spotlightListing
    listSearchPage.validateCheckAvailabilityButtonClick(spotlight, browser)
  },

  'Verify clicking spotlight listing name opens PDP': browser => {
    const listSearchPage = browser.page.large.listSearch()
    const spotlight = listSearchPage.section.spotlightListing
    listSearchPage.validateSimpleSpotlightElementClickToPDPAndCloseTab(browser, spotlight, '@name')
  },
}
