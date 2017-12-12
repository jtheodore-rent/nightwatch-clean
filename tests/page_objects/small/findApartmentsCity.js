const cityApartmentCommands = {
  clickCity: (browser, state, city) => {
    browser.click(`[href*="/apartments/${state}/${city}/"]`)
  },
}

module.exports = {
  elements: {
  },
  commands: [cityApartmentCommands],
}
