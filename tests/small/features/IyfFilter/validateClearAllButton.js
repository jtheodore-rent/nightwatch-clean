const gridViewPath = '/apartments/Alaska/Yakutat/'
const refinementsPath = '/3-baths-washer-and-dryer-in-unit-3-stars-rating-pets-1z141x2+31+4lv+4ib'

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
      .url(`${browser.launchUrl}${gridViewPath}${refinementsPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Open expanded filter panel to test expanded filter': browser => {
    browser.page.small.filtersOverlay().click('@moreFiltersToggle')
  },

  'Click clearAllButton': browser => {
    const iyfFiltersOverlay = browser.page.small.iyfFiltersOverlay()
    iyfFiltersOverlay.click('@clearAllButton')
  },

  'Verify grid search Page URL contains expected refinements': browser => {
    const expectedURL = [
      `${browser.launchUrl}`,
      `${gridViewPath}`,
    ].join('')
    browser.page.small.filtersOverlay().click('@applyFilterButton')
      .waitForURLEquals(expectedURL)
  },

}
