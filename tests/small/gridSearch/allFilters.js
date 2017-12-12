const gridSearchPath = '/apartments/Alaska/Yakutat/'
const mapSearchPath = '/map/?city=Yakutat&state=Alaska'
const losAngelesSearchPath = '/apartments/California/Los-Angeles/'
const selectedBackgroundRGBA = (/^rgba\(74, 144, 226, 0(\.15|\.149)/)
const unselectedBackgroundRGBA = (/^rgba\(0, 0, 0, 0/)

module.exports = {
  tags: ['critical', 'stableAndroid', 'quarantineIOS', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${gridSearchPath}`)
      .waitForElementVisible('#react-view')
      .page.small.gridSearch().waitForElementVisible('@filterButton')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Open Filters Overlay': browser => {
    browser.page.small.gridSearch().click('@filterButton')
    browser.page.small.filtersOverlay().waitForElementVisible('select[name=bedrooms]')
  },

  'Validate Starting State of Filters Overlay': browser => {
    console.log(browser.capabilities.testobject_device) // eslint-disable-line no-console
    const filtersOverlay = browser.page.small.filtersOverlay()
    filtersOverlay.expect.element('@heading').text.to.equal('Search Filters')
    filtersOverlay.expect.element('@searchInput').attribute('value').to.equal('Yakutat, AK')
    filtersOverlay.expect.section('@minPriceSelect').attribute('value').to.equal('label')
    filtersOverlay.section.minPriceSelect.expect.element('@defaultLabel').text.to.equal('Any')
    filtersOverlay.expect.section('@maxPriceSelect').attribute('value').to.equal('label')
    filtersOverlay.section.maxPriceSelect.expect.element('@defaultLabel').text.to.equal('Any')
    filtersOverlay.expect.section('@bedSelect').attribute('value').to.equal('label')
    filtersOverlay.section.bedSelect.expect.element('@defaultLabel').text.to.equal('Any')
    filtersOverlay.expect.section('@bathSelect').attribute('value').to.equal('label')
    filtersOverlay.section.bathSelect.expect.element('@defaultLabel').text.to.equal('Any')
    filtersOverlay.expect.element('@petsOption').text.to.equal('Pets Allowed')
    filtersOverlay.expect.section('@laundrySelect').to.be.visible.before(1000)
    filtersOverlay.expect.element('@ACOption').text.to.equal('Air Conditioning')
    filtersOverlay.expect.element('@ratingsOption').to.be.visible.before(1000)
    filtersOverlay.expect.section('@distanceSelect').attribute('value').to.equal('label')
    filtersOverlay.section.distanceSelect.expect.element('@defaultLabel').text.to.equal('Default')
    filtersOverlay.expect.element('@propertyNameInput').attribute('placeholder').to.equal('Keyword of property name')
    filtersOverlay.expect.element('@propertyNameInput').attribute('value').to.equal('')
  },

  'Set minPrice Filter': browser => {
    browser.page.small.filtersOverlay().section.minPriceSelect.click('@price400Option')
  },

  'Set maxPrice Filter': browser => {
    browser.page.small.filtersOverlay().section.maxPriceSelect.click('@price1500Option')
  },

  'Set bedSelect Filter': browser => {
    browser.page.small.filtersOverlay().section.bedSelect.click('@oneBedOption')
  },

  'Set bathSelect Filter': browser => {
    browser.page.small.filtersOverlay().section.bathSelect.click('@oneBathOption')
  },

  'Set pets Filter': browser => {
    browser.page.small.filtersOverlay().click('@petsOption')
  },

  'Set distanceSelect Filter': browser => {
    browser.page.small.filtersOverlay().section.distanceSelect.click('@radius30Option')
  },

  'Set laundry Filter': browser => {
    browser.page.small.filtersOverlay().section.laundrySelect.click('@laundryOptionTwo')
  },

  'Set AC Filter': browser => {
    browser.page.small.filtersOverlay().click('@ACOption')
  },

  'Set ratingsSelect Filter': browser => {
    browser.page.small.filtersOverlay().click('@fourStar')
  },

  'Set propertyNameInput Filter': browser => {
    browser.page.small.filtersOverlay().setValue('@propertyNameInput', 'One')
  },

  'Validate State of Filters after changes': browser => {
    const filtersOverlay = browser.page.small.filtersOverlay()
    filtersOverlay.expect.section('@minPriceSelect').attribute('value').to.equal('400')
    filtersOverlay.section.minPriceSelect.expect.element('@price400Option').text.to.equal('$400')
    filtersOverlay.expect.section('@maxPriceSelect').attribute('value').to.equal('1500')
    filtersOverlay.section.maxPriceSelect.expect.element('@price1500Option').text.to.equal('$1,500')
    filtersOverlay.expect.section('@bedSelect').attribute('value').to.equal('1')
    filtersOverlay.section.bedSelect.expect.element('@oneBedOption').text.to.equal('1 Bd')
    filtersOverlay.expect.section('@bathSelect').attribute('value').to.equal('1')
    filtersOverlay.section.bathSelect.expect.element('@oneBathOption').text.to.equal('1 Ba')
    filtersOverlay.expect.element('@petsOption')
      .to.have.css('background-color').to.match(selectedBackgroundRGBA)
    filtersOverlay.section.laundrySelect.expect.element('@laundryOptionOne')
      .to.have.css('background-color').to.match(unselectedBackgroundRGBA)
    filtersOverlay.section.laundrySelect.expect.element('@laundryOptionTwo')
      .to.have.css('background-color').to.match(selectedBackgroundRGBA)
    filtersOverlay.section.laundrySelect.expect.element('@laundryOptionThree')
      .to.have.css('background-color').to.match(unselectedBackgroundRGBA)
    filtersOverlay.expect.element('@ACOption').to.have.css('background-color')
      .to.match(selectedBackgroundRGBA)
    filtersOverlay.expect.element('@ratingsOption').text.to.equal('4 Stars and Above')
    filtersOverlay.expect.section('@distanceSelect').attribute('value').to.equal('30')
    filtersOverlay.section.distanceSelect.expect.element('@radius30Option').text.to.equal('30')
    filtersOverlay.expect.element('@propertyNameInput').attribute('value').to.equal('One')
  },

  'Clicking on selected filter clears selection': browser => {
    const filtersOverlay = browser.page.small.filtersOverlay()
    filtersOverlay.click('@ACOption')
    filtersOverlay.expect.element('@ACOption').to.have.css('background-color')
      .to.match(unselectedBackgroundRGBA)
    filtersOverlay.click('@ACOption')
  },

  'Apply Filters': browser => {
    const expectedURL = [
      `${browser.launchUrl}`,
      `${gridSearchPath}`,
      '1-beds-1-baths-washer-and-dryer-connections-30-miles-4-stars-rating-from-400-under-1500-air-conditioning-pets-1z141xt+1z141xu+2w+4lw+2p+4ib/?propertyname=One',
    ].join('')
    browser.page.small.filtersOverlay().click('@applyFilterButton')
      .waitForURLEquals(expectedURL)
  },

  'Validate Filtered SRP': browser => {
    const expectedURL = [
      `${browser.launchUrl}`,
      `${gridSearchPath}`,
      '1-beds-1-baths-washer-and-dryer-connections-30-miles-4-stars-rating-from-400-under-1500-air-conditioning-pets-1z141xt+1z141xu+2w+4lw+2p+4ib/?propertyname=One',
    ].join('')
    const filteredSRP = browser.page.small.gridSearch()
    browser.assert.urlEquals(expectedURL)
    filteredSRP.verifyAllListingsWithinPriceRange(browser, 400, 1500)
    filteredSRP.verifyAllListingsMatchName(browser, 'One')
  },

  'Switch to Map': browser => {
    browser.page.small.gridSearch().click('@mapViewButton')
    browser.page.small.mapSearch().waitForElementVisible('@listViewButton')
      .waitForElementVisible('@mapboxCanvas')
  },

  'Verify Map Page URL contains expected refinements': browser => {
    const expectedURL = [
      `${browser.launchUrl}`,
      `${mapSearchPath}`,
      '&refinements=1-beds-1-baths-washer-and-dryer-connections-4-stars-rating-from-400-under-1500-air-conditioning-pets-1z141xt+1z141xu+2w+4lw+2p+4ib&propertyname=One',
    ].join('')
    browser.assert.urlEquals(expectedURL)
  },

  'Switch back to List Page': browser => {
    browser.page.small.mapSearch().click('@listViewButton')
    browser.page.small.gridSearch().waitForElementVisible('@mapViewButton')
  },

  'Verify List Page has retained expected refinements': browser => {
    const expectedURL = [
      `${browser.launchUrl}`,
      `${gridSearchPath}`,
      '1-beds-1-baths-washer-and-dryer-connections-4-stars-rating-from-400-under-1500-air-conditioning-pets-1z141xt+1z141xu+2w+4lw+2p+4ib/?propertyname=One',
    ].join('')
    const filteredSRP = browser.page.small.gridSearch()
    browser.assert.urlEquals(expectedURL)
    filteredSRP.verifyAllListingsWithinPriceRange(browser, 400, 1500)
    filteredSRP.verifyAllListingsMatchName(browser, 'One')
  },

  'Search in Another City': browser => {
    browser.page.small.header().section.searchBar.setValue('@textInput', 'Los Angeles, CA')
      .waitForElementVisible('@firstSearchOption', () => {
        browser.page.small.header().section.searchBar.waitForElementVisible('@firstSearchOption')
          .click('@firstSearchOption')
          .waitForURLEquals(`${browser.launchUrl}${losAngelesSearchPath}`)
      })
  },

  'Verify refinements have not been retained in URL': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${losAngelesSearchPath}`)
  },

  'Navigate back to SRP': browser => {
    browser.url(`${browser.launchUrl}${gridSearchPath}`).page.small.gridSearch()
      .waitForURLEquals(`${browser.launchUrl}${gridSearchPath}`)
  },

  'Open Filters': browser => {
    browser
      .url(`${browser.launchUrl}${gridSearchPath}0-beds-1z141wj/`)
      .waitForURLEquals(`${browser.launchUrl}${gridSearchPath}0-beds-1z141wj/`)
      .waitForElementVisible('#react-view')
    browser.page.small.gridSearch().waitForElementVisible('@filterButton').click('@filterButton')
      .waitForElementVisible('select[name=bedrooms]')
  },

  'Verify filters have been set correctly': browser => {
    browser.page.small.filtersOverlay().expect.section('@bedSelect').attribute('value').to.equal('0')
    browser.page.small.filtersOverlay().section.bedSelect.expect.element('@studioOption').text.to.equal('Studio')
  },
}
