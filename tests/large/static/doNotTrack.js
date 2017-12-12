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
      .url(`${browser.launchUrl}/legal/privacy/do-not-track/`)
      .waitForURLEquals(`${browser.launchUrl}/legal/privacy/do-not-track/`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate URL': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/legal/privacy/do-not-track/`)
  },

  'Validate meta': browser => {
    browser.page.shared.headTags().validate({
      meta: {
        robots: false,
        'google-site-verification': 'T94mHHYjhN6ZNauF_BWnisWkFRqLMWW_zkRXM-4wrlU',
        description: 'Apartments for rent and rentals with photos and floor plans. ' +
          'Free apartment finder and rentals search at ApartmentGuide.com. ' +
          'Find an apartment located in the neighborhood that works best for you, ' +
          'with Apartment Guide’s detailed community information. ApartmentGuide.com-Official Site',
      },
      canonical: `${browser.launchUrl}/legal/privacy/do-not-track/`,
    })
  },

  'Validate header': browser => {
    browser.page.large.header().validate(`${browser.launchUrl}/`, null, false)
  },

  'Validate page content': browser => {
    const content = browser.page.large.doNotTrack()
    browser.assert.textExists(content.elements.articleHeadline)
    browser.assert.textExists(content.elements.articleBody)
  },

  'Validate footer': browser => {
    browser.page.large.footer().validate(browser)
  },
}
