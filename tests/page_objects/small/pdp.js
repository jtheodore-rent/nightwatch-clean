// TODO Remove this page object, is deprecated, please use propertyCard.js

const rateWithStars = '[data-test-id=pdp-reviews-rate-with-stars]'
const reviewXpath = '//*[@data-test-id="pdp-review"]'
const STAR_OFFSET = 6

module.exports = {
  commands: [{
    rate(rating) {
      const backwardsStarsRating = STAR_OFFSET - rating
      this.click(`${rateWithStars} a:nth-of-type(${backwardsStarsRating})`)
    },
  }],
  /* eslint-disable max-len */
  elements: {
    container: '[data-test-id=pdp]',
    reviewTabButton: '[data-test-id=pdp-reviews-button]',

    // reviewsTab
    ratingsAndReviews: '[data-test-id=pdp-reviews-ratings-and-reviews]',
    ratingsByCategory: '[data-test-id=pdp-reviews-ratings-by-category]',
    reviews: '[data-test-id=pdp-reviews]',
    review: '[data-test-id=pdp-review]',
    propReview: '[itemprop=reviewRating]',
    rateWithStars,
    reviewButton: '[data-test-id=pdp-reviews-button]',
    overallRating: '[data-test-id=pdp-reviews-overall-rating]',

    // visualSearchGridHdTour feature
    hdTourButton: '[data-test-id=pdp-hd-tour]',
    closeHdTour: '[data-test-id=close-hd-tour]',
    hdTourIframe: '[data-test-id=hd-tour-iframe]',

    // visualSearchGridHdVideo feature
    hdVideoButton: '[data-test-id=pdp-hd-video]',
    closeHdVideo: '[data-test-id=close-hd-video]',
    hdVideoTag: '[data-test-id=hd-video]',
  },

  sections: {
    firstReview: {
      selector: `${reviewXpath}[1]`,
      locateStrategy: 'xpath',
      elements: {
        flag: '[data-test-id=pdp-review-flagged]',
        reportButton: '[data-test-id=pdp-review-report-button]',
        markHelpful: '[data-test-id=mark-review-as-helpful-button]',
        markAsHelpful: '[data-test-id=mark-as-helpful]',
        markedAsHelpful: '[data-test-id=marked-as-helpful]',
      },
    },

    reportReviewForm: {
      selector: '[data-test-id=report-review-form]',
      elements: {
        submit: '[data-test-id=report-review-form-submit]',
        reason: '[data-test-id=report-review-form-reason]',
        reasonDishonest: '[data-test-id=report-review-form-reason] input[value="Dishonest"]',
        reasonInappropriate: '[data-test-id=report-review-form-reason] input[value="Inappropriate"]',
        reasonFake: '[data-test-id=report-review-form-reason] input[value="Irrelevant, fraudulent, or spam"]',
      },
    },
  },
  /* eslint-enable max-len */
}
