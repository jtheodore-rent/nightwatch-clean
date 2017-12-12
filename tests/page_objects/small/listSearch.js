const listingElementXPath = '//li[@data-test-id="standard-listing"]'
const listingElements = {
  content: 'div',
  name: '[data-tag_item=property_title]',
  image: '[data-test-id=background-image]',
  address: '[data-test-id=listing-tile-address]',
  details: '[data-test-id=listing-tile-details]',
  phone: '[data-tag_selection=phone]',
  moreInfo: '[data-tag_item=more_info]',
  heartUnsaved: '[data-tag_selection=save]',
  heartSaved: '[data-tag_selection=saved]',
  schemaRatingValue: '[itemprop=aggregateRating] [itemprop=ratingValue]',
  schemaImageUrl: '[itemprop=image] [itemprop=contentURL]',
  schemaStreetAddress: '[itemprop=address] [itemprop=streetAddress]',
}

const listSearchCommands = {
  validateListingHref: (listing, launchUrl) => {
    listing.getText('@name', result => {
      // Split this out into a utility function
      const listingNameUrl = result.value
        .replace(/\s+/g, '-')
        .replace(/&/g, '~')
      listing.getText('@address', resultAddress => {
        const addressCity = resultAddress.value.substr(0, resultAddress.value.indexOf(','))
          .replace(/\s+/g, '-')
        listing.getAttribute('@content', 'data-tag_listing_id', resultId => {
          const listingId = resultId.value
          const listingRoute = `${addressCity}/${listingNameUrl}/${listingId}`
          listing.expect.element('@name').attribute('href').to
            .equal(`${launchUrl}/apartments/Alaska/${listingRoute}/`)
        })
      })
    })
  },
  validateListingDetails: listing => {
    listing.expect.element('@name').text.to.match(/\w{3,}/)
    listing.expect.element('@address').text.to.match(/([A-Z][a-z]*), AK \d{5}/)
    const priceBedsRegExp = new RegExp(['(\\$(\\d{1,},\\d{3}|\\d{1,})–\\$(\\d{1,},\\d{3}|\\d{1,})',
      '|From \\$\\d{1,}|To \\$\\d{1,})',
      ' \\| (Studio|Loft|\\d{1})–(Studio|Loft|\\d{1} Bed)'].join(''))
    listing.expect.element('@details').text.to.match(priceBedsRegExp)
    listing.expect.element('@phone').text.to.match(/\(\d{3}\) \d{3}-\d{4}/)
    listing.expect.element('@image').to.be.visible.after(0)
    listing.expect.element('@image').attribute('style').to
      .match(/https:\/\/image.apartmentguide.com\/imgr\//)
    listing.expect.element('@moreInfo').text.to.equal('More Info')
    listing.expect.element('@heartUnsaved').to.be.visible.after(0)
    listing.expect.element('@heartSaved').not.to.be.present.after(0)
  },
  validateListingStyling: (listing, listingInnerStyles) => {
    listing.expect.element('@name').to.have.css('color').which
      .equals(listingInnerStyles.linkRGBA)
    listing.expect.element('@address').to.have.css('color').which
      .equals(listingInnerStyles.textRGBA)
    listing.expect.element('@details').to.have.css('color').which
      .equals(listingInnerStyles.textRGBA)
    listing.expect.element('@phone').to.have.css('color').which
      .equals(listingInnerStyles.linkRGBA)
    listing.expect.element('@moreInfo').to.have.css('background-color').which
      .equals(listingInnerStyles.buttonBackgroundRGBA)
    listing.expect.element('@moreInfo').to.have.css('color').which
      .equals(listingInnerStyles.buttonTextRGBA)
  },
  getDisplayedListings: (browser, numListings) => {
    const listSRP = browser.page.small.listSearch()
    const maxListings = [listSRP.section.firstStandardListing,
      listSRP.section.secondStandardListing, listSRP.section.thirdStandardListing,
      listSRP.section.fourthStandardListing, listSRP.section.fifthStandardListing,
      listSRP.section.sixthStandardListing, listSRP.section.seventhStandardListing,
      listSRP.section.eighthStandardListing, listSRP.section.ninthStandardListing,
      listSRP.section.tenthStandardListing, listSRP.section.eleventhStandardListing,
      listSRP.section.twelfthStandardListing, listSRP.section.thirteenthStandardListing,
      listSRP.section.fourteenthStandardListing, listSRP.section.fifteenthStandardListing,
      listSRP.section.sixteenthStandardListing, listSRP.section.seventeenthStandardListing,
      listSRP.section.eighteenthStandardListing, listSRP.section.nineteenthStandardListing,
      listSRP.section.twentiethStandardListing]
    return maxListings.slice(0, numListings)
  },
  verifyAllListingsMatchName: (browser, name) => {
    browser.elements('xpath', listingElementXPath, result => {
      const displayedListings = browser.page.small
        .listSearch().getDisplayedListings(browser, result.value.length)
      displayedListings.forEach(listing => {
        listing.expect.element('@name').text.to.include(name)
      })
    })
  },
  verifyAllListingsWithinPriceRange: (browser, minPrice, maxPrice) => {
    browser.elements('xpath', listingElementXPath, result => {
      const displayedListings = browser.page.small
        .listSearch().getDisplayedListings(browser, result.value.length)
      displayedListings.forEach(listing => {
        listing.getText('@name', listingName => {
          browser.assert
            .listingPriceInRange(listing, minPrice, maxPrice, listingName.value)
        })
      })
    })
  },
  verifyAllListingsBedCount: (browser, bedString) => {
    browser.elements('xpath', listingElementXPath, result => {
      const displayedListings = browser.page.small
        .listSearch().getDisplayedListings(browser, result.value.length)
      displayedListings.forEach(listing => {
        listing.getText('@name', listingName => {
          browser.assert
            .listingBedCount(listing, bedString, listingName.value)
        })
      })
    })
  },
  validateListingMicrodata: listing => {
    listing.expect.element('@schemaRatingValue').attribute('content').to.match(/\d+\.\d+/)
  },
}

module.exports = {
  elements: {
    filterButton: '[data-tag_item=filter]',
    mapViewButton: '[data-tag_item=map_view_button]',
    prevPageButton: '[data-test-id=previous]',
    currentPageNumber: "[data-test-id='current-page-number']",
    nextPageButton: '[data-test-id=next]',
  },
  sections: {
    spotlightListing: {
      selector: '[data-test-id=spotlight]',
      elements: [
        listingElements,
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
  },
  commands: [listSearchCommands],
}
