const losAngelesListPath = '/apartments/California/Los-Angeles/'
const seattleHood = '/neighborhoods/Washington/Seattle/Lake-Union/'
const atlHoodMap = '/map/?neighborhood=Buckhead&city=Atlanta&state=Georgia'
const atlHood = '/neighborhoods/Georgia/Atlanta/Buckhead/'

module.exports = {
  tags: ['stableAndroid', 'quarantineIOS', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${losAngelesListPath}`)
      .waitForElementVisible('#react-view')
      .page.small.gridSearch().section.firstStandardListing.waitForElementVisible('@name')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Execute Neighborhood Search': browser => {
    browser.page.small.header().section.searchBar.setValue('@textInput', 'Lake Union, Seattle')
  },

  'Verify and Click First Search Option': browser => {
    browser.page.small.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .expect.element('@firstSearchOption').text.to.equal('Lake Union, Seattle, WA')
    browser.page.small.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .click('@firstSearchOption').waitForURLEquals(`${browser.launchUrl}${seattleHood}`)
  },

  'Navigate to Map View': browser => {
    browser.page.small.gridSearch().click('@mapViewButton')
  },

  'Wait for Map Page to display': browser => {
    browser.page.small.mapSearch().waitForElementVisible('@listViewButton')
    browser.page.small.mapSearch().waitForElementVisible('@mapboxCanvas')
  },

  'Enter Partial Search Query On Map Page': browser => {
    browser.page.small.header().section.searchBar.setValue('@textInput', 'Buckhead, Atlanta')
  },

  'Verify and Click First Search Option on Map Page': browser => {
    browser.page.small.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .expect.element('@firstSearchOption').text.to.equal('Buckhead, Atlanta, GA')
    browser.page.small.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .click('@firstSearchOption').waitForURLEquals(`${browser.launchUrl}${atlHoodMap}`)
  },

  'Validate Map Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${atlHoodMap}`)
    browser.expect.element('head > title').attribute('text').to
      .equal('Apartments for Rent - Your Trusted Apartment Finder Tool at ApartmentGuide.com')
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Buckhead, Atlanta, GA')
  },

  'Navigate back to List View': browser => {
    browser.page.small.mapSearch().click('@listViewButton')
    browser.page.small.listSearch().waitForElementVisible('@mapViewButton')
  },

  'Validate Final List Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${atlHood}`)
    browser.expect.element('head > title').attribute('text').to
      .match(/Buckhead Apartments for Rent - Atlanta, GA | ApartmentGuide.com/)
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Buckhead, Atlanta, GA')
    browser.page.small.gridSearch().expect.element('@heading').text.to
      .match(/Buckhead Apartments for Rent - Atlanta, GA/)
  },
}
