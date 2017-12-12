// Listing Info
const basePdpPath = '/apartments/Alaska/Yakutat/The-Grand-at-Dunwoody/100022110/'
const listingCity = basePdpPath.split('/')[3]
const listingNameDashed = basePdpPath.split('/')[4]
const listingNameEnglish = listingNameDashed.replace(/-/g, ' ')
const listingCoupon = 'Yakutat Mobile Coupon'
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

  'Switch to Details tab': browser => {
    browser.page.small.propertyCard().click('@detailsButtonImage')
    browser.page.small.propertyCard().section.details.waitForElementVisible('@officeHoursHeading')
  },

  'Validate Details tab': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}${basePdpPath}#details`)
    const pdpCard = browser.page.small.propertyCard()
    pdpCard.validateSchemaTags(pdpCard, schemaData)
    pdpCard.validateHeader(pdpCard, headerData)
    pdpCard.validateFooter(pdpCard)
    pdpCard.validateDetails(browser, {
      officeHours: {
        1: '7:00am - 5:00pm',
        2: '7:00am - 5:00pm',
        3: '7:00am - 5:00pm',
        4: '7:00am - 5:00pm',
        5: '7:00am - 5:00pm',
        other: 'We are a pet friendly community! Ask about our restrictions and deposits!',
      },
      couponText: listingCoupon,
      description: "At The Grand at Dunwoody you can have it all! Anyone who is looking for an active and lively community you have come to the right place. We have weekly game nights along with seasonal sport leagues. We have a great mountain view scenery with a 2 mile long hiking trail. Don't miss your chance to finally LIVE!!!", // eslint-disable-line max-len
      amenities: {
        pets: '3',
        apartmentFeatures: '6+',
        communityFeatures: '6+',
        specialFeatures: '6+',
        additionalFeatures: '5',
      },
    })
  },

  'Save on Details Tab': browser => {
    const pdpCard = browser.page.small.propertyCard()
    pdpCard.savePropAndValidate(pdpCard)
  },

  'Unsave on Details Tab': browser => {
    const pdpCard = browser.page.small.propertyCard()
    pdpCard.unSavePropAndValidate(pdpCard)
  },

  'Open Share Details': browser => {
    browser.page.small.propertyCard().click('@shareButtonImage')
    browser.page.small.propertyCard().section
      .shareProperty.waitForElementVisible('@shareFacebook')
  },

  'Validate Share Details': browser => {
    browser.page.small.propertyCard().validateShareOpen(browser, shareData, 'details')
  },

  'Close Share Details': browser => {
    browser.page.small.propertyCard().section.shareProperty
      .click('@closeButton').waitForElementNotPresent('@shareFacebook')
  },
}
