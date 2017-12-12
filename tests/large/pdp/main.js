const pdpPath = '/apartments/Arizona/Scottsdale/Crown-Court/14400/'
const propertyName = 'Crown Court'

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

  'Validate header': browser => {
    browser.page.large.header().validate(`${browser.launchUrl}/`, propertyName, false, '', false)
  },

  'Validate footer before lazy load': browser => {
    browser.page.large.footer().validateBeforeLazyLoad()
  },

  'Validate footer': browser => {
    browser.page.large.footer().validate(browser)
  },

  'Contains a peel ad': browser => {
    browser.page.large.pdp().expect.element('@portfolioPromoter').to.be.present()
    browser.page.large.pdp().expect.element('@recommendedProperties').not.to.be.present()
  },
}
