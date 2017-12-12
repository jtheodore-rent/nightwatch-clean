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
      .url(`${browser.launchUrl}/luxury-apartments-for-rent/`)
      .waitForURLEquals(`${browser.launchUrl}/luxury-apartments-for-rent/`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate URL': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/luxury-apartments-for-rent/`)
  },

  'Validate meta': browser => {
    browser.page.shared.headTags().validate({
      meta: {
        robots: false,
        'google-site-verification': 'T94mHHYjhN6ZNauF_BWnisWkFRqLMWW_zkRXM-4wrlU',
        description: 'View our exclusive luxury apartment listings easily online. ' +
          'ApartmentGuide.com makes it easy to rent luxury apartments and condos in your area.',
      },
      canonical: `${browser.launchUrl}/luxury-apartments-for-rent/`,
    })
  },

  'Validate header': browser => {
    browser.page.large.header().validate(`${browser.launchUrl}/`, 'Luxury Apartments', false)
  },

  'Validate page content': browser => {
    const content = browser.page.large.luxuryApartments()
    browser.assert.textExists(content.elements.articleHeadline)
    browser.assert.textExists(content.elements.articleBody)

    const pageObjectLinks = content.elements.articleLinks
    const regex = /apartments\/.*\/luxury-apartments-for-rent-4l9/
    browser.assert.textExists(pageObjectLinks)
    browser.assert.allHrefsMatch(pageObjectLinks, regex)
  },

  'Validate footer': browser => {
    browser.page.large.footer().validate(browser)
  },
}
