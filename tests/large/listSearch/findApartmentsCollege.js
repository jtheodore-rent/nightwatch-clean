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

  'Click nearby College base from Findapartment window and first link': browser => {
    const listSearch = browser.page.large.listSearch()
    listSearch.openNearbyModalAndClickFirstLink(listSearch, 'Colleges')
  },

  'Verify breadcrumb,H1, URL and First listing display on College SRP': browser => {
    const header = browser.page.large.header()
    header.section.breadcrumbs.expect.element('@currentPage').text.to
      .equal('Agnes Scott College')
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
       .equal('Apartments for rent in Agnes Scott College, GA')
    browser.assert.urlEquals(`${browser.launchUrl}/apartments/Georgia/Agnes-Scott-College/`)
    browser.page.large.listSearch().section.firstStandardListing.expect.element('@name')
       .to.be.visible.before(1000)
  },
}
