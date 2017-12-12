const stateApartmentCommands = {
  clickState: (browser, state) => {
    browser.click(`[href*="/apartments/${state}/"]`)
  },
}

module.exports = {
  elements: {
  },
  commands: [stateApartmentCommands],
}
