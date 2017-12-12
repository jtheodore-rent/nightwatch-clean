const apartmentElementXPath = "//div[@data-test-id='Apartment-Features']"
const specialElementXPath = "//div[@data-test-id='Special-Features']"
const communityElementXPath = "//div[@data-test-id='Community-Features']"
const additionalElementXPath = "//div[@data-test-id='Additional-Features']"
const floorplanXPath = "//div[@data-test-id='floorplan-row']"
const certifiedReviewXPath =
  "//div[@data-test-id='review' and .//div[@data-test-id='certified']]"
const pdpCommands = {
  validateSectionTitle: (pdp, sectionName, sectionTitle) => {
    pdp.section[sectionName].expect.element('@name').to.be.visible.after(0)
    pdp.section[sectionName].expect.element('@name').text.to.equal(sectionTitle)
  },
  validatePropName: (pdp, propName) => {
    pdp.expect.element('@propertyName').to.be.visible.after(0)
    pdp.expect.element('@propertyName').text.to.equal(propName)
  },
  validateSectionPropName: (pdp, propName) => {
    pdp.section.propertyDetails.expect.element('@propertyDetailsName').to.be.visible.after(0)
    pdp.section.propertyDetails.expect.element('@propertyDetailsName').text.to.equal(propName)
  },
  validateLeaseTerm: (pdp, sectionName, leaseTerms) => {
    pdp.section[sectionName].expect.element('@leaseTerms').to.be.visible.after(0)
    pdp.section[sectionName].expect.element('@leaseTerms').text.to.equal(leaseTerms)
  },
  validatePhonePropSection: (pdp, sectionName, phoneNumber) => {
    pdp.section[sectionName].expect.element('@phoneNumber').to.be.visible.after(0)
    pdp.section[sectionName].expect.element('@phoneNumber')
      .text.to.equal(phoneNumber)
  },
  validatePrice: pdp => {
    pdp.expect.element('@priceRange').text.to
      .match(/^Please Call$|^From \$\d+$|^To \$\d+$|^\$\d+–\$\d+$/)
  },
  validateAddress: (pdp, address) => {
    pdp.expect.element('@address').text.to.equal(address)
  },
  validatePhone: (pdp, phone) => {
    pdp.expect.element('@phone').text.to.equal(phone)
  },
  validateLifestyles: (pdp, lifestyles) => {
    pdp.expect.element('@lifestyles').text.to.equal(lifestyles)
  },
  validateAvailability: pdp => {
    pdp.click('@headerAvailability').expect.element('@leadFormModal')
      .to.be.visible.after(0)
    pdp.click('@closeLeadFormModal')
      .waitForElementNotPresent('@leadFormModal')
  },
  validateHeart: pdp => {
    pdp.expect.element('@heart').to.be.visible.after(0)
  },
  validateRatings: pdp => {
    pdp.expect.element('@ratings').to.be.visible.after(0)
    pdp.click('@ratings')
      .expect.element('@ratingsSection').to.be.visible.after(0)
  },
  validateAmenitiesHeader: (pdp, name) => {
    pdp.getLocationInView(('@amenitiesSection'), () => {
      pdp.section.amenitiesSection.expect.element('@header').to.be.visible.after(0)
      pdp.section.amenitiesSection.expect.element('@header').text.to.equal(name)
    })
  },
  ValidateFeatureHeader: (feature, header) => {
    feature.expect.element('@h2').text.to.equal(header)
  },
  verifyFeaturesCountNotExceedFour: (pdp, element) => {
    pdp.expect.element(element).not.to.be.present.after(0)
  },
  validateAmenitiesShowHide: pdp => {
    pdp.click('@showHideFeatures')
      .expect.element('@showHideFeatures').text.to.equal('Hide')
    pdp.click('@showHideFeatures')
      .expect.element('@showHideFeatures').text.to.equal('View More')
  },
  validateRatingsStarClick: (pdp, browser) => {
    const url = '/apartments/Alaska/Yakutat/The-Grand-at-Dunwoody/100022110/Reviews/new/?rating=3'
    pdp.click('@reviewStars')
      .waitForURLEquals(`${browser.launchUrl}${url}`)
  },
  validateInformationHeader: pdp => {
    const header = 'Helpful Information'
    pdp.getLocationInView(('@cityStateLink'), () => {
      pdp.expect.element('@informationHeader').to.be.visible.after(0)
      pdp.expect.element('@informationHeader').text.to.equal(header)
    })
  },
  validateLeadFormSubmit: pdp => {
    pdp.setValue('@leadFormName', 'NWTest')
    pdp.setValue('@leadFormEmail', 'NWtest@test.com')
    pdp.click('@sendButton', () => {
      pdp.expect.element('@leadSuccessModal').to.be.visible.before(1000)
    })
  },
  validateHelpfulLinks: (pdp, browser) => {
    const managementCoWebsiteText = 'Visit the property\'s management website'
    const cityStateText = 'Find more Yakutat Alaska apartments.'
    const managementCoProperties = 'See other Yakutat Super Management610 properties in your area.'
    const url = '/apartments/Alaska/Yakutat/The-Grand-at-Merrimack-Student-Living/100022032/'

    pdp.expect.element('@managementCoProperties').text.to.equal(managementCoProperties)
    pdp.getAttribute('@managementCoProperties', 'href', link => {
      pdp.click('@managementCoProperties')
        .waitForURLEquals(link.value)
    })
    browser.back()
      .waitForURLEquals(`${browser.launchUrl}${url}`)

    pdp.expect.element('@managementCoWebsite').text.to.equal(managementCoWebsiteText)
    pdp.getAttribute('@managementCoWebsite', 'href', link => {
      pdp.click('@managementCoWebsite')
        .waitForURLEquals(link.value)
    })
    browser.back()
      .waitForURLEquals(`${browser.launchUrl}${url}`)

    pdp.expect.element('@cityStateLink').text.to.equal(cityStateText)
    pdp.getAttribute('@cityStateLink', 'href', link => {
      pdp.click('@cityStateLink')
        .waitForURLEquals(link.value)
    })
    browser.back()
      .waitForURLEquals(`${browser.launchUrl}${url}`)
  },
  closePDPTab: (browser, pauseTimeInMS) => {
    const pauseDuration = pauseTimeInMS || 0
    browser.pause(pauseDuration).closeWindow(() => {
      browser.windowHandles(windowResult => {
        const handle = windowResult.value[0]
        browser.switchWindow(handle)
      })
    })
  },

  validateCheckAvailabilityButton: (browser, sectionName, leadtitle) => {
    const pdp = browser.page.large.pdp()
    pdp.section[sectionName].getLocationInView('@leadButton').click('@leadButton', () => {
      if (leadtitle) {
        pdp.section.leadFormModal.waitForElementVisible('@leadFormPropName')
        pdp.section.leadFormModal.expect.element('@leadFormPropName')
        .text.to.equal(leadtitle)
        pdp.section.leadFormModal.waitForElementVisible('@header')
          .waitForElementVisible('@closeButton').click('@closeButton')
      } else {
        pdp.section.leadFormModal.waitForElementVisible('@header')
          .waitForElementVisible('@closeButton').click('@closeButton')
      }
    })
  },

  validateFirstFloorplanOpensMatchingModal: browser => {
    const pdp = browser.page.large.pdp()

    pdp.section.amenitiesSection.getLocationInView('@petsSection', () => {
      pdp.section.floorplans.getText('@firstFloorplanName', firstFloorplanName => {
        const floorplanName = firstFloorplanName.value
        pdp.section.floorplans.click('@firstFloorplan', () => {
          pdp.waitForElementVisible('@floorplanModal')
            .section.floorplanModal.expect.element('@name').text
              .to.equal(floorplanName).before(5000)
        })
      })
    })
  },

  validateFloorplanLeadFormDefaultMessage: browser => {
    const pdp = browser.page.large.pdp()

    pdp.section.amenitiesSection.getLocationInView('@petsSection', () => {
      pdp.section.floorplans.getText('@firstFloorplanName', firstFloorplanName => {
        const floorplanName = firstFloorplanName.value
        const message = 'Hello,\n\n' +
             `I'm interested in the ${floorplanName} floor plan at The Grand at Dunwoody.` +
             ' Please send me current availability and additional details.\n\n' +
             'Thanks.'
        pdp.section.floorplans.click('@firstFloorplan', () => {
          pdp.waitForElementVisible('@floorplanModal')
            .section.floorplanModal.expect.element('@messageTextArea').text
              .to.equal(message).before(5000)
        })
      })
    })
  },

  validateIncomeRestrictions: (browser, incomeRestrictions) => {
    const pdp = browser.page.large.pdp()
    incomeRestrictions.forEach((restriction, i) => {
      pdp.expect.element(`[data-test-id=affordable-housing-occupants-${i}]`)
        .text.to.equal(restriction.maxOccupants).before(6000)
      pdp.expect.element(`[data-test-id=affordable-housing-income-${i}]`)
        .text.to.equal(restriction.maxAnnualIncome).before(6000)
    })
  },
}
module.exports = {
  elements: {
    slideshowButton: '[data-test-id=slideshow-button]',
    videoButton: '[data-test-id=video-button]',
    videoModal: '[data-test-id=hd-video-modal]',
    tourButton: '[data-test-id=tour-button]',
    tourModal: '[data-test-id=hd-tour-modal]',
    breadcrumbs: '[data-test-id=breadcrumbs]',
    floorplanSection: '#scrollToID__floorplans_and_pricing',
    header: '[data-test-id=property-details-header]',
    propertyName: '[data-test-id=property-title]',
    priceRange: '[data-test-id=price-range]',
    address: '[data-test-id=address]',
    closeLeadFormModal: '[data-test-id=lead-modal] [data-test-id=closeModal]',
    floorplanModal: '[data-test-id=floorplan-modal]',
    leadFormModal: '[data-test-id=lead-modal]',
    headerAvailability: '[data-test-id=header-availability]',
    phone: '[data-test-id=header-phone]',
    heart: '[data-test-id=my_places_save]',
    lifestyles: '[data-test-id=lifestyles-text]',
    ratings: '[data-test-id=ratings-link]',
    ratingsSection: '[data-test-id=ratings-reviews-section]',
    amenitiesSection: '[data-test-id=amenities-section]',
    showHideFeatures: '[data-test-id=show-hide-features]',
    reviewStars: '[data-test-id=review-stars]',
    cityStateLink: '[data-test-id=city-state-link]',
    managementCoProperties: '[data-test-id=management-company-properties]',
    managementCoWebsite: '[data-test-id=management-company-website]',
    managementCoDescription: '[data-test-id=mgt-co-description]',
    informationHeader: '[data-test-id=information-section] h2',
    helpfulPhone: '[data-test-id=helpful-phone-number]',
    firstCarouselImage: '[data-test-id=background-image-0]',
    pdpHeaderLogo: '[data-test-id=pdp-ag-logo]',
    sendButton: '[data-test-id=modal] [data-test-id=send-button]',
    leadFormValidation: '[data-test-id=modal] [data-test-id=lead-form-validation]',
    leadFormName: '[data-test-id=modal] [data-test-id=lead-form-name]',
    leadFormEmail: '[data-test-id=modal] [data-test-id=lead-form-email]',
    leadSuccessModal: '[data-test-id=lead-success-modal]',
    portfolioPromoter: '[data-test-id=portfolio-promoter]',
    mapSection: '[data-test-id=map-lazy-load]',
    outOfBoundsApartmentFeature: {
      selector: `(${apartmentElementXPath})[4]`,
      locateStrategy: 'xpath',
    },
    outOfBoundsSpecialFeature: {
      selector: `(${specialElementXPath})[4]`,
      locateStrategy: 'xpath',
    },
    outOfBoundsCommunityFeature: {
      selector: `(${communityElementXPath})[4]`,
      locateStrategy: 'xpath',
    },
    outOfBoundsAdditionalFeature: {
      selector: `(${additionalElementXPath})[4]`,
      locateStrategy: 'xpath',
    },
    recommendedProperties: '[data-test-id=recommended-properties]',
  },
  sections: {
    imageCarousel: {
      selector: '[data-test-id=image-carousel]',
      elements: {
        image1: '[data-test-id=background-image-0]',
        image2: '[data-test-id=background-image-1]',
        nextArrow: '[data-test-id=next]',
        previousArrow: '[data-test-id=prev]',
        imageIndex: '[data-test-id=image-index]',
        imageCount: '[data-test-id=image-count]',
        imageCounter: '[data-test-id=listing-tile-carousel-counter]',
        dfpAdSlots: '[data-test-id=dfp-ad-slots]',
      },
    },
    photoModal: {
      selector: '[data-test-id=modal]',
      elements: {
        carousel: '[data-test-id=carouselWrapper]',
        closeButton: '[data-test-id="closeModal"]',
        image1: '[data-test-id=background-image-0]',
        image2: '[data-test-id=background-image-1]',
        nextArrow: '[data-test-id=next]',
        previousArrow: '[data-test-id=prev]',
        imageIndex: '[data-test-id=image-index]',
        imageCount: '[data-test-id=image-count]',
        leadFormWrapper: '[data-test-id=lead-form-wrapper]',
      },
    },
    amenitiesSection: {
      selector: '[data-test-id=amenities-section]',
      elements: {
        header: 'h2',
        petsSection: '[data-test-id=pdp-amenities-pets-section]',
        petsHeader: '[data-test-id=pdp-amenities-pets-heading]',
        firstPetPolicy: {
          selector: "//div[@data-test-id='pet-policy'][1]",
          locateStrategy: 'xpath',
        },
        leadButton: '[data-test-id=check-availability-button]',
      },
    },
    firstReview: {
      selector: "//div[@data-test-id='review'][1]",
      locateStrategy: 'xpath',
      elements: {
        flag: '[data-test-id=pdp-review-flagged]',
        reportButton: '[data-test-id=pdp-review-report-button]',
        date: '[data-test-id=review-date]',
        text: '[data-test-id=review-text]',
      },
    },
    reviews: {
      selector: '[data-test-id=ratings-reviews-section]',
      elements: {
        firstCertifiedReview: {
          selector: `${certifiedReviewXPath}[1]`,
          locateStrategy: 'xpath',
        },
        firstCertifiedBadge: {
          selector: "//div[@data-test-id='certified'][1]",
          locateStrategy: 'xpath',
        },
        fifthReview: {
          selector: "(//div[@data-test-id='review'])[5]",
          locateStrategy: 'xpath',
        },
        sixthReview: {
          selector: "(//div[@data-test-id='review'])[6]",
          locateStrategy: 'xpath',
        },
        certifiedResidentTooltip: '[data-test-id=certified-resident-tooltip]',
        leadButton: '[data-test-id=check-availability-button]',
        loadMoreButton: '[data-test-id=load-more-button]',
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
    leadFormSidebar: {
      selector: '[data-test-id=lead-form-sidebar]',
      elements: {
        phone: '[data-test-id=phone]',
        officeHours: '[data-test-id=office-hours]',
        leadFormWrapper: '[data-test-id=lead-form-wrapper]',
      },
    },
    leadFormModal: {
      selector: '[data-test-id=lead-modal]',
      elements: {
        header: 'h3',
        leadFormPropName: '[data-test-id=lead-form-propertyname]',
        closeButton: '[data-test-id=closeModal]',
      },
    },
    propertyDetails: {
      selector: '[data-test-id=property-details]',
      elements: {
        name: '[data-test-id=property-details-title]',
        propertyDetailsName: '[data-test-id=property-details-name]',
        leadButton: '[data-test-id=check-availability-button]',
        leaseTerms: '[data-test-id=leasing-terms]',
        phoneNumber: '[data-test-id=phone-number]',
      },
    },
    schools: {
      selector: '[data-test-id=schools-section]',
      elements: {
        leadButton: '[data-test-id=check-availability-button]',
      },
    },
    floorplans: {
      selector: '[data-test-id=floorplans-and-pricing]',
      elements: {
        firstFloorplan: {
          selector: `(${floorplanXPath})[1]`,
          locateStrategy: 'xpath',
        },
        firstFloorplanName: {
          selector: `(${floorplanXPath}//div[@data-test-id='name'])[1]`,
          locateStrategy: 'xpath',
        },
        couponHeading: '[data-test-id=pdp-details-coupon-heading]',
        leadButton: '[data-test-id=check-availability-button]',
      },
    },
    floorplanModal: {
      selector: '[data-test-id=floorplan-modal]',
      elements: {
        name: '[data-test-id=floorplan-name]',
        messageTextArea: 'textarea#message',
        closeButton: '[data-test-id=closeModal]',
      },
    },
    apartmentFeatures: {
      selector: '[data-test-id=Apartment-Features]',
      elements: {
        h2: 'h2',
        ul: 'ul',
      },
    },
    specialFeatures: {
      selector: '[data-test-id=Special-Features]',
      elements: {
        h2: 'h2',
        ul: 'ul',
      },
    },
    communityFeatures: {
      selector: '[data-test-id=Community-Features]',
      elements: {
        h2: 'h2',
        ul: 'ul',
      },
    },
    additionalFeatures: {
      selector: '[data-test-id=Additional-Features]',
      elements: {
        h2: 'h2',
        ul: 'ul',
      },
    },
    map: {
      selector: '[data-test-id=map-section]',
      elements: {
        heading: 'h2',
        canvas: '[data-test-id=mapbox-container]',
        phone: '[data-test-id=phone-number]',
        leadButton: '[data-test-id=check-availability-button]',
      },
    },
    officeHours: {
      selector: '[data-test-id=office-hours-section]',
      elements: {
        heading: 'h2',
        status: '[data-test-id=pdp-office-hours-today-status]',
        viewAllToggle: '[data-test-id=pdp-office-hours-toggle]',
        allHours: '[data-test-id=pdp-all-office-hours]',
        phone: '[data-test-id=phone-number]',
        leadButton: '[data-test-id=check-availability-button]',
      },
    },
    videoModal: {
      selector: '[data-test-id=hd-video-modal]',
      elements: {
        videoIframe: 'iframe',
        closeButton: '[data-test-id=closeModal]',
      },
    },
    tourModal: {
      selector: '[data-test-id=hd-tour-modal]',
      elements: {
        tourIframe: 'iframe',
        closeButton: '[data-test-id=closeModal]',
      },
    },
  },
  commands: [pdpCommands],
}
