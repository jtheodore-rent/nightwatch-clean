const gridListingsPath = '/apartments/Georgia/Atlanta'
const gridFewListingsPath = '/apartments/Alaska/Yakutat/?propertyname=The%20Grand%20at%20Parkview'

module.exports = {
  tags: ['stableAndroid', 'stableIOS', 'stableProd'],
  after: browser => {
    browser.customSauceEnd()
  },

  'Validate native grid ad': browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .setCookie({
        name: 'featureFlips',
        value: 'inGridDFPAd',
        path: '/',
      })
      .pause(500)
      .url(`${browser.launchUrl}${gridListingsPath}`)
      .waitForElementVisible('#react-view')
      .expect.element('[data-test-id=gpt_grid_srp]').to.be.present().before(1000)
  },

  'Validate native grid ad does not exist when there are fewer than 4 listings': browser => {
    browser
      .url(`${browser.launchUrl}${gridFewListingsPath}`)
      .waitForElementVisible('#react-view')
      .expect.element('[data-test-id=gpt_grid_srp]').not.to.be.present().before(1000)
  },
}
