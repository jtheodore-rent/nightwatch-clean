const losAngelesMapPath = '/map/?city=Los-Angeles&state=California'
const atlantaMapPath = '/map/?city=Atlanta&state=Georgia'
const atlantaListPath = '/apartments/Georgia/Atlanta/'

module.exports = {
  tags: ['stableFirefox', 'critical', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${losAngelesMapPath}`)
      .waitForURLEquals(`${browser.launchUrl}${losAngelesMapPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Wait for Map Page to display': browser => {
    browser.page.large.mapSearch().waitForElementVisible('@listViewButton')
    browser.page.large.mapSearch().waitForElementVisible('@mapboxCanvas')
  },

  'Enter search query': browser => {
    browser.page.large.header().section.searchBar.setValue('@textInput', 'Atla')
  },

  'Verify and Click First Search Option': browser => {
    browser.page.large.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .expect.element('@firstSearchOption').text.to.equal('Atlanta, GA')
    browser.page.large.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .click('@firstSearchOption').waitForURLEquals(`${browser.launchUrl}${atlantaMapPath}`)
  },

  'Validate Map Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${atlantaMapPath}`)
    browser.page.large.title().validateDefaultTitle(browser)
    browser.page.large.mapSearch().section.firstStandardListing.expect.element('@address')
      .text.to.match(/\w+\D+/)
    browser.page.large.mapSearch().section.firstStandardListing.expect.element('@address')
      .text.to.include(', GA')
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Atlanta, GA')
    browser.page.shared.headTags().validate({
      meta: { robots: 'noindex,follow' },
      canonical: `${browser.launchUrl}/map/?city=Atlanta&state=Georgia`,
    })
  },

  'Navigate to List View': browser => {
    browser.page.large.mapSearch().click('@listViewButton')
    browser.waitForURLEquals(`${browser.launchUrl}${atlantaListPath}`)
  },

  'Validate List Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${atlantaListPath}`)
    browser.expect.element('title').attribute('text').to
      .match(/Apartments for Rent in Atlanta, GA - \d+ Rentals/)

    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Atlanta, GA')
    browser.page.shared.headTags().validate({
      meta: { robots: false },
      canonical: `${browser.launchUrl}/apartments/Georgia/Atlanta/`,
    })
  },

  'Navigate back to Map View': browser => {
    browser.page.large.listSearch().click('@mapViewButton')
      .waitForURLEquals(`${browser.launchUrl}/map/?city=Atlanta&state=Georgia`)
    browser.page.large.mapSearch().waitForElementVisible('@listViewButton')
  },

  'Search a second time': browser => {
    browser.page.large.header().section.searchBar.setValue('@textInput', 'Los Angeles, CA')
  },

  'Execute second search': browser => {
    browser.page.large.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .expect.element('@firstSearchOption').text.to.equal('Los Angeles, CA')
    browser.page.large.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .click('@firstSearchOption').waitForURLEquals(`${browser.launchUrl}${losAngelesMapPath}`)
  },

  'Validate Final Map Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${losAngelesMapPath}`)
    browser.page.large.title().validateDefaultTitle(browser)
    browser.page.large.mapSearch().section.firstStandardListing.expect.element('@address')
      .text.to.match(/\w+\D*/)
    browser.page.large.mapSearch().section.firstStandardListing.expect.element('@address')
      .text.to.include(', CA')
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Los Angeles, CA')
    browser.page.shared.headTags().validate({
      meta: { robots: 'noindex,follow' },
      canonical: `${browser.launchUrl}/map/?city=Los-Angeles&state=California`,
    })
  },

  'Update Map Breadcrumbs After Filter Selection': browser => {
    browser.page.large.mapSearch().click('@bedsFilter')
      .waitForElementVisible('@secondBedFilter')
      .click('@secondBedFilter')
      .waitForElementVisible('@bedroomPill', () => {
        browser.page.large.listSearch().validateBreadcrumbs(browser, 4)
      })
  },
}
