const mapSearchPath = '/map/?city=Atlanta&state=Georgia&boundingBox=-84.465,33.722,-84.322,33.783' // eslint-disable-line max-len
const mapCanonicalPath = '/map/?city=Atlanta&state=Georgia'
const listSearchPath = '/apartments/Georgia/Atlanta/?sortby=distance'
const listingsCononicalPath = '/apartments/Georgia/Atlanta/'
const srpTitlePattern = /Apartments for Rent in Atlanta, GA - \d+ Rentals/

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
      .url(`${browser.launchUrl}${mapSearchPath}`)
      .waitForURLEquals(`${browser.launchUrl}${mapSearchPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Wait for Map Page to display': browser => {
    browser.page.large.mapSearch().waitForElementVisible('@listViewButton')
    browser.page.large.mapSearch().waitForElementVisible('@mapboxCanvas')
  },

  'Validate Map Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${mapSearchPath}`)
    browser.page.large.title().validateDefaultTitle(browser)
    const firstStandardListing = browser.page.large.mapSearch().section.firstStandardListing
    firstStandardListing.expect.element('@address').text.to.match(/\w+\D+/)
    firstStandardListing.expect.element('@address').text.to.include(', GA')
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Atlanta, GA')
    browser.page.shared.headTags().validate({
      meta: { robots: 'noindex,follow' },
      canonical: `${browser.launchUrl}${mapCanonicalPath}`,
    })
  },

  'Navigate to List View': browser => {
    browser.page.large.mapSearch().click('@listViewButton')
      .waitForURLEquals(`${browser.launchUrl}${listSearchPath}`)
  },

  'Validate List Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${listSearchPath}`)
    browser.expect.element('title').attribute('text').to.match(srpTitlePattern)
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Atlanta, GA')
    browser.page.shared.headTags().validate({
      meta: { robots: false },
      canonical: `${browser.launchUrl}${listingsCononicalPath}`,
    })
  },
}
