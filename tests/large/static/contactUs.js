const contactDefaults = {
  Address: {
    name: 'RentPath, LLC',
    street: '950 E. Paces Ferry Road NE',
    suite: 'Suite 2600',
    city: 'Atlanta, GA 30326',
    phone: 'Phone:678.421.3000',
    phonetf: 'Toll Free:800.216.1423',
  },
  phoneSales: '877.394.9599',
  phoneBilling: '866.236.2510',
  emailSales: 'sales@rentpath.com',
  emailPr: 'Press@Rentpath.com',
  rentpathPhone: '678.421.3000',
  tollFreePhone: '800.216.1423',
}

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
      .url(`${browser.launchUrl}/contact-us/`)
      .waitForURLEquals(`${browser.launchUrl}/contact-us/`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate URL': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/contact-us/`)
  },

  'Validate meta': browser => {
    browser.page.shared.headTags().validate({
      meta: {
        robots: false,
        'google-site-verification': 'T94mHHYjhN6ZNauF_BWnisWkFRqLMWW_zkRXM-4wrlU',
        description: 'Apartments for rent and rentals with photos and floor plans. ' +
          'Free apartment finder and rentals search at ApartmentGuide.com. ' +
          'Find an apartment located in the neighborhood that works best for you, ' +
          'with Apartment Guide’s detailed community information. ApartmentGuide.com-Official Site',
      },
      canonical: `${browser.launchUrl}/contact-us/`,
    })
  },

  'Validate header': browser => {
    browser.page.large.header().validate(`${browser.launchUrl}/`, null, false)
  },

  'Validate page content': browser => {
    const content = browser.page.large.contactUs()

    browser.assert.textExists(content.elements.headline)
    browser.assert.textExists(content.elements.contactBody)
    // address info
    browser.assert.textExists(content.elements.contactAddress)
    content.expect.element('@contactAddress').text().contains(contactDefaults.Address.name)
    content.expect.element('@contactAddress').text().contains(contactDefaults.Address.street)
    content.expect.element('@contactAddress').text().contains(contactDefaults.Address.suite)
    content.expect.element('@contactAddress').text().contains(contactDefaults.Address.city)
    content.expect.element('@contactAddress').text().contains(contactDefaults.Address.phone)
    content.expect.element('@contactAddress').text().contains(contactDefaults.Address.phonetf)

    content.expect.element('@contactPhoneRP').text().to.be.eq(contactDefaults.rentpathPhone)
    content.expect.element('@contactPhoneTF').text().to.be.eq(contactDefaults.tollFreePhone)

    // phones + email for sales, PR + Billing
    content.expect.element('@contactPhoneBilling').text().to.contains(contactDefaults.phoneBilling)
    content.expect.element('@contactPhoneSales').text().to.be.eq(contactDefaults.phoneSales)
    content.expect.element('@contactEmailSales').text().to.be.eq(contactDefaults.emailSales)
    content.expect.element('@contactEmailPR').text().to.be.eq(contactDefaults.emailPr)

    // test map
    content.expect.element('@MapImage').attribute('src').to.be.present.after(0)
    content.expect.element('@MapImage').to.be.visible.after(0)
  },

  'Validate footer': browser => {
    browser.page.large.footer().validate(browser)
  },
}
