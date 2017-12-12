module.exports = {
  tags: ['critical', 'stableAndroid', 'stableIOS', 'stableProd'],
  before: browser => {
    browser
      .url('https://www.google.com/')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate URL': browser => {
    browser.assert.urlEquals('https://www.google.com/')
  },
}
