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

  'Click Find Apartment from SRP Header': browser => {
    const header = browser.page.large.header()
    header.section.mainNavigation.waitForElementVisible('@findApartmentsMenu')
      .click('@findApartmentsMenu')
  },

  'Open Nearby Zip Code Modal and Click First Link': browser => {
    const listSearch = browser.page.large.listSearch()
    listSearch.clickNearbyZipLink(listSearch, 'Zips')
  },

  'Validate Zip Code SRP': browser => {
    const header = browser.page.large.header()
    header.section.breadcrumbs.expect.element('@currentPage').to.be
      .visible.before(1000)
    header.section.breadcrumbs.expect.element('@currentPage').text.to
      .equal('30318')
    header.section.breadcrumbs.expect.element('@homeBreadcrumb').to.be
      .visible.before(1000)
    header.section.breadcrumbs.expect.element('@homeBreadcrumb').text.to
      .equal('Home')
    browser.page.large.listSearch().expect.element('@h1Tag').text.to
      .equal('Apartments for Rent in or near 30318, GA')
    browser.assert.urlEquals(`${browser.launchUrl}/zip/30318-Apartments-For-Rent/`)
    browser.page.large.listSearch().section.firstStandardListing.expect.element('@name')
      .to.be.visible.before(1000)
  },
}
