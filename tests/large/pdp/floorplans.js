const pdpPath = '/apartments/Alaska/Yakutat/The-Grand-at-Dunwoody/100022110/'
const listingNameEnglish = 'The Grand at Dunwoody'
const userName = 'Automation Tester'
const userEmailRoot = 'autotester@test.com'
const userPhone = '0123456789'
const userMessage = `User submitted lead for "${listingNameEnglish}" being submitted through the floorplan modal on the PDP` // eslint-disable-line max-len
const date = new Date()
const currentMonth = date.getMonth()
const currentYear = date.getFullYear()
const moveMonth = currentMonth === 11 ? 12 : currentMonth + 1
const moveYear = currentMonth === 11 ? currentYear : currentYear + 1
const userMoveDate = `${moveMonth}/15/${moveYear}`

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

  'Scroll into view': browser => {
    browser.page.large.pdp().section.floorplans.getLocationInView('@couponHeading')
  },

  'Validate Lead Modal appears when the Specials Coupon Lead button is pressed': browser => {
    browser.page.large.pdp().validateCheckAvailabilityButton(browser, 'floorplans')
  },

  'Validate that clicking on a floorplan opens a floorplan modal': browser => {
    browser.page.large.pdp().validateFirstFloorplanOpensMatchingModal(browser)
  },

  'Validate default floorplan lead form message': browser => {
    browser.page.large.pdp().validateFloorplanLeadFormDefaultMessage(browser)
  },

  'Validate floorplan lead form submission': browser => {
    const environment = browser.launchUrl.replace(/https?:\/\//, '')
    const leadFormData = {
      name: userName,
      email: `${environment}.${userEmailRoot}`,
      moveDate: userMoveDate,
      phone: userPhone,
      beds: '1',
      baths: '1',
      priceRange: '700To900',
      moveReason: 'Financial',
      message: userMessage,
      newsLetterOptIn: 'true',
    }
    browser.page.large.emailLeadFormFloorplan().fillVerifyAndSubmitLeadForm(browser, leadFormData)
  },

  'Validate Success Modal': browser => {
    const successModal = browser.page.large.leadSuccessModal()
    successModal.verifyRecommendedListing(successModal.section.firstRecommendedListing)
    successModal.verifyRecommendedListingCapNotExceeded(successModal)
  },
}
