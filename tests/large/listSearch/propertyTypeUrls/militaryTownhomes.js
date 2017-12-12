const listSearchPath = '/apartments/Florida/Ussouthcom_U-S-Army-Garrison-Miami/'
const listSearchPage = browser => browser.page.large.listSearch()
const condosPath = '/ussouthcom_u-s-army-garrison-miami-fl/condos/'

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
      .url(`${browser.launchUrl}${listSearchPath}`)
      .waitForURLEquals(`${browser.launchUrl}${listSearchPath}`)
      .waitForElementVisible('#react-view')
      .page.large.listSearch().section.firstStandardListing
      .waitForElementVisible('@image0')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Click Property Type': browser => {
    listSearchPage(browser).section.propertyType.waitForElementVisible('@condosLink')
      .click('@condosLink')
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
      .equal('Condos for rent near USSOUTHCOM/U S Army Garrison-Miami, FL')
  },
}
