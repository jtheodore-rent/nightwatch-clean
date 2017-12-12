const listSearchPath = '/apartments/North-Carolina/Charlotte/'

module.exports = {
  tags: ['critical', 'stableAndroid', 'stableIOS', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${listSearchPath}`)
      .waitForElementVisible('#react-view')
      .page.small.gridSearch()
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Verify Best Match Default': browser => {
    browser.page.small.gridSearch().waitForElementVisible('@sortByDropdown')
    .waitForURLEquals(`${browser.launchUrl}${listSearchPath}`)
    .expect.element('@sortByDropdown').text.to.match(/^Sort by: Best Match/)
  },

  'Verify Distance Sort ': browser => {
    const distanceNearestFirstPath = '?sortby=distance_asc'
    browser.page.small.gridSearch().click('@sortByDropdown').click('@distance')
    .waitForURLEquals(`${browser.launchUrl}${listSearchPath}${distanceNearestFirstPath}`)
    .expect.element('@sortByDropdown').text.to.match(/^Sort by: Distance \(nearest first\)/)
  },

  'Verify Deals Sort': browser => {
    const dealsPath = '?sortby=mobilecoupon_desc'
    browser.page.small.gridSearch().click('@sortByDropdown').click('@deals')
    .waitForURLEquals(`${browser.launchUrl}${listSearchPath}${dealsPath}`)
    .expect.element('@sortByDropdown').text.to.match(/^Sort by: Deals/)
    browser.page.small.gridSearch().section.firstStandardListing
    .expect.element('@listingCouponIcon').to.be.visible.before(30000)
  },

  'Verify Price Sort': browser => {
    const priceLowToHighPath = '?sortby=listingpricelow_asc'
    browser.page.small.gridSearch().click('@sortByDropdown').click('@price')
    .waitForURLEquals(`${browser.launchUrl}${listSearchPath}${priceLowToHighPath}`)
    .expect.element('@sortByDropdown').text.to.match(/^Sort by: Price \(low to high\)/)
  },

  'Verify Name A To Z': browser => {
    const aToZPath = '?sortby=sortpropertyname_asc'
    browser.page.small.gridSearch().click('@sortByDropdown').click('@aToZ')
    .waitForURLEquals(`${browser.launchUrl}${listSearchPath}${aToZPath}`)
    .expect.element('@sortByDropdown').text.to.match(/^Sort by: Name \(A to Z\)/)
  },

  'Verify Name Z To A': browser => {
    const zToAPath = '?sortby=sortpropertyname_desc'
    browser.page.small.gridSearch().click('@sortByDropdown').click('@zToA')
    .waitForURLEquals(`${browser.launchUrl}${listSearchPath}${zToAPath}`)
    .expect.element('@sortByDropdown').text.to.match(/^Sort by: Name \(Z to A\)/)
  },

  'Verify Ratings High To Low': browser => {
    const ratingsHighToLowPath = '?sortby=avgoverallrating-desc'
    browser.page.small.gridSearch().click('@sortByDropdown').click('@ratingsHighToLow')
    .waitForURLEquals(`${browser.launchUrl}${listSearchPath}${ratingsHighToLowPath}`)
    .expect.element('@sortByDropdown').text.to.match(/^Sort by: Ratings \(high to low\)/)
    browser.page.small.gridSearch().section.firstStandardListing
    .expect.element('@ratings').to.be.visible.before(30000)
  },

  'Verify Ratings Low To High': browser => {
    const ratingsLowToHighPath = '?sortby=avgoverallrating-asc'
    browser.page.small.gridSearch().click('@sortByDropdown').click('@ratingsLowToHigh')
    .waitForURLEquals(`${browser.launchUrl}${listSearchPath}${ratingsLowToHighPath}`)
    .expect.element('@sortByDropdown').text.to.match(/^Sort by: Ratings \(low to high\)/)
    browser.page.small.gridSearch().section.firstStandardListing
    .expect.element('@ratings').to.be.visible.before(30000)
  },

  'Verify Best Match Again': browser => {
    browser.page.small.gridSearch().click('@sortByDropdown').click('@bestMatch')
    browser.page.small.gridSearch().waitForElementVisible('@sortByDropdown')
    .waitForURLEquals(`${browser.launchUrl}${listSearchPath}`)
    .expect.element('@sortByDropdown').text.to.match(/^Sort by: Best Match/)
  },
}
