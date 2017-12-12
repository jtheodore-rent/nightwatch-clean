const mapViewPath = '/map/?city=Yakutat&state=Alaska'

module.exports = {
  tags: ['stableAndroid', 'stableIOS', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'featureFlips',
        value: 'iyfFilters',
        path: '/',
      })
      .pause(500)
      .url(`${browser.launchUrl}${mapViewPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate iyf Filter Panel does not open on map view': browser => {
    const mapSearch = browser.page.small.mapSearch()
    mapSearch.expect.element('@filterPanel').to.not.be.present()
  },
}
