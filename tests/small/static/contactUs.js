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
  tags: ['critical', 'stableAndroid', 'stableIOS', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .refresh()
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Open Nav Menu and click Contact Us Link': browser => {
    browser.page.small.navMenu().openNavMenuAndClickLink(browser, '@contactUsLink')
  },

  'Validate URL': browser => {
    browser.assert.urlEquals(`${browser.launchUrl}/contact-us/`)
  },

  'Validate header': browser => {
    browser.page.small.header().validate(`${browser.launchUrl}/`, browser)
  },

  'Validate page content': browser => {
    const content = browser.page.small.contactUs()

    browser.assert.textExists(content.elements.headline)
    browser.assert.textExists(content.elements.contactBody)

    // general info
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
    content.expect.element('@contactEmailSales').text().to.be.eq(contactDefaults.emailSales)
    content.expect.element('@contactPR').text().to.contains(contactDefaults.emailPr)

    // test map
    content.expect.element('@MapImage').attribute('src').to.be.present.after(0)
    content.expect.element('@MapImage').to.be.visible.after(0)
  },

  'Validate page footer': browser => {
    browser.page.small.footer().validate(`${browser.launchUrl}/`)
  },
}
