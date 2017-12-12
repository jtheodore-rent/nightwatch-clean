const listSearchPath = '/apartments/Georgia/Atlanta/'

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

  'Click Find Apartment Menu from SRP Header': browser => {
    const header = browser.page.large.header()
    header.section.mainNavigation.waitForElementVisible('@findApartmentsMenu')
      .click('@findApartmentsMenu')
  },

  'Click Apartment Type link': browser => {
    const header = browser.page.large.header()
    header.section.mainNavigation.waitForElementVisible('@byApartmentTypes')
      .click('@byApartmentTypes')
  },

  'Click Corporate Apartments link': browser => {
    const listSearch = browser.page.large.listSearch()
    listSearch.waitForElementVisible('@corporateApartments')
      .click('@corporateApartments')
  },

  'Verify Corporate lander page': browser => {
    const header = browser.page.large.header()
    header.section.breadcrumbs.expect.element('@currentPage').to.be
      .visible.before(1000)
    header.section.breadcrumbs.expect.element('@currentPage').text.to
      .equal('Corporate')
    header.section.breadcrumbs.expect.element('@homeBreadcrumb').to.be
      .visible.before(1000)
    header.section.breadcrumbs.expect.element('@homeBreadcrumb').text.to
      .equal('Home')
    browser.page.large.corporateApartments().expect.element('@articleHeadline').text.to
      .equal('Corporate Apartments for Rent')
    browser.assert.urlEquals(`${browser.launchUrl}/corporate/`)
  },

  'Click a Link from corporate lander page': browser => {
    const corporateLander = browser.page.large.corporateApartments()
    corporateLander.waitForElementVisible('@articleBodyLinks')
      .click('@articleBodyLinks')
  },

  'Verify resulting corporate Search Result Page': browser => {
    const header = browser.page.large.header()
    header.section.breadcrumbs.expect.element('@stateBreadcrumb').text.to
     .equal('Georgia')
    header.section.breadcrumbs.expect.element('@stateBreadcrumb').to.be
      .visible.before(6000)
    header.section.breadcrumbs.waitForElementVisible('@homeBreadcrumb')
    header.section.breadcrumbs.expect.element('@homeBreadcrumb').text.to
      .equal('Home')
    browser.expect.element('title').attribute('text')
      .to.match(/^Corporate Apartments for Rent in Atlanta, GA$/)
    header.section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Atlanta, GA')
    browser.page.large.listSearch().section.firstStandardListing.expect.element('@name')
      .to.be.visible.before(1000)
  },
}
