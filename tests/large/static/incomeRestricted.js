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
      .url(`${browser.launchUrl}/income-restricted-apartments/`)
      .waitForURLEquals(`${browser.launchUrl}/income-restricted-apartments/`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate URL': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/income-restricted-apartments/`)
  },

  'Validate meta': browser => {
    browser.page.shared.headTags().validate({
      meta: {
        robots: false,
        'google-site-verification': 'T94mHHYjhN6ZNauF_BWnisWkFRqLMWW_zkRXM-4wrlU',
        description: 'Discover low income apartments for rent. ApartmentGuide.com ' +
          'lists only the best low income apartments.',
      },
      canonical: `${browser.launchUrl}/income-restricted-apartments/`,
    })
  },

  'Validate header': browser => {
    browser.page.large.header().validate(`${browser.launchUrl}/`, null, false)
  },

  'Validate page content': browser => {
    const content = browser.page.large.incomeRestrictedApartments()
    browser.assert.textExists(content.elements.articleHeadline)

    const pageObjectLinks = content.elements.articleLinks
    const regex = /apartments\/.+\/low-income-apartments-for-rent-4lg/
    browser.assert.textExists(pageObjectLinks)
    browser.assert.allHrefsMatch(pageObjectLinks, regex)

    browser.assert.textExists(content.elements.articleBody)
  },

  'Validate footer': browser => {
    browser.page.large.footer().validate(browser)
  },
}
