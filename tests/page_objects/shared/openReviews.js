const listingXpath = '//*[@data-test-id="open-reviews-listing"]'
const listingElements = {
  name: '[data-test-id=open-reviews-listing-name]',
  firstStar: '[data-test-id=review-stars] a',
  pdpLink: '[data-test-id=open-reviews-listing-link]',
}

module.exports = {
  elements: {
    openReviewsContainer: '[data-test-id=open-reviews-container]',
    listingsContainer: '[data-test-id=open-reviews-listings',
    location: '[data-test-id="search-location"]',
    firstSearchOption: {
      selector: '//div[@data-test-id="search-location-suggestion"][1]',
      locateStrategy: 'xpath',
    },
    propertyName: '[data-test-id="open-reviews-property-name"]',
    submit: '[data-test-id="open-reviews-submit"]',
  },
  sections: {
    firstListing: {
      selector: `${listingXpath}[1]`,
      locateStrategy: 'xpath',
      elements: listingElements,
    },
    secondListing: {
      selector: `${listingXpath}[2]`,
      locateStrategy: 'xpath',
      elements: listingElements,
    },
  },
}
