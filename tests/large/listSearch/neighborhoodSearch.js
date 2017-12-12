const listSearchPath = '/apartments/California/Los-Angeles/'
const seattleNeighborhood = '/map/?neighborhood=Lake-Union&city=Seattle&state=Washington'
const seattleNeighborhoodList = '/neighborhoods/Washington/Seattle/Lake-Union/'

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

  'Execute Neighborhood Search': browser => {
    browser.page.large.header().searchByClickingFirstOption(browser, {
      query: 'Lake Union, S',
      expectedQueryText: 'Lake Union, Seattle, WA',
      path: `${seattleNeighborhoodList}`,
    })
  },

  'Validate Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${seattleNeighborhoodList}`)
    browser.expect.element('title').attribute('text').to
      .equal('Lake Union Apartments for Rent - Seattle, WA | ApartmentGuide.com')
    browser.page.large.listSearch().expect.element('@h1Tag').text.to
      .equal('Lake Union Apartments for Rent - Seattle, WA')
    browser.elements('css selector', 'h1', results => {
      browser.expect(results.value.length).to.equal(1)
    })
    browser.page.large.listSearch().section.firstStandardListing.expect.element('@address')
      .text.to.match(/\w+\D+/)
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Lake Union, Seattle, WA')
    const descriptionRegex = 'Browse \\d+ apartments for rent in Lake Union Seattle, WA.  ' +
      'Compare ratings, reviews, 3D floor plans, and high res images.'
    browser.page.shared.headTags().validate({
      meta: { robots: false,
        'google-site-verification': 'T94mHHYjhN6ZNauF_BWnisWkFRqLMWW_zkRXM-4wrlU',
        description: new RegExp(descriptionRegex),
      },
      canonical: `${browser.launchUrl}${seattleNeighborhoodList}`,
    })
    browser.page.large.listSearch().expect.element('@averageBedroomPricesHeader')
      .text.to.equal('Average Rent in Lake Union, Seattle, WA')
    browser.page.large.listSearch().validateAverageBedroomPrices(browser)
    browser.page.large.listSearch().validateBreadcrumbs(browser, 4)
  },

  'Navigate to Map View': browser => {
    browser.page.large.listSearch().click('@mapViewButton')
  },

  'Wait for Map Page to display': browser => {
    browser.page.large.mapSearch().waitForElementVisible('@listViewButton')
    browser.page.large.mapSearch().waitForElementVisible('@mapboxCanvas')
  },

  'Validate Map Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${seattleNeighborhood}`)
    browser.page.large.title().validateDefaultTitle(browser)
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Lake Union, Seattle, WA')
    browser.page.shared.headTags().validate({
      meta: { robots: 'noindex,follow' },
      canonical: `${browser.launchUrl}${seattleNeighborhood}`,
    })
  },

  'Navigate back to List View': browser => {
    browser.page.large.mapSearch().click('@listViewButton', () => {
      browser.page.large.listSearch().waitForElementVisible('@mapViewButton', () => {
        browser.waitForURLEquals(`${browser.launchUrl}${seattleNeighborhoodList}`)
      })
    })
  },

  'Execute Second Search': browser => {
    browser.page.large.header().searchByClickingFirstOption(browser, {
      query: 'Los Angeles, CA',
      expectedQueryText: 'Los Angeles, CA',
      path: `${listSearchPath}`,
    })
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
