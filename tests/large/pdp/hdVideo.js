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

  'Click on video button': browser => {
    const pdp = browser.page.large.pdp()
    pdp.expect.element('@videoModal').not.to.be.present.before(1000)
    pdp.expect.element('@videoButton').to.be.visible.before(1000)
    pdp.click('@videoButton')
  },

  'Validate video modal': browser => {
    const pdp = browser.page.large.pdp()
    pdp.section.videoModal.expect.element('@videoIframe').to.be.visible.before(1000)
  },

  'Close video modal': browser => {
    const pdp = browser.page.large.pdp()
    pdp.section.videoModal.click('@closeButton', () => {
      pdp.waitForElementNotPresent('@videoModal')
    })
  },
}
