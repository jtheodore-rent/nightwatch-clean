const pdpPath = '/apartments/Alaska/Yakutat/EGG-Property-One/185296/'
const submitReviewPath = `${pdpPath}Reviews/new/`
const reviewText = 'Man bun humblebrag +1 flexitarian bicycle rights tweed.' +
' Kombucha cliche whatever. Official blog post-ironic occupy selvage, mixtape letterpress.'

module.exports = {
  tags: ['stableAndroid', 'quarantineIOS', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${submitReviewPath}`)
      .page.small.submitReview().waitForElementVisible('@reviewStars')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Rate stars': browser => {
    browser.page.small.submitReview().rate(3)
  },

  'Fill Out Form': browser => {
    browser.page.small.submitReview()
      .setValue('@reviewComment', reviewText)
      .setValue('@reviewEmail', 'test@test.com')
  },

  'Submit Form': browser => {
    browser.pause(500).page.small.submitReview()
      .click('@reviewFormSendButton').waitForElementVisible('@thankYou')
  },

  'Click X': browser => {
    browser.page.small.submitReview().click('@closeReviewForm')
      .waitForElementNotPresent('@closeReviewForm')
  },

  'Validate reviews tab displayed': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${pdpPath}#reviews`)
    browser.page.small.pdp().expect.element('@reviews').to.be.visible.before(1000)
  },
}
