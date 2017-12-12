const listViewPath = '/apartments/Alaska/Yakutat/'

module.exports = {
  tags: ['stableAndroid', 'stableIOS', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'featureFlips',
        value: 'iyfFilters',
        path: '/',
      })
      .pause(500)
      .url(`${browser.launchUrl}${listViewPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Open expanded filter panel': browser => {
    browser.page.small.filtersOverlay().click('@moreFiltersToggle')
  },

  'Validate iyf Filter shows expanded filter options': browser => {
    const gridSearch = browser.page.small.gridSearch()
    gridSearch.expect.element('@expandedFilterPanel').to.be.present()
  },

  'Close expanded filter panel': browser => {
    browser.page.small.filtersOverlay().click('@moreFiltersToggle')
  },

  'Validate clicking Show Less Filters closes expanded filter options': browser => {
    const gridSearch = browser.page.small.gridSearch()
    gridSearch.expect.element('@expandedFilterPanel').to.not.be.present()
  },

}
