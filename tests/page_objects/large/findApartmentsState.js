const stateApartmentCommands = {
  clickState: (browser, state) => {
    browser.click(`[href*="/apartments/${state}/"]`)
  },
}

module.exports = {
  elements: {
    landerStateLinks: '[data-test-id=lander-state-links]',
    stateMainHeading: '[data-test-id=main-heading]',
  },
  commands: [stateApartmentCommands],
}
