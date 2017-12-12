const listSearchPath = '/apartments/Texas/College-of-Biblical-Studies--Houston/'

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

  'Validate Initial State': browser => {
    const header = browser.page.large.header()
    browser.assert.urlEquals(`${browser.launchUrl}${listSearchPath}`)
    header.section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('College of Biblical Studies  Houston, TX')
    header.section.breadcrumbs.expect.element('@currentPage').text.to
      .equal('College of Biblical Studies--Houston')
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
      .page.large.listSearch().section.firstStandardListing
      .waitForElementVisible('@image0')
  },

  'Click And Verify Home Page': browser => {
    const header = browser.page.large.header()
    header.section.breadcrumbs.click('@homeBreadcrumb')
      .waitForURLEquals(`${browser.launchUrl}/`)
  },
}
