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
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Execute Zip Search': browser => {
    browser.page.large.header().searchByClickingFirstOption(browser, {
      query: '30309',
      expectedQueryText: '30309, GA',
      path: '/zip/30309-Apartments-For-Rent/',
    })
  },

  'Validate Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/zip/30309-Apartments-For-Rent/`)
    browser.expect.element('title').attribute('text').to
      .match(/Apartments for Rent in \d+, Atlanta, GA/)
    browser.page.large.listSearch().expect.element('@h1Tag').text.to
      .equal('Apartments for Rent in or near 30309, GA')
    browser.elements('css selector', 'h1', results => {
      browser.expect(results.value.length).to.equal(1)
    })
    browser.page.large.listSearch().section.firstStandardListing.expect.element('@address')
      .text.to.match(/\w+\D*/)
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('30309, GA')
    browser.page.shared.headTags().validate({
      meta: { robots: false },
      canonical: `${browser.launchUrl}/zip/30309-Apartments-For-Rent/`,
    })
    browser.page.large.listSearch().expect.element('@averageBedroomPricesHeader')
      .text.to.equal('Average Rent in 30309, GA')
    browser.page.large.listSearch().validateAverageBedroomPrices(browser)
    browser.page.large.listSearch().validateBreadcrumbs(browser, 2)
    browser.expect.element('@propertyType').not.to.be.present.after(0)
  },

  'Navigate to Map View': browser => {
    browser.page.large.listSearch().click('@mapViewButton')
  },

  'Wait for Map Page to display': browser => {
    browser.page.large.mapSearch().waitForElementVisible('@listViewButton')
    browser.page.large.mapSearch().waitForElementVisible('@mapboxCanvas')
  },

  'Validate Map Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/map/?zip=30309`)
    browser.page.large.title().validateDefaultTitle(browser)
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('30309, GA')
    browser.page.shared.headTags().validate({
      meta: { robots: 'noindex,follow' },
      canonical: `${browser.launchUrl}/map/?zip=30309`,
    })
  },

  'Navigate back to List View': browser => {
    browser.page.large.mapSearch().click('@listViewButton')
      .waitForURLEquals(`${browser.launchUrl}/zip/30309-Apartments-For-Rent/`)
    browser.page.large.listSearch().waitForElementVisible('@mapViewButton')
  },

  'Execute Second Search': browser => {
    browser.page.large.header().searchByEnterFirstOption(browser, {
      query: 'Chicago, IL',
      expectedQueryText: 'Chicago, IL',
      path: '/apartments/Illinois/Chicago/',
    })
  },

  'Wait for Final Search URL': browser => {
    browser.waitForURLEquals(`${browser.launchUrl}/apartments/Illinois/Chicago/`)
  },

  'Validate Final List Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/apartments/Illinois/Chicago/`)
    browser.expect.element('title').attribute('text').to
      .match(/Apartments for Rent in Chicago, IL - \d+ Rentals/)
    browser.page.large.listSearch().section.firstStandardListing.expect.element('@address')
      .text.to.match(/\w+\D*/)
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Chicago, IL')
    browser.page.shared.headTags().validate({
      meta: { robots: false },
      canonical: `${browser.launchUrl}/apartments/Illinois/Chicago/`,
    })
  },
}
