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
      .url(`${browser.launchUrl}/senior/`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate URL': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/senior/`)
  },

  'Validate meta': browser => {
    browser.page.shared.headTags().validate({
      meta: {
        robots: false,
        'google-site-verification': 'T94mHHYjhN6ZNauF_BWnisWkFRqLMWW_zkRXM-4wrlU',
        description: 'Browse senior living, 55+ communities and apartment listings quickly. ' +
          'ApartmentGuide.com helps you find senior housing and apartment listings in your area!',
      },
      canonical: `${browser.launchUrl}/senior/`,
    })
  },

  'Validate header': browser => {
    browser.page.small.header().validate(`${browser.launchUrl}/`, browser)
  },

  'Validate page content': browser => {
    const content = browser.page.small.seniorLander()
    browser.assert.textExists(content.elements.heroHeadline)
    browser.assert.textExists(content.elements.heroBody)
    browser.assert.textExists(content.elements.articleHeadline)
    browser.assert.textExists(content.elements.articleBody)
    content.expect.element('@heroImage').to.be.present.after(0)

    const pageObjectLinks = content.elements.articleLinks
    const regex = /\/senior-living-4ma\//
    browser.assert.textExists(pageObjectLinks)
    browser.assert.allHrefsMatch(pageObjectLinks, regex)
  },

  'Validate footer': browser => {
    browser.page.small.footer().validate()
  },
}
