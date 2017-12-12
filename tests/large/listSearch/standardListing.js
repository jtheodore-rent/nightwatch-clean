const listSearchPath = '/apartments/Florida/Miami/'
const listingState = listSearchPath.split('/')[2]
const backgroundRGBRegex = new RegExp(/(236, 236, 236)|transparent/)

module.exports = {
  tags: ['stableChrome', 'stableFirefox', 'critical', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'ui',
        value: 'adaptive',
        path: '/',
      })
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

  'Validate SRP Schema': browser => {
    browser.assert.schemaContainsItems('ApartmentComplex', [
      ['telephone'],
      ['aggregateRating', 'ratingValue'],
      ['aggregateRating', 'worstRating'],
      ['aggregateRating', 'bestRating'],
      ['aggregateRating', 'reviewCount'],
      ['image', 'contentURL'],
      ['image', 'caption'],
      ['address', 'streetAddress'],
      ['address', 'addressLocality'],
      ['address', 'addressRegion'],
      ['address', 'postalCode'],
    ])
  },

  'Validate key elements of first listing': browser => {
    const listSearchPage = browser.page.large.listSearch()
    const firstListing = listSearchPage.section.firstStandardListing
    listSearchPage.validateListingHref(firstListing, browser.launchUrl, listingState)
    listSearchPage.validateImageSlideshowClicks(firstListing)
    listSearchPage.expect.section('@firstStandardListing').to.have.css('background-color').to
      .match(backgroundRGBRegex)
    listSearchPage.validateListingDetails(firstListing, listingState)
    listSearchPage.validateListingMicrodata(firstListing)
  },

  'Validate standard listing check availability button': browser => {
    const listSearchPage = browser.page.large.listSearch()
    const firstListing = listSearchPage.section.firstStandardListing
    listSearchPage.validateCheckAvailabilityButtonClick(firstListing, browser)
  },

  'Verify clicking standard listing name opens PDP': browser => {
    const listSearchPage = browser.page.large.listSearch()
    const firstListing = listSearchPage.section.firstStandardListing
    listSearchPage.validateElementClickToPDPAndCloseTab(browser, firstListing, '@name')
  },

  'Verify clicking standard listing image opens PDP': browser => {
    const listSearchPage = browser.page.large.listSearch()
    const firstListing = listSearchPage.section.firstStandardListing
    listSearchPage.validateElementClickToPDPAndCloseTab(browser, firstListing, '@imageContainer')
  },

  'Verify clicking standard listing details container opens PDP': browser => {
    const listSearchPage = browser.page.large.listSearch()
    const firstListing = listSearchPage.section.firstStandardListing
    listSearchPage.validateElementClickToPDPAndCloseTab(browser, firstListing, '@detailsContainer')
  },

  'Verify clicking standard listing neighborhood name opens PDP': browser => {
    const listSearchPage = browser.page.large.listSearch()
    const firstListing = listSearchPage.section.firstStandardListing
    listSearchPage.validateElementClickToPDPAndCloseTab(browser, firstListing, '@neighborhoodsContainer')
  },

  'Verify clicking standard listing ratings container opens PDP': browser => {
    const listSearchPage = browser.page.large.listSearch()
    const firstListing = listSearchPage.section.firstStandardListing
    listSearchPage.validateElementClickToPDPAndCloseTab(browser, firstListing, '@ratings')
  },
}
