function Validator(pageObject) {
  this.validateLogo = homeUrl => {
    pageObject.expect.section('@logo').attribute('href').to.equal(homeUrl)
    pageObject.section.logo.expect.element('@image').to.be.present.after(0)
  }

  this.validateMainNavigation = () => {
    const mainNavigation = pageObject.section.mainNavigation
    mainNavigation.expect.element('@findApartmentsMenu').text.to.match(/Find Apartments/)
    mainNavigation.expect.element('@blogLink').text.to.equal('Blog')
    mainNavigation.expect.element('@nextStepsMenu').text.to.equal('Next Steps')
    mainNavigation.expect.element('@advertiseLink').text.to.equal('Advertise Your Property')
  }

  this.validateUtilityNavigation = () => {
    const utilityNavigation = pageObject.section.utilityNavigation
    utilityNavigation.expect.element('@myPlacesLink').text.to.equal('My Places')
    utilityNavigation.expect.element('@registerLink').text.to.equal('Register')
    utilityNavigation.expect.element('@logInLink').text.to.equal('Log In')
  }

  this.validateSearchBar = (expectMapListToggle, expectedSearchBarText) => {
    const searchBar = pageObject.section.searchBar
    const searchBarContainer = pageObject.section.searchBarContainer

    if (expectedSearchBarText) {
      searchBar.expect.element('@textInput').attribute('value')
        .to.equal(expectedSearchBarText)
    }
    searchBar.click('@textInput').expect.element('@textInput')
      .attribute('placeholder')
      .to.equal('Neighborhood, Zip or City')
    searchBar.expect.element('@bedsDropdown').text.to.equal('BEDS')
    searchBar.expect.element('@priceDropdown').text.to.equal('PRICE')
    searchBar.expect.element('@searchButton').text.to.equal('Search Apartments')
    if (expectMapListToggle) {
      searchBarContainer.expect.element('@mapListViewToggle').to.be.visible.after(0)
    } else {
      searchBarContainer.expect.element('@mapListViewToggle').not.to.be.present.after(0)
    }
  }

  this.validateBreadcrumbs = (homeUrl, currentPage, expectLastBreadCrumbLink) => {
    const breadcrumbs = pageObject.section.breadcrumbs
    breadcrumbs.expect.element('@root').text.to.equal('Home')
    breadcrumbs.expect.element('@root').attribute('href').to.equal(homeUrl)

    breadcrumbs.expect.element('@currentPage').text.to.equal(currentPage)
    if (expectLastBreadCrumbLink) {
      breadcrumbs.expect.element('@currentPage').to.have.attribute('href')
    } else {
      breadcrumbs.expect.element('@currentPage').not.to.have.attribute('href')
    }
  }
}

module.exports = {
  sections: {
    logo: {
      selector: '[data-test-id=ag-logo]',
      elements: {
        image: 'img',
      },
    },
    mainNavigation: {
      selector: '[data-test-id=main-nav]',
      elements: {
        findApartmentsMenu: '[data-test-id=main-nav-find-apartments]',
        blogLink: '[data-test-id=blog]',
        nextStepsMenu: '[data-test-id=main-nav-next-steps]',
        advertiseLink: '[data-test-id=advertise-your-property]',
        byStateLink: '[data-tag_item="by_state"]',
        byApartmentTypes: '[data-test-id=apartment-types-menu]',
        apartmentTypes: '[data-test-id=apartment-types-menu]',
      },
    },
    utilityNavigation: {
      selector: '[data-test-id=utility-nav]',
      elements: {
        myPlacesLink: '[data-test-id=my-places]',
        registerLink: '[data-test-id=register]',
        logInLink: '[data-test-id=login]',
        heartIcon: '[data-test-id=my-places-heart-icon]',
      },
    },
    searchBar: {
      selector: '[data-tag_section=search_input]',
      elements: {
        textInput: '[data-test-id=search-location]',
        searchButton: '[data-test-id=search-button]',
        bedsDropdown: '[data-tag_section=refinements]',
        priceDropdown: '[data-test-id=price-menu]',
        firstSearchOption: {
          selector: '//div[@data-test-id="search-location-suggestion"][1]',
          locateStrategy: 'xpath',
        },
      },
    },
    searchBarContainer: {
      selector: '[data-test-id=searchbar-container]',
      elements: {
        mapListViewToggle: '[data-test-id=map-list-toggle]',
        mapToggle: '[data-test-id=map-toggle]',
        listToggle: '[data-test-id=list-toggle]',
      },
    },
    breadcrumbs: {
      selector: '[data-test-id=breadcrumbs]',
      elements: {
        homeBreadcrumb: '[data-tag_item=home]',
        stateBreadcrumb: '[data-tag_item=state]',
        root: {
          selector: '//*[@data-test-id="breadcrumb"][1]',
          locateStrategy: 'xpath',
        },
        currentPage: {
          selector: '(//*[@data-test-id="breadcrumb"])[last()]',
          locateStrategy: 'xpath',
        },
      },
    },
  },
  commands: [{
    validate(
      homeUrl,
      currentPage,
      expectMapListToggle,
      expectedSearchBarText,
      expectLastBreadCrumbLink
    ) {
      const validator = new Validator(this)
      validator.validateLogo(homeUrl)
      validator.validateMainNavigation()
      validator.validateUtilityNavigation()
      validator.validateSearchBar(expectMapListToggle, expectedSearchBarText)
      if (currentPage) {
        validator.validateBreadcrumbs(homeUrl, currentPage, !!expectLastBreadCrumbLink)
      }
    },
    searchByClickingFirstOption: (browser, args) => {
      browser.page.large.header().section.searchBar.setValue('@textInput', args.query, () => {
        browser.page.large.header().section.searchBar.waitForElementVisible('@firstSearchOption')
          .expect.element('@firstSearchOption').text.to.equal(args.expectedQueryText)
        browser.page.large.header().section.searchBar.waitForElementVisible('@firstSearchOption')
          .click('@firstSearchOption', () => {
            browser.pause(500).page.large.header().section.searchBar.click('@searchButton')
            .waitForURLEquals(`${browser.launchUrl}${args.path}`)
          })
      })
    },
    searchByEnterFirstOption: (browser, args) => {
      browser.page.large.header().section.searchBar.setValue('@textInput', args.query, () => {
        browser.page.large.header().section.searchBar.waitForElementVisible('@firstSearchOption')
          .expect.element('@firstSearchOption').text.to.equal(args.expectedQueryText)
        browser.page.large.header().section.searchBar.waitForElementVisible('@firstSearchOption')
        browser.keys(browser.Keys.ENTER)
      })
    },
  }],
}
