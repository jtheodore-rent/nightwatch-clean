const submitReviewPath = '/apartments/Alaska/Yakutat/EGG-Property-One/185296/Reviews/new/'
const emailError = 'Email cannot be blank.'
const reviewError = 'Share a bit more to help out fellow renters. 20 more characters.'
const reviewText = 'Man bun humblebrag +1 flexitarian bicycle rights tweed.' +
' Kombucha cliche whatever. Official blog post-ironic occupy selvage, mixtape letterpress.'
const reviewEmail = 'test@test.com'

module.exports = {
  tags: ['stableChrome', 'stableFirefox', 'critical', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'ui',
        value: 'adaptive',
        path: '/',
      })
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${submitReviewPath}?email=${reviewEmail}`)
      .waitForURLEquals(`${browser.launchUrl}${submitReviewPath}?email=${reviewEmail}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate initial state': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${submitReviewPath}?email=${reviewEmail}`)
    browser
      .page
      .large
      .submitReview()
      .expect.element('@reviewForm').to.be.visible.after(0)
    browser
      .page
      .large
      .submitReview()
      .expect.element('@bottomBannerAd').to.be.present.before(1000)
    browser.page.shared.headTags().validate({
      meta: { robots: 'noindex,nofollow' },
      canonical: `${browser.launchUrl}${submitReviewPath}`,
    })
    browser.page.large.submitReview().expect.element('@reviewEmail').value.to.contain(reviewEmail)
  },

  'Validate Error messages populate when clicking send without filling out form': browser => {
    const submitReview = browser.page.large.submitReview()
    submitReview
      .clearValue('@reviewEmail')
      .setValue('@reviewEmail', ' ')
      .click('@reviewFormSendButton')

    submitReview.expect.element('@reviewStars').text.to.contain('Please select a star.')
    submitReview.expect.element('@reviewCommentLabel').text.to.contain(reviewError)
    submitReview.expect.element('@reviewEmailLabel').text.to.contain(emailError)
  },

  'Submit Blank form': browser => {
    const submitReview = browser.page.large.submitReview()

    submitReview.click('@reviewFormSendButton')
  },

  'Validate Error messages for blank form': browser => {
    const submitReview = browser.page.large.submitReview()

    submitReview.expect.element('@reviewStars').text.to.contain('Please select a star.')
    submitReview.expect.element('@reviewCommentLabel').text.to.contain(reviewError)
    submitReview.expect.element('@reviewEmailLabel').text.to.contain(emailError)
  },

  'Fill email and submit': browser => {
    const submitReview = browser.page.large.submitReview()

    submitReview.setValue('@reviewEmail', 'test@test.com').click('@reviewFormSendButton')
  },

  'Validate error messages when just email was filled': browser => {
    const submitReview = browser.page.large.submitReview()

    submitReview.expect.element('@reviewStars').text.to.contain('Please select a star.')
    submitReview.expect.element('@reviewCommentLabel').text.to.contain(reviewError)
    submitReview.expect.element('@reviewEmailLabel').text.not.to.contain(emailError)
  },

  'Switch to form with pre-filled stars': browser => {
    browser.url(`${browser.launchUrl}${submitReviewPath}?rating=3`)
      .waitForURLEquals(`${browser.launchUrl}${submitReviewPath}?rating=3`)
      .page.large.submitReview().waitForElementVisible('@reviewStars')
  },

  'Submit Review form with only stars filled': browser => {
    const submitReview = browser.page.large.submitReview()

    submitReview.click('@reviewFormSendButton').waitForElementVisible('@reviewCommentLabel')
  },

  'Verify errors when form submitted with only stars': browser => {
    const submitReview = browser.page.large.submitReview()

    submitReview.expect.element('@reviewCommentLabel').text.to.contain(reviewError)
    submitReview.expect.element('@reviewEmailLabel').text.to.contain(emailError)
  },

  'Fill out review message and email': browser => {
    const submitReview = browser.page.large.submitReview()
    submitReview.setValue('@reviewComment', reviewText)
      .setValue('@reviewEmail', 'test@test.com')
      .click('@reviewFormSendButton').waitForElementVisible('@thankYou')
  },

  'Submit form and verify thank you message': browser => {
    const submitReview = browser.page.large.submitReview()

    submitReview.expect.element('@thankYou').to.be.visible.before(1000)
    submitReview.expect.element('@bottomBannerAd').to.be.present.before(1000)
  },
}
