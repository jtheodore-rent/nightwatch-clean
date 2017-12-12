const listingElementXPath = "//div[@data-test-id='standard-listing']"
const listingElements = {
  content: 'div',
  image0: '[data-test-id=background-image-0]',
  image2: '[data-test-id=background-image-2]',
  address: '[data-test-id=listing-tile-address] span',
}

const mapSearchCommands = {
  setupBasicFilters: browser => {
    const mapPage = browser.page.large.mapSearch()
    mapPage.click('@bedsFilter')
      .waitForElementVisible('@secondBedFilter').click('@secondBedFilter')
    browser.pause(1000)
    mapPage.click('@priceFiler')
      .waitForElementVisible('@priceLowValue').click('@priceLowValue')
    browser.pause(1000)
    mapPage.waitForElementVisible('@priceHighValue').click('@priceHighValue')
    mapPage.click('@searchBarMore')
    browser.pause(1000)
    mapPage.click('@bathsFilter')
      .waitForElementVisible('@selectTwoBaths').click('@selectTwoBaths')
    browser.pause(1000)
    mapPage.click('@RatingsFilter')
      .waitForElementVisible('@selectFourStars').click('@selectFourStars')
    browser.pause(1000)
    mapPage.click('@updateResultsbutton')
  },
  validateBasicFilters: browser => {
    const mapPage = browser.page.large.mapSearch()
    mapPage.expect.element('@bedroomPill').to.be.visible.after(0)
    mapPage.expect.element('@bathsPill').to.be.visible.after(0)
    mapPage.expect.element('@priceLowPill').to.be.visible.after(0)
    mapPage.expect.element('@priceHighPill').to.be.visible.after(0)
    mapPage.expect.element('@ratingsPill').to.be.visible.after(0)
  },

  validateFindApartmentsModal: (
    browser, menuItemElementName, modalElementName, menuItemTitle, containedText
  ) => {
    const mapSearch = browser.page.large.mapSearch()
    mapSearch.click('@findApartmentsMenu', () => {
      mapSearch.waitForElementVisible(menuItemElementName, 500, () => {
        mapSearch.expect.element(menuItemElementName).text.to.equal(menuItemTitle)
        const modalSection = mapSearch.section[modalElementName]
        modalSection.expect.element('@modal').not.to.be.visible.after(0)
        mapSearch.click(menuItemElementName, () => {
          modalSection.waitForElementVisible('@modal', () => {
            modalSection.expect.element('@modal')
              .text.to.contain(containedText)
            modalSection.click('@closeModal').waitForElementNotVisible('@modal')
          })
        })
      })
    })
  },

  validateLinkInModal: (browser, args) => {
    const mapSearch = browser.page.large.mapSearch()
    const modal = mapSearch.section[args.section]
    mapSearch.click(args.menu, () => {
      mapSearch.click(args.menuItem, () => {
        modal.getAttribute(args.linkName, 'href', link => {
          if (!args.skipMapLinkCheck) {
            browser.expect(link.value).to.contain('/map/?')
          }
          modal.click(args.linkName)
            .waitForURLEquals(link.value)
        })
        browser.back()
      })
    })
  },

  validateApartmentTypes: (browser, link, parameter) => {
    browser.page.large.listSearch().moveToElement('@findApartments', 10, 10, () => {
      browser.page.large.listSearch().expect.element('@byApartmentTypes').to.be.visible.after(0)
      browser.page.large.listSearch().click('@byApartmentTypes')
      browser.page.large.listSearch().waitForElementVisible('@modalApartmentTypeLinks')
      browser.page.large.listSearch().click(link)
        .waitForURLEquals(`${browser.launchUrl}${parameter}`)
      browser.back()
    })
  },

  validateCollegeSearch: browser => {
    browser.page.large.mapSearch()
      .validateApartmentTypes(browser, '@collegeApartments', '/college/')
  },
  validateMilitarySearch: browser => {
    browser.page.large.mapSearch()
      .validateApartmentTypes(browser, '@militaryApartments', '/military/')
  },
  validateCorporateSearch: browser => {
    browser.page.large.mapSearch()
      .validateApartmentTypes(browser, '@corporateApartments', '/corporate/')
  },
  validateSeniorSearch: browser => {
    browser.page.large.mapSearch()
      .validateApartmentTypes(browser, '@seniorApartments', '/senior/')
  },
}

