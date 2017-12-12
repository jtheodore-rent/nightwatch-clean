const pdpPath = '/apartments/Alaska/Yakutat/The-Grand-at-Dunwoody/100022110/'

module.exports = {
  tags: ['stableChrome', 'stableFirefox', 'critical', 'stableProd'],
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
      .url(`${browser.launchUrl}${pdpPath}`)
      .waitForURLEquals(`${browser.launchUrl}${pdpPath}`)
      .waitForElementVisible('#react-view')
  },

  after: browser => {
    browser.customSauceEnd()
  },
  'Validate image carousel': browser => {
    const pdp = browser.page.large.pdp()
    pdp.expect.section('@imageCarousel').to.be.visible.before(1000)
    pdp.section.imageCarousel.expect.element('@image1').to.be.visible.before(1000)
    pdp.section.imageCarousel.expect.element('@imageIndex').text.to.equal(1)
  },

  'Validate clicking the next arrow increments the photo': browser => {
    const carousel = browser.page.large.pdp().section.imageCarousel
    carousel.click('@nextArrow', () => {
      carousel.expect.element('@image2').to.be.visible.before(1000)
      carousel.expect.element('@imageIndex').text.to.equal(2)
    })
  },

  'Validate clicking the previous arrow decrements the photo': browser => {
    const carousel = browser.page.large.pdp().section.imageCarousel
    carousel.click('@previousArrow', () => {
      carousel.expect.element('@image1').to.be.visible.before(1000)
      carousel.expect.element('@imageIndex').text.to.equal(1)
    })
  },

  'Validate we can cycle to the last image from the first image': browser => {
    const carousel = browser.page.large.pdp().section.imageCarousel
    carousel.getText('@imageCount', imageCount => {
      const selector = `//*[@data-test-id='background-image-${imageCount.value - 1}'][2]`
      carousel.click('@previousArrow', () => {
        carousel.expect.element('@dfpAdSlots').to.be.visible.before(1000)
        carousel.click('@previousArrow', () => {
          browser.useXpath().expect.element(selector).to.be.visible.before(1000)
          carousel.expect.element('@imageIndex').text.to.equal(imageCount.value)
        })
      })
    })
  },

  'Validate we can cycle to the first image from the last image': browser => {
    const carousel = browser.page.large.pdp().section.imageCarousel
    carousel.click('@nextArrow', () => {
      carousel.expect.element('@dfpAdSlots').to.be.visible.before(1000)
      carousel.click('@nextArrow', () => {
        carousel.expect.element('@image1').to.be.visible.before(1000)
        carousel.expect.element('@imageIndex').text.to.equal(1)
      })
    })
  },
}
