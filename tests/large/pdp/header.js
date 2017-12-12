const pdpPath = '/apartments/Alaska/Yakutat/The-Grand-at-Dunwoody/100022110/'

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

  'Validate header ag logo not present when at the top': browser => {
    const pdp = browser.page.large.pdp()
    pdp.expect.element('@pdpHeaderLogo').not.to.be.present()
  },

  'Validate Header Name': browser => {
    const title = 'The Grand at Dunwoody'
    const pdp = browser.page.large.pdp()
    pdp.validatePropName(pdp, title)
  },

  'Validate Header Price': browser => {
    const pdp = browser.page.large.pdp()
    pdp.validatePrice(pdp)
  },

  'Validate Header Address': browser => {
    const address = '523 Mallott Ave, Yakutat, AK 99689'
    const pdp = browser.page.large.pdp()
    pdp.validateAddress(pdp, address)
  },

  'Validate Header Phone': browser => {
    const phone = 'or Call: (877) 425-0731'
    const pdp = browser.page.large.pdp()
    pdp.validatePhone(pdp, phone)
  },

  'Validate Lifestyles': browser => {
    const lifestyles = 'Luxury Community'
    const pdp = browser.page.large.pdp()
    pdp.validateLifestyles(pdp, lifestyles)
  },

  'Validate Heart': browser => {
    const pdp = browser.page.large.pdp()
    pdp.validateHeart(pdp)
  },

  'Validate Header Availability': browser => {
    const pdp = browser.page.large.pdp()
    pdp.validateAvailability(pdp)
  },

  'Validate Ratings': browser => {
    const pdp = browser.page.large.pdp()
    pdp.validateRatings(pdp)
  },

  'Validate header ag logo is present when scrolled down': browser => {
    const pdp = browser.page.large.pdp()
    pdp.getLocationInView(('@cityStateLink'), () => {
      pdp.expect.element('@pdpHeaderLogo').to.be.present.before(60)
    })
  },
}
