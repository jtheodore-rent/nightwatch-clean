const listSearchPathMinMax = '/apartments/Georgia/Atlanta/from-500-under-2000/'
const listSearchPathMax = '/apartments/Georgia/Atlanta/under-2000/'
const listSearchPathMin = '/apartments/Georgia/Atlanta/from-1000/'
const listSearchPathConflicting = '/apartments/Georgia/Atlanta/from-500-under-2000/?min_price=1000&max_price=3000' // eslint-disable-line max-len
const zipSearchQueryPath = '/zip/30342-Apartments-For-Rent/?min_price=1000&max_price=3000'
const neighborhoodSearchQueryPath = '/neighborhoods/Georgia/Atlanta/Buckhead/?min_price=500'
const oldRefinementCityPath = '/apartments/Alabama/Fort-Mitchell/under-2000/'

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
      .url(`${browser.launchUrl}${listSearchPathMinMax}`)
      .waitForURLEquals(`${browser.launchUrl}${listSearchPathMinMax}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate tags': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${listSearchPathMinMax}`)
    browser.expect.element('title').attribute('text').to
      .match(/Apartments From \$500 to \$2000 in Atlanta, GA/)
    browser.page.large.listSearch().expect.element('@h1Tag').text.to
      .equal('Rent apartments from $500 to $2000 in Atlanta, GA')
  },

  'Navigate to a different price refinements page with conflicting prices': browser => {
    browser
      .url(`${browser.launchUrl}${listSearchPathConflicting}`)
      .waitForURLEquals(`${browser.launchUrl}/apartments/Georgia/Atlanta/from-1000-under-3000/`)
      .waitForElementVisible('#react-view')
  },

  'Verify query params trumped refinement params from url': browser => {
    const expected = '/apartments/Georgia/Atlanta/from-1000-under-3000/'
    browser.assert.urlEquals(`${browser.launchUrl}${expected}`)
    browser.expect.element('title').attribute('text').to
      .match(/Apartments From \$1000 to \$3000 in Atlanta, GA/)
    browser.page.large.listSearch().expect.element('@h1Tag').text.to
      .equal('Rent apartments from $1000 to $3000 in Atlanta, GA')
  },

  'Navigate to a max price url': browser => {
    browser
      .url(`${browser.launchUrl}${listSearchPathMax}`)
      .waitForURLEquals(`${browser.launchUrl}${listSearchPathMax}`)
      .waitForElementVisible('#react-view')
  },

  'Verify navigated to max price url': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${listSearchPathMax}`)
    browser.expect.element('title').attribute('text').to
      .match(/Apartments Under \$2000 in Atlanta, GA/)
    browser.page.large.listSearch().expect.element('@h1Tag').text.to
      .equal('Rent apartments for $2000 or less in Atlanta, GA')
  },

  'Navigate to a min price url': browser => {
    browser
      .url(`${browser.launchUrl}${listSearchPathMin}`)
      .waitForURLEquals(`${browser.launchUrl}${listSearchPathMin}`)
      .waitForElementVisible('#react-view')
  },

  'Verify navigated to min price url': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${listSearchPathMin}`)
    browser.expect.element('title').attribute('text').to
      .match(/Apartments From \$1000 in Atlanta, GA/)
    browser.page.large.listSearch().expect.element('@h1Tag').text.to
      .equal('Rent apartments for $1000 or more in Atlanta, GA')
  },

  'Navigate to a zip url with query param prices': browser => {
    browser
      .url(`${browser.launchUrl}${zipSearchQueryPath}`)
      .waitForURLEquals(`${browser.launchUrl}/zip/30342-Apartments-For-Rent/from-1000-under-3000/`)
      .waitForElementVisible('#react-view')
  },

  'Verify navigated to a zip price refinement url': browser => {
    const expected = '/zip/30342-Apartments-For-Rent/from-1000-under-3000/'
    browser.assert.urlEquals(`${browser.launchUrl}${expected}`)
  },

  'Navigate to a neighorhood url with query param prices': browser => {
    browser
      .url(`${browser.launchUrl}${neighborhoodSearchQueryPath}`)
      .waitForURLEquals(`${browser.launchUrl}/neighborhoods/Georgia/Atlanta/Buckhead/from-500/`)
      .waitForElementVisible('#react-view')
  },

  'Verify navigated to a neighborhood price refinement url': browser => {
    const expected = '/neighborhoods/Georgia/Atlanta/Buckhead/from-500/'
    browser.assert.urlEquals(`${browser.launchUrl}${expected}`)
  },

  'Navigate to city with old refinements': browser => {
    browser
      .url(`${browser.launchUrl}${oldRefinementCityPath}`)
      .waitForURLEquals(`${browser.launchUrl}${oldRefinementCityPath}`)
      .waitForElementVisible('#react-view')
  },

  'Verify page loads for refinement search for city with old refinements': browser => {
    const expected = oldRefinementCityPath
    browser.assert.urlEquals(`${browser.launchUrl}${expected}`)
  },
}
