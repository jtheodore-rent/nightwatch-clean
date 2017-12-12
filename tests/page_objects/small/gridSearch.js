const listingElementXPath = '//div[@data-tag_section="property_listings"]'
const listingElements = {
  link: '[itemprop=url]',
  content: 'div',
  name: '[data-test-id=listing-name]',
  heartUnsaved: '[data-tag_selection=save] use',
  heartSaved: '[data-tag_selection=saved] use',
  price: '[data-test-id=listing-price]',
  phone: '[data-tag_selection=phone]',
  listingCoupon: '[data-test-id="listing-coupon"]',
  listingCouponIcon: '[data-test-id="listing-coupon-icon"]',
  ratings: '[data-test-id="rating-stars"]',
  image: '[data-test-id=background-image]',
}

const selectedTextRGBA = 'rgba(255, 255, 255, 1)'
const selectedBackgroundRGBA = 'rgba(74, 74, 74, 1)'
const unselectedTextRGBA = 'rgba(74, 74, 74, 1)'
const unselectedBackgroundRGBA = 'rgba(0, 0, 0, 0)'

const gridSearchCommands = {
  getDisplayedListings: (browser, numListings) => {
    const gridSRP = browser.page.small.gridSearch()
    const maxListings = [gridSRP.section.firstStandardListing,
      gridSRP.section.secondStandardListing, gridSRP.section.thirdStandardListing,
      gridSRP.section.fourthStandardListing, gridSRP.section.fifthStandardListing,
      gridSRP.section.sixthStandardListing, gridSRP.section.seventhStandardListing,
      gridSRP.section.eighthStandardListing, gridSRP.section.ninthStandardListing,
      gridSRP.section.tenthStandardListing, gridSRP.section.eleventhStandardListing,
      gridSRP.section.twelfthStandardListing, gridSRP.section.thirteenthStandardListing,
      gridSRP.section.fourteenthStandardListing, gridSRP.section.fifteenthStandardListing,
      gridSRP.section.sixteenthStandardListing, gridSRP.section.seventeenthStandardListing,
      gridSRP.section.eighteenthStandardListing, gridSRP.section.nineteenthStandardListing,
      gridSRP.section.twentiethStandardListing]
    return maxListings.slice(0, numListings)
  },
  verifyAllListingsMatchName: (browser, name) => {
    browser.elements('xpath', listingElementXPath, result => {
      const displayedListings = browser.page.small
        .gridSearch().getDisplayedListings(browser, result.value.length)
      displayedListings.forEach(listing => {
        listing.expect.element('@name').text.to.include(name)
      })
    })
  },
  verifyAllListingsWithinPriceRange: (browser, minPrice, maxPrice) => {
    browser.elements('xpath', listingElementXPath, result => {
      const displayedListings = browser.page.small
        .gridSearch().getDisplayedListings(browser, result.value.length)
      displayedListings.forEach(listing => {
        listing.getText('@name', listingName => {
          browser.assert
            .listingPricePlusFormat(listing, maxPrice, listingName.value)
        })
      })
    })
  },
  verifyActiveTabSelection: (gridSRP, activeTab) => {
    gridSRP.expect.element(activeTab).to.have.css('background-color')
      .which.equals(selectedBackgroundRGBA)
    gridSRP.expect.element(activeTab).to.have.css('color')
      .which.equals(selectedTextRGBA)
  },
  verifyUnselectedTabsStyling: (gridSRP, activeTab) => {
    const unselectedPhotoCategories = ['@summaryView', '@kitchensView', '@bathroomsView',
      '@bedroomsView', '@livingRoomsView', '@poolsView']

    if (unselectedPhotoCategories.indexOf(activeTab) !== -1) {
      unselectedPhotoCategories.splice(unselectedPhotoCategories.indexOf(activeTab), 1)
    }
    unselectedPhotoCategories.forEach(option => {
      gridSRP.expect.element(option).to.have.css('background-color')
        .which.equals(unselectedBackgroundRGBA)
      gridSRP.expect.element(option).to.have.css('color')
        .which.equals(unselectedTextRGBA)
    })
  },
  verifyVisualRepresentationOfSelectedCategory: (gridSRP, activeTab) => {
    gridSRP.verifyActiveTabSelection(gridSRP, activeTab)
    gridSRP.verifyUnselectedTabsStyling(gridSRP, activeTab)
  },
  verifySponsoredBanner: spotlightListing => {
    spotlightListing.waitForElementVisible('@sponsoredListingBanner', () => {
      spotlightListing.expect.element('@sponsoredListingBanner').text.to.equal('Sponsored').after(0)
      spotlightListing.expect.element('@sponsoredListingBanner').to.have.css('background-color')
        .which.equals('rgba(58, 105, 170, 1)').after(0)
      spotlightListing.expect.element('@sponsoredListingBanner').to.have.css('color')
        .which.equals('rgba(255, 255, 255, 1)').after(0)
    })
  },
  verifyListingHeartUnsaved: listing => {
    listing.expect.element('@heartUnsaved').to.be.visible.after(0)
    listing.expect.element('@heartSaved').not.to.be.present.after(0)
    listing.expect.element('@heartUnsaved').to.have.css('stroke')
      .which.equals('rgb(255, 255, 255)').after(0)
    listing.expect.element('@heartUnsaved').to.have.css('fill')
      .to.match(/^rgba\(0, 0, 0, 0(\.15|\.149)/).after(0)
  },
  verifyListingHeartSaved: listing => {
    listing.expect.element('@heartSaved').to.be.visible.after(0)
    listing.expect.element('@heartUnsaved').not.to.be.present.after(0)
    listing.expect.element('@heartSaved').to.have.css('stroke')
      .which.equals('none').after(0)
    listing.expect.element('@heartSaved').to.have.css('fill')
      .which.equals('rgb(194, 12, 19)').after(0)
  },
  verifyListingName: listing => {
    listing.expect.element('@name').to.be.visible.before(1000)
    listing.expect.element('@name').text.to.match(/\w+/).before(1000)
    listing.getAttribute('@link', 'href', result => {
      const listingName = result.value.split('apartments')[1].split('/')[3].replace(/-/g, ' ')
      listing.getText('@name', txt => {
        const nameHasHyphens = txt.value.match('-')

        // NOTE: only allow this test to run if the listing name does not contain hyphens
        // EG Ashley Park 55+ - Foo Properties
        if (!nameHasHyphens) {
          listing.expect.element('@name').text.to.equal(listingName).before(1000)
        }
      })
    })
  },
  verifyListingPrice: listing => {
    listing.expect.element('@price').to.be.visible.before(1000)
    listing.expect.element('@price').text.to
      .match(/\$\d{1,5}\+/).before(1000)
  },
  verifyListingPhone: listing => {
    listing.expect.element('@phone').to.be.visible.before(1000)
    listing.expect.element('@phone').text.to
      .match(/^\(\d{3}\) \d{3}-\d{4}$/).before(1000)
    listing.getAttribute('@phone', 'href', result => {
      const phoneRaw = result.value.split('tel:')[1]
      const phoneFormatted = `(${phoneRaw.slice(0, 3)}) ${phoneRaw.slice(3, 6)}-${phoneRaw.slice(6, 10)}` // eslint-disable-line max-len
      listing.expect.element('@phone').text.to.equal(phoneFormatted).before(1000)
    })
  },
  verifyKeyListingElements: (gridSRP, listing, validatePhone) => {
    gridSRP.verifyListingName(listing)
    gridSRP.verifyListingPrice(listing)
    if (validatePhone) {
      gridSRP.verifyListingPhone(listing)
    }
  },
  validateSpotlightListing: (gridSRP, expectSaved, validatePhone) => {
    const spotlightListing = gridSRP.section.spotlightListing
    gridSRP.verifySponsoredBanner(spotlightListing)
    gridSRP.verifyKeyListingElements(gridSRP, spotlightListing, validatePhone)
    if (expectSaved) {
      gridSRP.verifyListingHeartSaved(spotlightListing)
    } else {
      gridSRP.verifyListingHeartUnsaved(spotlightListing)
    }
  },
  validateStandardListing: (gridSRP, listing, expectSaved) => {
    gridSRP.verifyKeyListingElements(gridSRP, listing)
    if (expectSaved) {
      gridSRP.verifyListingHeartSaved(listing)
    } else {
      gridSRP.verifyListingHeartUnsaved(listing)
    }
  },
  validateLinkInAccordion: (browser, args) => {
    const gridSearch = browser.page.small.gridSearch()
    const accordion = gridSearch.section[args.section]
    gridSearch.getLocationInView(`@${args.section}`)
      .waitForElementVisible(`@${args.section}`)
    accordion.click('@openSection', () => {
      accordion.getAttribute(args.linkName, 'href', link => {
        accordion.click(args.linkName)
          .waitForURLEquals(link.value)
      })
      browser.back()
    })
  },
  favoriteFirstTwoListingsAndValidateShowFavorites: browser => {
    const gridSRP = browser.page.small.gridSearch()
    const firstListingToSave = gridSRP.section.secondStandardListing
    const secondListingToSave = gridSRP.section.thirdStandardListing
    browser.useXpath().page.small.gridSearch()
    .getAttribute(`${listingElementXPath}[2]`, 'data-tag_listing_id', firstListingIDPackage => {
      const firstListingID = firstListingIDPackage.value
      browser.useXpath().page.small.gridSearch()
      .getAttribute(`${listingElementXPath}[3]`, 'data-tag_listing_id', secondListingIDPackage => {
        const secondListingID = secondListingIDPackage.value
        const favoritesSection = browser.page.small.header().section.favorites
        firstListingToSave.click('@heartUnsaved', () => {
          favoritesSection.waitForElementVisible('@firstFavoriteListing', () => {
            secondListingToSave.click('@heartUnsaved', () => {
              favoritesSection.waitForElementVisible('@secondFavoriteListing', () => {
                gridSRP.verifyListingHeartSaved(firstListingToSave)
                gridSRP.verifyListingHeartSaved(secondListingToSave)
                favoritesSection.expect.element('@firstFavoriteListing')
                  .attribute('data-tag_listing_id').to.equal(secondListingID).after(0)
                favoritesSection.expect.element('@secondFavoriteListing')
                  .attribute('data-tag_listing_id').to.equal(firstListingID).after(0)
                browser.pause(1000).page.small.header().section.favorites.click('@showFavorites')
                  .waitForElementVisible('@showAll', () => {
                    const firstStandardListing = gridSRP.section.firstStandardListing
                    const secondStandardListing = gridSRP.section.secondStandardListing
                    gridSRP.validateStandardListing(gridSRP, firstStandardListing, true)
                    gridSRP.validateStandardListing(gridSRP, secondStandardListing, true)
                    gridSRP.expect.section('@firstStandardListing').attribute('data-tag_listing_id')
                      .to.equal(firstListingID)
                    gridSRP.expect.section('@secondStandardListing')
                      .attribute('data-tag_listing_id').to.equal(secondListingID)
                  })
              })
            })
          })
        })
      })
    })
  },
  calculateResultsShown: resultsShownPackage => {
    const displayedResultsInfo = resultsShownPackage.split(' of ')[0]

    if (displayedResultsInfo.includes('Showing')) {
      const range = displayedResultsInfo.split('Showing ')[1]
      const lowerBound = parseInt(range.split('-')[0], 10)
      const upperBound = parseInt(range.split('-')[1], 10)
      return (upperBound - lowerBound) + 1
    }
    return parseInt(displayedResultsInfo, 10)
  },
  verifyNumDisplayedListingsMatchesExpectation: browser => {
    const gridSRP = browser.page.small.gridSearch()
    gridSRP.expect.element('@resultsShown').text.to
    .match(/^(\d+|\d+,\d{3}) of (\d+|\d+,\d{3}) shown|Showing (\d+|\d+,\d{3})-(\d+|\d+,\d{3}) of (\d+|\d+,\d+)$/) // eslint-disable-line max-len
    gridSRP.getText('@resultsShown', resultsShownPackage => {
      const numResults = gridSRP.calculateResultsShown(resultsShownPackage.value)
      gridSRP.expect.element('@loadMoreButton').to.be.visible.after(0)
      gridSRP.expect.element('@loadMoreButton').text.to.match(/^Load \d+ More$/)
      gridSRP.getLocationInView('@resultsShown', () => {
        browser.elements('css selector', '[data-test-id=spotlight]', result => {
          const spotlightListings = result.value.length
          browser.useXpath().expect
          .element(`${listingElementXPath}[${numResults - spotlightListings}]`)
          .to.be.visible.before(0)
          browser.useXpath().expect
          .element(`${listingElementXPath}[${(numResults - spotlightListings) + 1}]`)
          .not.to.be.present.after(0)
        })
      })
    })
  },
  clearTwoFavoritedPropertiesAndVerifyFavoritesEmpty: browser => {
    const gridSRP = browser.page.small.gridSearch()
    browser.useXpath().page.small.gridSearch()
    .getAttribute(`${listingElementXPath}[2]`, 'data-tag_listing_id', secondListingIDPackage => {
      const secondListingID = secondListingIDPackage.value
      browser.pause(1000).page.small.gridSearch().section.firstStandardListing
        .waitForElementVisible('@heartSaved').click('@heartSaved', () => {
          gridSRP.section.secondStandardListing.waitForElementNotPresent('@name', () => {
            // If there is no second listing and the first listing now has the same id
            // that the second listing had at the start, then the original first listing
            // was correctly removed
            gridSRP.expect.section('@firstStandardListing').attribute('data-tag_listing_id')
              .to.equal(secondListingID)
            browser.pause(1000).page.small.gridSearch().section.firstStandardListing
              .click('@heartSaved').waitForElementNotPresent('@name', () => {
                gridSRP.expect.element('@noFavoritesHeart').to.be.visible.after(0)
                gridSRP.expect.element('@noFavoritesMessage').to.be.visible.after(0)
                gridSRP.expect.element('@backToListingsLink').to.be.visible.after(0)
                gridSRP.expect.element('@noFavoritesMessage').text.to
                  .equal("You don't have any Favorites")
                gridSRP.expect.element('@backToListingsLink').text
                  .to.equal('Show Me More Apartments')
                gridSRP.click('@backToListingsLink').section.spotlightListing
                  .waitForElementVisible('@sponsoredListingBanner')
              })
          })
        })
    })
  },
  loadMoreResults: browser => {
    const gridSRP = browser.page.small.gridSearch()
    gridSRP.getText('@resultsShown', resultsShownPackage => {
      const startingResultsShown = gridSRP.calculateResultsShown(resultsShownPackage.value)
      const totalResults = resultsShownPackage.value.split(' of ')[1].split(' shown')[0]
      gridSRP.getText('@loadMoreButton', loadMorePackage => {
        const loadMoreIncrement = parseInt(loadMorePackage.value.split('Load ')[1].split(' More')[0], 10) // eslint-disable-line max-len
        browser.elements('css selector', '[data-test-id=spotlight]', result => {
          const spotlightListings = result.value.length
          gridSRP.click('@loadMoreButton', () => {
            browser.useXpath()
            .waitForElementVisible(`${listingElementXPath}[${(loadMoreIncrement + startingResultsShown) - spotlightListings}]`, () => { // eslint-disable-line max-len
              gridSRP.expect.element('@resultsShown').text.to
              .equal(`${startingResultsShown + loadMoreIncrement} of ${totalResults} shown`)
            })
          })
        })
      })
    })
  },
  openListingByID: (browser, listingID) => {
    browser.useCss().getLocationInView(`[data-tag_listing_id="${listingID}"]`, () => {
      browser.useCss()
        .click(`[data-tag_listing_id="${listingID}"] [data-test-id=listing-name]`)
        .page.small.propertyCard().section.photos
        .waitForElementVisible('@photoGalleryImage', () => {
          browser.pause(500)
        })
    })
  },
  locatorForListingInCity: (state, city) => {
    const listingElement = '[data-tag_section=property_listings]'
    const listingName = '[data-test-id="listing-name"]'
    const listingLink = `${listingElement} [href*="/${state}/${city}"] ${listingName}`
    return listingLink
  },
  openListingInCity: (browser, state, city) => {
    browser
      .click(browser.page.small.gridSearch().locatorForListingInCity(state, city)).page.small
      .propertyCard().section.photos.waitForElementVisible('@photoGalleryImage', () => {
        browser.pause(500)
      })
  },
  openFirstListing: browser => {
    const propertyCard = browser.page.small.propertyCard()
    browser.page.small.gridSearch().click('@firstStandardProperty', () => {
      propertyCard.section.photos.waitForElementVisible('@photoGalleryImage', () => {
        browser.pause(500)
      })
    })
  },
  verifyListingPhotoAndCloseListing: (browser, section, listingPackage) => {
    browser.page.small.gridSearch().openListingByID(browser, listingPackage.listingID)
    browser.page.small.propertyCard().section.photos
    .waitForElementVisible('@photoGalleryImageCounter', () => {
      // Pause for card open slide animation
      browser.pause(1000).page.small.propertyCard().section.photos
      .getText('@photoGalleryImageCounter', result => {
        const totalPhotos = result.value.split(' / ')[1]
        browser.page.small.propertyCard().section.photos.expect.element('@photoGalleryImageCounter')
        .text.to.equal(`${listingPackage[section]} / ${totalPhotos}`)
        browser.page.small.propertyCard().click('@closeButton')
        .waitForElementNotPresent('@closeButton')
      })
    })
  },
  refreshPageAndVerifyLoadState: browser => {
    const gridSRP = browser.page.small.gridSearch()
    browser.refresh().page.small.gridSearch().waitForElementVisible('@loadPreviousButton', () => {
      gridSRP.expect.element('@loadPreviousButton').text.to.equal('Load Previous Results')
      gridSRP.verifyNumDisplayedListingsMatchesExpectation(browser)
    })
  },
  loadPreviousResults: browser => {
    const gridSRP = browser.page.small.gridSearch()
    gridSRP.getText('@resultsShown', resultsShownPackage => {
      const totalResults = resultsShownPackage.value.split(' of ')[1].split(' shown')[0]
      gridSRP.getText('@loadMoreButton', loadMorePackage => {
        const loadMoreIncrement = parseInt(loadMorePackage.value.split('Load ')[1].split(' More')[0], 10) // eslint-disable-line max-len
        gridSRP.click('@loadPreviousButton', () => {
          gridSRP.waitForElementNotPresent('@loadPreviousButton', () => {
            gridSRP.expect.element('@resultsShown').text.to
            .equal(`${loadMoreIncrement} of ${totalResults} shown`)
          })
        })
      })
    })
  },
  loadMoreListingsUntilListingFromSourceFound: (browser, source) => {
    browser.elements('xpath', `//div[@data-tag_tpl_source="${source}"]`, result => {
      if (result.value.length === 0) {
        browser.page.small.gridSearch().loadMoreResults(browser)
        browser.page.small.gridSearch().loadMoreListingsUntilListingFromSourceFound(browser, source)
      }
    })
  },
  openAndContactFirstListingFromSource: (browser, source) => {
    const nameLocator = `//div[@data-tag_tpl_source="${source}"]//*[@data-test-id="listing-name"][1]` // eslint-disable-line max-len
    browser.useXpath()
    .getText(nameLocator, result => {
      const listingName = result.value
      browser.useXpath().click(nameLocator, () => {
        browser.page.small.propertyCard().expect.element('@propertyName')
        .text.to.equal(listingName)
        browser.pause(500).page.small.propertyCard()
        .waitForElementVisible('@headerEmailLeadButton', () => {
          const pdpCard = browser.page.small.propertyCard()
          pdpCard.openLeadForm(pdpCard)
          const environment = browser.launchUrl.replace(/http:\/\//, '').replace(/https:\/\//, '')
            .replace(/.com/, '')
          const leadFormData = {
            name: 'Automation Tester',
            email: `${environment}.${source}.autotester@test.com`,
            phone: '0123456789',
            beds: '2',
            baths: '2',
            message: `Lead submission for Rentals Listing from photo tab, accessed by going to tab directly via URL\n\nListing Name: ${listingName}`, // eslint-disable-line max-len,
            newsLetterOptIn: 'true',
          }
          browser.page.small.emailLeadForm().fillVerifyAndSubmitLeadForm(browser, leadFormData)
          const successModal = browser.page.small.leadSuccessModal()
          successModal.waitForElementVisible('@heading', () => {
            successModal.expect.element('@heading')
            .text.to.equal(`Thanks for contacting\n${listingName}`)
          })
        })
      })
    })
  },
  locateSpotlightWithPhone: (browser, tick) => {
    const currentTick = tick || 0

    if (currentTick < 5) {
      browser
        .elements('css selector', '[data-test-id=spotlight] [data-tag_selection=phone]', result => { // eslint-disable-line max-len
          if (result.value.length < 1) {
            browser.refresh().pause(500).page.small.gridSearch().section.spotlightListing
              .waitForElementVisible('@name', () => {
                browser.page.small.gridSearch().locateSpotlightWithPhone(browser, currentTick)
              })
          }
        })
    }
  },
}

module.exports = {
  elements: {
    filterButton: '[data-tag_item=filter]',
    filterPanel: '[data-test-id=filter-panel]',
    expandedFilterPanel: '[data-test-id=expanded-filter-panel]',
    mapViewButton: '[data-tag_item=map_view_button]',
    heading: 'h1',
    summaryView: '[data-tag_item=summary]',
    kitchensView: '[data-tag_item=kitchens]',
    bathroomsView: '[data-tag_item=bathrooms]',
    bedroomsView: '[data-tag_item=bedrooms]',
    livingRoomsView: '[data-tag_item=living_rooms]',
    poolsView: '[data-tag_item=pools]',
    noFavoritesHeart: '[data-test-id=no-favorites-heart]',
    noFavoritesMessage: '[data-test-id=no-favorites-message]',
    backToListingsLink: '[data-test-id=back-to-listings-link]',
    showFavorites: '[data-tag_item=show_favorites]',
    showAll: '[data-tag_item=show_all]',
    loadMoreButton: '[data-tag_item=load_more_button]',
    resultsShown: '[data-test-id=results-shown]',
    loadPreviousButton: '[data-tag_item=load_previous_button]',
    sortByDropdown: '[data-tag_section=sort_by_dropdown]',
    distance: '[data-tag_value=distance_nearest_first]',
    deals: '[data-tag_value=deals_list_first]',
    price: '[data-tag_value=price_lowest_first]',
    aToZ: '[data-tag_value=a_to_z]',
    zToA: '[data-tag_value=z_to_a]',
    ratingsHighToLow: '[data-tag_value=ratings_high_to_low]',
    ratingsLowToHigh: '[data-tag_value=ratings_low_to_high]',
    bestMatch: '[data-tag_value=best_match]',
    propertyTypes: '[data-test-id=property-types]',
    breadcrumbs: '[data-test-id=breadcrumbs]',
    cityBreadcrumb: '[data-tag_item=city]',
    stateBreadcrumb: '[data-tag_item=state]',
    firstStandardProperty: '[data-tag_section=property_listings] [data-tag_item=property_title]',
    reviewAd: '[data-test-id=reviewAd]',
  },
  sections: {
    spotlightListing: {
      selector: '[data-test-id=spotlight]',
      elements: [
        listingElements,
        {
          sponsoredListingBanner: '[data-test-id=sponsored-listing-banner]',
        },
      ],
    },
    firstStandardListing: {
      selector: `${listingElementXPath}[1]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    secondStandardListing: {
      selector: `${listingElementXPath}[2]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    thirdStandardListing: {
      selector: `${listingElementXPath}[3]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    fourthStandardListing: {
      selector: `${listingElementXPath}[4]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    fifthStandardListing: {
      selector: `${listingElementXPath}[5]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    sixthStandardListing: {
      selector: `${listingElementXPath}[6]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    seventhStandardListing: {
      selector: `${listingElementXPath}[7]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    eighthStandardListing: {
      selector: `${listingElementXPath}[8]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    ninthStandardListing: {
      selector: `${listingElementXPath}[9]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    tenthStandardListing: {
      selector: `${listingElementXPath}[10]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    eleventhStandardListing: {
      selector: `${listingElementXPath}[11]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    twelfthStandardListing: {
      selector: `${listingElementXPath}[12]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    thirteenthStandardListing: {
      selector: `${listingElementXPath}[13]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    fourteenthStandardListing: {
      selector: `${listingElementXPath}[14]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    fifteenthStandardListing: {
      selector: `${listingElementXPath}[15]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    sixteenthStandardListing: {
      selector: `${listingElementXPath}[16]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    seventeenthStandardListing: {
      selector: `${listingElementXPath}[17]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    eighteenthStandardListing: {
      selector: `${listingElementXPath}[18]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    nineteenthStandardListing: {
      selector: `${listingElementXPath}[19]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    twentiethStandardListing: {
      selector: `${listingElementXPath}[20]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    fortyninthStandardListing: {
      selector: `${listingElementXPath}[49]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    fiftiethStandardListing: {
      selector: `${listingElementXPath}[50]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    fiftyfirstStandardListing: {
      selector: `${listingElementXPath}[51]`,
      locateStrategy: 'xpath',
      elements: [
        listingElements,
      ],
    },
    propertyTypes: {
      selector: '[data-test-id=property-types]',
      elements: {
        firstPropertyTypesLink: 'a[data-test-id=property-types-link-0]',
        openSection: '[data-test-id=property-types] div',
      },
    },
  },
  commands: [gridSearchCommands],
}
