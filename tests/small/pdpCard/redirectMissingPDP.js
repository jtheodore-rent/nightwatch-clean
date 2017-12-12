const bogusPdpPath = '/apartments/Alaska/Yakutat/Concierge-Property-One/999999/'
const srpPath = '/apartments/Alaska/Yakutat/'
const bogusPdpWithGoodIdPath = '/apartments/Alaska/Yakutat/Foo-Apartments/100022110/'
const goodPDPPath = '/apartments/Alaska/Yakutat/The-Grand-at-Dunwoody/100022110/'

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
      .url(`${browser.launchUrl}${bogusPdpPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Verify the user is redirected to the SRP': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${srpPath}`)
  },

  'Load URL with good id but bad name': browser => {
    browser.url(`${browser.launchUrl}${bogusPdpWithGoodIdPath}`)
      .waitForElementVisible('#react-view')
  },

  'Verify the user is redirected to the correct PDP URL': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${goodPDPPath}`)
  },
}
