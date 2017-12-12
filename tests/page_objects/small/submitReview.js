const STAR_OFFSET = 6

module.exports = {
  commands: [{
    rate(rating) {
      const backwardsStarsRating = STAR_OFFSET - rating
      return this.click(`[data-test-id=submit-review-form-rating-stars] a:nth-child(${backwardsStarsRating})`)
    },
  }],
  elements: {
    closeReviewForm: '[data-test-id=close-review-form]',
    reviewForm: '[data-test-id=submit-review-form]',
    reviewFormSendButton: '[data-test-id=submit-review-form-send-button]',
    reviewStars: '[data-test-id=submit-review-form-rating-stars]',
    reviewComment: '[data-test-id=submit-review-form-review]',
    reviewCommentLabel: '[data-test-id=submit-review-form-review-label]',
    reviewEmail: '[data-test-id=submit-review-form-email]',
    reviewEmailLabel: '[data-test-id=submit-review-form-email-label]',
    thankYou: '[data-test-id=submit-review-thank-you]',
    propertyName: '[data-test-id=submit-review-form-property-name]',
    AgLogo: '[data-test-id=submit-review-form-ag-logo]',
  },
}
