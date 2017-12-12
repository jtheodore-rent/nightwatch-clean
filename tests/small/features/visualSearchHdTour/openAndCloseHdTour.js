const basePdpPath = '/apartments/Alaska/Yakutat/The-Grand-at-Dunwoody/100022110/'

module.exports = {
  tags: ['stableAndroid', 'stableIOS', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .setCookie({
        name: 'featureFlips',
        value: 'visualSearchHdTour',
        path: '/',
      })
      .pause(500)
      .url(`${browser.launchUrl}${basePdpPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate initial state': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${basePdpPath}`)
    browser
      .page
      .small
      .pdp()
      .expect.element('@container').to.be.visible.before(1000)
  },

  'Validate hdtour button is present': browser => {
    browser
      .page
      .small
      .pdp()
      .expect.element('@hdTourButton').to.be.visible.before(1000)
  },

  'Click the hdtour button and Validates hdtour iframe': browser => {
    browser
      .page
      .small
      .pdp()
      .click('@hdTourButton')
      .expect.element('@hdTourIframe').to.be.visible.before(1000)
  },

  'Close hdtour': browser => {
    browser
      .page
      .small
      .pdp()
      .click('@closeHdTour')
  },

  'Validate that hdtour is closed': browser => {
    browser
      .page
      .small
      .pdp()
      .expect.element('@hdTourIframe').to.not.be.present.before(1000)
  },
}
