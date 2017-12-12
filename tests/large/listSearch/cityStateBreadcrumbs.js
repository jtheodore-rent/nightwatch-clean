const listSearchPath = '/apartments/Texas/San-Antonio/'

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
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${listSearchPath}`)
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('San Antonio, TX')
  },

  'Validate Initial State': browser => {
    const header = browser.page.large.header()
    header.section.breadcrumbs.expect.element('@currentPage').text.to
      .equal('San Antonio')
    header.section.breadcrumbs.expect.element('@currentPage').to.be
      .visible.before(1000)
    header.section.breadcrumbs.expect.element('@stateBreadcrumb').text.to
      .equal('Texas')
    header.section.breadcrumbs.expect.element('@stateBreadcrumb').to.be
      .visible.before(1000)
    header.section.breadcrumbs.expect.element('@homeBreadcrumb').text.to
        .equal('Home')
    header.section.breadcrumbs.expect.element('@homeBreadcrumb').to.be
        .visible.before(1000)
  },

  'Click and Verify State URL': browser => {
    const header = browser.page.large.header()
    header.section.breadcrumbs.click('@stateBreadcrumb')
      .waitForURLEquals(`${browser.launchUrl}/apartments/Texas/`)
  },

  'Navigate Back to Search Page': browser => {
    // currently not working in master
    // browser.page.large.listSearch().click('@searchButton')
    // work around
    browser.url(`${browser.launchUrl}${listSearchPath}`)
      .waitForURLEquals(`${browser.launchUrl}${listSearchPath}`)
  },

  'Click And Verify Home Page': browser => {
    const header = browser.page.large.header()
    header.section.breadcrumbs.click('@homeBreadcrumb')
      .waitForURLEquals(`${browser.launchUrl}/`)
  },
}
