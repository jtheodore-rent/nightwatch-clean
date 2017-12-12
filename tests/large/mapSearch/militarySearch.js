const cityMapPath = '/map/?city=Los-Angeles&state=California'
const militaryMapPath = '/map/?city=NAS-Oceana&state=Virginia'
const srpTitle = /Apartments for Rent in NAS Oceana, VA - \d+ Rentals/

module.exports = {
  tags: ['stableFirefox', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${cityMapPath}`)
      .waitForURLEquals(`${browser.launchUrl}${cityMapPath}`)
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
    browser.page.large.header().section.searchBar.setValue('@textInput', 'NAS Oceana')
  },

  'Verify and Click First Search Option': browser => {
    const militaryListingHref = "[href='/apartments/Virginia/Virginia-Beach/Harpers-Square/10109/']" // eslint-disable-line max-len
    const searchBar = browser.page.large.header().section.searchBar
    searchBar.waitForElementVisible('@firstSearchOption').expect.element('@firstSearchOption')
      .text.to.equal('NAS Oceana, VA')
    searchBar.click('@firstSearchOption').waitForElementVisible(militaryListingHref)
  },

  'Validate Map Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${militaryMapPath}`)
    browser.page.large.title().validateDefaultTitle(browser)
    const firstStandardListing = browser.page.large.mapSearch().section.firstStandardListing
    firstStandardListing.expect.element('@address').text.to.match(/\w+\D+/)
    firstStandardListing.expect.element('@address').text.to.include(', VA')
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('NAS Oceana, VA')
    browser.page.shared.headTags().validate({
      meta: { robots: 'noindex,follow' },
      canonical: `${browser.launchUrl}${militaryMapPath}`,
    })
  },

  'Navigate to List View': browser => {
    const militaryListPath = '/apartments/Virginia/NAS-Oceana/'
    browser.page.large.mapSearch().click('@listViewButton')
      .waitForURLEquals(`${browser.launchUrl}${militaryListPath}`)
  },

  'Validate List Search Page': browser => {
    const militaryListPath = '/apartments/Virginia/NAS-Oceana/'
    browser.assert.urlEquals(`${browser.launchUrl}${militaryListPath}`)
    browser.expect.element('title').attribute('text').to.match(srpTitle)
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('NAS Oceana, VA')
    browser.page.shared.headTags().validate({
      meta: { robots: false },
      canonical: `${browser.launchUrl}${militaryListPath}`,
    })
  },

  'Navigate back to Map View': browser => {
    browser.page.large.listSearch().click('@mapViewButton')
      .waitForURLEquals(`${browser.launchUrl}${militaryMapPath}`)
  },

  'Enter second search': browser => {
    const searchBar = browser.page.large.header().section.searchBar
    searchBar.setValue('@textInput', 'Los Angeles, CA')
    searchBar.waitForElementVisible('@firstSearchOption')
    searchBar.expect.element('@firstSearchOption').text.to.equal('Los Angeles, CA')
  },

  'Execute second search': browser => {
    const listingSelector = "[href='/apartments/California/Los-Angeles/Broadcast-Center-Apartments/6314/']" // eslint-disable-line max-len
    const searchBar = browser.page.large.header().section.searchBar
    searchBar.waitForElementVisible('@firstSearchOption')
    searchBar.click('@firstSearchOption')
    searchBar.waitForElementVisible(listingSelector)
  },

  'Validate Final Map Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${cityMapPath}`)
    browser.page.large.title().validateDefaultTitle(browser)
    const firstStandardListing = browser.page.large.mapSearch().section.firstStandardListing
    firstStandardListing.expect.element('@address').text.to.match(/\w+\D+/)
    firstStandardListing.expect.element('@address').text.to.include(', CA')
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Los Angeles, CA')
    browser.page.shared.headTags().validate({
      meta: { robots: 'noindex,follow' },
      canonical: `${browser.launchUrl}${cityMapPath}`,
    })
  },
}
