module.exports = {
  before: browser => {
    browser
      .url(`${browser.launchUrl}/map/?city=Atlanta&state=Georgia`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.end()
  },

  'Click Random Check Availability Button': browser => {
    browser.elements('css selector', "button[data-test-id='check_availability_button']",
      result => {
        const randomIndex = Math.floor(Math.random() * result.value.length)
        browser.elementIdClick(result.value[randomIndex].ELEMENT, () => {
          // Assertions go here
        })
      })
  },
}
