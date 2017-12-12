const basePdpPath = '/apartments/Alaska/Yakutat/Sunset-Landing/184725/'

module.exports = {
  tags: ['stableChrome', 'stableFirefox', 'stableProd'],
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .setCookie({
        name: 'ui',
        value: 'adaptive',
        path: '/',
      })
      .setCookie({
        name: 'optimizelyOptOut',
        value: 'true',
        path: '/',
      })
      .url(`${browser.launchUrl}${basePdpPath}`)
      .waitForURLEquals(`${browser.launchUrl}${basePdpPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
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
    browser.page.large.pdp().validateIncomeRestrictions(browser, incomeRestrictions)
  },
}
