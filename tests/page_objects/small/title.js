module.exports = {
  sections: {
  },
  commands: [{
    validatePageTitle: (browser, expected) => {
      browser.expect.element('title').attribute('text').to.match(expected)
    },
  }],
}
