module.exports = {
  elements: {
    mainHeading: '[data-test-id=main-heading]',
  },
  commands: [{
    validateNotFound: (browser, path) => {
      browser.url(`${browser.launchUrl}${path}`)
             .waitForElementVisible('#react-view')
      browser.page.large.notFound().expect.element('@mainHeading').text
             .to.equal('Find apartments for rent across the U.S.!')
    },
  }],
}
