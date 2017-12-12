const listSearchPath = '/apartments/Georgia/Atlanta/'
const condosPath = '/atlanta-ga/condos/'

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
      .page.large.listSearch().section.propertyType
      .waitForElementVisible('@condosLink')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Click Property Type Condos': browser => {
    listSearchPage(browser).section.propertyType.waitForElementVisible('@condosLink')
      .click('@condosLink').waitForURLEquals(`${browser.launchUrl}${condosPath}`)
  },

  'Set Up Basic Filters': browser => {
    listSearchPage(browser).setupBasicFilters(browser, condosPath)
  },

  'Validate Basic Filter': browser => {
    const firstListing = listSearchPage(browser).section.firstStandardListing
    listSearchPage(browser).validateBasicFilters(browser, firstListing, condosPath)
  },

  'Validate Page Title': browser => {
    listSearchPage(browser).expect.element('@h1Tag').text.to
      .equal('Condos for rent in Atlanta, GA')
  },
}
