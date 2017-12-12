module.exports = {
  elements: {
    blogLink: '[data-test-id=footer-blog-link]',
    mobileAppsLink: '[data-test-id=footer-mobile-apps-link]',
    siteMapLink: '[data-test-id=footer-site-map-link]',
    aboutUsLink: '[data-test-id=footer-about-us-link]',
    employmentLink: '[data-test-id=footer-employment-link]',
    adsLink: '[data-test-id=footer-ads-link]',
    advertiseLink: '[data-test-id=footer-advertise-link]',
    privacyPolicyLink: '[data-test-id=footer-privacy-link]',
    termsOfServiceLink: '[data-test-id=footer-terms-link]',
    contactUsLink: '[data-test-id=footer-contact-link]',
    avoidScamsLink: '[data-test-id=footer-scams-link]',
    propertyManagerLink: '[data-test-id=property-manager-login]',
  },
  commands: [{
    scrollToBottom: browser => {
      browser.execute('scrollTo(0,document.body.scrollHeight)')
    },
    validateBeforeLazyLoad() {
      this.expect.element('@blogLink').to.not.be.present()
      this.expect.element('@mobileAppsLink').to.not.be.present()
      this.expect.element('@siteMapLink').to.not.be.present()
      this.expect.element('@aboutUsLink').to.not.be.present()
      this.expect.element('@employmentLink').to.not.be.present()
      this.expect.element('@adsLink').to.not.be.present()
      this.expect.element('@advertiseLink').to.not.be.present()
      this.expect.element('@privacyPolicyLink').to.not.be.present()
      this.expect.element('@termsOfServiceLink').to.not.be.present()
      this.expect.element('@contactUsLink').to.not.be.present()
      this.expect.element('@avoidScamsLink').to.not.be.present()
      this.expect.element('@propertyManagerLink').to.not.be.present()
    },
    validate(browser) {
      this.scrollToBottom(browser)
      this.expect.element('@blogLink').text.to.equal('AG Blog')
      this.expect.element('@mobileAppsLink').text.to.equal('Mobile Apps')
      this.expect.element('@siteMapLink').text.to.equal('Site Map')
      this.expect.element('@aboutUsLink').text.to.equal('About Us')
      this.expect.element('@employmentLink').text.to.equal('Employment')
      this.expect.element('@adsLink').text.to.equal('Interest-Based Ads')
      this.expect.element('@advertiseLink').text.to.equal('Advertise')
      this.expect.element('@privacyPolicyLink').text.to.equal('Privacy Policy')
      this.expect.element('@termsOfServiceLink').text.to.equal('Terms of Service')
      this.expect.element('@contactUsLink').text.to.equal('Contact Us')
      this.expect.element('@avoidScamsLink').text.to.equal('Avoid Scams')
      this.expect.element('@propertyManagerLink').text.to.equal('Property Manager Login')
    },
  }],
}
