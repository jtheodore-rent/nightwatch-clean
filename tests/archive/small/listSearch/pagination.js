const listSearchPath = '/apartments/Georgia/Atlanta/'

module.exports = {
  before: browser => {
    browser
      .url(`${browser.launchUrl}${listSearchPath}`)
      .waitForElementVisible('#react-view')
    browser.page.small.listSearch().waitForElementVisible('@nextPageButton')
  },

  after: browser => {
    browser.end()
  },

  'Validate initial state': browser => {
    const listSRP = browser.page.small.listSearch()
    browser.assert.urlEquals(`${browser.launchUrl}${listSearchPath}`)
    listSRP.expect.element('@prevPageButton').to.not.be.present()
    listSRP.expect.element('@currentPageNumber').text.to.match(/1 of \d{1,}/)
  },

  'Test Pagination': browser => {
    browser.page.small.listSearch().section.firstStandardListing
      .getText('@name', result => {
        const pageOneListingName = result.value
        browser.page.small.listSearch().click('@nextPageButton')
          .waitForElementVisible('@prevPageButton', () => {
            const page2SRP = browser.page.small.listSearch()
            browser.assert.urlEquals(`${browser.launchUrl}${listSearchPath}?page=2`)
            page2SRP.section.firstStandardListing.waitForElementVisible('@name')
              .expect.element('@name').text.not.to.equal(pageOneListingName)
            page2SRP.expect.element('@prevPageButton').to.be.visible()
            page2SRP.expect.element('@nextPageButton').to.be.visible()
            page2SRP.expect.element('@currentPageNumber').text.to.match(/2 of \d+/)
            page2SRP.click('@prevPageButton').waitForElementNotPresent('@prevPageButton', () => {
              const page1SRP = browser.page.small.listSearch()
              browser.assert.urlEquals(`${browser.launchUrl}${listSearchPath}`)
              page1SRP.section.firstStandardListing.expect.element('@name')
                .text.to.equal(pageOneListingName)
              page1SRP.expect.element('@prevPageButton').to.not.be.present()
              page1SRP.expect.element('@nextPageButton').to.be.visible()
              page1SRP.expect.element('@currentPageNumber').text.to.match(/1 of \d+/)
            })
          })
      })
  },
}
