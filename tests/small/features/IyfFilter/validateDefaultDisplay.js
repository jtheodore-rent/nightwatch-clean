const listViewPath = '/apartments/Alaska/Yakutat/'
const appliedFilters = '1-beds-from-400-under-1200-1z141xt/'

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
      .url(`${browser.launchUrl}${listViewPath}${appliedFilters}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate iyf Filter Panel does not open when price or bed filter have been applied': browser => {
    const gridSearch = browser.page.small.gridSearch()
    gridSearch.expect.element('@filterPanel').to.not.be.present()
  },

  'Navigate to Grid View with no filters applied': browser => {
    browser
    .url(`${browser.launchUrl}${listViewPath}`)
    .waitForElementVisible('#react-view')
  },

  'Validate iyf Filter Panel opens on list view when no price or bed filters are applied': browser => {
    const gridSearch = browser.page.small.gridSearch()
    gridSearch.expect.element('@filterPanel').to.be.present()
  },

  'Close iyf Filter Panel and reload page': browser => {
    browser.page.small.iyfFiltersOverlay().click('@closeButton')
    .waitForElementNotPresent('@applyFilterButton', () => {
      browser.refresh()
    })
  },

  'Validate iyf Filter does not open after user has closed it or applied filters': browser => {
    const gridSearch = browser.page.small.gridSearch()
    gridSearch.expect.element('@filterPanel').to.not.be.present()
  },
}
