const listSearchPath = '/apartments/California/Los-Angeles/'
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
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate Search page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${listSearchPath}`)
  },

  'Enter Price Low and Price High': browser => {
    const listSearch = browser.page.large.listSearch()
    listSearch.click('@priceFilter')
      .waitForElementVisible('@priceFilterLow')
      .clearValue('@priceFilterLow')
      .setValue('@priceFilterLow', '1000')
      .clearValue('@priceFilterHigh')
      .setValue('@priceFilterHigh', '2000')
      .click('@searchButton')
  },

  'Verify URL and Pirce Pills': browser => {
    const priceRefinments = 'from-1000-under-2000/'
    browser.waitForURLEquals(`${browser.launchUrl}${listSearchPath}${priceRefinments}`)
    browser.page.large.listSearch().waitForElementVisible('@priceLowPill')
      .waitForElementVisible('@priceHighPill')
  },

  'Verify Pice Range for First Standard Listing': browser => {
    listSearchPage(browser).verifyFirstListingPlusFormat(browser, 2000)
  },
}
