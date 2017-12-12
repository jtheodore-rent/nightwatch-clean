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

  'Scroll Property Details Section into view': browser => {
    browser.page.large.pdp().section.propertyDetails.getLocationInView('@name')
  },

  'Validate Property Details Section': browser => {
    const sectionTitle = 'Property Details'
    const propName = 'The Grand at Dunwoody'
    const leaseTerms = 'Lease Terms'
    const phoneNumber = '(877) 425-0731'
    const pdp = browser.page.large.pdp()
    pdp.assert.urlEquals(`${browser.launchUrl}${pdpPath}`)
    pdp.validateSectionTitle(pdp, 'propertyDetails', sectionTitle)
    pdp.validateSectionPropName(pdp, propName)
    pdp.validateLeaseTerm(pdp, 'propertyDetails', leaseTerms)
    pdp.validatePhonePropSection(pdp, 'propertyDetails', phoneNumber)
  },

  'Validate Lead Modal appears when the Property Details Lead button is pressed': browser => {
    const leadtitle = 'The Grand at Dunwoody'
    browser.page.large.pdp().validateCheckAvailabilityButton(browser, 'propertyDetails', leadtitle)
  },
}
