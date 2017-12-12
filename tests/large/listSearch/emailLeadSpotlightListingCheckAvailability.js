const listSearchPath = '/apartments/Alaska/Yakutat/'
const userName = 'Automation Tester'
const userEmailRoot = 'autotester@test.com'
const userPhone = '0123456789'
const spotlightPropName = 'The Grand at Merrimack Student Living'

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
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Refresh Until Desired Spotlight Property Displays': browser => {
    browser.page.large.listSearch().refreshForSpecificSpotlight(browser, spotlightPropName)
  },

  'Open Lead Form': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${listSearchPath}`)
    const spotlight = browser.page.large.listSearch().section.spotlightListing
    spotlight.click('@checkAvailabilityButton')
  },

  'Validate Lead Form Initial State': browser => {
    browser.page.large.emailLeadForm().validateLeadForm(browser, {
      name: '',
      email: '',
      phone: '',
    })
  },

  'Fill out lead form and Submit': browser => {
    const environment = browser.launchUrl.replace(/https?:\/\//, '')
      .replace(/.com/, '')
    const leadFormData = {
      name: userName,
      email: `${environment}.${userEmailRoot}`,
      phone: userPhone,
      beds: '1',
      baths: '1',
      priceRange: '700To900',
      message: 'Spotlight email lead submission using check availability button',
    }
    browser.page.large.emailLeadForm().fillVerifyAndSubmitLeadForm(browser, leadFormData)
  },

  'Validate Success Modal': browser => {
    const successModal = browser.page.large.leadSuccessModal()
    successModal.verifyRecommendedListing(successModal.section.firstRecommendedListing)
    successModal.verifyRecommendedListingCapNotExceeded(successModal)
  },
}
