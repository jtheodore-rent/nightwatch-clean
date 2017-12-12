const listSearchPath = '/apartments/California/Los-Angeles/'
const emptyHeartRGBRegex = new RegExp(/(255, 255, 255)/)
const savedHeaderHeartRGBRegex = new RegExp(/(209, 0, 21)/)
const savedListingHeartRGBRegex = new RegExp(/(194, 12, 19)/)

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

  'Validate Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${listSearchPath}`)
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Los Angeles, CA')
  },

  'Verify My Places Count is Empty': browser => {
    const header = browser.page.large.header()
    header.section.utilityNavigation.expect.element('@myPlacesLink').to.be.visible.after(0)
    header.section.utilityNavigation.expect.element('@myPlacesLink').text.to
      .equal('My Places')
    header.section.utilityNavigation.waitForElementVisible('@heartIcon')
    header.section.utilityNavigation.expect.element('@heartIcon').to.have.css('fill').to
      .equal('none')
  },

  'Verify Spotlight and Two Standerd Listing Favorite Heart Icon Empty': browser => {
    const listSearch = browser.page.large.listSearch()
    // spotlight
    listSearch.section.spotlightListing.expect.element('@saveHeartIcon').to.be.visible.after(0)
    listSearch.section.spotlightListing.expect.element('@saveHeartIcon').to.have.css('fill').to
      .match(emptyHeartRGBRegex)
    // First Standerd Listing
    listSearch.section.firstStandardListing.expect.element('@saveHeartIcon').to.be.visible.after(0)
    listSearch.section.firstStandardListing.expect.element('@saveHeartIcon').to.have.css('fill').to
      .match(emptyHeartRGBRegex)
  },

  'Save and Verify Spotlgiht Listing': browser => {
    const listSearch = browser.page.large.listSearch()
    listSearch.section.spotlightListing.click('@heart', () => {
      listSearch.section.loginModal.waitForElementVisible('@closeModal')
        .click('@closeModal', () => {
          listSearch.section.spotlightListing.expect.element('@saveHeartIcon').to.have.css('fill')
            .to.match(savedListingHeartRGBRegex)
        })
    })
  },

  'Verify Header My Places Count': browser => {
    const header = browser.page.large.header()
    header.section.utilityNavigation.expect.element('@myPlacesLink').to.be.visible.after(0)
    header.section.utilityNavigation.expect.element('@myPlacesLink').text.to
      .equal('My Places (1)')
    header.section.utilityNavigation.expect.element('@heartIcon').to.have.css('fill').to
      .match(savedHeaderHeartRGBRegex)
  },

  'Save and Verify First Standard Listing': browser => {
    const listSearch = browser.page.large.listSearch()
    listSearch.section.firstStandardListing.waitForElementVisible('@heart')
      .click('@heart', () => {
        listSearch.section.firstStandardListing.expect.element('@saveHeartIcon').to.have.css('fill')
          .to.match(savedListingHeartRGBRegex)
      })
  },

  'Verify Header My Places Count After First Standard Listing': browser => {
    const header = browser.page.large.header()
    header.section.utilityNavigation.expect.element('@myPlacesLink').to.be.visible.after(0)
    header.section.utilityNavigation.expect.element('@myPlacesLink').text.to
      .equal('My Places (2)')
    header.section.utilityNavigation.expect.element('@heartIcon').to.have.css('fill').to
      .match(savedHeaderHeartRGBRegex)
  },

  'Unsave Spotlight Listing': browser => {
    const listSearch = browser.page.large.listSearch()
    listSearch.section.spotlightListing.waitForElementVisible('@heart')
      .click('@heart')
  },

  'Verify Spotlight Heart is Empty': browser => {
    const listSearch = browser.page.large.listSearch()
    listSearch.section.spotlightListing.expect.element('@saveHeartIcon').to.have.css('fill').to
      .match(emptyHeartRGBRegex)
  },

  'Verify Final Header My Places Count': browser => {
    const header = browser.page.large.header()
    header.section.utilityNavigation.expect.element('@myPlacesLink').to.be.visible.after(0)
    header.section.utilityNavigation.expect.element('@myPlacesLink').text.to
      .equal('My Places (1)')
    header.section.utilityNavigation.expect.element('@heartIcon').to.have.css('fill').to
      .match(savedHeaderHeartRGBRegex)
  },
}
