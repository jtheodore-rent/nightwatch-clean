function Validator(pageObject) {
  this.validateLogo = homeUrl => {
    pageObject.expect.section('@logo').attribute('href').to.equal(homeUrl)
    pageObject.section.logo.expect.element('@logoImage').to.be.present.after(0)
  }

  this.validateMainMenu = () => {
    pageObject.expect.element('@mainMenu').to.be.present.after(0)
  }

  this.validateSearchBar = searchLocation => {
    const searchBar = pageObject.section.searchBar
    searchBar.expect.element('@textInput')
      .attribute('value').to.equal(searchLocation)
    searchBar.click('@textInput').expect.element('@textInput')
      .attribute('placeholder').to.equal('Neighborhood, Zip or City')
    searchBar.expect.element('@searchButton').to.be.present.after(0)
  }
}

module.exports = {
  elements: {
    mainMenu: '[data-test-id=main-menu]',
    agLogoHeader: '[data-tag_section=header] [data-tag_item="ag_logo"]',
  },
  sections: {
    logo: {
      selector: '[data-test-id=header-logo]',
      elements: {
        logoImage: 'img',
      },
    },
    searchBar: {
      selector: '[data-test-id=search]',
      elements: {
        textInput: '[data-test-id=search-location]',
        firstSearchOption: {
          selector: '//div[@data-test-id="search-location-suggestion"][1]',
          locateStrategy: 'xpath',
        },
        searchButton: '[data-test-id=search-button]',
      },
    },
    favorites: {
      selector: '[data-tag_section=sub_header]',
      elements: {
        showFavorites: '[data-tag_item=show_favorites]',
        showAll: '[data-tag_item=show_all]',
        firstFavoriteListing: {
          selector: '//a[@data-tag_item="image"][1]',
          locateStrategy: 'xpath',
        },
        secondFavoriteListing: {
          selector: '//a[@data-tag_item="image"][2]',
          locateStrategy: 'xpath',
        },
      },
    },
  },
  commands: [{
    validate(homeUrl, browser, searchLocation) {
      const validator = new Validator(this)
      validator.validateLogo(homeUrl)
      validator.validateMainMenu()
      validator.validateSearchBar(searchLocation)
      browser.keys(browser.Keys.ESCAPE)
    },
    searchByClickingFirstOption: (browser, args) => {
      browser.page.small.header().section.searchBar.setValue('@textInput', args.query, () => {
        browser.page.small.header().section.searchBar.waitForElementVisible('@firstSearchOption')
          .expect.element('@firstSearchOption').text.to.equal(args.expectedQueryText)
        browser.page.small.header().section.searchBar.waitForElementVisible('@firstSearchOption')
          .click('@firstSearchOption').waitForURLEquals(`${browser.launchUrl}${args.path}`)
      })
    },
    searchByEnterFirstOption: (browser, args) => {
      if (browser.options.desiredCapabilities.isIPhone) {
        browser.page.small.header().searchByClickingFirstOption(browser, args)
      } else {
        browser.page.small.header().section.searchBar.setValue('@textInput', args.query, () => {
          browser.page.small.header().section.searchBar.waitForElementVisible('@firstSearchOption')
            .expect.element('@firstSearchOption').text.to.equal(args.expectedQueryText)
          browser.page.small.header().section.searchBar.waitForElementVisible('@firstSearchOption')
          browser.keys(browser.Keys.ENTER).waitForURLEquals(`${browser.launchUrl}${args.path}`)
        })
      }
    },
  }],
}
