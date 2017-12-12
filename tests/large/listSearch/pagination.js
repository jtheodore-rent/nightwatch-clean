const listSearchPath = '/apartments/California/Los-Angeles/'

module.exports = {
  tags: ['stableChrome', 'stableFirefox', 'critical', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${listSearchPath}`)
      .waitForURLEquals(`${browser.launchUrl}${listSearchPath}`)
      .waitForElementVisible('#react-view')
      .page.large.listSearch().section.firstStandardListing
      .waitForElementVisible('@image0')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate pagination on page 1': browser => {
    const paginatePageObject = browser.page.large.pagination()
    paginatePageObject.validatePage1(browser)
  },

  'Click Next and Validate page 2': browser => {
    const paginatePageObject = browser.page.large.pagination()
    paginatePageObject.clickNext(browser, listSearchPath)
    paginatePageObject.validatePage2(browser)
  },

  'Click Previous and validate page 1': browser => {
    const paginatePageObject = browser.page.large.pagination()
    paginatePageObject.clickPrevious(browser, listSearchPath)
    paginatePageObject.validatePage1(browser)
  },

  'Click Page 5 and validate page': browser => {
    const paginatePageObject = browser.page.large.pagination()
    paginatePageObject.clickPage5(browser, listSearchPath)
    paginatePageObject.validatePage5(browser)
  },

  'Click last page and validate page': browser => {
    const paginatePageObject = browser.page.large.pagination()
    paginatePageObject.clickLastPage(browser, listSearchPath)
    paginatePageObject.validateLastPage(browser)
  },
}
