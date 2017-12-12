const listSearchPath = '/apartments/Georgia/Atlanta/'

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

  'Click Find Apartment from SRP Header': browser => {
    const header = browser.page.large.header()
    header.section.mainNavigation.waitForElementVisible('@findApartmentsMenu')
      .click('@findApartmentsMenu')
  },

  'Open Nearby Neighborhoods Modal and Click First link': browser => {
    const listSearch = browser.page.large.listSearch()
    listSearch.openNearbyModalAndClickFirstLink(listSearch, 'Neighborhoods')
  },

  'Validate Neighborhood SRP': browser => {
    const header = browser.page.large.header()
    header.section.breadcrumbs.expect.element('@currentPage').text.to
      .equal('Ansley-Park')
    header.section.breadcrumbs.expect.element('@currentPage').to.be
      .visible.before(1000)
    header.section.breadcrumbs.expect.element('@stateBreadcrumb').text.to
      .equal('Georgia')
    header.section.breadcrumbs.expect.element('@stateBreadcrumb').to.be
      .visible.before(1000)
    header.section.breadcrumbs.expect.element('@homeBreadcrumb').text.to
       .equal('Home')
    header.section.breadcrumbs.expect.element('@homeBreadcrumb').to.be
       .visible.before(1000)
    browser.page.large.listSearch().expect.element('@h1Tag').text.to
       .equal('Ansley Park Apartments for Rent - Atlanta, GA')
    browser.assert.urlEquals(`${browser.launchUrl}/neighborhoods/Georgia/Atlanta/Ansley-Park/`)
    browser.page.large.listSearch().section.firstStandardListing.expect.element('@name')
       .to.be.visible.before(1000)
  },
}
