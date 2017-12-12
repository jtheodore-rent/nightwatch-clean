const listViewPath = '/apartments/Alaska/Yakutat/'
const appliedPrice = 'from-1800-under-13000/'

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
      .url(`${browser.launchUrl}${listViewPath}${appliedPrice}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Open iyf FilterPanel': browser => {
    browser
      .page
      .small
      .gridSearch()
      .click('@filterButton')
      .waitForElementVisible('@filterPanel')
  },

  'Validate the price slider remembers the selected price when reopened': browser => {
    const filterOverlay = browser.page.small.filtersOverlay()
    filterOverlay.expect.element('@minSelectedPrice').attribute('data-test-value').to.equal('1800')
    filterOverlay.expect.element('@maxSelectedPrice').attribute('data-test-value').to.equal('13000')
  },

}
