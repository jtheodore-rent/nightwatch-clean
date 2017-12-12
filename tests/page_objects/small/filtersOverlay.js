module.exports = {
  elements: {
    heading: 'h1',
    searchInput: '[data-test-id=search-location]',
    propertyNameInput: 'input[name=propertyName]',
    applyFilterButton: '[data-tag_item=update_results_button]',
    petsOption: '[data-test-id=pets-label]',
    ACOption: '[data-test-id="airConditioning-label"]',
    ratingsOption: '[data-test-id=ratingCountText]',
    fourStar: "[data-test-id='review-stars'] a:nth-of-type(2)",
    closeButton: '[data-test-id=closeModal]',
    moreFiltersToggle: '[data-test-id=more-filters-button]',
    minSelectedPrice: '[data-test-id=minPriceRange]',
    maxSelectedPrice: '[data-test-id=maxPriceRange]',
    clearRatingsButton: '[data-test-id=clearRatingBtn]',
    ratingCountText: '[data-test-id=ratingCountText]',
    filterToggle: '[data-test-id=filterLauncher]',
  },
  sections: {
    minPriceSelect: {
      selector: 'select[name=minPrice]',
      elements: {
        defaultLabel: 'option[value=label]',
        price400Option: "option[value='400']",
      },
    },
    maxPriceSelect: {
      selector: 'select[name=maxPrice]',
      elements: {
        defaultLabel: 'option[value=label]',
        price1500Option: "option[value='1500']",
      },
    },
    bedSelect: {
      selector: 'select[name=bedrooms]',
      elements: {
        defaultLabel: 'option[value=label]',
        studioOption: "option[value='0']",
        oneBedOption: "option[value='1']",
      },
    },
    bathSelect: {
      selector: 'select[name=bathrooms]',
      elements: {
        defaultLabel: 'option[value=label]',
        oneBathOption: "option[value='1']",
      },
    },
    laundrySelect: {
      selector: '[data-test-id=laundry]',
      elements: {
        laundryOptionOne: {
          selector: '//label[@data-test-id="laundry-label"][1]',
          locateStrategy: 'xpath',
        },
        laundryOptionTwo: {
          selector: '//label[@data-test-id="laundry-label"][2]',
          locateStrategy: 'xpath',
        },
        laundryOptionThree: {
          selector: '//label[@data-test-id="laundry-label"][3]',
          locateStrategy: 'xpath',
        },
      },
    },
    distanceSelect: {
      selector: 'select[name=radius]',
      elements: {
        defaultLabel: 'option[value=label]',
        radius30Option: "option[value='30']",
      },
    },
  },
}
