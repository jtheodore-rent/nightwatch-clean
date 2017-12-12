const basePdpPath = '/apartments/Alaska/Takotna/The-Grand-at-Parkview/184724/'
const listingNameDashed = basePdpPath.split('/')[4]
const listingId = basePdpPath.split('/')[5]
const listingNameEnglish = listingNameDashed.replace(/-/g, ' ')
const userName = 'Automation Tester'
const userEmailRoot = 'autotester@test.com'
const userPhone = '0123456789'
const userBeds = '2'
const userBaths = '2'
const userPriceRange = '1100To1300'
const userMessage = `Lead submission for ${listingNameEnglish} from lead form sidebar\nListing ID: ${listingId}` // eslint-disable-line max-len

module.exports = {
  tags: ['critical', 'stableChrome', 'stableFirefox', 'stableProd'],
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
      .url(`${browser.launchUrl}${basePdpPath}`)
      .waitForURLEquals(`${browser.launchUrl}${basePdpPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate Lead Form Initial State': browser => {
    browser.page.large.emailLeadFormInline().validateLeadForm(browser, {
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

  'Fill out lead form': browser => {
    const environment = browser.launchUrl.replace(/http:\/\//, '').replace(/https:\/\//, '')
      .replace(/.com/, '')
    const leadFormData = {
      name: userName,
      email: `${environment}.${userEmailRoot}`,
      phone: userPhone,
      beds: userBeds,
      baths: userBaths,
      priceRange: userPriceRange,
      message: userMessage,
      newsLetterOptIn: 'true',
      inline: true,
    }
    browser.page.large.emailLeadFormInline().fillVerifyAndSubmitLeadForm(browser, leadFormData)
  },

  'Validate Success Modal': browser => {
    const successModal = browser.page.large.leadSuccessModal()
    const environment = browser.launchUrl.replace(/http:\/\//, '').replace(/https:\/\//, '')
      .replace(/.com/, '')
    const leadFormData = {
      name: userName,
      email: `${environment}.${userEmailRoot}`,
      phone: userPhone,
      beds: userBeds,
      baths: userBaths,
      priceRange: userPriceRange,
      newsLetterOptIn: 'true',
    }
    successModal.verifyHeading(successModal, listingNameEnglish)
    successModal.verifyRecommendedListing(successModal.section.firstRecommendedListing)
    successModal.verifyRecommendedListingCapNotExceeded(successModal)
    successModal.testRecommendedListingClickThroughAndLeadFormPrePopulation(browser, leadFormData)
  },

  'Go back to initial property': browser => {
    browser
      .url(`${browser.launchUrl}${basePdpPath}`)
      .waitForElementVisible('#react-view')
  },

  'Validate Lead Form is populated with previously entered data': browser => {
    const environment = browser.launchUrl.replace(/http:\/\//, '').replace(/https:\/\//, '')
      .replace(/.com/, '')
    browser.page.large.emailLeadFormInline().validateLeadForm(browser, {
      name: userName,
      email: `${environment}.${userEmailRoot}`,
      phone: userPhone,
      beds: userBeds,
      baths: userBaths,
      message: 'Hello,\n\n' +
        `I'm interested in ${listingNameEnglish}. ` +
        'Please send me current availability and additional details.\n\n' +
        'Thanks.',
      newsLetterOptIn: 'true',
    })
  },
}
