// Listing Info
const basePdpPath = '/apartments/Alaska/Takotna/The-Grand-at-Parkview/184724/'

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
        value: 'visualSearchFloorplanTabFirst',
        path: '/',
      })
      .pause(500)
      .url(`${browser.launchUrl}${basePdpPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Switch to Photo tab': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${basePdpPath}`)
    const pdpCard = browser.page.small.propertyCard()
    pdpCard
      .click('@photosButtonImage')
      .section.photos.waitForElementVisible('@photoGalleryImage')
  },

  'Validate Photo tab pagination': browser => {
    const pdpCard = browser.page.small.propertyCard()
    pdpCard.validatePhotoGallery(browser, pdpCard)
  },
}
