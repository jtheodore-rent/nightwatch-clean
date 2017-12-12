const losAngelesListPath = '/apartments/California/Los-Angeles/'
const yakuZipListPath = '/zip/99689-Apartments-For-Rent/'
const zipMapPath = '/map/?zip=63123'
const stlZipListPath = '/zip/63123-Apartments-For-Rent/'

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

  'Execute Zip Search, Partial Entry': browser => {
    browser.page.small.header().searchByClickingFirstOption(browser, {
      query: '99689',
      expectedQueryText: '99689, AK',
      path: `${yakuZipListPath}`,
    })
  },

  'Validate Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${yakuZipListPath}`)
    browser.expect.element('head > title').attribute('text').to
      .match(/Apartments for Rent in 99689, Yakutat, AK/)
    browser.page.small.gridSearch().section.firstStandardListing.expect.element('@name')
      .to.be.visible.before(1000)
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('99689, AK')
    browser.page.small.gridSearch().expect.element('@heading').text.to
      .match(/Apartments for Rent in or near 99689, AK/)
  },

  'Navigate to Map View': browser => {
    browser.page.small.gridSearch().click('@mapViewButton')
  },

  'Wait for Map Page to display': browser => {
    browser.page.small.mapSearch().waitForElementVisible('@listViewButton')
    browser.page.small.mapSearch().waitForElementVisible('@mapboxCanvas')
  },

  'Execute Zip Search on Map Page': browser => {
    browser.page.small.header().searchByClickingFirstOption(browser, {
      query: '63123',
      expectedQueryText: '63123, MO',
      path: `${zipMapPath}`,
    })
  },

  'Validate Map Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${zipMapPath}`)
    browser.expect.element('head > title').attribute('text').to
      .equal('Apartments for Rent - Your Trusted Apartment Finder Tool at ApartmentGuide.com')
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('63123, MO')
  },

  'Navigate back to List View': browser => {
    browser.page.small.mapSearch().click('@listViewButton')
    browser.page.small.gridSearch().waitForElementVisible('@mapViewButton')
  },

  'Validate List Search Page Again': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${stlZipListPath}`)
    browser.expect.element('head > title').attribute('text').to
      .match(/Apartments for Rent in 63123, Saint Louis, MO/)
    browser.page.small.gridSearch().section.firstStandardListing.expect.element('@name')
      .to.be.visible.before(1000)
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('63123, MO')
    browser.page.small.gridSearch().expect.element('@heading').text.to
      .match(/Apartments for Rent in or near 63123, MO/)
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
