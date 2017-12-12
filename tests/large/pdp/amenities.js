const pdpPath = '/apartments/Alaska/Yakutat/The-Grand-at-Dunwoody/100022110/'

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
      .url(`${browser.launchUrl}${pdpPath}`)
      .waitForURLEquals(`${browser.launchUrl}${pdpPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate Header Name': browser => {
    const title = 'Amenities'
    const pdp = browser.page.large.pdp()
    pdp.validateAmenitiesHeader(pdp, title)
  },

  'Validate Apartment Features Header Name': browser => {
    const header = 'Apartment Features'
    const pdp = browser.page.large.pdp()
    const feature = pdp.section.apartmentFeatures
    pdp.ValidateFeatureHeader(feature, header)
  },

  'Validate Special Features Header Name': browser => {
    const header = 'Special Features'
    const pdp = browser.page.large.pdp()
    const feature = pdp.section.specialFeatures
    pdp.ValidateFeatureHeader(feature, header)
  },

  'Validate Community Features Header Name': browser => {
    const header = 'Community Features'
    const pdp = browser.page.large.pdp()
    const feature = pdp.section.communityFeatures
    pdp.ValidateFeatureHeader(feature, header)
  },

  'Validate Additional Features Header Name': browser => {
    const header = 'Additional Features'
    const pdp = browser.page.large.pdp()
    const feature = pdp.section.additionalFeatures
    pdp.ValidateFeatureHeader(feature, header)
  },

  'Validate Features Count': browser => {
    const pdp = browser.page.large.pdp()
    pdp.verifyFeaturesCountNotExceedFour(pdp, '@outOfBoundsApartmentFeature')
    pdp.verifyFeaturesCountNotExceedFour(pdp, '@outOfBoundsSpecialFeature')
    pdp.verifyFeaturesCountNotExceedFour(pdp, '@outOfBoundsCommunityFeature')
    pdp.verifyFeaturesCountNotExceedFour(pdp, '@outOfBoundsAdditionalFeature')
  },

  'Validate View More Click and Hide': browser => {
    const pdp = browser.page.large.pdp()
    pdp.getLocationInView('@amenitiesSection').validateAmenitiesShowHide(pdp)
  },

  'Validate Pet Policy': browser => {
    const pdp = browser.page.large.pdp()
    pdp.section.amenitiesSection.expect.element('@header').to.be.visible().before(1000)
    pdp.section.amenitiesSection.expect.element('@firstPetPolicy').text.to.include('Pet Friendly')
  },

  'Validate Lead Modal appears when the Amenities Lead button is pressed': browser => {
    browser.page.large.pdp().getLocationInView('@amenitiesSection')
    .validateCheckAvailabilityButton(browser, 'amenitiesSection')
  },
}
