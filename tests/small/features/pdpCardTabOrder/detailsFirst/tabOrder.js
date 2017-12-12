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
        value: 'visualSearchDetailsTabFirst',
        path: '/',
      })
      .pause(500)
      .url(`${browser.launchUrl}${basePdpPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate Tab Order': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${basePdpPath}`)
    const pdpCard = browser.page.small.propertyCard()
    pdpCard.expect.element('@firstTabButton').attribute('data-test-id').to
      .equal('pdp-details-button')
    pdpCard.expect.element('@secondTabButton').attribute('data-test-id').to
      .equal('pdp-photos-button')
    pdpCard.expect.element('@thirdTabButton').attribute('data-test-id').to
      .equal('pdp-map-button')
    pdpCard.expect.element('@fourthTabButton').attribute('data-test-id').to
      .equal('pdp-reviews-button')
    pdpCard.expect.element('@fifthTabButton').attribute('data-test-id').to
      .equal('pdp-floor-plans-button')
    pdpCard.expect.element('@sixthTabButton').attribute('data-test-id').to
      .equal('pdp-share-button')
  },
}
