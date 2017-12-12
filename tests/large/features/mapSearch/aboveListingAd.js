const mapListingsPath = '/map/?city=Los-Angeles&state=California'
const mapNoListingsPath = '/map/?city=Perry&state=Florida'

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
        value: 'aboveListingsMapDFPAd',
        path: '/',
      })
      .url(`${browser.launchUrl}${mapListingsPath}`)
      .waitForURLEquals(`${browser.launchUrl}${mapListingsPath}`)
      .waitForElementVisible('#react-view')
      .page.large.listSearch().section.firstStandardListing
      .waitForElementVisible('@image0')
  },

  'Verify ad is visible': browser => {
    browser.expect.element('[data-test-id=gpt_map_list]').to.be.present.before(1000)
  },

  'Validate native ad above listings goes away when there are no listings': browser => {
    browser
      .url(`${browser.launchUrl}${mapNoListingsPath}`)
      .waitForURLEquals(`${browser.launchUrl}${mapNoListingsPath}`)
      .waitForElementVisible('#react-view')
  },

  'Verify ad is not present': browser => {
    browser.expect.element('[data-test-id=gpt_map_list]').not.to.be.present.after(0)
  },
}
