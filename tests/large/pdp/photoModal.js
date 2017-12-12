const pdpPath = '/apartments/Alaska/Yakutat/The-Grand-at-Dunwoody/100022110/'
const listingNameEnglish = 'The Grand at Dunwoody'
const userName = 'Automation Tester'
const userEmailRoot = 'autotester@test.com'
const userPhone = '0123456789'
const userMessage = `User submitted lead for "${listingNameEnglish}" being submitted via Photo Modal on PDP` // eslint-disable-line max-len
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

  'Validate clicking photo carousel opens modal': browser => {
    const pdp = browser.page.large.pdp()
    pdp.expect.section('@photoModal').to.not.be.present()
    pdp.click('@firstCarouselImage', () => {
      pdp.expect.section('@photoModal').to.be.visible.before(1000)
      pdp.section.photoModal.expect.element('@image1').to.be.visible.before(1000)
      pdp.section.photoModal.expect.element('@imageIndex').text.to.equal(1)
    })
  },

  'Validate clicking the next arrow increments the photo': browser => {
    const modal = browser.page.large.pdp().section.photoModal
    modal.click('@nextArrow', () => {
      modal.expect.element('@image2').to.be.visible.before(1000)
      modal.expect.element('@imageIndex').text.to.equal(2)
    })
  },

  'Validate clicking the previous arrow decrements the photo': browser => {
    const modal = browser.page.large.pdp().section.photoModal
    modal.click('@previousArrow', () => {
      modal.expect.element('@image1').to.be.visible.before(1000)
      modal.expect.element('@imageIndex').text.to.equal(1)
    })
  },

  'Validate we can cycle to the last image from the first image': browser => {
    const modal = browser.page.large.pdp().section.photoModal
    modal.click('@previousArrow', () => {
      modal.getText('@imageCount', imageCount => {
        const selector = `[data-test-id=background-image-${imageCount.value}`
        modal.expect.element(selector).to.be.visible.before(1000)
        modal.expect.element('@imageIndex').text.to.equal(imageCount.value)
      })
    })
  },

  'Validate we can cycle to the first image from the last image': browser => {
    const modal = browser.page.large.pdp().section.photoModal
    modal.click('@nextArrow', () => {
      modal.expect.element('@image1').to.be.visible.before(1000)
      modal.expect.element('@imageIndex').text.to.equal(1)
    })
  },

  'Validate lead form is visible': browser => {
    const modal = browser.page.large.pdp().section.photoModal
    modal.expect.element('@leadFormWrapper').to.be.visible.before(1000)
  },

  'Validate that the Validation shows when required fields are empty': browser => {
    const pdp = browser.page.large.pdp()
    pdp.click('@sendButton', () => {
      pdp.expect.element('@leadFormValidation').to.be.visible.before(1000)
    })
  },

  'Validate filling out lead form and submitting': browser => {
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
    browser.page.large.emailLeadFormPhoto().fillVerifyAndSubmitLeadForm(browser, leadFormData)
  },
}
