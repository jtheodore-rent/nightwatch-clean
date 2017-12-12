const range = require('lodash/range')

const listingElementXPath = "(//div[@data-test-id='standard-listing'])"
const listingWithRatingsXPath =
  "//div[@data-test-id='standard-listing' and //div[@data-test-id='ratings']]"
const listingElements = {
  content: 'div',
  name: 'a[data-tag_item=property_title]',
  imageContainer: 'div[data-test-id=carousel-overlay]',
  image0: '[data-test-id=background-image-0]',
  image1: '[data-test-id=background-image-1]',
  image2: '[data-test-id=background-image-2]',
  address: '[data-test-id=listing-tile-address] span',
  price: '[data-test-id=listing-tile-price]',
  neighborhoodsContainer: '[data-test-id=neighborhoods-container]',
  detailsContainer: '[data-test-id=listing-details-container]',
  availability: '[data-test-id=listing-tile-available-info]',
  floorplanLink: 'a[data-test-id=floorplan-link]',
  floorplanSection: '[data-test-id=floorplans-and-pricing]',
  floorplanText: '[data-test-id=floorplan-text]',
  specials: 'span[data-tag_item=current_rent_specials]',
  couponLink: 'span[data-tag_item=coupon]',
  phone: '[data-test-id=listing-tile-phone]',
  next: '[data-test-id=next]',
  previous: '[data-test-id=prev]',
  nextSpotlight: '[data-tag_item=right_arrow]',
  previousSpotlight: '[data-tag_item=left_arrow]',
  counter: '[data-test-id=listing-tile-carousel-counter]',
  imageIndex: '[data-test-id=image-index]',
  heart: '[data-tag_item=my_places_save]',
  saveHeartIcon: '[data-test-id=save-heart-icon-list]',
  feature: '[data-test-id=listing-tile-feature]',
  checkAvailabilityButton: '[data-tag_item=check_availability_button]',
  oneBedFilter: "[data-test-id='1-bed']",
  twoBedsFilter: "[data-test-id='2-beds']",
  schemaRatingValue: '[itemprop=aggregateRating] [itemprop=ratingValue]',
  schemaWorstRating: '[itemprop=aggregateRating] [itemprop=worstRating]',
  schemaBestRating: '[itemprop=aggregateRating] [itemprop=bestRating]',
  schemaReviewCount: '[itemprop=aggregateRating] [itemprop=reviewCount]',
  schemaImageUrl: '[itemprop=image] [itemprop=contentURL]',
  schemaImageCaption: '[itemprop=image] [itemprop=caption]',
  schemaStreetAddress: '[itemprop=address] [itemprop=streetAddress]',
  schemaAddressLocality: '[itemprop=address] [itemprop=addressLocality]',
  schemaAddressRegion: '[itemprop=address] [itemprop=addressRegion]',
  schemaPostalCode: '[itemprop=address] [itemprop=postalCode]',
  ratings: '[data-test-id=ratings]',
  seeAllReviewsLink: '[data-test-id=see-all-reviews-link]',
  freshPill: '[data-test-id=Fresh-pill]',
  featuredPill: '[data-test-id=Featured-pill]',
  airConAmenity: '[data-test-id=listing-tile-feature][title="Air Conditioning"]',
  washerDryerAmenity: '[data-test-id=listing-tile-feature][title="Washer & Dryer Connections"]',
  petsAmenity: '[data-test-id=listing-tile-feature][title="Pets OK"]',
  fitnessAmenity: '[data-test-id=listing-tile-feature][title="Fitness Center"]',
  wifiAmenity: '[data-test-id=listing-tile-feature][title="High Speed Internet Access"]',
  hardwoodAmenity: '[data-test-id=listing-tile-feature][title="Hardwood Flooring"]',
  poolAmenity: '[data-test-id=listing-tile-feature][title="Swimming Pool"]',
  dishwasherAmenity: '[data-test-id=listing-tile-feature][title="Dishwasher"]',
  balconyAmenity: '[data-test-id=listing-tile-feature][title="Balcony"]',
  garageAmenity: '[data-test-id=listing-tile-feature][title="Garage"]',
  lifestyleBanner: '[data-test-id=lifestyle-banner]',
  bed: '[data-test-id=bed-links]',
  cost: '[data-test-id=cost-links]',
  features: '[data-test-id=features-links]',
  propertyType: '[data-test-id=property-type-links]',
}

