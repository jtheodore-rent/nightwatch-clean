const pdpPath = '/apartments/Alaska/Yakutat/The-Grand-at-Merrimack-Student-Living/100022032/'

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

  'Validate Header': browser => {
    const pdp = browser.page.large.pdp()
    pdp.validateInformationHeader(pdp)
  },

  'Validate Description': browser => {
    const description = 'This is for smoke testing in PROD. Note to see the refresh. 61016dd'
    const pdp = browser.page.large.pdp()
    pdp.expect.element('@managementCoDescription').text.to.include(description)
  },

  'Validate Phone': browser => {
    const phone = '(888) 337-2659'
    const pdp = browser.page.large.pdp()
    pdp.expect.element('@helpfulPhone').text.to.include(phone)
  },

  'Get Helpful Information In View': browser => {
    const pdp = browser.page.large.pdp()
    pdp.getLocationInView('@informationHeader')
  },

  'Validate Helpful Links': browser => {
    const pdp = browser.page.large.pdp()
    pdp.validateHelpfulLinks(pdp, browser)
  },
}
