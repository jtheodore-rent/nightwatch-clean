const basePdpPath = '/apartments/Alaska/Yakutat/The-Grand-at-Parkview/184724/'

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
        value: 'pdpCardGalleryLastSlideDfpAds',
        path: '/',
      })
      .pause(500)
      .url(`${browser.launchUrl}${basePdpPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate dfp adslots have been added on page load': browser => {
    browser.expect.element('[data-test-id=gpt_small_pdp_gallery_1]').to.be.present().before(1000)
    browser.expect.element('[data-test-id=gpt_small_pdp_gallery_2]').to.be.present().before(1000)
    browser.page.small.propertyCard()
    .section.photos.expect.element('@photoGalleryImageCounter').to.be.visible.before(1000)
  },

  'Validate dfp ad slots are removed from gallery': browser => {
    browser.page.small.propertyCard().section.photos.click('@photoGalleryNext', () => {
      browser.expect.element('[data-test-id=gpt_small_pdp_gallery_1]').not.to.be.present().before(1000)
      browser.expect.element('[data-test-id=gpt_small_pdp_gallery_2]').not.to.be.present().before(1000)
    })
  },
}
