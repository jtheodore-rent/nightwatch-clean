const listSearchPath = '/apartments/Alaska/Yakutat/?propertyname=EGG-Property-One'
const listingNameEnglish = 'EGG Property One'
const userName = 'Automation Tester'
const userEmailRoot = 'autotester@test.com'
const userPhone = '0123456789'
const userMessage = `User submitted lead for "${listingNameEnglish}" being submitted by clicking Check Availability button for a Standard Listing on the List SRP` // eslint-disable-line max-len
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
    browser.page.large.listSearch().section.firstStandardListing
      .click('@checkAvailabilityButton', () => {
        browser.page.large.emailLeadForm().section.leadFormContainer
          .waitForElementVisible('@nameInput')
      })
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

  'Verify RecommendedListing LeadForm': browser => {
    const successModal = browser.page.large.leadSuccessModal()
    const environment = browser.launchUrl.replace(/https?:\/\//, '').replace(/.com/, '')
    const leadFormData = {
      name: userName,
      firstName: '',
      lastName: '',
      email: `${environment}.${userEmailRoot}`,
      phone: userPhone,
    }
    successModal.testRecommendedListingClickThroughAndLeadFormPrePopulation(browser, leadFormData)
  },

  'Fill Recommended Listing Lead Form': browser => {
    const leadFormData = {
      name: userName,
      firstName: userName.split(' ')[0],
      lastName: userName.split(' ')[1],
      email: 'test@test.com',
      moveDate: userMoveDate,
      beds: '2',
      baths: '2',
      message: 'Lead for Recommended listing submitted from CTA',
      newsLetterOptIn: 'true',
      priceRange: '900To1100',
      moveReason: 'Financial',
    }
    browser.page.large.emailLeadForm().fillOutLeadForm(browser, leadFormData)
  },

  'Submit Recommended Listing Lead Form': browser => {
    const leadForm = browser.page.large.emailLeadForm()
    leadForm.submitValidLeadForm(leadForm)
  },

  'Verify Confirmation Modal': browser => {
    const leadSuccessModal = browser.page.large.leadSuccessModal()
    leadSuccessModal.expect.element('@leadSuccessModal').to.be.visible.before(1000)
    leadSuccessModal.waitForElementVisible('@closeButton').click('@closeButton')
  },

  'Verify Heart Icon': browser => {
    const listSearch = browser.page.large.listSearch()
    const favoriteHeartRGBRegex = new RegExp(/(194, 12, 19)/)
    listSearch.section.firstStandardListing.expect.element('@saveHeartIcon').to.be.visible.after(0)
    listSearch.section.firstStandardListing.expect.element('@saveHeartIcon').to.have.css('fill').to
      .match(favoriteHeartRGBRegex)
  },

  'Verify Header My Places Count': browser => {
    const header = browser.page.large.header()
    header.section.utilityNavigation.expect.element('@myPlacesLink').to.be.visible.after(0)
    header.section.utilityNavigation.expect.element('@myPlacesLink').text.to.equal('My Places (2)')
  },

  'Verify Header Heart Icon': browser => {
    const header = browser.page.large.header()
    const favoriteHeartRGBRegex = new RegExp(/(209, 0, 21)/)
    header.section.utilityNavigation.expect.element('@heartIcon').to.be.visible.after(0)
    header.section.utilityNavigation.expect.element('@heartIcon').to.have.css('fill')
      .to.match(favoriteHeartRGBRegex)
  },
}
