const gridViewPath = '/apartments/Alaska/Yakutat/'
const selectedBackgroundRGBA = (/^rgba\(74, 144, 226, 0(\.15|\.149)/)

module.exports = {
  tags: ['stableAndroid', 'quarantineIOS', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'featureFlips',
        value: 'iyfFilters',
        path: '/',
      })
      .pause(500)
      .url(`${browser.launchUrl}${gridViewPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate iyf Filter Panel opens on list view when no price or bed filters are applied': browser => {
    const gridSearch = browser.page.small.gridSearch()
    gridSearch.expect.element('@filterPanel').to.be.present.before(1000)
  },

  'Open expanded filter panel': browser => {
    browser.page.small.iyfFiltersOverlay().click('@moreFiltersToggle').section.bathSelect.waitForElementVisible('@bathOptionOne')
  },

  'Set bed filter': browser => {
    const iyfFiltersOverlay = browser.page.small.iyfFiltersOverlay()
    iyfFiltersOverlay.section.bedSelect.click('@bedOptionThreeOrMore')
  },

  'Scroll baths select into view': browser => {
    const iyfFiltersOverlay = browser.page.small.iyfFiltersOverlay()
    iyfFiltersOverlay.getLocationInView('@propertyNameInput')
  },

  'Set bath filters': browser => {
    const iyfFiltersOverlay = browser.page.small.iyfFiltersOverlay()
    iyfFiltersOverlay.section.bathSelect.click('@bathOptionThree')
  },

  'Set AC filter': browser => {
    const iyfFiltersOverlay = browser.page.small.iyfFiltersOverlay()
    iyfFiltersOverlay.click('@ACOption')
  },

  'Verify grid search Page URL contains expected refinements': browser => {
    const expectedURL = [
      `${browser.launchUrl}`,
      `${gridViewPath}`,
      '3-beds-3-baths-air-conditioning-1z141xs+1z141x2+2p/',
    ].join('')
    browser.page.small.filtersOverlay().click('@applyFilterButton')
      .waitForURLEquals(expectedURL)
  },

  'Open iyf FilterPanel to test new beds and baths selections': browser => {
    browser
      .page
      .small
      .gridSearch()
      .click('@filterButton')
      .waitForElementVisible('@filterPanel')
  },

  'Open expanded filter panel to test expanded filter': browser => {
    browser.page.small.filtersOverlay().click('@moreFiltersToggle')
  },

  'Validate the beds and bath radio groups are remembered when selected': browser => {
    const iyfFiltersOverlay = browser.page.small.iyfFiltersOverlay()
    iyfFiltersOverlay.section.bedSelect.expect.element('@bedOptionThreeOrMore').to.have.css('background-color')
      .to.match(selectedBackgroundRGBA)
    iyfFiltersOverlay.section.bathSelect.expect.element('@bathOptionThree').to.have.css('background-color')
      .to.match(selectedBackgroundRGBA)
  },

}
