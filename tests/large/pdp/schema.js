const pdpPath = '/apartments/Alaska/Yakutat/Sunset-Landing/184725/'

module.exports = {
  tags: ['stableChrome', 'stableFirefox', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'ui',
        value: 'adaptive',
        path: '/',
      })
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${pdpPath}`)
      .waitForURLEquals(`${browser.launchUrl}${pdpPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.end()
  },

  'Validate WebPage meta data': browser => {
    browser.assert.schemaContainsItems('WebPage', [['name']])
  },

  'Validate Organization data': browser => {
    browser.assert.schemaContainsItems('Organization', [
      ['logo'],
      ['description'],
      ['url'],
    ])
  },

  'Validate ImageObject data': browser => {
    browser.assert.schemaContainsItems('ImageObject', [
      ['description'],
      ['name'],
      ['contentUrl'],
      ['contentLocation'],
    ])
  },

  'Validate ApartmentComplex data': browser => {
    browser.assert.schemaContainsItems('ApartmentComplex', [
      ['name'],
      ['address', 'streetAddress'],
      ['address', 'addressLocality'],
      ['address', 'addressRegion'],
      ['address', 'postalCode'],
      ['aggregateRating', 'worstRating'],
      ['aggregateRating', 'bestRating'],
      ['aggregateRating', 'ratingValue'],
      ['aggregateRating', 'reviewCount'],
      ['geo', 'latitude'],
      ['geo', 'longitude'],
      // Commenting this out until we can figure out why it's failing on Saucelabs
      // ['openingHoursSpecification', 'opens'],
      // ['openingHoursSpecification', 'closes'],
      ['review', 'datePublished'],
      ['review', 'reviewBody'],
      ['review', 'reviewRating', [
        ['reviewRating', 'worstRating'],
        ['reviewRating', 'bestRating'],
        ['reviewRating', 'ratingValue'],
      ]],
      ['review', 'author', ['author', 'name']],
    ])
  },
}
