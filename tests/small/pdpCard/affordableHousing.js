const basePdpPath = '/apartments/Alaska/Yakutat/Sunset-Landing/184725/'

module.exports = {
  tags: ['stableAndroid', 'stableIOS', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}${basePdpPath}`)
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

  'Switch to Details tab': browser => {
    browser.page.small.propertyCard().click('@detailsButtonImage')
    browser.page.small.propertyCard().section.details.waitForElementVisible('@officeHoursHeading')
  },

  'Validate Affordable Housing': browser => {
    const incomeRestrictions = [
      {
        maxOccupants: '4',
        maxAnnualIncome: '$36,999',
      },
      {
        maxOccupants: '6',
        maxAnnualIncome: '$58,322',
      },
    ]
    browser.page.small.propertyCard().validateIncomeRestrictions(browser, incomeRestrictions)
  },
}
