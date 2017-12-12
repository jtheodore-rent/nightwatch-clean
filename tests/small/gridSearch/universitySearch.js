const losAngelesListPath = '/apartments/California/Los-Angeles/'
const universityListPath = '/apartments/Georgia/University-of-Georgia/'
const universityMapPath = '/map/?city=SUNY-Downstate-Medical-Center&state=New-York'
const sunyListPath = '/apartments/New-York/SUNY-Downstate-Medical-Center/'
const ugaListingID = '80516'
const sunyListingID = '47390'

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

  'Execute University Search, Partial Entry': browser => {
    browser.page.small.header().searchByClickingFirstOption(browser, {
      query: 'University of Georgia',
      expectedQueryText: 'University of Georgia, GA',
      path: `${universityListPath}`,
    })
  },

  'Validate Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${universityListPath}`)
    browser.expect.element('head > title').attribute('text').to
      .match(/^Apartments For Rent in University of Georgia, GA - \d+ Rentals | ApartmentGuide.com$/) // eslint-disable-line max-len
    browser.expect.element(`[data-tag_listing_id="${ugaListingID}"]`).to.be.visible.before(1000)
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('University of Georgia, GA')
    browser.page.small.gridSearch().expect.element('@heading').text.to
      .equal('Apartments for rent in University of Georgia, GA')
  },

  'Navigate to Map View': browser => {
    browser.page.small.gridSearch().click('@mapViewButton')
  },

  'Wait for Map Page to display': browser => {
    browser.page.small.mapSearch().waitForElementVisible('@listViewButton')
    browser.page.small.mapSearch().waitForElementVisible('@mapboxCanvas')
  },

  'Execute University Search on Map Page': browser => {
    browser.page.small.header().searchByClickingFirstOption(browser, {
      query: 'SUNY Downstate Medical',
      expectedQueryText: 'SUNY Downstate Medical Center, NY',
      path: `${universityMapPath}`,
    })
  },

  'Validate Map Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${universityMapPath}`)
    browser.expect.element('head > title').attribute('text').to
      .equal('Apartments for Rent - Your Trusted Apartment Finder Tool at ApartmentGuide.com')
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('SUNY Downstate Medical Center, NY')
  },

  'Navigate back to List View': browser => {
    browser.page.small.mapSearch().click('@listViewButton')
    browser.page.small.gridSearch().waitForElementVisible('@mapViewButton')
  },

  'Validate List Search Page Again': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${sunyListPath}`)
    browser.expect.element('head > title').attribute('text').to
      .match(/^Apartments For Rent in SUNY Downstate Medical Center, NY - \d+ Rentals | ApartmentGuide.com$/) // eslint-disable-line max-len
    browser.expect.element(`[data-tag_listing_id="${sunyListingID}"]`).to.be.visible.before(1000)
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('SUNY Downstate Medical Center, NY')
    browser.page.small.gridSearch().expect.element('@heading').text.to
      .equal('Apartments for rent in SUNY Downstate Medical Center, NY')
  },

  'Search a second time': browser => {
    browser.page.small.header().searchByEnterFirstOption(browser, {
      query: 'University of Georgia',
      expectedQueryText: 'University of Georgia, GA',
      path: `${universityListPath}`,
    })
  },

  'Validate Final List Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${universityListPath}`)
    browser.expect.element('head > title').attribute('text').to
      .match(/^Apartments For Rent in University of Georgia, GA - \d{1,} Rentals | ApartmentGuide.com$/) // eslint-disable-line max-len
    browser.expect.element(`[data-tag_listing_id="${ugaListingID}"]`).to.be.visible.before(1000)
    browser.page.small.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('University of Georgia, GA')
    browser.page.small.gridSearch().expect.element('@heading').text.to
      .equal('Apartments for rent in University of Georgia, GA')
  },
}
