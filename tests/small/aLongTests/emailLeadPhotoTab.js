const basePdpPath = '/apartments/Alaska/Yakutat/The-Grand-at-Brookwood/184797/'
const listingNameDashed = basePdpPath.split('/')[4]
const listingId = basePdpPath.split('/')[5]
const listingNameEnglish = listingNameDashed.replace(/-/g, ' ')
const userName = 'Automation Tester'
const userEmailRoot = 'autotester@test.com'
const userPhone = '0123456789'
const userBeds = '2'
const userBaths = '2'
const userMessage = `Lead submission for ${listingNameEnglish} from Photos tab, accessed by going to tab directly via URL\nListing ID: ${listingId}` // eslint-disable-line max-len

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
    successModal.verifyHeading(successModal)
  },

  'Close Recommended Property Lead Form': browser => {
    browser.page.small.emailLeadForm().click('@closeLeadSuccessModal').waitForElementNotPresent('@sendButton')
    browser.page.small.propertyCard().waitForElementVisible('@propertyName')
  },

  'Close Property Card': browser => {
    browser.page.small.propertyCard().click('@closeButton')
      .waitForElementNotPresent('@propertyName', () => {
        browser.page.small.gridSearch().section.firstStandardListing
          .waitForElementVisible('@name')
      })
  },

  'Click Show Favorites': browser => {
    browser.page.small.header().section.favorites.waitForElementVisible('@showFavorites')
      .click('@showFavorites').waitForElementVisible('@showAll')
  },

  'Click First Favorite Listing': browser => {
    browser.page.small.gridSearch().section.firstStandardListing.waitForElementVisible('@name')
      .click('@name')
    browser.page.small.propertyCard().waitForElementVisible('@propertyName', () => {
      browser.pause(500) // Pause for animation
    })
  },

  'Validate Property Card for submitted Lead': browser => {
    const pdpCard = browser.page.small.propertyCard()
    pdpCard.expect.element('@propertyName').text.to.equal(listingNameEnglish)
    pdpCard.verifyHeartFilled(pdpCard)
  },

  'Open Lead Form Again': browser => {
    const pdpCard = browser.page.small.propertyCard()
    pdpCard.openLeadForm(pdpCard)
  },

  'Validate Lead Form is populated with previously entered data': browser => {
    const environment = browser.launchUrl.replace(/http:\/\//, '').replace(/https:\/\//, '')
      .replace(/.com/, '')
    browser.page.small.emailLeadForm().validateLeadForm(browser, {
      name: userName,
      firstName: userName.split(' ')[0],
      lastName: userName.split(' ')[1],
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
