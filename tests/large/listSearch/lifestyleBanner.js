const listingPath = '/apartments/Alaska/Yakutat/?propertyname=dps-property-one'

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
      .url(`${browser.launchUrl}${listingPath}`)
      .waitForURLEquals(`${browser.launchUrl}${listingPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate Listing On Search Page': browser => {
    const listSearch = browser.page.large.listSearch()
    browser.assert.urlEquals(`${browser.launchUrl}${listingPath}`)
    listSearch.section.firstStandardListing.expect.element('@name').text.to
      .equal('DPS Property One')
  },

  'Verify lifestyle Banner': browser => {
    const listSearch = browser.page.large.listSearch().section.firstStandardListing
    const bannerBackgroundRGBRegex = new RegExp(/(245, 166, 35, 1)/)
    const bannerTextRGBRegex = new RegExp(/(255, 255, 255, 1)/)
    listSearch.expect.element('@lifestyleBanner').to.be.visible.after(6000)
    listSearch.expect.element('@lifestyleBanner').text.to
      .equal('Luxury')
    // verifying lifestyle banner background color
    listSearch.expect.element('@lifestyleBanner').to.have.css('background-color').to
      .match(bannerBackgroundRGBRegex)
    // verifying lifestyle banner text color
    listSearch.expect.element('@lifestyleBanner').to.have.css('color').to
      .match(bannerTextRGBRegex)
  },
}
