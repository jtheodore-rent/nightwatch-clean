const listSearchPath = '/apartments/California/Los-Angeles/'

module.exports = {
  tags: ['small', 'critical'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}${listSearchPath}`)
      .waitForElementVisible('#react-view')
      .setCookie({
        name: 'ui',
        value: 'adaptive',
        path: '/',
      })
      .refresh()
  },

  after: browser => {
    browser.end()
  },

  'Validate URL and Title': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${listSearchPath}`)
    browser.expect.element('head > title').attribute('text').to
      .match(new RegExp('Apartments For Rent in Los Angeles, CA - \\d{1,} Rentals'))
  },

  'Validate header': browser => {
    const header = browser.page.small.header()
    header.validate(`${browser.launchUrl}/`, browser, 'Los Angeles, CA')
  },

  'Validate page 1 meta': browser => {
    const baseURL = `${browser.launchUrl}${listSearchPath}`
    browser.page.shared.headTags().validate({
      meta: { robots: false },
      canonical: baseURL,
      prev: false,
      next: `${baseURL}?page=2`,
    })
  },

  'Validate page 2 meta': browser => {
    const baseURL = `${browser.launchUrl}${listSearchPath}`
    browser.url(`${baseURL}?page=2`).waitForElementVisible('#react-view')
    browser.page.shared.headTags().validate({
      meta: { robots: false },
      canonical: baseURL,
      prev: baseURL,
      next: `${baseURL}?page=3`,
    })
  },

  'Validate page 3 meta': browser => {
    const baseURL = `${browser.launchUrl}${listSearchPath}`
    browser.url(`${baseURL}?page=3`).waitForElementVisible('#react-view')
    browser.page.shared.headTags().validate({
      meta: { robots: false },
      canonical: baseURL,
      prev: `${baseURL}?page=2`,
      next: `${baseURL}?page=4`,
    })
  },

  'Validate rel links preserve query params': browser => {
    const baseURL = `${browser.launchUrl}${listSearchPath}`
    browser.url(`${baseURL}?sortby=sortpropertyname_desc&page=3`)
      .waitForElementVisible('#react-view')
    browser.page.shared.headTags().validate({
      meta: { robots: false },
      canonical: baseURL,
      prev: `${baseURL}?page=2&sortby=sortpropertyname_desc`,
      next: `${baseURL}?page=4&sortby=sortpropertyname_desc`,
    })
  },

  'Validate Navigation Menu': browser => {
    const navMenu = browser.page.small.navMenu()
    navMenu.menuValidation(browser)
    navMenu.footerCopyrightValidation(browser)
    navMenu.clickAndVerifyDealsNearby(browser)
  },
}
