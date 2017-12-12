const zipSearchQueryPath = '/zip/30342-Apartments-For-Rent/?min_price=1000&max_price=3000'
const neighborhoodSearchQueryPath = '/neighborhoods/Georgia/Atlanta/Buckhead/?min_price=500'

module.exports = {
  tags: ['critical', 'stableAndroid', 'stableIOS', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${zipSearchQueryPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Verify navigated to a zip price refinement url': browser => {
    const expected = '/zip/30342-Apartments-For-Rent/from-1000-under-3000/'
    browser.assert.urlEquals(`${browser.launchUrl}${expected}`)
  },

  'Navigate to a neighorhood url with query param prices': browser => {
    browser
      .url(`${browser.launchUrl}${neighborhoodSearchQueryPath}`)
      .waitForElementVisible('#react-view')
  },

  'Verify navigated to a neighborhood price refinement url': browser => {
    const expected = '/neighborhoods/Georgia/Atlanta/Buckhead/from-500/'
    browser.assert.urlEquals(`${browser.launchUrl}${expected}`)
  },
}
