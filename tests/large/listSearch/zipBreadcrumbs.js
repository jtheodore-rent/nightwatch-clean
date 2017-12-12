const zipSearchPath = '/zip/30049-Apartments-For-Rent/'

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
      .url(`${browser.launchUrl}${zipSearchPath}`)
      .waitForURLEquals(`${browser.launchUrl}${zipSearchPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate Search Page': browser => {
    const header = browser.page.large.header()
    browser.assert.urlEquals(`${browser.launchUrl}${zipSearchPath}`)
    header.section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('30049, GA')
    header.section.breadcrumbs.expect.element('@currentPage').text.to
      .equal('30049')
    header.section.breadcrumbs.expect.element('@currentPage').to.be
      .visible.before(1000)
    header.section.breadcrumbs.expect.element('@homeBreadcrumb').text.to
      .equal('Home')
    header.section.breadcrumbs.expect.element('@homeBreadcrumb').to.be
      .visible.before(1000)
  },

  'Click And Verify Home Page': browser => {
    const header = browser.page.large.header()
    header.section.breadcrumbs.click('@homeBreadcrumb')
      .waitForURLEquals(`${browser.launchUrl}/`)
  },
}