const validateApartmentTypes = (browser, link, parameter) => {
  browser.page.large.listSearch().moveToElement('@findApartments', 10, 10, () => {
    browser.page.large.listSearch().expect.element('@byApartmentTypes').to.be.visible.after(0)
    browser.page.large.listSearch().click('@byApartmentTypes')
    browser.page.large.listSearch().waitForElementVisible('@modalApartmentTypeLinks')
    browser.page.large.listSearch().click(link)
      .waitForURLEquals(`${browser.launchUrl}${parameter}`)
    browser.back()
  })
}

const listSearchCommands = {
  validateListingDetails: (listing, state, simpleListingStyle) => {
    listing.expect.element('@name').text.to.match(/\w+/)
    const addressRegExp = new RegExp(`([A-Za-z]*), ${state} \\d{5}`)
    listing.expect.element('@address').text.to.match(addressRegExp)
    const plusRegExp = /\$(\d{1,3},\d{1,3}|\d{1,3})\+/
    listing.expect.element('@price').text.to.match(plusRegExp)
    listing.expect.element('@heart').to.be.visible.after(0)
    if (!simpleListingStyle) {
      listing.expect.element('@availability').to.be.visible.after(0)
      listing.expect.element('@specials').to.be.visible.after(0)
      listing.expect.element('@phone').text.to.match(/\(\d{3}\) \d{3}-\d{4}/)
      listing.expect.element('@image0').to.be.visible.after(0)
      listing.expect.element('@feature').to.be.visible.after(0)
    }
  },
  validateNewTabLink: (browser, topElement, linkElement, test) => {
    topElement.getAttribute(linkElement, 'href', link => {
      topElement.click(linkElement)
      browser.windowHandles(windowResult => {
        windowResult.value.forEach(newWindow => {
          browser.url(urlResult => {
            if (!urlResult.value.match(link.value)) {
              browser.switchWindow(newWindow)
            }
          })
        })
        test(link)
      })
    })
  },
  validateFloorplanLink: (browser, listing) => {
    browser.page.large.listSearch().validateNewTabLink(browser, listing, '@floorplanLink', () => {
      const pdp = browser.page.large.pdp()
      pdp.expect.element('@floorplanSection').to.be.visible()
    })
  },
  validateImageSlideshowClicks: listing => {
    listing.click('@next', () => {
      listing.expect.element('@imageIndex').text.to.equal('2')
      listing.click('@previous', () => {
        listing.expect.element('@imageIndex').text.to.equal('1')
      })
    })
  },
  validateCheckAvailabilityButtonClick: (listing, browser) => {
    const leadForm = browser.page.large.emailLeadForm().section.leadFormContainer
    listing.click('@checkAvailabilityButton', () => {
      leadForm.waitForElementVisible('@emailInput')
      leadForm.click('@closeModal').waitForElementNotPresent('@emailInput')
    })
  },
  validateElementClickToPDPAndCloseTab: (browser, listing, elementToClick) => {
    listing.getText('@name', listingNamePackage => {
      const listingName = listingNamePackage.value
      listing.getText('@phone', listingPhonePackage => {
        const listingPhone = listingPhonePackage.value
        browser.page.large.listSearch().validateNewTabLink(browser, listing, elementToClick, () => {
          const pdp = browser.page.large.pdp()
          pdp.waitForElementVisible('@propertyName', () => {
            pdp.expect.element('@propertyName').text.to.equal(listingName)
            pdp.section.leadFormSidebar.expect.element('@phone')
              .text.to.equal(listingPhone)
            pdp.closePDPTab(browser, 1000)
          })
        })
      })
    })
  },
  validateSimpleSpotlightElementClickToPDPAndCloseTab: (browser, listing, elementToClick) => {
    listing.getText('@name', listingNamePackage => {
      const listingName = listingNamePackage.value
      browser.page.large.listSearch().validateNewTabLink(browser, listing, elementToClick, () => {
        const pdp = browser.page.large.pdp()
        pdp.waitForElementVisible('@propertyName', () => {
          pdp.expect.element('@propertyName').text.to.equal(listingName)
          pdp.closePDPTab(browser, 1000)
        })
      })
    })
  },

  validateFeaturedCommunityName: (browser, listing, elementToClick) => {
    listing.getText('@name', listingNamePackage => {
      const listingName = listingNamePackage.value
      browser.page.large.listSearch().validateNewTabLink(browser, listing, elementToClick, () => {
        const pdp = browser.page.large.pdp()
        pdp.waitForElementVisible('@propertyName', () => {
          pdp.expect.element('@propertyName').text.to.equal(listingName)
        })
      })
    })
  },

  validateListingHref: (listing, launchUrl, state) => {
    listing.getText('@name', result => {
      // Split this out into a utility function
      const listingNameUrl = result.value
        .replace(/\s+/g, '-')
        .replace(/&/g, '~')
      listing.getText('@address', resultAddress => {
        const cityStateNeighborhood = resultAddress.value
          .substr(resultAddress.value.indexOf(',') + 2)
        const addressCity = cityStateNeighborhood
          .substr(0, cityStateNeighborhood.indexOf(',')).replace(/\s+/g, '-')
        listing.getAttribute('@content', 'data-tag_listing_id', resultId => {
          const listingId = resultId.value
          const listingRoute = `${addressCity}/${listingNameUrl}/${listingId}`
          listing.expect.element('@name').attribute('href').to
            .equal(`${launchUrl}/apartments/${state}/${listingRoute}/`)
        })
      })
    })
  },
  validateCollegeSearch: browser => {
    validateApartmentTypes(browser, '@collegeApartments', '/college/')
  },
  validateMilitarySearch: browser => {
    validateApartmentTypes(browser, '@militaryApartments', '/military/')
  },
  validateCorporateSearch: browser => {
    validateApartmentTypes(browser, '@corporateApartments', '/corporate/')
  },
  validateSeniorSearch: browser => {
    validateApartmentTypes(browser, '@seniorApartments', '/senior/')
  },
  validateAverageBedroomPrices: browser => {
    browser.elements('css selector', '[data-test-id=average-bedroom-prices] li', results => {
      results.value.forEach(li => {
        browser.elementIdText(li.ELEMENT, element => {
          browser.expect(element.value).to.match(/(Studio|\d bedrooms?): \$\d+/)
        })
      })
    })
  },
  setupBasicFilters: (browser, cityStateUrl) => {
    const urlParams = '2-beds-from-500-under-1500-1z141y8/'
    browser.page.large.listSearch().click('@bedsFilter')
      .waitForElementVisible('@secondBedFilter')
      .click('@secondBedFilter')
      .waitForElementVisible('@bedroomPill', () => {
        browser.pause(500).page.large.listSearch().click('@priceFilter')
        .waitForElementVisible('@priceLowValue', () => {
          browser.pause(500).page.large.listSearch().click('@priceLowValue')
          .waitForElementVisible('@priceLowPill', () => {
            browser.pause(500).page.large.listSearch().waitForElementVisible('@priceHighValue')
            .click('@priceHighValue').waitForElementVisible('@priceHighPill', () => {
              browser.page.large.listSearch().click('@searchButton')
                .waitForURLEquals(`${browser.launchUrl}${cityStateUrl}${urlParams}`)
            })
          })
        })
      })
  },
  validateBasicFilters: (browser, listing, url) => {
    const parameters = '2-beds-from-500-under-1500-1z141y8/'
    browser.assert.urlEquals(`${browser.launchUrl}${url}${parameters}`)
    listing.expect.element('@availability').to.be.visible.after(0)
    listing.expect.element('@twoBedsFilter').to.be.visible.after(0)
    listing.expect.element('@twoBedsFilter').text.to.equal('2 Beds')
    browser.page.large.listSearch().expect.element('@bedroomPill').to.be.visible.after(0)
  },
  validateBedSearchCriteria: (browser, listing, url) => {
    const parameters = '2-beds-1z141y8/'
    browser.assert.urlEquals(`${browser.launchUrl}${url}${parameters}`)
    listing.expect.element('@availability').to.be.visible.before(1000)
    listing.expect.element('@twoBedsFilter').to.be.visible.before(1000)
    listing.expect.element('@twoBedsFilter').text.to.equal('2 Beds')
    listing.expect.element('@oneBedFilter').to.not.be.present.before(1000)
    browser.page.large.listSearch().expect.element('@bedroomPill').to.be.visible.before(1000)
  },
  verifyFirstListingPlusFormat: (browser, maxPrice) => {
    const listSRP = browser.page.large.listSearch()
    listSRP.section.firstStandardListing.getLocationInView('@name', () => {
      listSRP.section.firstStandardListing.waitForElementPresent('@image0')
      listSRP.section.firstStandardListing.getText('@name', listingName => {
        browser.assert.listingPricePlusFormat(listSRP.section.firstStandardListing,
          maxPrice, listingName.value)
      })
    })
  },
  validateBreadcrumbs: (browser, itemCount) => {
    browser.elements('css selector', '[data-test-id=breadcrumbs] li', results => {
      browser.expect(results.value.length).to.equal(itemCount)
    })
    range(1, itemCount).forEach(count => {
      browser.expect.element(`[data-test-id=breadcrumbs] li:nth-child(${count}) a`)
        .to.be.present.after(0)
    })
    browser.expect.element(`[data-test-id=breadcrumbs] li:nth-child(${itemCount}) span`)
      .to.be.present.after(0)
  },
  validateMapViewUrl: (browser, path) => {
    browser.page.large.listSearch().click('@mapToggle')
    browser.page.large.listSearch().waitForElementVisible('@mapBoxContainer')
    browser.assert.urlEquals(`${browser.launchUrl}${path}`)
  },
  validateClearSort: (browser, cityStateUrl) => {
    const urlParams = '2-beds-1z141y8/'
    browser.page.large.listSearch().click('@bedsFilter')
      .waitForElementVisible('@secondBedFilter')
      .click('@secondBedFilter')
      .waitForElementVisible('@bedroomPill', () => {
        browser.pause(500).page.large.listSearch().click('@searchButton')
          .waitForURLEquals(`${browser.launchUrl}${cityStateUrl}${urlParams}`)
      })
  },
  ValidateBlogElements: blog => {
    const blogLink = '.post_title'
    blog.expect.element('@h2').to.be.visible.before(1000)
    blog.expect.element('@ul').to.be.visible.before(1000)
    blog.getAttribute(blogLink, 'href', link => {
      blog.click(blogLink)
        .waitForURLEquals(link.value.replace('http://', 'https://'))
    })
  },
  validateLinkInModal: (browser, args) => {
    const listSearch = browser.page.large.listSearch()
    const modal = listSearch.section[args.section]
    listSearch.click(args.menu, () => {
      listSearch.click(args.menuItem, () => {
        modal.getAttribute(args.linkName, 'href', link => {
          modal.click(args.linkName)
            .waitForURLEquals(link.value)
        })
        browser.back()
      })
    })
  },
  validateFindApartmentsModal: (
    browser, menuItemElementName, modalElementName, menuItemTitle, containedText
  ) => {
    const listPage = browser.page.large.listSearch()
    listPage.click('@findApartmentsMenu', () => {
      listPage.waitForElementVisible(menuItemElementName, 500, () => {
        listPage.expect.element(menuItemElementName).text.to.equal(menuItemTitle)
        const modalSection = listPage.section[modalElementName]
        modalSection.expect.element('@modal').not.to.be.visible.after(0)
        listPage.click(menuItemElementName, () => {
          modalSection.waitForElementVisible('@modal', () => {
            modalSection.expect.element('@modal')
              .text.to.contain(containedText)
            modalSection.click('@closeModal').waitForElementNotVisible('@modal')
          })
        })
      })
    })
  },
  validateListingMicrodata: listing => {
    listing.expect.element('@schemaWorstRating').attribute('content').to.equal('1.0')
    listing.expect.element('@schemaBestRating').attribute('content').to.equal('5.0')
    listing.expect.element('@schemaImageUrl').attribute('content').to.match(/http.*/)
    listing.expect.element('@schemaImageCaption').attribute('content').to.match(/\S/)
    listing.expect.element('@schemaStreetAddress').text.to.match(/\S/)
    listing.expect.element('@schemaAddressLocality').text.to.match(/\S/)
    listing.expect.element('@schemaAddressRegion').text.to.match(/\S/)
    listing.expect.element('@schemaPostalCode').text.to.match(/\d+/)
  },
  openSortDropdown: (listSRP, callback) => {
    listSRP.click('@sortOuterDiv').waitForElementVisible('@sortDropdown', () => {
      callback()
    })
  },
  sortBy: (browser, listSearchPath, sortOption) => {
    const listSRP = browser.page.large.listSearch()
    const baseURL = `${browser.launchUrl}${listSearchPath}`
    listSRP.openSortDropdown(listSRP, () => {
      if (sortOption.urlRefinement) {
        listSRP.click(`@${sortOption.element}`)
          .waitForURLEquals(`${baseURL}?${sortOption.urlRefinement}`)
      } else {
        listSRP.click(`@${sortOption.element}`).waitForURLEquals(`${baseURL}`)
      }
    })
  },
  searchForValidSpotlight: browser => {
    const listSRP = browser.page.large.listSearch()
    const spotlightProp = listSRP.section.spotlightListing
    const spotlightSelector = spotlightProp.selector
    const floorplanSelector = listingElements.floorplanText
    const phoneSelector = listingElements.phone
    const spotlightFloorplan = `${spotlightSelector} ${floorplanSelector}`
    const spotlightPhone = `${spotlightSelector} ${phoneSelector}`
    browser.elements('css selector', spotlightFloorplan, result => {
      if (result.value.length === 0) {
        browser.refresh()
        listSRP.searchForValidSpotlight(browser)
      } else {
        browser.elements('css selector', spotlightPhone, result2 => {
          if (result2.value.length === 0) {
            spotlightProp.click('@nextSpotlight')
            listSRP.searchForValidSpotlight(browser)
          }
        })
      }
    })
  },
  refreshForSpecificSpotlight: (browser, desiredSpotlightName, tick) => {
    const currentTick = tick || 0
    const listSRP = browser.page.large.listSearch()
    const spotlightProp = listSRP.section.spotlightListing
    spotlightProp.waitForElementVisible('@name').getText('@name', currentSpotlightName => {
      if (currentTick > 20) {
        // eslint-disable-next-line no-console
        console.log('WARNING!!! DESIRED SPOTLIGHT NOT FOUND AFTER 20 ATTEMPTS')
      } else if (currentSpotlightName.value !== desiredSpotlightName) {
        browser.refresh(() => {
          browser.pause(500).page.large.listSearch()
            .refreshForSpecificSpotlight(browser, desiredSpotlightName, currentTick + 1)
        })
      }
    })
  },
  paginateToSpecificFeatured: (browser, desiredFeaturedName, tick) => {
    const currentTick = tick || 0
    const listSRP = browser.page.large.listSearch()
    const featuredListing = listSRP.section.featuredListing
    featuredListing.waitForElementVisible('@name').getText('@name', currentFeaturedName => {
      if (currentTick > 20) {
        // eslint-disable-next-line no-console
        console.log('WARNING!!! DESIRED SPOTLIGHT NOT FOUND AFTER 20 ATTEMPTS')
      } else if (currentFeaturedName.value !== desiredFeaturedName) {
        featuredListing.click('@nextFeatured', () => {
          browser.pause(500).page.large.listSearch()
            .paginateToSpecificFeatured(browser, desiredFeaturedName, currentTick + 1)
        })
      }
    })
  },
  paginateFeaturedListings: browser => {
    const listSRP = browser.page.large.listSearch()
    const featuredListing = listSRP.section.featuredListing
    featuredListing.waitForElementVisible('@name').getText('@name', currentFeaturedName => {
      const firstFeaturedName = currentFeaturedName.value
      featuredListing.click('@nextFeatured', () => {
        browser.pause(500).page.large.listSearch().section.featuredListing
          .waitForElementVisible('@name', () => {
            featuredListing.expect.element('@name').text.to.not.equal(firstFeaturedName)
            browser.pause(500).page.large.listSearch().section.featuredListing
            .click('@previousFeatured').waitForElementVisible('@name', () => {
              browser.pause(500).page.large.listSearch().section.featuredListing
              .expect.element('@name').text.to.equal(firstFeaturedName)
            })
          })
      })
    })
  },
  openNearbyModalAndClickFirstLink: (listSRP, nearbyMenuType) => {
    listSRP.waitForElementVisible(`@nearby${nearbyMenuType}Menu`)
      .click(`@nearby${nearbyMenuType}Menu`, () => {
        listSRP.section[`nearby${nearbyMenuType}Modal`].waitForElementVisible('@modal')
          .click(`@first${nearbyMenuType}Link`)
      })
  },
  clickNearbyZipLink: (listSRP, nearbyMenuType) => {
    listSRP.waitForElementVisible(`@nearby${nearbyMenuType}Menu`)
      .click(`@nearby${nearbyMenuType}Menu`, () => {
        listSRP.section[`nearby${nearbyMenuType}Modal`].waitForElementVisible('@modal')
          .getAttribute('@validZipCode', 'href', zipHref => {
            listSRP.section[`nearby${nearbyMenuType}Modal`].click('@validZipCode')
              .waitForURLEquals(zipHref.value)
          })
      })
  },
  clickAndValidateQuickSearchLink: (browser, quickLinksTab) => {
    const listSRP = browser.page.large.listSearch()
    const quickLinksSection = listSRP.section[quickLinksTab]
    quickLinksSection.getAttribute('@link', 'href', hrefPackage => {
      const linkHref = hrefPackage.value
      quickLinksSection.click('@link', () => {
        browser.waitForURLEquals(linkHref)
      })
    })
  },
}

