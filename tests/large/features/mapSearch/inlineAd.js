const mapListingsPath = '/map/?city=Los-Angeles&state=California'
const mapFewListingsPath = '/map/?city=Butte&state=North-Dakota'

module.exports = {
  tags: ['stableChrome', 'stableFirefox', 'critical', 'stableProd'],
  after: browser => {
    browser.customSauceEnd()
  },

  'Navigate to map page where ad should appear': browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'ui',
        value: 'adaptive',
        path: '/',
      })
      .setCookie({
        name: 'featureFlips',
        value: 'inListingsMapDFPAd',
        path: '/',
      })
      .url(`${browser.launchUrl}${mapListingsPath}`)
      .waitForURLEquals(`${browser.launchUrl}${mapListingsPath}`)
      .waitForElementVisible('#react-view')
      .page.large.listSearch().section.firstStandardListing
      .waitForElementVisible('@image0')
  },

  'Verify ad is visible': browser => {
    browser.expect.element('[data-test-id=gpt_map_inline]').to.be.present.before(1000)
  },

  'Navigate to map page where listings < 7': browser => {
    browser
      .url(`${browser.launchUrl}${mapFewListingsPath}`)
      .waitForURLEquals(`${browser.launchUrl}${mapFewListingsPath}`)
      .waitForElementVisible('#react-view')
  },

  'Verify ad is not visible': browser => {
    browser.expect.element('[data-test-id=gpt_map_inline]').not.to.be.present.after(0)
  },
}
