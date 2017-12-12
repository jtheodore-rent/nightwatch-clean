const listSearchPath = '/apartments/California/Los-Angeles/'
const seattleNeighborhoodList = '/neighborhoods/Washington/Seattle/Lake-Union/'
const seattleNeighborhoodMap = '/map/?neighborhood=Lake-Union&city=Seattle&state=Washington'

module.exports = {
  before: browser => {
    browser
      .url(`${browser.launchUrl}${listSearchPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.end()
  },

  'Enter search query': browser => {
    browser.page.small.header().section.searchBar.setValue('@textInput', 'Lake Union, S')
  },

  'Verify and Click First Search Option': browser => {
    browser.page.small.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .expect.element('@firstSearchOption').text.to.equal('Lake Union, Seattle, WA')
    browser.page.small.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .click('@firstSearchOption')
      .waitForURLEquals(`${browser.launchUrl}${seattleNeighborhoodList}`)
  },

  'Validate Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${seattleNeighborhoodList}`)
    browser.expect.element('head > title').attribute('text').to
      .match(/Apartments for Rent in Lake Union, Seattle, WA - \d{1,} Rentals/)
    browser.page.small.listSearch().section.firstStandardListing.expect.element('@address')
      .text.to.match(/\w{1,}, WA 98\d{3}/)
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Lake Union, Seattle, WA')
  },

  'Navigate to Map View': browser => {
    browser.page.small.listSearch().click('@mapViewButton')
  },

  'Wait for Map Page to display': browser => {
    browser.page.small.mapSearch().waitForElementVisible('@listViewButton')
    browser.page.small.mapSearch().waitForElementVisible('@mapboxCanvas')
  },

  'Validate Map Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${seattleNeighborhoodMap}`)
    browser.expect.element('head > title').attribute('text').to
      .equal('Apartments for Rent - Your Trusted Apartment Finder Tool at ApartmentGuide.com')
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Lake Union, Seattle, WA')
  },

  'Navigate back to List View': browser => {
    browser.page.small.mapSearch().click('@listViewButton')
    browser.page.small.listSearch().waitForElementVisible('@mapViewButton')
  },

  'Validate List Search Page Again': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${seattleNeighborhoodList}`)
    browser.expect.element('head > title').attribute('text').to
      .match(/Apartments for Rent in Lake Union, Seattle, WA - \d{1,} Rentals/)
    browser.page.small.listSearch().section.firstStandardListing.expect.element('@address')
      .text.to.match(/\w{1,}, WA 98\d{3}/)
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Lake Union, Seattle, WA')
  },

  'Search a second time': browser => {
    browser.page.small.header().section.searchBar.setValue('@textInput', 'Los Angeles, CA')
  },

  'Execute second search': browser => {
    browser.page.small.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .expect.element('@firstSearchOption').text.to.equal('Los Angeles, CA')
    browser.page.small.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .click('@firstSearchOption')
      .waitForURLEquals(`${browser.launchUrl}/apartments/California/Los-Angeles/`)
  },

  'Validate Final List Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/apartments/California/Los-Angeles/`)
    browser.expect.element('head > title').attribute('text').to
      .match(/Apartments For Rent in Los Angeles, CA - \d{1,} Rentals/)
    browser.page.small.listSearch().section.firstStandardListing.expect.element('@address')
      .text.to.match(/\w{1,}, CA 9\d{4}/)
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Los Angeles, CA')
  },
}
