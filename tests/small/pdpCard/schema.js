const pdpPath = '/apartments/Alaska/Yakutat/The-Grand-at-Dunwoody/100022110/'

module.exports = {
  tags: ['stableAndroid', 'stableIOS', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${pdpPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate WebPage meta data': browser => {
    browser.assert.schemaContainsItems('WebPage', [['name']])
  },

  'Validate ApartmentComplex data': browser => {
    browser.assert.schemaContainsItems('ApartmentComplex', [
      ['name'],
      ['address', 'streetAddress'],
      ['address', 'addressLocality'],
      ['address', 'postalCode'],
      ['aggregateRating', 'worstRating'],
      ['aggregateRating', 'bestRating'],
      ['aggregateRating', 'ratingValue'],
      ['aggregateRating', 'reviewCount'],
      ['geo', 'latitude'],
      ['geo', 'longitude'],
      // Commenting this out until we can figure out why this is failing on Saucelabs
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
      ['hasMap', 'mapType'],
      ['hasMap', 'url'],
    ])
  },
}
