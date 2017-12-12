function Validator(footer) {
  this.validateLogo = homeUrl => {
    footer.expect.section('@logo').attribute('href').to.equal(homeUrl)
    footer.section.logo.expect.element('@image').to.be.present.after(0)
  }

  this.validateSocialLinks = () => {
    const socialLinks = footer.section.socialLinks
    socialLinks.expect.element('@facebookLink').attribute('href').to.equal('http://www.facebook.com/apartmentguide')
    socialLinks.expect.element('@twitterLink').attribute('href').to.equal('http://www.twitter.com/ApartmentGuide')
    socialLinks.expect.element('@pinterestLink').attribute('href').to.equal('http://www.pinterest.com/apartmentguide')
    socialLinks.expect.element('@instagramLink').attribute('href').to.equal('http://www.instagram.com/apartmentguide')
    socialLinks.expect.element('@googlePlusLink').attribute('href').to.equal('https://plus.google.com/+ApartmentGuide/posts')
    socialLinks.expect.element('@youTubeLink').attribute('href').to.equal('http://www.youtube.com/apartmentguide')
  }

  this.validateSocialIcons = () => {
    const socialLinks = footer.section.socialLinks
    socialLinks.expect.element('@facebookIcon').to.be.present.after(0)
    socialLinks.expect.element('@twitterIcon').to.be.present.after(0)
    socialLinks.expect.element('@pinterestIcon').to.be.present.after(0)
    socialLinks.expect.element('@instagramIcon').to.be.present.after(0)
    socialLinks.expect.element('@googlePlusIcon').to.be.present.after(0)
    socialLinks.expect.element('@youTubeIcon').to.be.present.after(0)
  }

  this.validateCopyright = () => {
    const date = new Date()
    const year = date.getFullYear()
    footer.expect.element('@copyright').text.to.equal(`©${year} RentPath, LLC`)
  }
}

module.exports = {
  elements: {
    copyright: '[data-test-id=footer-copyright]',
  },
  sections: {
    logo: {
      selector: '[data-test-id=ag-logo]',
      elements: {
        image: 'svg',
      },
    },
    socialLinks: {
      selector: '[data-test-id=social-links]',
      elements: {
        facebookLink: '[data-test-id=facebook]',
        facebookIcon: '[data-test-id=facebook] svg',

        twitterLink: '[data-test-id=twitter]',
        twitterIcon: '[data-test-id=twitter] svg',

        pinterestLink: '[data-test-id=pinterest]',
        pinterestIcon: '[data-test-id=pinterest] svg',

        instagramLink: '[data-test-id=instagram]',
        instagramIcon: '[data-test-id=instagram] svg',

        googlePlusLink: '[data-test-id=googleplus]',
        googlePlusIcon: '[data-test-id=googleplus] svg',

        youTubeLink: '[data-test-id=youtube]',
        youTubeIcon: '[data-test-id=youtube] svg',
      },
    },
  },

  commands: [{
    validate(homeUrl) {
      const validator = new Validator(this)
      validator.validateLogo(homeUrl)
      validator.validateSocialLinks()
      validator.validateSocialIcons()
      validator.validateCopyright()
    },
  }],
}
