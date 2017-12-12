exports.assertion = function(listingSection, expectedBedCount, listingName) {
  this.message = `Testing if ${listingName} bed count is ${expectedBedCount}`
  this.expected = expectedBedCount
  this.pass = value => (value === this.expected)
  this.value = result => result
  this.command = callback => {
    listingSection.getText('@details', listingDetails => {
      const bedsComponent = listingDetails.value.split(' | ')[1]
      callback(bedsComponent)
    })
  }
}
