const listSearchPath = '/apartments/Georgia/Atlanta/'
const cityListPath = '/apartments/Texas/San-Antonio/'
const stateListPath = '/apartments/Texas/'

module.exports = {
  tags: ['quarantineQA', 'quarantineProd'],
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
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate intitial state of Search Page': browser => {
    const header = browser.page.large.header()
    browser.assert.urlEquals(`${browser.launchUrl}${listSearchPath}`)
    header.section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Atlanta, GA')
  },

  'Open Find Apartments Menu': browser => {
    const header = browser.page.large.header()
    header.section.mainNavigation.waitForElementVisible('@findApartmentsMenu')
      .click('@findApartmentsMenu')
  },

  'Click By State link': browser => {
    const header = browser.page.large.header()
    const findApartmentsState = browser.page.large.findApartmentsState()
    header.section.mainNavigation.waitForElementVisible('@byStateLink')
      .click('@byStateLink', () => {
        findApartmentsState.waitForElementVisible('@stateMainHeading')
      })
  },

  'Verify display of State Page': browser => {
    const header = browser.page.large.header()
    const findApartmentsState = browser.page.large.findApartmentsState()
    header.section.breadcrumbs.waitForElementVisible('@homeBreadcrumb')
    header.section.breadcrumbs.expect.element('@homeBreadcrumb').text.to
    .equal('Home')
    findApartmentsState.expect.element('@stateMainHeading').text.to
    .equal('Find apartments for rent across the U.S.!')
    browser.assert.urlEquals(`${browser.launchUrl}/apartments/`)
  },

  'Click a State Link': browser => {
    browser.page.large.findApartmentsState().clickState(browser, 'Texas')
    browser.assert.urlEquals(`${browser.launchUrl}${stateListPath}`)
  },

  'Click letter on city selection page': browser => {
    browser.page.large.findApartmentsCity().clickLetterLink(browser, 'S')
  },

  'Click a City Link': browser => {
    browser.page.large.findApartmentsCity().clickCity(browser, 'Texas', 'San-Antonio')
    browser.assert.urlEquals(`${browser.launchUrl}${cityListPath}`)
  },

  'Verify resulting SRP URL, Title, searchBar, FisrtStandardListing': browser => {
    const header = browser.page.large.header()
    browser.assert.urlEquals(`${browser.launchUrl}${cityListPath}`)
    browser.expect.element('title').attribute('text')
      .to.match(/Apartments for Rent in San Antonio, TX - \d+ Rentals | ApartmentGuide\.com/)
    header.section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('San Antonio, TX')
    browser.page.large.listSearch().section.firstStandardListing.expect.element('@name')
      .to.be.visible.before(1000)
  },
}
