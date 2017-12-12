const basePdpPath = '/apartments/Alaska/Yakutat/The-Grand-at-Dunwoody/100022110/#details'
const listingNameDashed = basePdpPath.split('/')[4]
const listingId = basePdpPath.split('/')[5]
const listingNameEnglish = listingNameDashed.replace(/-/g, ' ')
const userName = 'Automation Tester'
const userEmailRoot = 'autotester@test.com'
const userPhone = '0123456789'
const userBeds = '2'
const userBaths = '2'
const userMessage = `Lead submission for ${listingNameEnglish} from Details tab, accessed by going to tab directly via URL\nListing ID: ${listingId}` // eslint-disable-line max-len

module.exports = {
  tags: ['critical', 'stableAndroid', 'quarantineIOS', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${basePdpPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Open Lead Form': browser => {
    const pdpCard = browser.page.small.propertyCard()
    pdpCard.openLeadForm(pdpCard)
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
      message: userMessage,
      newsLetterOptIn: 'true',
    }
    browser.page.small.emailLeadForm().fillOutLeadForm(browser, leadFormData)
  },

  'Submit lead form': browser => {
    const leadForm = browser.page.small.emailLeadForm()
    leadForm.submitValidLeadForm(leadForm)
  },

  'Validate Success Modal': browser => {
    const successModal = browser.page.small.leadSuccessModal()
    successModal.verifyHeading(successModal, listingNameEnglish)
  },
}
