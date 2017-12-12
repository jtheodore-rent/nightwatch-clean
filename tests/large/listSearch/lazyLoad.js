const listSearchPath = '/apartments/Alaska/Yakutat/'

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

  'Confirm first standard listing image is visible': browser => {
    browser.page.large.listSearch().section.firstStandardListing
      .expect.element('@image0').to.be.visible.before(1000)
  },

  'Confirm third image for the first standard listing is NOT visible': browser => {
    browser.page.large.listSearch().section.firstStandardListing
      .expect.element('@image2').not.to.be.visible.after(0)
  },

  'Confirm paginating the first standard listing loads image': browser => {
    browser.page.large.listSearch().section.firstStandardListing.click('@next')
    browser.page.large.listSearch().section.firstStandardListing
      .waitForElementVisible('@image2')
  },

  'Confirm tenth listing image is not present': browser => {
    browser.page.large.listSearch().section.tenthStandardListing
      .expect.element('@image0').not.to.be.present.after(0)
  },

  'Confirm tenth listing image is visible after scroll': browser => {
    browser.page.large.listSearch().section.tenthStandardListing
      .getLocationInView('@name', () => {
        browser.page.large.listSearch().section.tenthStandardListing
          .waitForElementVisible('@image0')
      })
  },
}
