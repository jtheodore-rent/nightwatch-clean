const listSearchPath = '/apartments/California/Los-Angeles/?page=11'

module.exports = {
  tags: ['stableChrome', 'stableFirefox', 'critical', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${listSearchPath}`)
      .waitForURLEquals(`${browser.launchUrl}${listSearchPath}`)
      .waitForElementVisible('#react-view')
      .page.large.listSearch().section.firstStandardListing
      .waitForElementVisible('@image0')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate List View noindex after page 10': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${listSearchPath}`)
    browser.page.shared.headTags().validate({
      meta: { robots: 'noindex, follow' },
    })
  },
}
