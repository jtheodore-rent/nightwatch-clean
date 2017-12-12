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
      .url(`${browser.launchUrl}/corporate/`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate URL': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/corporate/`)
  },

  'Validate meta': browser => {
    browser.page.shared.headTags().validate({
      meta: { robots: false,
        'google-site-verification': 'T94mHHYjhN6ZNauF_BWnisWkFRqLMWW_zkRXM-4wrlU',
        description: 'ApartmentGuide.com has exclusive corporate apartment rental listings. ' +
          'Easily access photos and phone numbers to book your furnished corporate apartment ' +
          'today!',
      },
      canonical: `${browser.launchUrl}/corporate/`,
    })
  },

  'Validate header': browser => {
    browser.page.small.header().validate(`${browser.launchUrl}/`, browser)
  },

  'Validate hero content': browser => {
    const content = browser.page.small.corporateApartments()
    browser.assert.textExists(content.elements.heroHeadline)
    browser.assert.textExists(content.elements.heroBody)
    content.expect.element('@heroImage').to.be.present.after(0)
  },

  'Validate page content': browser => {
    const content = browser.page.small.corporateApartments()
    browser.assert.textExists(content.elements.articleHeadline)
    browser.assert.textExists(content.elements.articleBody)

    const pageObjectLinks = content.elements.articleBodyLinks
    const regex = /apartments\/.+\/corporate-4lc/
    browser.assert.textExists(pageObjectLinks)
    browser.assert.allHrefsMatch(pageObjectLinks, regex)
  },

  'Validate footer': browser => {
    browser.page.small.footer().validate()
  },
}
