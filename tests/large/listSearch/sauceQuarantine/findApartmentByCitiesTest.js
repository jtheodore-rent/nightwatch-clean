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

  'Open Nearby Cities Modal and Click First link': browser => {
    const listSearch = browser.page.large.listSearch()
    listSearch.openNearbyModalAndClickFirstLink(listSearch, 'Cities')
  },

  'Validate Nearby Cities SRP': browser => {
    const header = browser.page.large.header()
    header.section.breadcrumbs.expect.element('@currentPage').text.to
      .equal('Acworth')
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
       .equal('Apartments for rent in Acworth, GA')
    browser.assert.urlEquals(`${browser.launchUrl}/apartments/Georgia/Acworth/`)
    browser.page.large.listSearch().section.firstStandardListing.expect.element('@name')
       .to.be.visible.before(1000)
  },
}
