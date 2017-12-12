const listSearchPath = '/apartments/Alaska/Yakutat/?propertyname=the-grand-at-dunwoody'
const listingNameEnglish = 'The Grand at Dunwoody'
const userName = 'Automation Tester'
const userEmailRoot = 'autotester@test.com'
const userPhone = '0123456789'
const userMessage = `User submitted lead for "${listingNameEnglish}" being submitted by clicking coupon link for a Standard Listing on the List SRP` // eslint-disable-line max-len
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
    browser.page.large.listSearch().section.firstStandardListing.click('@couponLink')
  },

  'Fill out lead form and Submit': browser => {
    const environment = browser.launchUrl.replace(/https?:\/\//, '')
      .replace(/.com/, '')
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
    browser.page.large.emailLeadForm().fillVerifyAndSubmitLeadForm(browser, leadFormData)
  },

  'Validate Success Modal': browser => {
    const successModal = browser.page.large.leadSuccessModal()
    successModal.verifyRecommendedListing(successModal.section.firstRecommendedListing)
    successModal.verifyRecommendedListingCapNotExceeded(successModal)
  },
}
