module.exports = {
  tags: ['quarantine'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}/military/`)
      .waitForURLEquals(`${browser.launchUrl}/military/`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate URL': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/military/`)
  },

  'Validate meta': browser => {
    browser.page.shared.headTags().validate({
      meta: {
        robots: false,
        'google-site-verification': 'T94mHHYjhN6ZNauF_BWnisWkFRqLMWW_zkRXM-4wrlU',
        description: 'ApartmentGuide.com provides listings for military base housing. ' +
          'We help you find a military apartment near base!',
      },
      canonical: `${browser.launchUrl}/military/`,
    })
  },

  'Validate header': browser => {
    browser.page.large.header().validate(`${browser.launchUrl}/`, 'Military', false)
  },

  'Validate page content': browser => {
    const content = browser.page.large.militaryLander()
    browser.assert.textExists(content.elements.heroHeadline)
    browser.assert.textExists(content.elements.heroBody)
    browser.assert.textExists(content.elements.articleHeadline)
    browser.assert.textExists(content.elements.articleBody)

    const pageObjectLinks = content.elements.articleLinks
    const regex = /military\/.*\//
    browser.assert.textExists(pageObjectLinks)
    browser.assert.allHrefsMatch(pageObjectLinks, regex)
  },

  'Validate footer': browser => {
    browser.page.large.footer().validate(browser)
  },
}
