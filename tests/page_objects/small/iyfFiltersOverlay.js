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
    clearAllButton: '[data-test-id=clearAllBtn]',
  },
  sections: {
    bedSelect: {
      selector: '[data-test-id=bedrooms]',
      elements: {
        bedOptionAny: {
          selector: '//label[@data-test-id="bedrooms-label"][1]',
          locateStrategy: 'xpath',
        },
        bedOptionStudio: {
          selector: '//label[@data-test-id="bedrooms-label"][2]',
          locateStrategy: 'xpath',
        },
        bedOptionOne: {
          selector: '//label[@data-test-id="bedrooms-label"][3]',
          locateStrategy: 'xpath',
        },
        bedOptionTwo: {
          selector: '//label[@data-test-id="bedrooms-label"][4]',
          locateStrategy: 'xpath',
        },
        bedOptionThreeOrMore: {
          selector: '//label[@data-test-id="bedrooms-label"][5]',
          locateStrategy: 'xpath',
        },
      },
    },
    bathSelect: {
      selector: '[data-test-id=bathrooms]',
      elements: {
        bathOptionAny: {
          selector: '//label[@data-test-id="bathrooms-label"][1]',
          locateStrategy: 'xpath',
        },
        bathOptionOne: {
          selector: '//label[@data-test-id="bathrooms-label"][2]',
          locateStrategy: 'xpath',
        },
        bathOptionTwo: {
          selector: '//label[@data-test-id="bathrooms-label"][3]',
          locateStrategy: 'xpath',
        },
        bathOptionThree: {
          selector: '//label[@data-test-id="bathrooms-label"][4]',
          locateStrategy: 'xpath',
        },
        bathOptionFourOrMore: {
          selector: '//label[@data-test-id="bathrooms-label"][5]',
          locateStrategy: 'xpath',
        },
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
        radius30Option: 'option[value="30"]',
      },
    },
  },
}
