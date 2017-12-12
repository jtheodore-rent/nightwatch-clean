const listSearchPath = '/apartments/Missouri/Saint-Louis/?propertyname=gravois-ridge-townhomes'

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

  'Verify Pills and Amenities icons are displayed': browser => {
    const firstStandardListing = browser.page.large.listSearch().section.firstStandardListing
    firstStandardListing.expect.element('@featuredPill').to.be.visible.before(1000)
    firstStandardListing.expect.element('@airConAmenity').to.be.visible.before(1000)
    firstStandardListing.expect.element('@washerDryerAmenity').to.be.visible.before(1000)
    firstStandardListing.expect.element('@petsAmenity').to.be.visible.before(1000)
    firstStandardListing.expect.element('@fitnessAmenity').to.be.visible.before(1000)
    firstStandardListing.expect.element('@wifiAmenity').to.be.visible.before(1000)
    firstStandardListing.expect.element('@hardwoodAmenity').to.be.visible.before(1000)
  },
}
