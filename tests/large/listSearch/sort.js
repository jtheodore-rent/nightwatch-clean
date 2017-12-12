const listSearchPath = '/apartments/Alaska/Yakutat/'

const listSearchPage = browser => browser.page.large.listSearch()
const paginationPage = browser => browser.page.large.pagination()

const sortOptions = {
  bestMatch: {
    element: 'sortBestMatch',
    text: 'Best Match',
  },
  priceLow: {
    element: 'sortPriceLow',
    text: 'Price (Lowest First)',
    urlRefinement: 'sortby=listingpricelow_asc',
  },
  priceHigh: {
    element: 'sortPriceHigh',
    text: 'Price (Highest First)',
    urlRefinement: 'sortby=listingpricelow_desc',
  },
  distance: {
    element: 'sortDistance',
    text: 'Distance (Nearest First)',
    urlRefinement: 'sortby=distance_asc',
  },
  ratings: {
    element: 'sortRatings',
    text: 'Ratings (High to Low)',
    urlRefinement: 'sortby=avgoverallrating-desc',
  },
}

const sortByLabel = 'Sort by: '

module.exports = {
  tags: ['stableChrome', 'stableFirefox', 'critical', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${listSearchPath}`)
      .waitForURLEquals(`${browser.launchUrl}${listSearchPath}`)
      .waitForElementVisible('#react-view')
      .page.large.listSearch().section.firstStandardListing
      .waitForElementVisible('@image0')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Verify Default sort is Best Match': browser => {
    listSearchPage(browser).expect.element('@sortOuterDiv').text.to.equal('Sort by: Best Match')
  },

  'Sort by Price (Lowest First)': browser => {
    listSearchPage(browser).sortBy(browser, listSearchPath, sortOptions.priceLow)
  },

  'Validate SRP sorted by Price (Lowest First)': browser => {
    browser.assert
      .urlEquals(`${browser.launchUrl}${listSearchPath}?${sortOptions.priceLow.urlRefinement}`)
    listSearchPage(browser).expect.element('@sortOuterDiv').text.to
      .equal(`${sortByLabel}${sortOptions.priceLow.text}`)
  },

  'Verify Price (Lowest First) option persists after pagination': browser => {
    paginationPage(browser).clickNext(browser, listSearchPath, sortOptions.priceLow.urlRefinement)
  },

  'Sort by Price (Highest First)': browser => {
    listSearchPage(browser).expect.element('@sortOuterDiv').text.to
      .equal(`${sortByLabel}${sortOptions.priceLow.text}`)
    listSearchPage(browser).sortBy(browser, listSearchPath, sortOptions.priceHigh)
  },

  'Validate SRP sorted by Price (Highest First)': browser => {
    browser.assert
      .urlEquals(`${browser.launchUrl}${listSearchPath}?${sortOptions.priceHigh.urlRefinement}`)
    listSearchPage(browser).expect.element('@sortOuterDiv').text.to
      .equal(`${sortByLabel}${sortOptions.priceHigh.text}`)
  },

  'Verify Price (Highest First) option persists after pagination': browser => {
    paginationPage(browser).clickNext(browser, listSearchPath, sortOptions.priceHigh.urlRefinement)
  },

  'Sort by Distance': browser => {
    listSearchPage(browser).expect.element('@sortOuterDiv').text.to
      .equal(`${sortByLabel}${sortOptions.priceHigh.text}`)
    listSearchPage(browser).sortBy(browser, listSearchPath, sortOptions.distance)
  },

  'Validate SRP sorted by Distance': browser => {
    browser.assert
      .urlEquals(`${browser.launchUrl}${listSearchPath}?${sortOptions.distance.urlRefinement}`)
    listSearchPage(browser).expect.element('@sortOuterDiv').text.to
      .equal(`${sortByLabel}${sortOptions.distance.text}`)
  },

  'Verify Distance option persists after pagination': browser => {
    paginationPage(browser).clickNext(browser, listSearchPath, sortOptions.distance.urlRefinement)
  },

  'Sort by Ratings': browser => {
    listSearchPage(browser).expect.element('@sortOuterDiv').text.to
      .equal(`${sortByLabel}${sortOptions.distance.text}`)
    listSearchPage(browser).sortBy(browser, listSearchPath, sortOptions.ratings)
  },

  'Validate SRP sorted by Ratings': browser => {
    browser.assert
      .urlEquals(`${browser.launchUrl}${listSearchPath}?${sortOptions.ratings.urlRefinement}`)
    listSearchPage(browser).expect.element('@sortOuterDiv').text.to
      .equal(`${sortByLabel}${sortOptions.ratings.text}`)
  },

  'Verify Ratings option persists after pagination': browser => {
    paginationPage(browser).clickNext(browser, listSearchPath, sortOptions.ratings.urlRefinement)
  },

  'Sort by Best Match': browser => {
    listSearchPage(browser).expect.element('@sortOuterDiv').text.to
      .equal(`${sortByLabel}${sortOptions.ratings.text}`)
    listSearchPage(browser).sortBy(browser, listSearchPath, sortOptions.bestMatch)
  },

  'Validate SRP sorted by Best Match': browser => {
    browser.assert
      .urlEquals(`${browser.launchUrl}${listSearchPath}`)
    listSearchPage(browser).expect.element('@sortOuterDiv').text.to
      .equal(`${sortByLabel}${sortOptions.bestMatch.text}`)
  },
}
