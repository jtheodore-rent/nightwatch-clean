const listSearchPath = '/apartments/California/Los-Angeles/'
const mapSearchPath = '/map/?city=Los-Angeles&state=California'

module.exports = {
  tags: ['stableChrome', 'stableFirefox', 'critical', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${listSearchPath}`)
      .waitForURLEquals(`${browser.launchUrl}${listSearchPath}`)
      .waitForElementVisible('#react-view')
      .page.large.listSearch().section.firstStandardListing
      .waitForElementVisible('@image0')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate URL and Title': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${listSearchPath}`)
    browser.expect.element('head > title').attribute('text').to
      .match(/Apartments for Rent in Los Angeles, CA - \d+ Rentals/)
  },

  'Validate header': browser => {
    browser.page.large.header().validate(`${browser.launchUrl}/`, null, true)
  },

  'Validate page 1 meta': browser => {
    const baseURL = `${browser.launchUrl}${listSearchPath}`
    browser.page.shared.headTags().validate({
      meta: { robots: false },
      canonical: baseURL,
      prev: false,
      next: `${baseURL}?page=2`,
    })
  },

  'Validate page 2 meta': browser => {
    const baseURL = `${browser.launchUrl}${listSearchPath}`
    browser.pause(500).url(`${baseURL}?page=2`).waitForURLEquals(`${baseURL}?page=2`, () => {
      browser.page.shared.headTags().validate({
        meta: { robots: false },
        canonical: `${baseURL}?page=2`,
        prev: baseURL,
        next: `${baseURL}?page=3`,
      })
    })
  },

  'Validate page 3 meta': browser => {
    const baseURL = `${browser.launchUrl}${listSearchPath}`
    browser.url(`${baseURL}?page=3`).waitForURLEquals(`${baseURL}?page=3`, () => {
      browser.page.shared.headTags().validate({
        meta: { robots: false },
        canonical: `${baseURL}?page=3`,
        prev: `${baseURL}?page=2`,
        next: `${baseURL}?page=4`,
      })
    })
  },

  'Validate rel links preserve query params': browser => {
    const baseURL = `${browser.launchUrl}${listSearchPath}`
    browser.url(`${baseURL}?sortby=sortpropertyname_desc&page=3`)
      .waitForURLEquals(`${baseURL}?sortby=sortpropertyname_desc&page=3`)
      .waitForElementVisible('#react-view', () => {
        browser.page.shared.headTags().validate({
          meta: { robots: false },
          canonical: `${baseURL}?page=3`,
          prev: `${baseURL}?page=2&sortby=sortpropertyname_desc`,
          next: `${baseURL}?page=4&sortby=sortpropertyname_desc`,
        })
      })
  },

  'validate Apartment Types Modal': browser => {
    browser.page.large.listSearch().validateFindApartmentsModal(
      browser,
      '@apartmentTypes',
      'apartmentTypesModal',
      'Apartment Types',
      'Corporate Apartments'
    )
  },

  'validate Nearby Neighborhoods Modal': browser => {
    browser.page.large.listSearch().validateFindApartmentsModal(
      browser,
      '@nearbyNeighborhoodsMenu',
      'nearbyNeighborhoodsModal',
      'Nearby Neighborhoods',
      'All Los Angeles Neighborhoods'
    )
  },

  'validate Nearby Zips Modal': browser => {
    browser.page.large.listSearch().validateFindApartmentsModal(
      browser,
      '@nearbyZipsMenu',
      'nearbyZipsModal',
      'Nearby Zip Codes',
      'Zip Codes Near Los Angeles, CA'
    )
  },

  'validate Nearby Colleges Modal': browser => {
    browser.page.large.listSearch().validateFindApartmentsModal(
      browser,
      '@nearbyCollegesMenu',
      'nearbyCollegesModal',
      'Nearby Colleges',
      'Colleges Near Los Angeles, CA'
    )
  },

  'validate Nearby Cities Modal': browser => {
    browser.page.large.listSearch().validateFindApartmentsModal(
      browser,
      '@nearbyCitiesMenu',
      'nearbyCitiesModal',
      'Nearby Cities',
      'Cities Near Los Angeles, CA'
    )
  },

  'validate Nearby Military Modal': browser => {
    browser.page.large.listSearch().validateFindApartmentsModal(
      browser,
      '@nearbyMilitaryMenu',
      'nearbyMilitaryModal',
      'Nearby Military Bases',
      'Military Bases Near Los Angeles, CA'
    )
  },

  'Validate search bar text': browser => {
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
       .to.equal('Los Angeles, CA')
  },

  'Click map toggle': browser => {
    const browserName = browser.capabilities.browserName
    const header = browser.page.large.header()

    if (browserName && browserName === 'internet explorer') {
      header.section.searchBarContainer.setValue('@mapToggle', browser.Keys.ENTER)
    } else {
      header.section.searchBarContainer.click('@mapToggle')
    }
  },

  'Pause for navigation': browser => {
    browser.page.large.mapSearch().waitForElementVisible('@mapBoxContainer')
  },

  'Validate map page': browser => {
    const mapPage = browser.page.large.mapSearch()
    const header = browser.page.large.header()
    browser.assert.urlEquals(`${browser.launchUrl}${mapSearchPath}`)
    browser.page.large.title().validateDefaultTitle(browser)
    header.section.searchBar.expect.element('@textInput').value.to.contain('Los Angeles, CA')
    mapPage.section.firstStandardListing.expect.element('@address').text.to.contain(', CA')
  },

  'Click list toggle': browser => {
    const header = browser.page.large.header()
    header.section.searchBarContainer.click('@listToggle')
  },

  'Validate footer before lazy load': browser => {
    browser.page.large.footer().validateBeforeLazyLoad()
  },

  'Validate footer': browser => {
    browser.page.large.footer().validate(browser)
  },
}
