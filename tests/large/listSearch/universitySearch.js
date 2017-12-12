const listSearchPath = '/apartments/California/Los-Angeles/'
const atlantaUniversityList = '/apartments/Georgia/Georgia-State-University/'
const atlantaUniversityMap = '/map/?city=Georgia-State-University&state=Georgia'

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
      .url(`${browser.launchUrl}${listSearchPath}`)
      .waitForURLEquals(`${browser.launchUrl}${listSearchPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Execute University Search': browser => {
    browser.page.large.header().searchByClickingFirstOption(browser, {
      query: 'Georgia state',
      expectedQueryText: 'Georgia State University, GA',
      path: `${atlantaUniversityList}`,
    })
  },

  'Validate Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${atlantaUniversityList}`)
    browser.expect.element('title').attribute('text').to
      .match(/Apartments for Rent in Georgia State University, GA - \d+ Rentals/)
    browser.page.large.listSearch().section.firstStandardListing.expect.element('@address')
      .text.to.match(/\w+\D+/)
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Georgia State University, GA')
    browser.page.shared.headTags().validate({
      meta: { robots: false },
      canonical: `${browser.launchUrl}${atlantaUniversityList}`,
    })
  },

  'Navigate to Map View': browser => {
    browser.page.large.listSearch().click('@mapViewButton')
  },

  'Wait for Map Page to display': browser => {
    browser.page.large.mapSearch().waitForElementVisible('@listViewButton')
    browser.page.large.mapSearch().waitForElementVisible('@mapboxCanvas')
  },

  'Validate Map Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${atlantaUniversityMap}`)
    browser.page.large.title().validateDefaultTitle(browser)
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Georgia State University, GA')
    browser.page.shared.headTags().validate({
      meta: { robots: 'noindex,follow' },
      canonical: `${browser.launchUrl}${atlantaUniversityMap}`,
    })
  },

  'Navigate back to List View': browser => {
    browser.page.large.mapSearch().click('@listViewButton')
      .waitForURLEquals(`${browser.launchUrl}${atlantaUniversityList}`)
    browser.page.large.listSearch().waitForElementVisible('@mapViewButton')
  },

  'Execute Second Search': browser => {
    browser.page.large.header().searchByEnterFirstOption(browser, {
      query: 'Los Angeles, CA',
      expectedQueryText: 'Los Angeles, CA',
      path: `${listSearchPath}`,
    })
  },

  'Wait for Final Search URL': browser => {
    browser.waitForURLEquals(`${browser.launchUrl}${listSearchPath}`)
  },

  'Validate Final List Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${listSearchPath}`)
    browser.expect.element('title').attribute('text').to
      .match(/Apartments for Rent in Los Angeles, CA - \d+ Rentals/)
    browser.page.large.listSearch().section.firstStandardListing.expect.element('@address')
      .text.to.match(/\w+\D+/)
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Los Angeles, CA')
    browser.page.shared.headTags().validate({
      meta: { robots: false },
      canonical: `${browser.launchUrl}${listSearchPath}`,
    })
  },
}
