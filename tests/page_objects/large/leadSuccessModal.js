// eslint-disable-next-line max-len
const recommendListingXPath = '//*[@data-test-id="lead-success-modal"]//div[@data-test-id="recommendation"]'
const recommendedListingElements = {
  checkAvailabilityButton: '[data-tag_item=check_availability_button]',
  priceRange: '[data-test-id=recommendation-price-range]',
  bedsRange: '[data-test-id=recommendation-beds-range]',
  image: '[data-tag_item=image]',
  name: '[data-test-id=recommendation-name]',
  address: '[data-test-id=recommendation-address]',
}

const leadSuccessCommands = {
  verifyHeading: (successModal, listingName) => {
    successModal.expect.element('@heading').to.be.visible.before(1000)
    successModal.expect.element('@subheading').to.be.visible.before(1000)
    successModal.expect.element('@subheading').text.to
      .match(new RegExp(`${listingName}, \\(\\d{3}\\) \\d{3}-\\d{4}`))
  },
  verifyRecommendedListing: recommendedListing => {
    recommendedListing.expect.element('@image').to.be.visible.before(1000)
    recommendedListing.expect.element('@name').to.be.visible.before(10000)
    recommendedListing.expect.element('@name').text.to.match(/\w+/)
    recommendedListing.expect.element('@name').to.have.css('text-overflow').which.equals('ellipsis')
    recommendedListing.expect.element('@address').to.be.visible.before(1000)
    recommendedListing.expect.element('@address').to.have
      .css('text-overflow').which.equals('ellipsis')
    recommendedListing.expect.element('@address').text.to.match(/\w+\D*/)
  },
  verifyRecommendedListingCapNotExceeded: successModal => {
    successModal.expect.section('@overCapRecommendedListing').not.to.be.present.after(0)
  },
  testRecommendedListingClickThroughAndLeadFormPrePopulation: (browser, submittedLeadData) => {
    const firstRecommendedListing = browser.page.large
      .leadSuccessModal().section.firstRecommendedListing
    firstRecommendedListing.getText('@name', result => {
      const recommendedListingName = result.value
      firstRecommendedListing.click('@checkAvailabilityButton', () => {
        const preFilledLeadData = {
          name: submittedLeadData.name,
          firstName: submittedLeadData.firstName,
          lastName: submittedLeadData.lastName,
          email: submittedLeadData.email,
          phone: submittedLeadData.phone,
          beds: submittedLeadData.beds,
          baths: submittedLeadData.baths,
          message: 'Hello,\n\n' +
              `I'm interested in ${recommendedListingName}. ` +
              'Please send me current availability and additional details.\n\n' +
              'Thanks.',
          newsLetterOptIn: submittedLeadData.newsLetterOptIn,
        }
        browser.page.large.emailLeadForm().validateLeadForm(browser, preFilledLeadData)
      })
    })
  },
}
module.exports = {
  elements: {
    leadSuccessModal: '[data-test-id=lead-success-modal]',
    closeButton: '[data-test-id=lead-success-modal] [data-test-id=closeModal]',
    heading: '[data-test-id=lead-success-modal-header]',
    subheading: '[data-test-id=lead-success-modal-subheader]',
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
