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

  'Validate office hours section': browser => {
    const officeHours = browser.page.large.pdp().section.officeHours

    officeHours.expect.element('@heading').text.to.equal('Office Hours')
    officeHours.expect.element('@status').text.to.match(/(Open|Closed) Today/)
    officeHours.expect.element('@allHours').to.not.be.present()

    officeHours.expect.element('@phone').text.to.equal('(877) 425-0731')
    officeHours.expect.element('@leadButton').to.be.visible.before(1000)

    officeHours.getLocationInView('@heading').click('@viewAllToggle', () => {
      officeHours.expect.element('@allHours').to.be.visible.before(1000)
    })
  },

  'Validate Lead Modal appears when the Office Hours Lead button is pressed': browser => {
    browser.page.large.pdp().validateCheckAvailabilityButton(browser, 'officeHours')
  },
}
