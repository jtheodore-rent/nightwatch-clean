const submitReviewPath = '/apartments/Alaska/Yakutat/EGG-Property-One/185296/Reviews/new/'
const emailError = 'Email cannot be blank.'
const reviewError = 'Share a bit more to help out fellow renters. 20 more characters.'
const reviewText = 'Man bun humblebrag +1 flexitarian bicycle rights tweed.' +
' Kombucha cliche whatever. Official blog post-ironic occupy selvage, mixtape letterpress.'
const reviewEmail = 'test@test.com'
module.exports = {
  tags: ['critical', 'stableAndroid', 'quarantineIOS', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${submitReviewPath}?email=${reviewEmail}`)
      .page.small.submitReview().waitForElementVisible('@reviewForm')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate initial state': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${submitReviewPath}?email=${reviewEmail}`)
    browser
      .page
      .small
      .submitReview()
      .expect.element('@reviewForm').to.be.visible.after(0)
    browser.page.shared.headTags().validate({
      meta: { robots: 'noindex,nofollow' },
    })
    browser.page.small.submitReview().expect.element('@reviewEmail').value.to.contain(reviewEmail)
  },

  'Validate Error messages populate when clicking send without filling out form': browser => {
    const submitReview = browser.page.small.submitReview()
    submitReview
      .clearValue('@reviewEmail')
      .setValue('@reviewEmail', ' ')
      .click('@reviewFormSendButton')
      .waitForElementVisible('@reviewCommentLabel')

    submitReview.expect.element('@reviewStars').text.to.contain('Please select a star.')
    submitReview.expect.element('@reviewCommentLabel').text.to.contain(reviewError)
    submitReview.expect.element('@reviewEmailLabel').text.to.contain(emailError)
  },

  'Verify Error Messages with unpopulated form': browser => {
    const submitReview = browser.page.small.submitReview()

    submitReview.expect.element('@reviewStars').text.to.contain('Please select a star.')
    submitReview.expect.element('@reviewCommentLabel').text.to.contain(reviewError)
    submitReview.expect.element('@reviewEmailLabel').text.to.contain(emailError)
  },

  'Submit blank form': browser => {
    const submitReview = browser.page.small.submitReview()

    submitReview.click('@reviewFormSendButton')
  },

  'Validate error messages for blank form': browser => {
    const submitReview = browser.page.small.submitReview()

    submitReview.expect.element('@reviewStars').text.to.contain('Please select a star.')
    submitReview.expect.element('@reviewCommentLabel').text.to.contain(reviewError)
    submitReview.expect.element('@reviewEmailLabel').text.to.contain(emailError)
  },

  'Submit form with only email set': browser => {
    const submitReview = browser.page.small.submitReview()

    submitReview.setValue('@reviewEmail', reviewEmail).click('@reviewFormSendButton')
  },

  'Validate error messages for email only form': browser => {
    const submitReview = browser.page.small.submitReview()

    submitReview.expect.element('@reviewStars').text.to.contain('Please select a star.')
    submitReview.expect.element('@reviewCommentLabel').text.to.contain(reviewError)
    submitReview.expect.element('@reviewEmailLabel').text.not.to.contain(emailError)
  },

  'Navigate to review page with rating preset': browser => {
    browser.url(`${browser.launchUrl}${submitReviewPath}?rating=3`)
      .waitForURLEquals(`${browser.launchUrl}${submitReviewPath}?rating=3`)
      .page.small.submitReview()
      .waitForElementVisible('@reviewStars')
  },

  'Submit form with only stars set': browser => {
    browser.page.small.submitReview().click('@reviewFormSendButton')
      .waitForElementVisible('@reviewCommentLabel')
  },

  'Validate stars only errors': browser => {
    const submitReview = browser.page.small.submitReview()

    submitReview.expect.element('@reviewCommentLabel').text.to.contain(reviewError)
    submitReview.expect.element('@reviewEmailLabel').text.to.contain(emailError)
  },

  'Fill form correctly': browser => {
    const submitReview = browser.page.small.submitReview()

    submitReview.setValue('@reviewComment', reviewText)
      .setValue('@reviewEmail', reviewEmail)
  },

  'Submit completed form': browser => {
    browser.page.small.submitReview().click('@reviewFormSendButton')
      .waitForElementVisible('@thankYou')
  },

  'Validate Thank you page displays on successful submission': browser => {
    browser.page.small.submitReview()
      .expect.element('@thankYou').to.be.visible.before(1000)
  },
}
