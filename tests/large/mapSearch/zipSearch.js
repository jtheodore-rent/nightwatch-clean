const mapSearchPath = '/map/?city=Los-Angeles&state=California'
const zipListingSearch = '/zip/60601-Apartments-For-Rent/'
const zipMapSearch = '/map/?zip=60601'

module.exports = {
  tags: ['stableFirefox', 'critical', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${mapSearchPath}`)
      .waitForURLEquals(`${browser.launchUrl}${mapSearchPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Wait for Map Page to display': browser => {
    browser.page.large.mapSearch().waitForElementVisible('@listViewButton')
    browser.page.large.mapSearch().waitForElementVisible('@mapboxCanvas')
  },

  'Enter search query': browser => {
    browser.page.large.header().section.searchBar.setValue('@textInput', '60601')
  },

  'Verify and Click First Search Option': browser => {
    browser.page.large.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .expect.element('@firstSearchOption').text.to.equal('60601, IL')
    browser.page.large.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .click('@firstSearchOption').waitForURLEquals(`${browser.launchUrl}${zipMapSearch}`)
  },

  'Validate Map Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${zipMapSearch}`)
    browser.page.large.title().validateDefaultTitle(browser)
    browser.page.large.mapSearch().section.firstStandardListing.expect.element('@address')
      .text.to.match(/\w+\D+/)
    browser.page.large.mapSearch().section.firstStandardListing.expect.element('@address')
      .text.to.include(', IL')
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('60601, IL')
    browser.page.shared.headTags().validate({
      meta: { robots: 'noindex,follow' },
      canonical: `${browser.launchUrl}${zipMapSearch}`,
    })
  },

  'Navigate to List View': browser => {
    browser.page.large.mapSearch().click('@listViewButton')
      .waitForURLEquals(`${browser.launchUrl}${zipListingSearch}`)
  },

  'Validate List Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${zipListingSearch}`)
    browser.expect.element('title').attribute('text').to
      .equal('Apartments for Rent in 60601, Chicago, IL')
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('60601, IL')
    browser.page.shared.headTags().validate({
      meta: { robots: false },
      canonical: `${browser.launchUrl}${zipListingSearch}`,
    })
  },

  'Navigate back to Map View': browser => {
    browser.page.large.listSearch().click('@mapViewButton')
      .waitForURLEquals(`${browser.launchUrl}${zipMapSearch}`)
  },

  'Search a second time': browser => {
    browser.page.large.header().section.searchBar.setValue('@textInput', 'Los Angeles, CA')
  },

  'Execute second search': browser => {
    browser.page.large.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .expect.element('@firstSearchOption').text.to.equal('Los Angeles, CA')
    browser.page.large.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .click('@firstSearchOption').waitForURLEquals(`${browser.launchUrl}${mapSearchPath}`)
  },

  'Validate Final Map Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${mapSearchPath}`)
    browser.page.large.title().validateDefaultTitle(browser)
    browser.page.large.mapSearch().section.firstStandardListing.expect.element('@address')
      .text.to.match(/\w+\D+/)
    browser.page.large.mapSearch().section.firstStandardListing.expect.element('@address')
      .text.to.include(', CA')
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Los Angeles, CA')
    browser.page.shared.headTags().validate({
      meta: { robots: 'noindex,follow' },
      canonical: `${browser.launchUrl}${mapSearchPath}`,
    })
  },
}
