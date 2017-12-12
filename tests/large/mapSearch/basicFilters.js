const chicagoPath = '/map/?city=Chicago&state=Illinois'
const mapRefinmentPath = '&refinements=2-beds-2-baths-4-stars-rating-from-1100-under-3000-1z141y8+1z141y7+4lw'// eslint-disable-line max-len

module.exports = {
  tags: ['stableFirefox', 'critical', 'stableProd'],
  before: browser => {
    const mapSearchPath = '/map/?city=Los-Angeles&state=California'
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
      .page.large.mapSearch().section.firstStandardListing
    . waitForElementVisible('@image0')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Set Up Basic Filters': browser => {
    const mapSearchPage = browser.page.large.mapSearch()
    mapSearchPage.setupBasicFilters(browser)
  },

  'Validate Map Page URL': browser => {
    const mapSearchPath = '/map/?city=Los-Angeles&state=California'
    browser.page.large.mapSearch().waitForElementVisible('@mapboxCanvas', () => {
      browser.assert.urlEquals(`${browser.launchUrl}${mapSearchPath}${mapRefinmentPath}`)
    })
  },

  'Validate Map Page Basic Filters': browser => {
    const mapSearchPage = browser.page.large.mapSearch()
    mapSearchPage.validateBasicFilters(browser)
    const bedPriceText = 'Where can I find a 2 bedroom for $1,100-$3,000 in Los Angeles, CA?'
    const priceText = '$1,100 to $3,000'
    mapSearchPage.expect.element('@locationPrompt')
      .text.to.equal(bedPriceText)
    mapSearchPage.expect.element('@sliderPriceDisplay')
      .text.to.equal(priceText)
    mapSearchPage.expect.element('@twoBedsButton')
      .text.to.equal('2B')
  },

  'Execute A New Search': browser => {
    browser.page.large.header().section.searchBar.setValue('@textInput', 'Chi')
    browser.page.large.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .expect.element('@firstSearchOption').text.to.equal('Chicago, IL')
    browser.page.large.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .click('@firstSearchOption')
      .waitForURLEquals(`${browser.launchUrl}${chicagoPath}${mapRefinmentPath}`)
  },

  'Validate Map Page URL Again': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${chicagoPath}${mapRefinmentPath}`)
  },

  'Validate Map Page Basic Filters Again': browser => {
    const mapSearchPage = browser.page.large.mapSearch()
    mapSearchPage.validateBasicFilters(browser)
    const bedPriceText = 'Where can I find a 2 bedroom for $1,100-$3,000 in Chicago, IL?'
    const priceText = '$1,100 to $3,000'
    browser.page.large.mapSearch().expect.element('@locationPrompt')
     .text.to.equal(bedPriceText)
    browser.page.large.mapSearch().expect.element('@sliderPriceDisplay')
     .text.to.equal(priceText)
    browser.page.large.mapSearch().expect.element('@twoBedsButton').text.to.equal('2B')
  },

  'Navigate back to List View': browser => {
    const chicagoListPath = '/apartments/Illinois/Chicago'
    const listRefinmentPath = '/2-beds-2-baths-4-stars-rating-from-1100-under-3000-1z141y8+1z141y7+4lw/'// eslint-disable-line max-len
    browser.page.large.mapSearch().click('@listViewButton')
      .waitForURLEquals(`${browser.launchUrl}${chicagoListPath}${listRefinmentPath}`)
    browser.page.large.mapSearch().waitForElementVisible('@mapViewButton')
  },

  'Validate List Page Basic Filters': browser => {
    const listSearchPage = browser.page.large.mapSearch()
    listSearchPage.validateBasicFilters(browser)
  },
}
