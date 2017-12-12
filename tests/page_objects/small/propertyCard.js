const tabButtonXPath = '(//button[@data-test-class="pdp-tab-button"])'

const propertyCardCommands = {
  verifyHeartFilled: pdpCard => {
    pdpCard.expect.element('@savedHeart').to.have.css('fill').which.equals('rgb(194, 12, 19)')
  },
  verifyHeartEmpty: pdpCard => {
    pdpCard.expect.element('@unsavedHeart').to.have.css('fill').which.equals('rgb(255, 255, 255)')
  },
  savePropAndValidate: pdpCard => {
    pdpCard.click('@unsavedHeart').waitForElementVisible('@savedHeart', () => {
      pdpCard.verifyHeartFilled(pdpCard)
    })
  },
  unSavePropAndValidate: pdpCard => {
    pdpCard.click('@savedHeart').waitForElementVisible('@unsavedHeart', () => {
      pdpCard.verifyHeartEmpty(pdpCard)
    })
  },
  validatePropName: (pdpCard, propName) => {
    pdpCard.expect.element('@propertyName').to.be.visible.after(0)
    pdpCard.expect.element('@propertyName').text.to.equal(propName)
  },
  validateAddress: (pdpCard, propAddress) => {
    pdpCard.expect.element('@propertyAddress').to.be.visible.after(0)
    pdpCard.expect.element('@propertyAddress').text.to.equal(propAddress)
  },
  validatePriceRange: (pdpCard, priceRange) => {
    pdpCard.expect.element('@propertyPriceRange').to.be.visible.after(0)
    pdpCard.expect.element('@propertyPriceRange').text.to.equal(priceRange)
  },
  validateBedsRange: (pdpCard, bedRange) => {
    pdpCard.expect.element('@propertyBedsRange').to.be.visible.after(0)
    pdpCard.expect.element('@propertyBedsRange').text.to.equal(bedRange)
  },
  validatePhoneButton: (pdpCard, telHref) => {
    pdpCard.expect.element('@headerCallButton').to.be.visible.after(0)
    pdpCard.expect.element('@headerCallButton').text.to.equal('Call Property')
    pdpCard.expect.element('@headerCallButton').attribute('href').to.equal(telHref)
  },
  validateEmailLeadButton: pdpCard => {
    pdpCard.expect.element('@headerEmailLeadButton').to.be.visible.after(0)
    pdpCard.expect.element('@headerEmailLeadButton').text.to.equal('Check Availability')
  },
  validateSchemaTags: (pdpCard, args) => {
    pdpCard.expect.element('@itemTypeSchema').to.be.present.after(0)
    pdpCard.expect.element('@metaPropertyName').attribute('content').to.equal(args.name)
    pdpCard.expect.element('@addressStreet').text.to.equal(args.street)
    pdpCard.expect.element('@addressLocality').text.to.equal(args.locality)
    pdpCard.expect.element('@addressZip').text.to.equal(args.zip)
    pdpCard.expect.element('@addressState').text.to.equal(args.state)
    pdpCard.expect.element('@metaPhoneNumber').attribute('content').to.equal(args.phone)
    pdpCard.expect.element('@metaLatitude').attribute('content').to.equal(args.lat)
    pdpCard.expect.element('@metaLongitude').attribute('content').to.equal(args.long)
  },
  validateHeader: (pdpCard, args) => {
    pdpCard.validatePropName(pdpCard, args.name)
    pdpCard.validateAddress(pdpCard, args.address)
    pdpCard.validatePriceRange(pdpCard, args.price)
    pdpCard.validateBedsRange(pdpCard, args.beds)
    pdpCard.validatePhoneButton(pdpCard, args.telHref)
    pdpCard.validateEmailLeadButton(pdpCard)
  },
  validateFooter: pdpCard => {
    pdpCard.expect.element('@photosButton').to.be.visible.after(0)
    pdpCard.expect.element('@photosButton').text.to.equal('Photos')

    pdpCard.expect.element('@mapButton').to.be.visible.after(0)
    pdpCard.expect.element('@mapButton').text.to.equal('Map')

    pdpCard.expect.element('@reviewsButton').to.be.visible.after(0)
    pdpCard.expect.element('@reviewsButton').text.to.equal('Reviews')

    pdpCard.expect.element('@detailsButton').to.be.visible.after(0)
    pdpCard.expect.element('@detailsButton').text.to.equal('Details')

    pdpCard.expect.element('@floorPlansButton').to.be.visible.after(0)
    pdpCard.expect.element('@floorPlansButton').text.to.equal('Floor Plans')

    pdpCard.expect.element('@shareButton').to.be.visible.after(0)
    pdpCard.expect.element('@shareButton').text.to.equal('Share')
  },
  verifyPhotosHidden: pdpCard => {
    const photos = pdpCard.section.photos
    photos.expect.element('@photoGalleryImage').not.to.be.visible.after(0)
    photos.expect.element('@photoGalleryImageCounter').not.to.be.visible.after(0)
    photos.expect.element('@photoGalleryNext').not.to.be.visible.after(0)
    photos.expect.element('@photoGalleryPrev').not.to.be.visible.after(0)
  },
  verifyReviewsHidden: pdpCard => {
    const reviews = pdpCard.section.reviews
    reviews.expect.element('@reviewStars').not.to.be.visible.after(0)
    reviews.expect.element('@rateWithStarsLabel').not.to.be.visible.after(0)
  },
  verifyDetailsHidden: pdpCard => {
    const details = pdpCard.section.details
    details.expect.element('@officeHoursHeading').not.to.be.visible.after(0)
    details.expect.element('@toggleHours').not.to.be.visible.after(0)
    details.expect.element('@descriptionHeading').not.to.be.visible.after(0)
    details.expect.element('@descriptionDetails').not.to.be.visible.after(0)
    details.expect.element('@amenities').not.to.be.visible.after(0)
  },
  verifyFloorPlansHidden: pdpCard => {
    const floorPlans = pdpCard.section.floorPlans
    floorPlans.expect.element('@floorPlan').not.to.be.visible.after(0)
  },
  validatePhotoGallery: (browser, pdpCard, couponText) => {
    const photos = pdpCard.section.photos
    const isIos = browser.options.desiredCapabilities.isIPhone || false

    if (!isIos) {
      pdpCard.verifyReviewsHidden(pdpCard)
      pdpCard.verifyDetailsHidden(pdpCard)
      pdpCard.verifyFloorPlansHidden(pdpCard)
      pdpCard.expect.element('@staticMapImage').not.to.be.visible.after(0)
    }
    if (couponText) {
      photos.expect.element('@photoGalleryCoupon').text.to.equal(couponText)
    } else {
      photos.expect.element('@photoGalleryCoupon').not.to.be.present.after(0)
    }
    photos.expect.element('@photoGalleryImageCounter').text.to.match(/^1 \/ \d+$/)
    photos.click('@photoGalleryNext', () => {
      photos.expect.element('@photoGalleryImageCounter').text.to.match(/^2 \/ \d+$/)
      browser.pause(2000)
        .page.small.propertyCard().section.photos.click('@photoGalleryPrev', () => {
          photos.expect.element('@photoGalleryImageCounter').text.to.match(/^1 \/ \d+$/)
        })
    })
    photos.expect.element('@photoGalleryImage').to.be.visible.after(0)
    pdpCard.validateShareClosed(pdpCard)
  },
  validateMap: browser => {
    const pdpCard = browser.page.small.propertyCard()
    const isIos = browser.options.desiredCapabilities.isIPhone || false

    if (!isIos) {
      pdpCard.verifyPhotosHidden(pdpCard)
      pdpCard.verifyReviewsHidden(pdpCard)
      pdpCard.verifyDetailsHidden(pdpCard)
      pdpCard.verifyFloorPlansHidden(pdpCard)
    }
    pdpCard.expect.element('@staticMapImage').to.be.visible.after(0)
    pdpCard.validateShareClosed(pdpCard)
  },
  validateReviewsNoRatings: (browser, listingName) => {
    const pdpCard = browser.page.small.propertyCard()
    const reviews = pdpCard.section.reviews
    const isIos = browser.options.desiredCapabilities.isIPhone || false

    if (!isIos) {
      pdpCard.verifyPhotosHidden(pdpCard)
      pdpCard.expect.element('@staticMapImage').not.to.be.visible.after(0)
      pdpCard.verifyDetailsHidden(pdpCard)
      pdpCard.verifyFloorPlansHidden(pdpCard)
    }
    reviews.expect.element('@rateWithStarsLabel').to.be.visible.after(0)
    reviews.expect.element('@rateWithStarsLabel')
      .text.to.equal(`Tap a star to review ${listingName}!`)
    reviews.expect.element('@reviewStars').to.be.visible.after(0)
    pdpCard.validateShareClosed(pdpCard)
  },
  verifySeeAllAmenitiesDisplaysMore: (browser, amenitySection) => {
    browser.elements('css selector', `[data-test-id=pdp-amenities-${amenitySection}-container] [data-test-id=pdp-amenity]`, result => { // eslint-disable-line max-len
      browser.assert.equal(result.value.length, 6)
      browser.click(`[data-test-id=pdp-amenities-${amenitySection}-container] [data-test-id=pdp-see-all-amenities]`, () => { // eslint-disable-line max-len
        browser.pause(500).elements('css selector', `[data-test-id=pdp-amenities-${amenitySection}-container] [data-test-id=pdp-amenity]`, expandedResult => { // eslint-disable-line max-len
          browser.assert.ok(expandedResult.value.length > 6)
        })
      })
    })
  },
  verifyAmenityCount: (browser, amenitySection, count) => {
    const pdpCard = browser.page.small.propertyCard()

    if (count === '6+') {
      pdpCard.verifySeeAllAmenitiesDisplaysMore(browser, amenitySection)
    } else {
      const countInt = parseInt(count, 10)
      browser.elements('css selector', `[data-test-id=pdp-amenities-${amenitySection}-container] [data-test-id=pdp-amenity]`, result => { // eslint-disable-line max-len
        browser.assert.equal(result.value.length, countInt)
      })
    }
  },
  validateAmenitySection: (browser, amenitySectionPackage) => {
    const pdpCard = browser.page.small.propertyCard()
    const details = pdpCard.section.details
    details.expect.element(amenitySectionPackage.headingLocator).to.be.visible.after(0)
    details.expect.element(amenitySectionPackage.headingLocator)
      .text.to.equal(amenitySectionPackage.headingText)
    pdpCard.verifyAmenityCount(browser, amenitySectionPackage.sectionTestId, amenitySectionPackage.amenityCount) // eslint-disable-line max-len
  },
  validateDetails: (browser, args) => {
    const pdpCard = browser.page.small.propertyCard()
    const details = pdpCard.section.details
    const isIos = browser.options.desiredCapabilities.isIPhone || false

    if (!isIos) {
      pdpCard.verifyPhotosHidden(pdpCard)
      pdpCard.expect.element('@staticMapImage').not.to.be.visible.after(0)
      pdpCard.verifyReviewsHidden(pdpCard)
      pdpCard.verifyFloorPlansHidden(pdpCard)
    }
    details.expect.element('@officeHoursHeading').to.be.visible.after(0)
    const today = new Date().getDay()

    if (args.officeHours.hasOwnProperty(today)) { // eslint-disable-line no-prototype-builtins
      details.expect.element('@officeHoursTodayStatus').text.to.equal('Open Today')
      details.expect.element('@officeHoursTimeRange').text.to.equal(args.officeHours[today])
    } else {
      details.expect.element('@officeHoursTodayStatus').text.to.equal('Closed Today')
    }
    details.expect.element('@toggleHours').to.be.visible.after(0)
    details.expect.element('@toggleHours').text.to.equal('Show All Hours')
    details.expect.element('@allHoursTable').not.to.be.present.after(0)
    details.click('@toggleHours', () => {
      details.expect.element('@toggleHours').text.to.equal('Hide All Hours')
      details.expect.element('@allHoursTable').to.be.visible.after(0)
      details.click('@toggleHours', () => {
        details.expect.element('@toggleHours').text.to.equal('Show All Hours')
        details.expect.element('@allHoursTable').not.to.be.present.after(0)
      })
    })
    if (args.couponText) {
      details.expect.element('@couponHeading').to.be.visible.after(0)
      details.expect.element('@couponHeading').text.to.equal('Special Offer')
      details.expect.element('@couponDetails').to.be.visible.after(0)
      details.expect.element('@couponDetails').text.to.equal(args.couponText)
    } else {
      details.expect.element('@couponHeading').not.to.be.present.after(0)
      details.expect.element('@couponDetails').not.to.be.present.after(0)
    }
    details.expect.element('@descriptionHeading').to.be.visible.after(0)
    details.expect.element('@descriptionHeading').text.to.equal('Description')
    details.expect.element('@descriptionDetails').to.be.visible.after(0)
    details.expect.element('@descriptionDetails').text.to.equal(args.description)
    details.expect.element('@amenities').to.be.visible.after(0)
    if (args.amenities.pets) {
      pdpCard.validateAmenitySection(browser, {
        headingLocator: '@petsHeading',
        headingText: 'Pets',
        sectionTestId: 'pets',
        amenityCount: args.amenities.pets,
      })
    }
    if (args.amenities.apartmentFeatures) {
      pdpCard.validateAmenitySection(browser, {
        headingLocator: '@apartmentFeaturesHeading',
        headingText: 'Apartment Features',
        sectionTestId: 'apartment-features',
        amenityCount: args.amenities.apartmentFeatures,
      })
    }
    if (args.amenities.communityFeatures) {
      pdpCard.validateAmenitySection(browser, {
        headingLocator: '@communityFeaturesHeading',
        headingText: 'Community Features',
        sectionTestId: 'community-features',
        amenityCount: args.amenities.communityFeatures,
      })
    }
    if (args.amenities.specialFeatures) {
      pdpCard.validateAmenitySection(browser, {
        headingLocator: '@specialFeaturesHeading',
        headingText: 'Special Features',
        sectionTestId: 'special-features',
        amenityCount: args.amenities.specialFeatures,
      })
    }
    if (args.amenities.additionalFeatures) {
      pdpCard.validateAmenitySection(browser, {
        headingLocator: '@additionalFeaturesHeading',
        headingText: 'Additional Features',
        sectionTestId: 'additional-features',
        amenityCount: args.amenities.additionalFeatures,
      })
    }
    pdpCard.validateShareClosed(pdpCard)
  },
  validateIncomeRestrictions: (browser, incomeRestrictions) => {
    const pdpCard = browser.page.small.propertyCard()
    incomeRestrictions.forEach((restriction, i) => {
      pdpCard.expect.element(`[data-test-id=affordable-housing-occupants-${i}]`)
        .text.to.equal(restriction.maxOccupants).before(6000)
      pdpCard.expect.element(`[data-test-id=affordable-housing-income-${i}]`)
        .text.to.equal(restriction.maxAnnualIncome).before(6000)
    })
  },
  validateFloorPlans: (browser, floorPlanDatas) => {
    const pdpCard = browser.page.small.propertyCard()
    const floorPlans = pdpCard.section.floorPlans
    const isIos = browser.options.desiredCapabilities.isIPhone || false

    if (!isIos) {
      pdpCard.verifyPhotosHidden(pdpCard)
      pdpCard.expect.element('@staticMapImage').not.to.be.visible.after(0)
      pdpCard.verifyReviewsHidden(pdpCard)
      pdpCard.verifyDetailsHidden(pdpCard)
    }
    floorPlans.expect.element('@floorPlan').to.be.visible.after(0)
    pdpCard.validateShareClosed(pdpCard)
    floorPlanDatas.forEach(floorplanPackage => {
      browser.page.small.floorplans().validateFloorplan(floorplanPackage)
    })
  },
  validateShareClosed: pdpCard => {
    const sharePropSection = pdpCard.section.shareProperty
    sharePropSection.expect.element('@shareFacebook').not.to.be.present.after(0)
    sharePropSection.expect.element('@shareTwitter').not.to.be.present.after(0)
    sharePropSection.expect.element('@sharePinterest').not.to.be.present.after(0)
    sharePropSection.expect.element('@shareEmail').not.to.be.present.after(0)
    sharePropSection.expect.element('@shareSms').not.to.be.present.after(0)
  },
  validateShareOpen: (browser, args, pdpTab) => {
    const mobileDeviceType = browser.options.desiredCapabilities.mobileDeviceType
    const sharePropSection = browser.page.small.propertyCard().section.shareProperty
    const match = browser.launchUrl.match(/^(?:(https?:\/\/))?([^:/]*)/)
    const protocol = encodeURIComponent(match[1])
    const androidProtocol = encodeURIComponent(protocol)
    const domain = (match[2] || '').replace(/^m\./, 'www.')
    const section = pdpTab ? encodeURIComponent(`#${pdpTab}`) : ''
    const androidSection = pdpTab ? encodeURIComponent(encodeURIComponent(`#${pdpTab}`)) : ''
    const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${protocol}${domain}${args.listingRoute}${section}` // eslint-disable-line max-len
    const twitterHref = `https://twitter.com/intent/tweet?text=${args.uriEncodedName}&url=${protocol}${domain}${args.listingRoute}${section}` // eslint-disable-line max-len
    const pinterestHref = `http://www.pinterest.com/pin/create/button/?url=${protocol}${domain}${args.listingRoute}${section}&media=${args.imageURL}-&description=${args.uriEncodedName}` // eslint-disable-line max-len
    const emailHref = `mailto:?subject=${args.uriEncodedName}&body=${args.uriEncodedName}%0D%0A%0D%0A${protocol}${domain}${args.listingRoute}${section}` // eslint-disable-line max-len
    const smsHref = `sms:?&body=${args.uriEncodedName}%0D%0A%0D%0A${protocol}${domain}${args.listingRoute}${section}` // eslint-disable-line max-len
    const androidSmsHref = `sms:?&body=${args.androidUriEncodedName}%250D%250A%250D%250A${androidProtocol}${domain}${args.androidListingRoute}${androidSection}` // eslint-disable-line max-len
    sharePropSection.expect.element('@shareFacebook').to.be.visible.after(0)
    sharePropSection.expect.element('@shareFacebook').attribute('href')
      .to.equal(facebookHref)
    sharePropSection.expect.element('@shareTwitter').to.be.visible.after(0)
    sharePropSection.expect.element('@shareTwitter').attribute('href')
      .to.equal(twitterHref)
    sharePropSection.expect.element('@sharePinterest').to.be.visible.after(0)
    sharePropSection.expect.element('@sharePinterest').attribute('href')
      .to.equal(pinterestHref)
    sharePropSection.expect.element('@shareEmail').to.be.visible.after(0)
    sharePropSection.expect.element('@shareEmail').attribute('href')
      .to.equal(emailHref)
    sharePropSection.expect.element('@shareSms').to.be.visible.after(0)
    if (mobileDeviceType === 'android') {
      sharePropSection.expect.element('@shareSms').attribute('href')
        .to.equal(androidSmsHref)
    } else {
      sharePropSection.expect.element('@shareSms').attribute('href')
        .to.equal(smsHref)
    }
  },
  openLeadForm: (pdpCard, callback) => {
    pdpCard.waitForElementVisible('@headerEmailLeadButton')
      .click('@headerEmailLeadButton').waitForElementVisible('@emailLeadForm', callback)
  },

  validateHelpfulLinks: (pdp, browser, url) => {
    const managementCoWebsiteText = 'Visit the property\'s management website'
    const cityStateText = 'Find more Yakutat Alaska apartments.'
    const managementCoProperties = 'See other Yakutat Super Management610 properties in your area.'

    pdp.expect.element('@managementCoProperties').text.to.equal(managementCoProperties)
    pdp.getAttribute('@managementCoProperties', 'href', link => {
      pdp.click('@managementCoProperties')
        .waitForURLEquals(link.value)
    })
    browser.back()
      .waitForURLEquals(`${browser.launchUrl}${url}#details`)

    pdp.expect.element('@managementCoWebsite').text.to.equal(managementCoWebsiteText)
    pdp.getAttribute('@managementCoWebsite', 'href', link => {
      pdp.click('@managementCoWebsite')
        .waitForURLEquals(link.value)
    })
    browser.back()
      .waitForURLEquals(`${browser.launchUrl}${url}#details`)

    pdp.expect.element('@cityStateLink').text.to.equal(cityStateText)
    pdp.getAttribute('@cityStateLink', 'href', link => {
      pdp.click('@cityStateLink')
        .waitForURLEquals(link.value)
    })
    browser.back()
      .waitForURLEquals(`${browser.launchUrl}${url}#details`)
  },

  validateInformationHeader: pdp => {
    const header = 'Helpful Information'
    pdp.getLocationInView(('@cityStateLink'), () => {
      pdp.expect.element('@informationHeader').to.be.visible.before(1000)
      pdp.expect.element('@informationHeader').text.to.equal(header)
    })
  },
}

