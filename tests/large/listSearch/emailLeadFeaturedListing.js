const listSearchPath = '/apartments/Alaska/Yakutat/'
const userName = 'Automation Tester'
const userEmailRoot = 'autotester@test.com'
const userPhone = '0123456789'
const featuredListingName = 'The Grand at Merrimack Student Living'

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

  'Paginate to Desired Featured Listing': browser => {
    browser.page.large.listSearch().paginateToSpecificFeatured(browser, featuredListingName)
  },

  'Open Lead Form': browser => {
    const featuredListing = browser.page.large.listSearch().section.featuredListing
    featuredListing.expect.element('@name').text.to.equal(featuredListingName)
    featuredListing.click('@checkAvailabilityButton')
  },

  'Validate Lead Form Initial State': browser => {
    browser.page.large.emailLeadForm().validateLeadForm(browser, {
      listingName: featuredListingName,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: `Hello,\n\nI'm interested in ${featuredListingName}. Please send me current availability and additional details.\n\nThanks.`, // eslint-disable-line max-len
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
      message: 'Featured Listing email lead submission using check availability button',
    }
    browser.page.large.emailLeadForm().fillVerifyAndSubmitLeadForm(browser, leadFormData)
  },

  'Validate Success Modal': browser => {
    const successModal = browser.page.large.leadSuccessModal()
    successModal.verifyHeading(successModal, featuredListingName)
  },
}
