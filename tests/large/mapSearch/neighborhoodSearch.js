const mapSearchPath = '/map/?city=Los-Angeles&state=California'
const seattleNeighborhood = '/map/?neighborhood=Lake-Union&city=Seattle&state=Washington'
const seattleNeighborhoodList = '/neighborhoods/Washington/Seattle/Lake-Union/'

module.exports = {
  tags: ['stableFirefox', 'stableProd'],
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

  'Enter search query': browser => {
    browser.page.large.header().section.searchBar.setValue('@textInput', 'Lake Union, S')
  },

  'Verify and Click First Search Option': browser => {
    browser.page.large.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .expect.element('@firstSearchOption').text.to.equal('Lake Union, Seattle, WA')
    browser.page.large.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .click('@firstSearchOption').waitForURLEquals(`${browser.launchUrl}${seattleNeighborhood}`)
  },

  'Validate Map Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${seattleNeighborhood}`)
    browser.page.large.title().validateDefaultTitle(browser)
    browser.page.large.mapSearch().section.firstStandardListing.expect.element('@address')
      .text.to.match(/\w+\D+/)
    browser.page.large.mapSearch().section.firstStandardListing.expect.element('@address')
      .text.to.include(', WA')
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Lake Union, Seattle, WA')
    browser.page.shared.headTags().validate({
      meta: { robots: 'noindex,follow',
        'google-site-verification': 'T94mHHYjhN6ZNauF_BWnisWkFRqLMWW_zkRXM-4wrlU',
        description: 'Apartments for rent and rentals with photos and floor plans. ' +
          'Free apartment finder and rentals search at ApartmentGuide.com. ' +
          'Find an apartment located in the neighborhood that works best for you, ' +
          'with Apartment Guide’s detailed community information. ApartmentGuide.com-Official Site',
      },
      canonical: `${browser.launchUrl}${seattleNeighborhood}`,
    })
  },

  'Navigate to List View': browser => {
    browser.page.large.mapSearch().click('@listViewButton')
      .waitForURLEquals(`${browser.launchUrl}${seattleNeighborhoodList}`)
  },

  'Validate List Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${seattleNeighborhoodList}`)
    browser.expect.element('title').attribute('text').to
      .equal('Lake Union Apartments for Rent - Seattle, WA | ApartmentGuide.com')
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Lake Union, Seattle, WA')
    browser.page.shared.headTags().validate({
      meta: { robots: false },
      canonical: `${browser.launchUrl}${seattleNeighborhoodList}`,
    })
  },

  'Navigate back to Map View': browser => {
    browser.page.large.listSearch().click('@mapViewButton')
    browser.page.large.mapSearch().waitForElementVisible('@listViewButton')
      .waitForURLEquals(`${browser.launchUrl}${seattleNeighborhood}`)
  },

  'Search a second time': browser => {
    browser.page.large.header().section.searchBar.setValue('@textInput', 'Los Angeles, CA')
  },

  'Execute second search': browser => {
    browser.page.large.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .expect.element('@firstSearchOption').text.to.equal('Los Angeles, CA')
    browser.page.large.header().section.searchBar.waitForElementVisible('@firstSearchOption')
      .click('@firstSearchOption').waitForURLEquals(`${browser.launchUrl}${mapSearchPath}`)
  },

  'Validate Final Map Search Page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${mapSearchPath}`)
    browser.page.large.title().validateDefaultTitle(browser)
    browser.page.large.mapSearch().section.firstStandardListing.expect.element('@address')
      .text.to.match(/\w+\D+/)
    browser.page.large.mapSearch().section.firstStandardListing.expect.element('@address')
      .text.to.include(', CA')
    browser.page.large.header().section.searchBar.expect.element('@textInput').attribute('value')
      .to.equal('Los Angeles, CA')
    browser.page.shared.headTags().validate({
      meta: { robots: 'noindex,follow' },
      canonical: `${browser.launchUrl}${mapSearchPath}`,
    })
  },
}
