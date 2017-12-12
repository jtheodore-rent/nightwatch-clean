const pdpPath = '/apartments/Alaska/Yakutat/EGG-Property-One/185296/'
const srpPath = '/apartments/Alaska/Yakutat/'

module.exports = {
  tags: ['critical', 'stableAndroid', 'stableIOS', 'stableProd'],
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

  'Click the close button on the modal': browser => {
    const testDevice = browser.options.desiredCapabilities.id

    if (testDevice && testDevice.includes('Android_4_4')) {
      console.log('skipping test on Android 4.4') // eslint-disable-line no-console
    } else {
      browser.page.small.propertyCard().waitForElementVisible('@closeButton').click('@closeButton')
      browser.page.small.propertyCard().waitForElementNotPresent('@closeButton')
    }
  },

  'Verify the user is returned to the SRP after closing the card': browser => {
    const testDevice = browser.options.desiredCapabilities.id

    if (testDevice && testDevice.includes('Android_4_4')) {
      console.log('skipping test on Android 4.4') // eslint-disable-line no-console
    } else {
      browser.assert.urlEquals(`${browser.launchUrl}${srpPath}`)
    }
  },

  'Verify page title': browser => {
    browser.page.small.title().validatePageTitle(browser,
      /Apartments For Rent in Yakutat, AK - \d+ Rentals | ApartmentGuide.com/)
  },
}
