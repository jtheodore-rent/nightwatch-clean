const pdpPath = '/apartments/Alaska/Yakutat/The-Grand-at-Dunwoody/100022110/'

module.exports = {
  tags: ['stableChrome', 'stableFirefox', 'critical', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'ui',
        value: 'adaptive',
        path: '/',
      })
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${pdpPath}`)
      .waitForURLEquals(`${browser.launchUrl}${pdpPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Scroll map into view': browser => {
    const pdp = browser.page.large.pdp()
    pdp.getLocationInView('@mapSection').section.map.waitForElementVisible('@heading')
  },

  'Validate map section': browser => {
    const map = browser.page.large.pdp().section.map
    map.expect.element('@heading').text.to.equal('Map')
    map.expect.element('@leadButton').to.be.visible.before(1000)
    map.expect.element('@canvas').to.be.visible.before(1000)
    map.expect.element('@phone').text.to.equal('(877) 425-0731')
  },

  'Validate Lead Modal appears when the Map Lead button is pressed': browser => {
    browser.page.large.pdp().validateCheckAvailabilityButton(browser, 'map')
  },
}
