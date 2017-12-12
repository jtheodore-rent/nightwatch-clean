const pdpPath = '/apartments/Illinois/Oak-Park/100-Forest-Place/10894/'

module.exports = {
  tags: ['stableChrome', 'stableFirefox', 'critical', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'ui',
        value: 'adaptive',
        path: '/',
      })
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .setCookie({
        name: 'featureFlips',
        value: 'lastSlideDfpAd',
        path: '/',
      })
      .url(`${browser.launchUrl}${pdpPath}`)
      .waitForURLEquals(`${browser.launchUrl}${pdpPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate credit check ad presence': browser => (
    browser.expect.element('[data-test-id=gpt_pdp_credit_check]').to.be.present.after(0)
  ),

  'Validate bottom banner ad presence': browser => (
    browser.expect.element('[data-test-id=gpt_pdp_bottom_wide]').to.be.present.after(0)
  ),

  'Validate carousel ads presence': browser => {
    browser.expect.element('[data-test-id=gpt_large_pdp_gallery_1]').to.be.present().before(1000)
    browser.expect.element('[data-test-id=gpt_large_pdp_gallery_2]').to.be.present().before(1000)
  },

  'Validate carousel ad slide does not contain counter': browser => {
    const carousel = browser.page.large.pdp().section.imageCarousel
    carousel.click('@previousArrow', () => {
      carousel.expect.element('@imageCounter').to.not.be.present().after(0)
    })
  },
}
