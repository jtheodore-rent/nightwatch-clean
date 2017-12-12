const mdot = 'http://m.qa.apartmentguide.com/'
const mdotRedirect = 'https://www.qa.apartmentguide.com/'

module.exports = {
  tags: ['critical', 'stableAndroid', 'stableIOS', 'stableProd'],
  before: browser => {
    browser
      .url(mdot)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate mdot Redirect to www': browser => {
    browser.assert.urlEquals(mdotRedirect)
    .waitForElementVisible('#react-view')
  },
}
