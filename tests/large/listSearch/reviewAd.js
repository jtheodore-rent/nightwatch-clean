const listSearchPath = '/apartments/Illinois/Chicago/'

module.exports = {
  tags: ['stableChrome', 'stableFirefox', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .setCookie({
        name: 'ui',
        value: 'adaptive',
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

  'Validate key elements of review ad': browser => {
    const listSearchPage = browser.page.large.listSearch()
    listSearchPage.expect.element('@reviewAd').to.be.visible.after(6000)
  },

  'Verify clicking review ad opens Reviews page': browser => {
    browser.page.large.listSearch().waitForElementVisible('@reviewAd')
    .click('@reviewAd')
    .waitForURLEquals(`${browser.launchUrl}/reviews`)
  },
}
