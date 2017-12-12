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
      .url(`${browser.launchUrl}${listSearchPath}`)
      .waitForURLEquals(`${browser.launchUrl}${listSearchPath}`)
      .waitForElementVisible('#react-view')
      .page.large.listSearch().section.firstStandardListing
      .waitForElementVisible('@image0')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate Cost Section': browser => {
    browser.page.large.listSearch().expect.element('@cost').to.be.visible.after(0)
    browser.page.large.listSearch().section.quickLinksCostTab.expect.element('@link').to.be.visible.before(60000)
  },

  'Validate Property Type Section': browser => {
    browser.page.large.listSearch().expect.element('@propertyType').to.be.visible.after(0)
  },

  /* Commenting out, to be added back with https://www.pivotaltracker.com/story/show/149179553
  'Validate Features Tab Link': browser => {
    browser.page.large.listSearch()
      .clickAndValidateQuickSearchLink(browser, 'quickLinksFeaturesTab')
  },
  */
}
