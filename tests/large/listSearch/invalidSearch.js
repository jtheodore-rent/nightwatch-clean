module.exports = {
  tags: ['stableChrome', 'stableFirefox', 'stableProd'],
  after: browser => {
    browser.customSauceEnd()
  },

  'Validate invalid zip search results in 404 page': browser => {
    browser.page.large.notFound().validateNotFound(
      browser,
      '/zip/333333333333333-Apartments-For-Rent/'
    )
  },

  'Validate invalid city search results in 404 page': browser => {
    browser.page.large.notFound().validateNotFound(
      browser,
      '/apartments/Georgia/asdfasdfasfd/'
    )
  },
}
