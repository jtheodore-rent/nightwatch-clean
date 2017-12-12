const navMenuCommands = {
  navMenuLinkValidation: (navMenu, args) => {
    navMenu.expect.element(args.element).to.be.visible.after(0)
    if (args.text) {
      navMenu.expect.element(args.element).text.to.equal(args.text)
    }
    if (args.href) {
      navMenu.expect.element(args.element).attribute('href').to.equal(args.href)
    } else if (args.hrefRegExp) {
      navMenu.expect.element(args.element).attribute('href').to.match(args.hrefRegExp)
    }
  },
  menuValidation: browser => {
    const nearbyHref = new RegExp('^' + browser.launchUrl.replace(/\./g, '\\.') + '\/deals\/(-?\\d{2,3}\\.\\d+\/-?\\d{2,3}\\.\\d+|undefined\/undefined)\/\\?sortby=mobilecoupon_desc$') // eslint-disable-line
    const navMenu = browser.page.small.navMenu()
    const navMenuLinks = [
      {
        element: '@homeButton',
        text: 'Home',
        href: `${browser.launchUrl}/`,
      },
      {
        element: '@searchAptButton',
        text: 'Search',
      },
      {
        element: '@dealsNearbyButton',
        text: 'Deals Nearby',
        hrefRegExp: nearbyHref,
      },
      {
        element: '@myPlacesButton',
        text: 'Favorite Properties',
        href: `${browser.launchUrl}/myplaces/`,
      },
      {
        element: '@logInButton',
        text: 'Log In',
        href: `${browser.launchUrl}/login/`,
      },
      {
        element: '@mobileAppLink',
        text: 'Mobile Apps',
        href: `${browser.launchUrl}/mobile-app/`,
      },
      {
        element: '@findAptlink',
        text: 'Find Apartments',
        href: `${browser.launchUrl}/apartments/`,
      },
      {
        element: '@adLink',
        text: 'Advertise',
        href: 'https://www.rentpath.com/',
      },
      {
        element: '@privacyLink',
        text: 'Privacy Policy',
        href: `${browser.launchUrl}/legal/privacy/`,
      },
      {
        element: '@termsLink',
        text: 'Terms of Service',
        href: `${browser.launchUrl}/legal/terms-of-service/`,
      },
      {
        element: '@contactUsLink',
        text: 'Contact Us',
        href: `${browser.launchUrl}/contact-us/`,
      },
      {
        element: '@facebookLink',
        href: 'http://www.facebook.com/apartmentguide',
      },
      {
        element: '@twitterLink',
        href: 'http://www.twitter.com/ApartmentGuide',
      },
      {
        element: '@pinterestLink',
        href: 'http://www.pinterest.com/apartmentguide',
      },
      {
        element: '@instagramLink',
        href: 'http://www.instagram.com/apartmentguide',
      },
      {
        element: '@googlePlusLink',
        href: 'https://plus.google.com/+ApartmentGuide/posts',
      },
      {
        element: '@youTubeLink',
        href: 'http://www.youtube.com/apartmentguide',
      },
    ]
    navMenu.waitForElementVisible('@mainMenu').click('@mainMenu')
      .waitForElementVisible('@homeButton', () => {
        navMenuLinks.forEach(link => {
          navMenu.navMenuLinkValidation(navMenu, {
            element: link.element,
            text: link.text,
            href: link.href,
            hrefRegExp: link.hrefRegExp,
          })
        })
      })
  },

  footerCopyrightValidation: browser => {
    const navMenu = browser.page.small.navMenu()
    navMenu.expect.element('@agLogo').to.be.visible.before(1000)
    const date = new Date()
    const year = date.getFullYear()
    navMenu.expect.element('@copyright').text.to.equal(`©${year} RentPath, LLC`)
    const copyRightFinePrint = 'All photos, videos, text, and other content are the property of RentPath, LLC. APARTMENT GUIDE and the APARTMENT GUIDE Trade Dress are registered trademarks of RentPath, LLC. All rights reserved.' // eslint-disable-line max-len
    navMenu.expect.element('@footerFinePrint').text.to.equal(copyRightFinePrint)
  },

  clickNavMenuLink: (navMenu, linkElement) => {
    navMenu.getAttribute(linkElement, 'href', result => {
      const linkHref = result.value
      navMenu.click(linkElement).waitForURLEquals(linkHref)
    })
  },

  openNavMenuAndClickLink: (browser, linkElement) => {
    const navMenu = browser.page.small.navMenu()
    navMenu.click('@mainMenu').waitForElementVisible(linkElement, () => {
      browser.pause(500).page.small.navMenu().clickNavMenuLink(navMenu, linkElement)
    })
  },
}

module.exports = {
  elements: {
    // Buttons
    mainMenu: '[data-test-id=main-menu]',
    homeButton: '[data-test-id=menu-home-button]',
    searchAptButton: '[data-tag_item=search_apartments]',
    dealsNearbyButton: '[data-tag_item=deals_nearby]',
    myPlacesButton: '[data-tag_item=my_places]',
    logInButton: '[data-tag_item=login]',
    // Links
    mobileAppLink: '[data-tag_item=mobile_apps]',
    findAptlink: '[data-tag_item="find_apartments"]',
    adLink: '[data-tag_item="advertise"]',
    privacyLink: '[data-tag_item="privacy_policy"]',
    termsLink: '[data-tag_item="terms_of_use"]',
    contactUsLink: '[data-tag_item="contact_us"]',
    // socialLinks
    facebookLink: '[data-tag_section=header] [data-tag_item=facebook]',
    twitterLink: '[data-tag_section=header] [data-test-id=twitter]',
    pinterestLink: '[data-tag_section=header] [data-test-id=pinterest]',
    instagramLink: '[data-tag_section=header] [data-test-id=instagram]',
    googlePlusLink: '[data-tag_section=header] [data-test-id=googleplus]',
    youTubeLink: '[data-tag_section=header] [data-test-id=youtube]',
    // copyright
    agLogo: '[data-tag_section=footer] [data-tag_item=ag_logo]',
    copyright: '[data-test-id=footer-copyright]',
    footerFinePrint: '[data-test-id=footer-copyright-fineprint]',
  },
  commands: [navMenuCommands],
}
