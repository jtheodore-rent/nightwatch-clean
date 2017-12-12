module.exports = {
  before: browser => {
    browser
      .url(`${browser.launchUrl}/map/?city=Atlanta&state=Georgia`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.end()
  },

  'Execute search': browser => {
    const mapPage = browser.page.large.map()
    mapPage.setValue('@searchInput', 'Los Angeles, CA')
    browser.pause(1000)
    mapPage.click('@searchButton')
  },

  'Validate Page': browser => {
    const mapPage = browser.page.large.map()
    mapPage.expect.element('@locationPrompt').text.to.contain('Los Angeles, CA').before(15000)
    mapPage.assert.urlContains('city=Los-Angeles&state=California')
  },
}
