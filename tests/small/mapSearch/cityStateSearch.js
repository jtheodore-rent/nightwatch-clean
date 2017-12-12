const losAngelesMapPath = '/map/?city=Los-Angeles&state=California'
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
    .url(`${browser.launchUrl}${losAngelesMapPath}`)
    .waitForElementVisible('#react-view')
    .page.small.mapSearch()
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Enter Partial Search Query': browser => {
    browser.page.small.header().section.searchBar.setValue('@textInput', 'Yaku')
  },

  'Verify and Click First Search Option': browser => {
    browser.page.small.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .expect.element('@firstSearchOption').text.to.equal('Yakutat, AK')
    browser.page.small.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .click('@firstSearchOption').waitForURLEquals(`${browser.launchUrl}${yakutatMapPath}`)
  },

  'Validate Map Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${yakutatMapPath}`)
    browser.expect.element('head > title').attribute('text').to
      .equal('Apartments for Rent - Your Trusted Apartment Finder Tool at ApartmentGuide.com')
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Yakutat, AK')
  },

  'Navigate to List View': browser => {
    browser.page.small.mapSearch().click('@listViewButton')
    browser.page.small.gridSearch().waitForElementVisible('@mapViewButton')
  },

  'Validate List Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${yakutatListPath}`)

    browser.getAttribute('title', 'text', result => {
      console.log(result.value) // eslint-disable-line no-console
    })

    browser.expect.element('head > title').attribute('text').to
      .match(/Apartments For Rent in Yakutat, AK - \d{1,} Rentals | ApartmentGuide.com/)
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Yakutat, AK')
    browser.page.small.gridSearch().expect.element('@heading').text.to
      .match(/Apartments for rent in Yakutat, AK/)
  },

  'Navigate back to Map View': browser => {
    browser.page.small.gridSearch().click('@mapViewButton')
  },

  'Wait for Map Page to display': browser => {
    browser.page.small.mapSearch().waitForElementVisible('@listViewButton')
    browser.page.small.mapSearch().waitForElementVisible('@mapboxCanvas')
  },

  'Enter Search Query Again': browser => {
    browser.page.small.header().section.searchBar.setValue('@textInput', 'Los Angeles, CA')
  },

  'Verify and Click First Search Option Again': browser => {
    browser.page.small.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .expect.element('@firstSearchOption').text.to.equal('Los Angeles, CA')
    browser.page.small.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .click('@firstSearchOption').waitForURLEquals(`${browser.launchUrl}${losAngelesMapPath}`)
  },

  'Validate Map Page Again ': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${losAngelesMapPath}`)
    browser.expect.element('head > title').attribute('text').to
      .equal('Apartments for Rent - Your Trusted Apartment Finder Tool at ApartmentGuide.com')
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Los Angeles, CA')
  },
}
