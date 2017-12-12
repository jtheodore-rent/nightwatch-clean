const breadcrumbsPath = '/neighborhoods/California/Los-Angeles/Little-Tokyo/'
const losAngelesPath = '/apartments/California/Los-Angeles/'
const californiaPath = '/apartments/California/'

module.exports = {
  tags: ['critical', 'stableAndroid', 'stableIOS', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${breadcrumbsPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate initial state': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${breadcrumbsPath}`)
    browser.page.small.gridSearch().expect.element('@breadcrumbs').to.be.visible.after(0)
  },

  'Click city link': browser => {
    browser.page.small.gridSearch().click('@cityBreadcrumb')
      .waitForURLEquals(`${browser.launchUrl}${losAngelesPath}`)
  },

  'Wait for Los Angeles Grid Search to display': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${losAngelesPath}`)
  },

  'Click state link': browser => {
    browser.page.small.gridSearch().click('@stateBreadcrumb')
      .waitForURLEquals(`${browser.launchUrl}${californiaPath}`)
  },

  'Wait for California lander page': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${californiaPath}`)
  },

}
