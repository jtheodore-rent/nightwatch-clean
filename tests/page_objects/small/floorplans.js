const floorplanElementXPath = '//div[@data-test-id="pdp-floor-plans-floor-plan"]'
const floorplanElements = {
  floorplanTitle: '[data-test-id=floorplan-title]',
  floorplanPrice: '[data-test-id=floorplan-price]',
  floorplanBeds: '[data-test-id=floorplan-beds]',
  floorplanBaths: '[data-test-id=floorplan-baths]',
  floorplanSqft: '[data-test-id=floorplan-sqft]',
}

const floorplansCommands = {
  validateFloorplan: floorplanPackage => {
    const fpSection = floorplanPackage.fpSection
    fpSection.expect.element('@floorplanTitle').to.be.visible.before(30000)
    fpSection.expect.element('@floorplanTitle').text.to.equal(floorplanPackage.title)
    fpSection.expect.element('@floorplanPrice').to.be.visible.before(30000)
    fpSection.expect.element('@floorplanPrice').text.to.equal(floorplanPackage.price)
    fpSection.expect.element('@floorplanBeds').to.be.visible.before(30000)
    fpSection.expect.element('@floorplanBeds').text.to.equal(floorplanPackage.beds)
    fpSection.expect.element('@floorplanBaths').to.be.visible.before(30000)
    fpSection.expect.element('@floorplanBaths').text.to.equal(floorplanPackage.baths)
    fpSection.expect.element('@floorplanSqft').to.be.visible.before(30000)
    fpSection.expect.element('@floorplanSqft').text.to.equal(floorplanPackage.sqft)
  },
}
module.exports = {
  elements: {
  },
  sections: {
    firstFloorplan: {
      selector: `${floorplanElementXPath}[1]`,
      locateStrategy: 'xpath',
      elements: [
        floorplanElements,
      ],
    },
    secondFloorplan: {
      selector: `${floorplanElementXPath}[2]`,
      locateStrategy: 'xpath',
      elements: [
        floorplanElements,
      ],
    },
    thirdFloorplan: {
      selector: `${floorplanElementXPath}[3]`,
      locateStrategy: 'xpath',
      elements: [
        floorplanElements,
      ],
    },
    fourthFloorplan: {
      selector: `${floorplanElementXPath}[4]`,
      locateStrategy: 'xpath',
      elements: [
        floorplanElements,
      ],
    },
    fifthFloorplan: {
      selector: `${floorplanElementXPath}[5]`,
      locateStrategy: 'xpath',
      elements: [
        floorplanElements,
      ],
    },
    sixthFloorplan: {
      selector: `${floorplanElementXPath}[6]`,
      locateStrategy: 'xpath',
      elements: [
        floorplanElements,
      ],
    },
    seventhFloorplan: {
      selector: `${floorplanElementXPath}[7]`,
      locateStrategy: 'xpath',
      elements: [
        floorplanElements,
      ],
    },
  },
  commands: [floorplansCommands],
}
