// Listing Info
const basePdpPath = '/apartments/Alaska/Yakutat/The-Grand-at-Dunwoody/100022110/'
const listingCity = basePdpPath.split('/')[3]
const listingNameDashed = basePdpPath.split('/')[4]
const listingNameEnglish = listingNameDashed.replace(/-/g, ' ')
// Test Data
const listingNameHtml = encodeURIComponent(listingNameEnglish)
const listingPathHtml = encodeURIComponent(basePdpPath)
const androidListingNameHtml = encodeURIComponent(listingNameHtml)
const androidListingPathHtml = encodeURIComponent(listingPathHtml)
const schemaData = {
  name: listingNameEnglish,
  street: '523 Mallott Ave',
  locality: listingCity,
  state: 'AK',
  zip: '99689',
  phone: '(877) 425-4518',
  lat: '59.5498',
  long: '-139.7314',
}
const headerData = {
  name: listingNameEnglish,
  address: '523 Mallott Ave, Yakutat, AK 99689',
  price: '$750+',
  beds: '1–3 Beds',
  telHref: 'tel:8774254518',
}
const shareData = {
  uriEncodedName: listingNameHtml,
  listingRoute: listingPathHtml,
  androidUriEncodedName: androidListingNameHtml,
  androidListingRoute: androidListingPathHtml,
  imageURL: 'https%3A%2F%2Fimage.apartmentguide.com%2Fimgr%2F993d3b6eb5798972f2b81cb3c6af52c0%2F1080', // eslint-disable-line max-len
}

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
      .url(`${browser.launchUrl}${basePdpPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Switch to Floor Plans tab': browser => {
    browser.page.small.propertyCard().click('@floorPlansButtonImage')
    browser.page.small.propertyCard().section.floorPlans.waitForElementVisible('@floorPlan')
  },

  'Validate Floor Plans tab': browser => {
    const floorPlanData = [
      {
        fpSection: browser.page.small.floorplans().section.firstFloorplan,
        title: 'winter',
        price: '$1,000',
        beds: '2 Beds',
        baths: '1 Bath',
        sqft: '1090+ sqft',
      },
      {
        fpSection: browser.page.small.floorplans().section.secondFloorplan,
        title: 'autumn',
        price: '$1,050',
        beds: '2 Beds',
        baths: '2 Bath',
        sqft: '1150+ sqft',
      },
    ]
    browser.assert.urlEquals(`${browser.launchUrl}${basePdpPath}#floor-plans`)
    const pdpCard = browser.page.small.propertyCard()
    pdpCard.validateSchemaTags(pdpCard, schemaData)
    pdpCard.validateHeader(pdpCard, headerData)
    pdpCard.validateFooter(pdpCard)
    pdpCard.validateFloorPlans(browser, floorPlanData)
  },

  'Save on Floor Plans Tab': browser => {
    const pdpCard = browser.page.small.propertyCard()
    pdpCard.savePropAndValidate(pdpCard)
  },

  'Unsave on Floor Plans Tab': browser => {
    const pdpCard = browser.page.small.propertyCard()
    pdpCard.unSavePropAndValidate(pdpCard)
  },

  'Open Share Floor Plans': browser => {
    browser.page.small.propertyCard().click('@shareButtonImage')
    browser.page.small.propertyCard().section
      .shareProperty.waitForElementVisible('@shareFacebook')
  },

  'Validate Share Floor Plans': browser => {
    browser.page.small.propertyCard().validateShareOpen(browser, shareData, 'floor-plans')
  },

  'Close Share Floor Plans': browser => {
    browser.page.small.propertyCard().section.shareProperty
      .click('@closeButton').waitForElementNotPresent('@shareFacebook')
  },

  'Switch back to to Photos Plans tab': browser => {
    browser.page.small.propertyCard().click('@photosButtonImage')
    browser.page.small.propertyCard().section.photos.waitForElementVisible('@photoGalleryImage')
  },
}