module.exports = {
  elements: {
    apartmentTypes: '[data-test-id=apartment-types-menu]',
    averageBedroomPricesHeader: '[data-test-id=average-bedroom-prices] h2',
    bathsFilter: '[data-test-id=baths-filter]',
    bathsPill: '[data-test-id=baths]',
    bedroomPill: '[data-test-id=bedroomRange]',
    bedsFilter: '[data-tag_section=refinements]',
    bedsWrapper: '[data-test-id=beds-filter-wrapper]',
    byApartmentTypes: '[data-tag_item=by_apartment_types]',
    collegeApartments: '[data-test-id=college-apartments]',
    corporateApartments: '[data-test-id=corporate-apartments]',
    findApartments: '[data-test-id=main-nav-find-apartments]',
    findApartmentsMenu: '[data-test-id=main-nav-find-apartments]',
    filterButton: '[data-tag_item=filter]',
    firstListingResult: {
      selector: '//div[@data-test-id="listingResult"][1]',
      locateStrategy: 'xpath',
    },
    floorplanSection: '[data-test-id=floorplans-and-pricing]',
    h1Tag: '[data-test-id=h1-tag]',
    mapBoxContainer: '[data-test-id=mapbox-container]',
    mapToggle: '[data-test-id=map-toggle]',
    mapViewButton: '[data-tag_item=map_view_button]',
    militaryApartments: '[data-test-id=military-apartments]',
    modalApartmentTypeLinks: '[data-test-id=apartment-types-links]',
    nearbyCollegesMenu: '[data-test-id=nearby-colleges-menu]',
    nearbyMilitaryMenu: '[data-test-id=nearby-military-menu]',
    nearbyNeighborhoodsMenu: '[data-test-id=nearby-neighborhoods-menu]',
    nearbyZipsMenu: '[data-test-id=nearby-zips-menu]',
    nearbyCitiesMenu: '[data-test-id=nearby-cities-menu]',
    popularLinks: '[data-test-id=popular-links]',
    propertyType: '[data-test-id=property-type-links]',
    cost: '[data-test-id=cost-links]',
    quickLinks: '[data-tag_section=quick_search]',
    priceFilter: '[data-test-id=price-menu]',
    priceFilterLow: '[data-test-id=price-low]',
    priceFilterHigh: '[data-test-id=price-high]',
    priceHighPill: '[data-test-id=priceHigh]',
    priceHighValue: "[data-test-id='price-1500']",
    priceLowPill: '[data-test-id=priceLow]',
    priceLowValue: "[data-test-id='price-500']",
    searchBarMore: '[data-test-id=search-bar-more]',
    searchButton: '[data-test-id=search-button]',
    secondBedFilter: "[data-test-id='2-beds']",
    selectTwoBaths: '[data-test-id=two-baths]',
    seniorApartments: '[data-test-id=senior-apartments]',
    updateResultsbutton: '[data-test-id=update-results-button]',
    sortOuterDiv: '[data-test-id=sort-outer-div]',
    sortDropdown: '[data-tag_item=sort_by_dropdown]',
    sortBestMatch: '[data-tag_selection=best_match]',
    sortPriceLow: '[data-tag_selection=price_lowest_first]',
    sortPriceHigh: '[data-tag_selection=price_highest_first]',
    sortDistance: '[data-tag_selection=distance_nearest_first]',
    sortRatings: '[data-tag_selection=ratings_high_to_low]',
    localInfoLink: '[data-test-id=local-info-link]',
    localInfoArticle: '[id=local-info-article]',
    localInfoHeader: '[data-test-id=local-info-header]',
    localInfoArticleContent: '[data-test-id=local-info-article-content]',
    reviewAd: '[data-test-id=reviewAd]',
  },
  sections: {
    apartmentTypesModal: {
      selector: '[data-tag_section=by_apartment_types_div]',
      elements: {
        closeModal: '[data-test-id=closeModal] use',
        modal: '[data-test-id=apartment-types-modal]',
        firstApartmentsLink: 'a',
      },
    },
    nearbyCollegesModal: {
      selector: '[data-tag_section=by_nearby_colleges_div]',
      elements: {
        closeModal: '[data-test-id=closeModal] use',
        modal: '[data-test-id=nearby-colleges-modal]',
        firstCollegesLink: 'a',
      },
    },
    nearbyMilitaryModal: {
      selector: '[data-tag_section=by_nearby_military_div]',
      elements: {
        closeModal: '[data-test-id=closeModal] use',
        modal: '[data-test-id=nearby-military-modal]',
        firstMilitaryLink: 'a',
      },
    },
    nearbyNeighborhoodsModal: {
      selector: '[data-tag_section=by_nearby_neighborhoods_div]',
      elements: {
        closeModal: '[data-test-id=closeModal] use',
        modal: '[data-test-id=nearby-neighborhoods-modal]',
        firstNeighborhoodsLink: 'a',
        allHoodsLink: "[data-test-id^='all-'][data-test-id$='-neighborhoods']",
      },
    },
    nearbyZipsModal: {
      selector: '[data-tag_section=by_nearby_zips_div]',
      elements: {
        closeModal: '[data-test-id=closeModal] use',
        modal: '[data-test-id=nearby-zips-modal]',
        firstZipsLink: 'a',
        validZipCode: '[data-test-id="30318"]',
      },
    },
    nearbyCitiesModal: {
      selector: '[data-tag_section=by_nearby_cities_div]',
      elements: {
        closeModal: '[data-test-id=closeModal] use',
        modal: '[data-test-id=nearby-cities-modal]',
        firstCitiesLink: 'a',
      },
    },
    mapListViewToggle: {
      selector: '[data-test-id=map-list-toggle]',
      elements: {
        listToggle: {
          selector: '[data-test-id=list-toggle]',
        },
        mapToggle: {
          selector: '[data-test-id=map-toggle]',
        },
      },
    },
    blogWidget: {
      selector: '[data-test-id=blog-widget]',
      elements: {
        h2: 'h2',
        ul: 'ul',
      },
    },
    quickLinks: {
      selector: '[data-tag_section=quick_search]',
      elements: {
        bedsTab: '[data-tag_item=beds]',
        costTab: '[data-tag_item=cost]',
        featuresTab: '[data-tag_item=features]',
      },
    },
    quickLinksBedsTab: {
      selector: '[data-tag_section=quick_search_bed]',
      elements: {
        link: '[data-tag_item=link]',
      },
    },
    quickLinksCostTab: {
      selector: '[data-tag_section=quick_search_cost]',
      elements: {
        link: '[data-tag_item=link]',
      },
    },
    quickLinksFeaturesTab: {
      selector: '[data-tag_section=quick_search_features]',
      elements: {
        link: '[data-tag_item=link]',
      },
    },
    spotlightListing: {
      selector: '[data-test-id=spotlight]',
      elements: [
        listingElements,
      ],
    },
    firstStandardListing: {
      selector: `(${listingElementXPath})[1]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    secondStandardListing: {
      selector: `(${listingElementXPath})[2]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    tenthStandardListing: {
      selector: `(${listingElementXPath})[10]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    twentiethStandardListing: {
      selector: `(${listingElementXPath})[20]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    twentyfirstStandardListing: {
      selector: `(${listingElementXPath})[21]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    firstStandardListingWithRatings: {
      selector: `(${listingWithRatingsXPath})[1]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    featuredListing: {
      selector: '[data-tag_section=featured_communities]',
      elements: {
        name: '[data-test-id=featured-community-name]',
        nextFeatured: '[data-test-id=right_arrow]',
        previousFeatured: '[data-test-id=left_arrow]',
        checkAvailabilityButton: '[data-tag_item=check_availability_button]',
        image: '[data-tag_item=image]',
      },
    },
    loginModal: {
      selector: '[data-tag_section=register_div]',
      elements: {
        closeModal: '[data-test-id=closeModal] use',
        modal: '[data-test-id=modal]',
      },
    },
    propertyType: {
      selector: '[data-test-id=property-type-links]',
      elements: {
        condosLink: '[href*=condos]',
        townhomesLink: '[href*=townhomes]',
        housesLink: '[href*=houses]',
        h2Tag: 'h2',
      },
    },
  },
  commands: [listSearchCommands],
}