module.exports = {
  elements: {
    mapViewButton: '[data-tag_item=map_view_button]',
    firstListingResult: {
      selector: '//div[@data-test-id="listingResult"][1]',
      locateStrategy: 'xpath',
    },
    listViewButton: '[data-tag_item=list_view_button]',
    mapboxCanvas: '[data-test-id=mapbox-container] canvas',
    mapBoxContainer: '[data-test-id=mapbox-container]',
    locationPrompt: '[data-test-id=locationPrompt]',
    studioRefinement: '[data-tag_item=studio]',
    oneBedRefinement: "[data-tag_item='1_bedroom']",
    twoBedRefinement: "[data-tag_item='2_bedroom']",
    threeBedRefinement: "[data-tag_item='3_bedroom']",
    fourBedRefinement: "[data-tag_item='4_bedroom']",
    sliderPriceDisplay: '#sliderPriceDisplay',
    collegeLifestyle: '[data-tag_item=college]',
    corporateLifestyle: '[data-tag_item=corporate]',
    furnishedLifestyle: '[data-tag_item=furnished]',
    golfLifestyle: '[data-tag_item=golf]',
    incomeRestrictedLifestyle: "[data-tag_item='income_restricted']",
    luxuryLifestyle: '[data-tag_item=luxury]',
    militaryLifestyle: '[data-tag_item=military]',
    petFriendlyLifestyle: "[data-tag_item='pet_friendly']",
    seniorLifestyle: '[data-tag_item=senior]',
    waterfrontLifestyle: '[data-tag_item=waterfront]',
    filterButton: '[data-tag_item=filter]',
    checkAvailabilityModal: '[data-tag_section=lead_submission_form]',
    closeCheckAvailabilityModal: '[data-tag_item=x]',
    findApartmentsMenu: '[data-test-id=main-nav-find-apartments]',
    modalNearbyLinks: '[data-test-id=nearby-links]',
    collegeApartments: '[data-test-id=college-apartments]',
    militaryApartments: '[data-test-id=military-apartments]',
    corporateApartments: '[data-test-id=corporate-apartments]',
    seniorApartments: '[data-test-id=senior-apartments]',
    bedsFilter: '[data-tag_section=refinements]',
    secondBedFilter: "[data-test-id='2-beds']",
    bedsWrapper: '[data-test-id=beds-filter-wrapper]',
    priceFiler: '[data-test-id=price-menu]',
    bedroomPill: '[data-test-id=bedroomRange]',
    priceHighPill: '[data-test-id=priceHigh]',
    priceLowPill: '[data-test-id=priceLow]',
    bathsPill: '[data-test-id=baths]',
    laundryPill: '[data-test-id=laundry]',
    ratingsPill: '[data-test-id=ratings]',
    priceFilterHigh: '[data-test-id=price-high]',
    priceLowValue: "[data-test-id='price-1100']",
    priceHighValue: "[data-test-id='price-3000']",
    searchBarMore: '[data-test-id=search-bar-more]',
    bathsFilter: '[data-test-id=baths-filter]',
    selectTwoBaths: '[data-test-id=two-baths]',
    RatingsFilter: '[data-test-id=ratings-filter]',
    selectFourStars: '[data-test-id=four-stars]',
    laundryFilter: '[data-test-id=laundry-filter]',
    selectinUnit: '[data-test-id=in-unit]',
    mapToggle: '[data-test-id=map-toggle]',
    updateResultsbutton: '[data-test-id=update-results-button]',
    searchButton: '[data-test-id=search-button]',
    twoBedsButton: '[data-test-id=button-active]',
    apartmentTypes: '[data-test-id=apartment-types-menu]',
    nearbyCollegesMenu: '[data-test-id=nearby-colleges-menu]',
    nearbyMilitaryMenu: '[data-test-id=nearby-military-menu]',
    nearbyNeighborhoodsMenu: '[data-test-id=nearby-neighborhoods-menu]',
    nearbyZipsMenu: '[data-test-id=nearby-zips-menu]',
    nearbyCitiesMenu: '[data-test-id=nearby-cities-menu]',
  },

  sections: {
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
    apartmentTypesModal: {
      selector: '[data-tag_section=by_apartment_types_div]',
      elements: {
        closeModal: '[data-test-id=closeModal] use',
        modal: '[data-test-id=apartment-types-modal]',
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
        firstHoodLink: 'a',
        allHoodsLink: "[data-test-id^='all-'][data-test-id$='-neighborhoods']",
      },
    },
    nearbyZipsModal: {
      selector: '[data-tag_section=by_nearby_zips_div]',
      elements: {
        closeModal: '[data-test-id=closeModal] use',
        modal: '[data-test-id=nearby-zips-modal]',
        firstZipsLink: 'a',
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
  },
  commands: [mapSearchCommands],
}
