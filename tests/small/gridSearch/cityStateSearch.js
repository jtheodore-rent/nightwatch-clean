const losAngelesListPath = '/apartments/California/Los-Angeles/'
const yakutatListPath = '/apartments/Alaska/Yakutat/'
const yakutatMapPath = '/map/?city=Yakutat&state=Alaska'

module.exports = {
  tags: ['critical', 'stableAndroid', 'quarantineIOS', 'stableProd'],
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

  'Execute City State Search, Partial Entry': browser => {
    browser.page.small.header().searchByClickingFirstOption(browser, {
      query: 'Yaku',
      expectedQueryText: 'Yakutat, AK',
      path: `${yakutatListPath}`,
    })
  },

  'Validate Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${yakutatListPath}`)
    browser.expect.element('head > title').attribute('text').to
      .match(/Apartments For Rent in Yakutat, AK - \d+ Rentals | ApartmentGuide.com/)
    browser.page.small.gridSearch().section.firstStandardListing.expect.element('@name')
      .to.be.visible.before(1000)
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Yakutat, AK')
    browser.page.small.gridSearch().expect.element('@heading').text.to
      .match(/Apartments for rent in Yakutat, AK/)
  },

  'Navigate to Map View': browser => {
    browser.page.small.gridSearch().click('@mapViewButton')
  },

  'Wait for Map Page to display': browser => {
    browser.page.small.mapSearch().waitForElementVisible('@listViewButton')
    browser.page.small.mapSearch().waitForElementVisible('@mapboxCanvas')
  },

  'Validate Map Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${yakutatMapPath}`)
    browser.expect.element('head > title').attribute('text').to
      .equal('Apartments for Rent - Your Trusted Apartment Finder Tool at ApartmentGuide.com')
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Yakutat, AK')
  },

  'Navigate back to List View': browser => {
    browser.page.small.mapSearch().click('@listViewButton')
    browser.page.small.gridSearch().waitForElementVisible('@mapViewButton')
  },

  'Validate List Search Page Again': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${yakutatListPath}`)
    browser.expect.element('head > title').attribute('text').to
      .match(/Apartments For Rent in Yakutat, AK - \d+ Rentals | ApartmentGuide.com/)
    browser.page.small.gridSearch().section.firstStandardListing.expect.element('@name')
      .to.be.visible.before(1000)
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Yakutat, AK')
    browser.page.small.gridSearch().expect.element('@heading').text.to
      .match(/Apartments for rent in Yakutat, AK/)
  },

  'Search a second time': browser => {
    browser.page.small.header().searchByEnterFirstOption(browser, {
      query: 'Los Angeles, CA',
      expectedQueryText: 'Los Angeles, CA',
      path: `${losAngelesListPath}`,
    })
  },

  'Validate Final List Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${losAngelesListPath}`)
    browser.expect.element('head > title').attribute('text').to
      .match(/Apartments For Rent in Los Angeles, CA - \d{1,} Rentals | ApartmentGuide.com/)
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Los Angeles, CA')
    browser.page.small.gridSearch().expect.element('@heading').text.to
      .match(/Apartments for rent in Los Angeles, CA/)
  },
}
