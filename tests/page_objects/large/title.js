const defaultTitle = 'Apartments for Rent and Rentals - Free Apartment Finder | ApartmentGuide.com'

module.exports = {
  sections: {
  },
  commands: [{
    validateDefaultTitle: browser => {
      browser.page.large.title().expect.element('title').attribute('text').to.equal(defaultTitle)
    },
  }],
}
