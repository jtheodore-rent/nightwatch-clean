const recommendListingXPath = '//div[@data-test-id="recommendation"]'
const recommendedListingElements = {
  priceRange: '[data-test-id=recommendation-price-range]',
  bedsRange: '[data-test-id=recommendation-beds-range]',
  image: '[data-tag_item=image]',
  name: '[data-test-id=recommendation-name]',
  address: '[data-test-id=recommendation-address]',
}

const leadSuccessCommands = {
  verifyHeading: successModal => {
    successModal.expect.element('@reviewSolicitation').to.be.visible.after(0)
    successModal.expect.element('@closeButton').to.be.visible.after(0)
  },
}
module.exports = {
  elements: {
    closeButton: '[data-test-id=lead-success-modal] [data-test-id=closeModal]',
    heading: '[data-test-id=heading]',
    reviewSolicitation: '[data-test-id=review-solicitation]',
  },
  sections: {
    firstRecommendedListing: {
      selector: `${recommendListingXPath}[1]`,
      locateStrategy: 'xpath',
      elements: [
        recommendedListingElements,
      ],
    },
    overCapRecommendedListing: {
      selector: `${recommendListingXPath}[6]`,
      locateStrategy: 'xpath',
      elements: [
        recommendedListingElements,
      ],
    },
  },
  commands: [leadSuccessCommands],
}
