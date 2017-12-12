const cityApartmentCommands = {
  clickCity: (browser, state, city) => {
    browser.click(`[href*="/apartments/${state}/${city}/"]`)
  },
  clickLetterLink: (browser, letter) => {
    browser.click(`[data-test-id="letter-link-${letter}"]`)
  },
}

module.exports = {
  elements: {
  },
  commands: [cityApartmentCommands],
}
