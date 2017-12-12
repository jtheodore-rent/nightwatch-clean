const hoodPath = '/neighborhoods/Georgia/Atlanta/Old-Fourth-Ward/'
/* eslint-disable max-len */
const description = /Browse (\d+) apartments for rent in Old Fourth Ward Atlanta, GA. Compare ratings, reviews, 3D floor plans, and high res images./
/* eslint-enable max-len */
const title = 'Old Fourth Ward Apartments for Rent - Atlanta, GA | ApartmentGuide.com'

module.exports = {
  before: browser => {
    browser
      .url(`${browser.launchUrl}${hoodPath}?content=off`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.end()
  },

  'Validate Neighborhood Search Page': browser => {
    browser
      .page
      .small
      .listSearch()
      .expect
      .section('@firstStandardListing')
      .to.be.visible()

    browser
      .expect
      .element('meta[name="description"]')
      .attribute('content')
      .to
      .match(description)

    browser
      .expect
      .element('title')
      .attribute('text')
      .to
      .equal(title)
  },
}
