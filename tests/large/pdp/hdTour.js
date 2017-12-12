const pdpPath = '/apartments/Alaska/Yakutat/Sunset-Landing/184725/'

module.exports = {
  tags: ['stableChrome', 'stableFirefox', 'stableProd'],
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

  'Validate URL': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${pdpPath}`)
  },

  'Click on tour button': browser => {
    const pdp = browser.page.large.pdp()
    pdp.expect.element('@tourModal').not.to.be.present.before(1000)
    pdp.expect.element('@tourButton').to.be.visible.before(1000)
    pdp.click('@tourButton')
  },

  'Validate tour modal': browser => {
    const pdp = browser.page.large.pdp()
    pdp.section.tourModal.expect.element('@tourIframe').to.be.visible.before(1000)
  },

  'Close tour modal': browser => {
    const pdp = browser.page.large.pdp()
    pdp.section.tourModal.click('@closeButton', () => {
      pdp.waitForElementNotPresent('@tourModal')
    })
  },
}
