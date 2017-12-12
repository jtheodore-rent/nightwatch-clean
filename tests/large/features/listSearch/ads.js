const listSearchPath = '/apartments/California/Los-Angeles/'

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
      .setCookie({
        name: 'featureFlips',
        value: 'inListingsDFPAd',
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

  'Validate right rail banner ad presence': browser => {
    const listSearch = browser.page.large.listSearch()
    listSearch.moveToElement('@propertyType', 0, 0, () => {
      browser.expect.element('[data-test-id=gpt_right_bottom]').to.be.present.before(1000)
    })
  },

  'Validate bottom banner ad presence': browser => {
    const listSearch = browser.page.large.listSearch()
    listSearch.moveToElement('@localInfoHeader', 0, 100, () => {
      browser.expect.element('[data-test-id=gpt_bottom_wide]').to.be.present.before(1000)
    })
  },

  'Validate sponsored properties ad 1 presence': browser => (
    browser.expect.element('[data-test-id=gpt_sa_p1]').to.be.present.before(1000)
  ),

  'Validate sponsored properties ad 2 presence': browser => (
    browser.expect.element('[data-test-id=gpt_sa_p2]').to.be.present.before(1000)
  ),

  'Validate sponsored properties ad 3 presence': browser => (
    browser.expect.element('[data-test-id=gpt_sa_p3]').to.be.present.before(1000)
  ),

  'Validate sponsored properties ad 4 presence': browser => (
    browser.expect.element('[data-test-id=gpt_sa_p4]').to.be.present.before(1000)
  ),

  'Validate sponsored properties ad 5 presence': browser => (
    browser.expect.element('[data-test-id=gpt_sa_p5]').to.be.present.before(1000)
  ),
}
