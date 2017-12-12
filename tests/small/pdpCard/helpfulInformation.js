const pdpPath = '/apartments/Alaska/Yakutat/The-Grand-at-Merrimack-Student-Living/100022032/'

module.exports = {
  tags: ['stableAndroid', 'quarantineIOS', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${pdpPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Switch to Details tab': browser => {
    browser.page.small.propertyCard().click('@detailsButtonImage')
    browser.page.small.propertyCard().section.details.waitForElementVisible('@officeHoursHeading')
  },

  'Validate Header': browser => {
    const pdp = browser.page.small.propertyCard()
    pdp.validateInformationHeader(pdp)
  },

  'Validate Description': browser => {
    const description = 'This is for smoke testing in PROD. Note to see the refresh. 61016dd'
    const pdp = browser.page.small.propertyCard()
    pdp.expect.element('@managementCoDescription').text.to.include(description)
  },

  'Get Helpful Information In View': browser => {
    const pdp = browser.page.small.propertyCard()
    pdp.getLocationInView('@informationHeader')
  },

  'Validate Helpful Links': browser => {
    const pdp = browser.page.small.propertyCard()
    pdp.validateHelpfulLinks(pdp, browser, pdpPath)
  },
}
