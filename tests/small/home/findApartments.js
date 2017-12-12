const cityListPath = '/apartments/Georgia/Atlanta/'
const stateListPath = '/apartments/Georgia/'

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
      .refresh()
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate URL and Title': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/`)
    browser.expect.element('title').attribute('text').to.equal('')
  },

  'Validate Find Apartments and Verify URL': browser => {
    browser.page.small.navMenu().openNavMenuAndClickLink(browser, '@findAptlink')
    browser.waitForURLEquals(`${browser.launchUrl}/apartments/`)
  },

  'Click a State Link': browser => {
    browser.page.small.findApartmentsState().clickState(browser, 'Georgia')
    browser.waitForURLEquals(`${browser.launchUrl}${stateListPath}`)
  },

  'Click a City Link': browser => {
    browser.page.small.findApartmentsCity().clickCity(browser, 'Georgia', 'Atlanta')
    browser.waitForURLEquals(`${browser.launchUrl}${cityListPath}`)
  },

  'Validate Search Page': browser => {
    browser.waitForURLEquals(`${browser.launchUrl}${cityListPath}`)
    browser.expect.element('title').attribute('text').to
    .match(/Apartments for Rent in Atlanta, GA/)
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
    .to.equal('Atlanta, GA')
    browser.page.small.gridSearch().expect.element('@heading').text.to
      .match(/Apartments for rent in Atlanta, GA/)
  },
}