module.exports = {
  elements: {
    itemTypeSchema: 'body [itemType="http://schema.org/WebPage"]',
    unsavedHeart: '[data-tag_selection=save] use',
    savedHeart: '[data-tag_selection=saved] use',
    closeButton: '[data-test-id=closeModal]',
    metaPropertyName: 'meta[itemprop=name]',
    metaPhoneNumber: 'meta[itemprop=telephone]',
    propertyName: 'h1[itemprop=name]',
    propertyAddress: '[itemprop=address]',
    addressStreet: '[itemprop=streetAddress]',
    addressLocality: '[itemprop=addressLocality]',
    addressZip: '[itemprop=postalCode]',
    addressState: '[itemprop=addressRegion]',
    propertyPriceRange: '[data-test-id=listing-price-plus]',
    propertyBedsRange: '[data-test-id=listing-bed-range]',
    metaLatitude: 'meta[itemprop=latitude]',
    metaLongitude: 'meta[itemprop=longitude]',
    headerCallButton: '[data-tag_selection=phone]',
    headerEmailLeadButton: '[data-tag_item=check_availability_button]',
    staticMapImage: '[data-test-id=static-map]',
    photosButton: '[data-test-id=pdp-photos-button]',
    photosButtonImage: '[data-test-id=pdp-photos-button] img',
    cityStateLink: '[data-test-id=city-state-link]',
    managementCoDescription: '[data-test-id=mgt-co-description]',
    managementCoProperties: '[data-test-id=management-company-properties]',
    managementCoWebsite: '[data-test-id=management-company-website]',
    informationHeader: '[data-test-id=pdp-details-helpful-information-heading]',
    mapButton: '[data-test-id=pdp-map-button]',
    mapButtonImage: '[data-test-id=pdp-map-button] img',
    reviewsButton: '[data-test-id=pdp-reviews-button]',
    reviewsButtonImage: '[data-test-id=pdp-reviews-button] img',
    detailsButton: '[data-test-id=pdp-details-button]',
    detailsButtonImage: '[data-test-id=pdp-details-button] img',
    floorPlansButton: '[data-test-id=pdp-floor-plans-button]',
    floorPlansButtonImage: '[data-test-id=pdp-floor-plans-button] img',
    shareButton: '[data-test-id=pdp-share-button]',
    shareButtonImage: '[data-test-id=pdp-share-button] img',
    emailLeadForm: '[data-tag_section=lead_submission_form]',
    firstTabButton: {
      selector: `${tabButtonXPath}[1]`,
      locateStrategy: 'xpath',
    },
    secondTabButton: {
      selector: `${tabButtonXPath}[2]`,
      locateStrategy: 'xpath',
    },
    thirdTabButton: {
      selector: `${tabButtonXPath}[3]`,
      locateStrategy: 'xpath',
    },
    fourthTabButton: {
      selector: `${tabButtonXPath}[4]`,
      locateStrategy: 'xpath',
    },
    fifthTabButton: {
      selector: `${tabButtonXPath}[5]`,
      locateStrategy: 'xpath',
    },
    sixthTabButton: {
      selector: `${tabButtonXPath}[6]`,
      locateStrategy: 'xpath',
    },
  },
  sections: {
    photos: {
      selector: '[data-test-id=pdp-photos]',
      elements: {
        photoGalleryCoupon: '[data-test-id=pdp-photos-coupon]',
        photoGalleryImage: '.image-gallery-slide.center [data-tag_item=image]',
        photoGalleryPrev: '[data-tag_item=left_arrow]',
        photoGalleryNext: '[data-tag_item=right_arrow]',
        photoGalleryImageCounter: '.image-gallery-index',
      },
    },
    reviews: {
      selector: '[data-test-id=pdp-reviews]',
      elements: {
        reviewStars: '[data-tag_item=stars]',
        rateWithStarsLabel: '[data-test-id=pdp-reviews-rate-with-stars-label]',
      },
    },
    details: {
      selector: '[data-test-id=pdp-details]',
      elements: {
        officeHoursHeading: '[data-test-id=pdp-office-hours-heading]',
        officeHoursTodayStatus: '[data-test-id=pdp-office-hours-today-status]',
        officeHoursTimeRange: '[data-test-id=pdp-office-hours-time-range]',
        couponHeading: '[data-test-id=pdp-details-coupon-heading]',
        couponDetails: '[data-test-id=pdp-details-coupon-details]',
        toggleHours: '[data-test-id=pdp-office-hours-toggle]',
        allHoursTable: '[data-test-id=pdp-all-office-hours]',
        descriptionHeading: '[data-test-id=pdp-details-description-heading]',
        descriptionDetails: '[itemProp=description]',
        movingResourcesHeading: '[data-test-id=pdp-details-moving-resources-heading]',
        adContainer: '[data-test-id=gpt_ka_ad_top]',
        amenities: '[data-test-id=pdp-amenities]',
        petsHeading: '[data-test-id=pdp-amenities-pets-heading]',
        apartmentFeaturesHeading: '[data-test-id=pdp-amenities-apartment-features-heading]',
        communityFeaturesHeading: '[data-test-id=pdp-amenities-community-features-heading]',
        specialFeaturesHeading: '[data-test-id=pdp-amenities-special-features-heading]',
        additionalFeaturesHeading: '[data-test-id=pdp-amenities-additional-features-heading]',
      },
    },
    floorPlans: {
      selector: '[data-test-id=pdp-floor-plans]',
      elements: {
        floorPlan: '[data-test-id=pdp-floor-plans-floor-plan]',
      },
    },
    shareProperty: {
      selector: '[data-tag_section=share_property]',
      elements: {
        closeButton: '[data-tag_item=x]',
        shareFacebook: '[data-tag_item=facebook]',
        shareTwitter: '[data-tag_item=twitter]',
        sharePinterest: '[data-tag_item=pinterest]',
        shareEmail: '[data-tag_item=email]',
        shareSms: '[data-tag_item=text]',
      },
    },
  },
  commands: [propertyCardCommands],
}
