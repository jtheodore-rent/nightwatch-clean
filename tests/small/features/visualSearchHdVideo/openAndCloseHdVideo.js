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
        value: 'visualSearchHdVideo',
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

  'Validate hdvideo button is present': browser => {
    browser
      .page
      .small
      .pdp()
      .expect.element('@hdVideoButton').to.be.visible.before(1000)
  },

  'Click the hdvideo button and Validates video taqg': browser => {
    browser
      .page
      .small
      .pdp()
      .click('@hdVideoButton')
      .expect.element('@hdVideoTag').to.be.visible.before(1000)
  },

  'Close hdvideo': browser => {
    browser
      .page
      .small
      .pdp()
      .click('@closeHdVideo')
  },

  'Validate that hdvideo is closed': browser => {
    browser
      .page
      .small
      .pdp()
      .expect.element('@hdVideoTag').to.not.be.present.before(1000)
  },
}
