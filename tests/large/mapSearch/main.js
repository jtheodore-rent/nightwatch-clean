const mapSearchPath = '/map/?city=Atlanta&state=Georgia'

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
      .url(`${browser.launchUrl}${mapSearchPath}`)
      .waitForURLEquals(`${browser.launchUrl}${mapSearchPath}`)
      .waitForElementVisible('#react-view')
      .page.large.mapSearch().waitForElementVisible('@mapboxCanvas')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate URL and title': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${mapSearchPath}`)
    browser.page.large.title().validateDefaultTitle(browser)
  },

  'Validate meta': browser => {
    browser.page.shared.headTags().validate({
      meta: { robots: 'noindex,follow' },
      canonical: `${browser.launchUrl}${mapSearchPath}`,
    })
  },

  'Validate header': browser => {
    browser.page.large.header().validate(`${browser.launchUrl}/`, null, true, 'Atlanta, GA')
  },

  'Validate Refinements footer': browser => {
    const mapPage = browser.page.large.mapSearch()
    mapPage.expect.element('@locationPrompt').text.to
      .equal('Where can I find an apartment in Atlanta, GA?')
    mapPage.expect.element('@studioRefinement').text.to.equal('ST')
    mapPage.expect.element('@oneBedRefinement').text.to.equal('1B')
    mapPage.expect.element('@twoBedRefinement').text.to.equal('2B')
    mapPage.expect.element('@threeBedRefinement').text.to.equal('3B')
    mapPage.expect.element('@fourBedRefinement').text.to.equal('4B')
    mapPage.expect.element('@sliderPriceDisplay').text.to.equal('Any Price')
    mapPage.expect.element('@collegeLifestyle').text.to.equal('College')
    mapPage.expect.element('@corporateLifestyle').text.to.equal('Corporate')
    mapPage.expect.element('@furnishedLifestyle').text.to.equal('Furnished')
    mapPage.expect.element('@golfLifestyle').text.to.equal('Golf')
    mapPage.expect.element('@incomeRestrictedLifestyle').text.to.equal('Income Restricted')
    mapPage.expect.element('@luxuryLifestyle').text.to.equal('Luxury')
    mapPage.expect.element('@militaryLifestyle').text.to.equal('Military')
    mapPage.expect.element('@petFriendlyLifestyle').text.to.equal('Pet Friendly')
    mapPage.expect.element('@seniorLifestyle').text.to.equal('Senior')
    mapPage.expect.element('@waterfrontLifestyle').text.to.equal('Waterfront')
  },

  'validate Apartment Types Modal': browser => {
    browser.page.large.mapSearch().validateFindApartmentsModal(
      browser,
      '@apartmentTypes',
      'apartmentTypesModal',
      'Apartment Types',
      'Corporate Apartments'
    )
  },

  'validate Nearby Neighborhoods Modal': browser => {
    browser.page.large.mapSearch().validateFindApartmentsModal(
      browser,
      '@nearbyNeighborhoodsMenu',
      'nearbyNeighborhoodsModal',
      'Nearby Neighborhoods',
      'All Atlanta Neighborhoods'
    )
  },

  'validate Nearby Zips Modal': browser => {
    browser.page.large.mapSearch().validateFindApartmentsModal(
      browser,
      '@nearbyZipsMenu',
      'nearbyZipsModal',
      'Nearby Zip Codes',
      'Zip Codes Near Atlanta, GA'
    )
  },

  'validate Nearby Colleges Modal': browser => {
    browser.page.large.mapSearch().validateFindApartmentsModal(
      browser,
      '@nearbyCollegesMenu',
      'nearbyCollegesModal',
      'Nearby Colleges',
      'Colleges Near Atlanta, GA'
    )
  },

  'validate Nearby Cities Modal': browser => {
    browser.page.large.mapSearch().validateFindApartmentsModal(
      browser,
      '@nearbyCitiesMenu',
      'nearbyCitiesModal',
      'Nearby Cities',
      'Cities Near Atlanta, GA'
    )
  },

  'validate Nearby Military Modal': browser => {
    browser.page.large.mapSearch().validateFindApartmentsModal(
      browser,
      '@nearbyMilitaryMenu',
      'nearbyMilitaryModal',
      'Nearby Military Bases',
      'Military Bases Near Atlanta, GA'
    )
  },
}
