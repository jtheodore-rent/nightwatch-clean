const listSearchPath = '/apartments/Alaska/Yakutat/2-beds-1z141y8/'

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
      .setCookie({
        name: 'featureFlips',
        value: 'listingRefinementBedroom',
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

  'Validate Bed Criteria is reflected on search': browser => {
    const url = '/apartments/Alaska/Yakutat/'
    const firstListing = listSearchPage(browser).section.firstStandardListing
    listSearchPage(browser).validateBedSearchCriteria(browser, firstListing, url)
  },
}
