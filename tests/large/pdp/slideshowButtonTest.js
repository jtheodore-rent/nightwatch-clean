const pdpPath = '/apartments/Alaska/Yakutat/EGG-Property-Two/185300/'

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

  'Validate URL': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${pdpPath}`)
  },

  'Click Slideshow Button - Modal open and Close': browser => {
    const pdp = browser.page.large.pdp()
    pdp.expect.element('@slideshowButton').to.be.visible.after(0)
    pdp.click('@slideshowButton', () => {
      pdp.section.photoModal.expect.element('@carousel').to.be.visible.before(1000)
      pdp.section.photoModal.expect.element('@closeButton').to.be.visible.before(1000)
      pdp.section.photoModal.click('@closeButton')
    })
  },
}
