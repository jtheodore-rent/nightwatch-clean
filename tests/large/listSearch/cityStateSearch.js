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

  'Validate local info content for Los Angeles': browser => {
    const listSearchPage = browser.page.large.listSearch()
    browser.assert.urlEquals(`${browser.launchUrl}${listSearchPath}`)
    listSearchPage.expect.element('@localInfoLink').text.to
      .equal('Discover More About Los Angeles »')
    listSearchPage.expect.element('@localInfoHeader').text.to
      .equal('All about\nLos Angeles, CA')
    listSearchPage.expect.element('@localInfoArticleContent').text.to
      .match(/\w+/)
    listSearchPage.click('@localInfoLink')
    // TODO assert that the local info article is in the viewport
  },

  'Execute City State Search': browser => {
    browser.page.large.header().searchByClickingFirstOption(browser, {
      query: 'Atla',
      expectedQueryText: 'Atlanta, GA',
      path: '/apartments/Georgia/Atlanta/',
    })
  },

  'Validate Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/apartments/Georgia/Atlanta/`)
    browser.expect.element('title').attribute('text').to
      .match(/Apartments for Rent in Atlanta, GA - \d+ Rentals/)
    browser.page.large.listSearch().expect.element('@h1Tag').text.to
      .equal('Apartments for rent in Atlanta, GA')
    browser.elements('css selector', 'h1', results => {
      browser.expect(results.value.length).to.equal(1)
    })
    browser.page.large.listSearch().section.firstStandardListing.expect.element('@address')
      .text.to.match(/\w+\D+/)
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Atlanta, GA')
    browser.page.shared.headTags().validate({
      meta: { robots: false },
      canonical: `${browser.launchUrl}/apartments/Georgia/Atlanta/`,
    })
    browser.page.large.listSearch().expect.element('@averageBedroomPricesHeader')
      .text.to.equal('Average Rent in Atlanta, GA')
    browser.page.large.listSearch().validateAverageBedroomPrices(browser)
    browser.page.large.listSearch().validateBreadcrumbs(browser, 3)
  },

  'Validate local info content for Atlanta': browser => {
    browser.page.large.listSearch().expect.element('@localInfoHeader').text.to
      .equal('All about\nAtlanta, GA')
  },

  'Navigate to Map View': browser => {
    browser.page.large.listSearch().click('@mapViewButton')
      .waitForURLEquals(`${browser.launchUrl}/map/?city=Atlanta&state=Georgia`)
  },

  'Wait for Map Page to display': browser => {
    browser.page.large.mapSearch().waitForElementVisible('@listViewButton')
    browser.page.large.mapSearch().waitForElementVisible('@mapboxCanvas')
  },

  'Validate Map Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/map/?city=Atlanta&state=Georgia`)
    browser.page.large.title().validateDefaultTitle(browser)
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Atlanta, GA')
    browser.page.shared.headTags().validate({
      meta: { robots: 'noindex,follow' },
      canonical: `${browser.launchUrl}/map/?city=Atlanta&state=Georgia`,
    })
    browser.page.large.listSearch().validateBreadcrumbs(browser, 3)
  },

  'Navigate back to List View': browser => {
    browser.page.large.mapSearch().click('@listViewButton')
      .waitForURLEquals(`${browser.launchUrl}/apartments/Georgia/Atlanta/`)
    browser.page.large.listSearch().waitForElementVisible('@mapViewButton')
  },

  'Execute Second Search': browser => {
    browser.page.large.header().searchByEnterFirstOption(browser, {
      query: 'Los Angeles, CA',
      expectedQueryText: 'Los Angeles, CA',
      path: '/apartments/California/Los-Angeles/',
    })
    browser.waitForURLEquals(`${browser.launchUrl}/apartments/California/Los-Angeles/`)
  },

  'Validate Final List Search Page': browser => {
    browser.expect.element('title').attribute('text').to
      .match(/Apartments for Rent in Los Angeles, CA - \d+ Rentals/)
    browser.page.large.listSearch().section.firstStandardListing.expect.element('@address')
      .text.to.match(/\w+\D*/)
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Los Angeles, CA')
    browser.page.shared.headTags().validate({
      meta: { robots: false },
      canonical: `${browser.launchUrl}/apartments/California/Los-Angeles/`,
    })
  },

  'Update Desktop Breadcrumbs Only After Search': browser => {
    const urlParams = '2-beds-1z141y8/'
    browser.page.large.listSearch().click('@bedsFilter')
      .waitForElementVisible('@secondBedFilter')
      .click('@secondBedFilter')
      .waitForElementVisible('@bedroomPill', () => {
        browser.page.large.listSearch().validateBreadcrumbs(browser, 3)
        browser.page.large.listSearch().click('@searchButton')
                .waitForURLEquals(`${browser.launchUrl}${listSearchPath}${urlParams}`)
        browser.page.large.listSearch().validateBreadcrumbs(browser, 4)
      })
  },
}
