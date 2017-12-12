const universitySearchPath = '/apartments/Georgia/University-of-Georgia/'
const listSearchPage = browser => browser.page.large.listSearch()

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
      .url(`${browser.launchUrl}${universitySearchPath}`)
      .waitForURLEquals(`${browser.launchUrl}${universitySearchPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Click Property Type Houses': browser => {
    const universityHouse = '/university-of-georgia-ga/houses/'
    listSearchPage(browser).section.propertyType.waitForElementVisible('@housesLink')
      .click('@housesLink')
      .waitForURLEquals(`${browser.launchUrl}${universityHouse}`)
  },

  'Validate Page Title': browser => {
    listSearchPage(browser).expect.element('@h1Tag').text.to
      .equal('Houses for rent near University of Georgia, GA')
  },

  'Validate Property Type Title': browser => {
    listSearchPage(browser).section.propertyType.expect.element('@h2Tag').text.to
      .equal('Property Type')
  },
}
