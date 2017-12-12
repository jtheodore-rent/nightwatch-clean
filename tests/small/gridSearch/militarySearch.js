const losAngelesListPath = '/apartments/California/Los-Angeles/'
const dobbinsArbListPath = '/apartments/Georgia/Dobbins-Arb/'
const robinsAfbMapPath = '/map/?city=Robins-AFB&state=Georgia'
const robinsAfbListPath = '/apartments/Georgia/Robins-AFB/'

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

  'Enter Partial Search Query': browser => {
    browser.page.small.header().section.searchBar.setValue('@textInput', 'Dobbins')
  },

  'Verify and Click First Search Option': browser => {
    browser.page.small.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .expect.element('@firstSearchOption').text.to.equal('Dobbins Arb, GA')
    browser.page.small.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .click('@firstSearchOption').waitForURLEquals(`${browser.launchUrl}${dobbinsArbListPath}`)
  },

  'Validate Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${dobbinsArbListPath}`)
    browser.expect.element('head > title').attribute('text').to
      .match(/Apartments For Rent in Dobbins ARB, GA - \d+ Rentals | ApartmentGuide.com/)
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Dobbins Arb, GA')
    browser.page.small.gridSearch().expect.element('@heading').text.to
      .match(/Apartments for rent in Dobbins ARB, GA/)
  },

  'Navigate to Map View': browser => {
    browser.page.small.gridSearch().click('@mapViewButton')
  },

  'Wait for Map Page to display': browser => {
    const dobbinsArbMapPath = '/map/?city=Dobbins-Arb&state=Georgia'
    browser.page.small.mapSearch().waitForElementVisible('@listViewButton')
    browser.page.small.mapSearch().waitForElementVisible('@mapboxCanvas')
     .waitForURLEquals(`${browser.launchUrl}${dobbinsArbMapPath}`)
  },

  'Enter Partial Search Query On Map Page': browser => {
    browser.page.small.header().section.searchBar.setValue('@textInput', 'Robins AF')
  },

  'Verify and Click First Search Option on Map Page': browser => {
    browser.page.small.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .expect.element('@firstSearchOption').text.to.equal('Robins AFB, GA')
    browser.page.small.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .click('@firstSearchOption').waitForURLEquals(`${browser.launchUrl}${robinsAfbMapPath}`)
  },

  'Validate Map Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${robinsAfbMapPath}`)
    browser.expect.element('head > title').attribute('text').to
      .equal('Apartments for Rent - Your Trusted Apartment Finder Tool at ApartmentGuide.com')
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Robins AFB, GA')
  },

  'Navigate back to List View': browser => {
    browser.page.small.mapSearch().click('@listViewButton')
    browser.page.small.gridSearch().waitForElementVisible('@mapViewButton')
      .waitForURLEquals(`${browser.launchUrl}${robinsAfbListPath}`)
  },

  'Validate Final List Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${robinsAfbListPath}`)
    browser.expect.element('head > title').attribute('text').to
      .match(/Apartments For Rent in Robins AFB, GA - \d{1,} Rentals | ApartmentGuide.com/)
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Robins AFB, GA')
    browser.page.small.gridSearch().expect.element('@heading').text.to
      .match(/Apartments for rent in Robins AFB, GA/)
  },
}
