const listSearchPath = '/apartments/California/Los-Angeles/'

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

  'Execute Military Search': browser => {
    browser.page.large.header().searchByClickingFirstOption(browser, {
      query: 'NAS Ocean',
      expectedQueryText: 'NAS Oceana, VA',
      path: '/apartments/Virginia/NAS-Oceana/',
    })
  },

  'Validate Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/apartments/Virginia/NAS-Oceana/`)
    browser.expect.element('title').attribute('text').to
      .match(/Apartments for Rent in NAS Oceana, VA - \d+ Rentals/)
    browser.page.large.listSearch().section.firstStandardListing.expect.element('@address')
      .text.to.match(/\w+\D*/)
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('NAS Oceana, VA')
    browser.page.shared.headTags().validate({
      meta: { robots: false },
      canonical: `${browser.launchUrl}/apartments/Virginia/NAS-Oceana/`,
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
    browser.assert.urlEquals(`${browser.launchUrl}/map/?city=NAS-Oceana&state=Virginia`)
    browser.page.large.title().validateDefaultTitle(browser)
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('NAS Oceana, VA')
    browser.page.shared.headTags().validate({
      meta: { robots: 'noindex,follow' },
      canonical: `${browser.launchUrl}/map/?city=NAS-Oceana&state=Virginia`,
    })
  },

  'Navigate back to List View': browser => {
    browser.page.large.mapSearch().click('@listViewButton')
      .waitForURLEquals(`${browser.launchUrl}/apartments/Virginia/NAS-Oceana/`)
    browser.page.large.listSearch().waitForElementVisible('@mapViewButton')
  },

  'Execute Second Search': browser => {
    browser.page.large.header().searchByEnterFirstOption(browser, {
      query: 'Los Angeles, CA',
      expectedQueryText: 'Los Angeles, CA',
      path: '/apartments/California/Los-Angeles/',
    })
  },

  'Wait for Final Search URL': browser => {
    browser.waitForURLEquals(`${browser.launchUrl}/apartments/California/Los-Angeles/`)
  },

  'Validate Final List Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/apartments/California/Los-Angeles/`)
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
}
