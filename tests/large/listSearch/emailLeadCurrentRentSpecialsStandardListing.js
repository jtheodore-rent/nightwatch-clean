const listSearchPath = '/apartments/Alaska/Yakutat/?propertyname=EGG-Property-One'
const listingNameEnglish = 'EGG Property One'
const userName = 'Automation Tester'
const userEmailRoot = 'autotester@test.com'
const userPhone = '0123456789'
const userMessage = `User submitted lead for "${listingNameEnglish}" being submitted by clicking Current Rent Special for a Standard Listing on the List SRP` // eslint-disable-line max-len

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

  'Open Lead Form': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${listSearchPath}`)
    browser.page.large.listSearch().section.firstStandardListing
      .expect.element('@name').text.to.equal(listingNameEnglish)
    browser.page.large.listSearch().section.firstStandardListing.click('@specials')
  },

  'Validate Lead Form Initial State': browser => {
    const emailLeadForm = browser.page.large.emailLeadForm()
    emailLeadForm.validateLeadForm(browser, {
      name: '',
      email: '',
      phone: '',
      beds: '',
      baths: '',
      priceRange: '',
      message: 'Hello,\n\n' +
        `I'm interested in ${listingNameEnglish}. ` +
        'Please send me current availability and additional details.\n\n' +
        'Thanks.',
      newsLetterOptIn: 'true',
    })
  },

  'Fill out lead form and Submit': browser => {
    const environment = browser.launchUrl.replace(/https?:\/\//, '')
      .replace(/.com/, '')
    const leadFormData = {
      name: userName,
      email: `${environment}.${userEmailRoot}`,
      phone: userPhone,
      message: userMessage,
      newsLetterOptIn: 'true',
    }
    browser.page.large.emailLeadForm().fillVerifyAndSubmitLeadForm(browser, leadFormData)
  },

  'Validate Success Modal': browser => {
    const successModal = browser.page.large.leadSuccessModal()
    successModal.verifyRecommendedListing(successModal.section.firstRecommendedListing)
    successModal.verifyRecommendedListingCapNotExceeded(successModal)
  },
}
