const listSearchPath = '/apartments/California/San-Francisco/'

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
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Verify 20th listing is present': browser => {
    browser.page.large.listSearch().section.twentiethStandardListing.expect.element('@name')
      .to.be.visible.before(1000)
  },

  'Verify 21st listing is not present': browser => {
    browser.page.large.listSearch().section.twentyfirstStandardListing.expect.element('@name')
      .to.not.be.present.after(0)
  },
}
