const mapSearchPath = '/map/?city=Los-Angeles&state=California'
const atlantaUniversityList = '/apartments/Georgia/Georgia-State-University/'
const atlantaUniversityMap = '/map/?city=Georgia-State-University&state=Georgia'

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
    browser.page.large.header().section.searchBar.setValue('@textInput', 'Georgia state')
  },

  'Verify and Click First Search Option': browser => {
    browser.page.large.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .expect.element('@firstSearchOption').text.to.equal('Georgia State University, GA')
    browser.page.large.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .click('@firstSearchOption').waitForURLEquals(`${browser.launchUrl}${atlantaUniversityMap}`)
  },

  'Validate Map Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${atlantaUniversityMap}`)
    browser.page.large.title().validateDefaultTitle(browser)
    browser.page.large.mapSearch().section.firstStandardListing.expect.element('@address')
      .text.to.match(/\w+\D+/)
    browser.page.large.mapSearch().section.firstStandardListing.expect.element('@address')
      .text.to.include(', GA')
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Georgia State University, GA')
    browser.page.shared.headTags().validate({
      meta: { robots: 'noindex,follow' },
      canonical: `${browser.launchUrl}${atlantaUniversityMap}`,
    })
  },

  'Navigate to List View': browser => {
    browser.page.large.mapSearch().click('@listViewButton')
      .waitForURLEquals(`${browser.launchUrl}${atlantaUniversityList}`)
  },

  'Validate List Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${atlantaUniversityList}`)
    browser.expect.element('title').attribute('text').to
      .match(/Apartments for Rent in Georgia State University, GA - \d+ Rentals/)
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Georgia State University, GA')
    browser.page.shared.headTags().validate({
      meta: { robots: false },
      canonical: `${browser.launchUrl}${atlantaUniversityList}`,
    })
  },

  'Navigate back to Map View': browser => {
    browser.page.large.listSearch().click('@mapViewButton')
      .waitForURLEquals(`${browser.launchUrl}${atlantaUniversityMap}`)
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
