const basePdpPath = '/apartments/Alaska/Yakutat/EGG-Property-One/185296/'
/* eslint-disable max-len */
const description = 'Find your new home at EGG Property One located at 477 Mallotts Ave, Yakutat, AK 99689. Floor plans starting at $125. Check availability now!'
/* eslint-enable max-len */

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
      .url(`${browser.launchUrl}${basePdpPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate Page': browser => {
    browser
      .page
      .small
      .pdp()
      .expect
      .element('@container')
      .to.be.visible.after(0)

    browser
      .expect
      .element('meta[name="description"]')
      .attribute('content')
      .to
      .equal(description)
  },
}
