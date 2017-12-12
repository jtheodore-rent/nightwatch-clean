exports.assertion = function(listingSection, maxPrice, listingName) {
  this.message = `Testing if ${listingName} price uses plus format`
  this.expected = true
  this.pass = value => (value === this.expected)
  this.value = result => (
    result.priceLow <= maxPrice
  )
  this.command = callback => {
    listingSection.getText('@price', listingDetails => {
      const priceComponent = listingDetails.value
      const lowPriceString = priceComponent.split('$')[1].split('+')[0].replace(/,/g, '')
      const priceLowerBound = parseInt(lowPriceString, 10)
      const prices = {
        priceLow: priceLowerBound,
      }
      callback(prices)
    })
  }
}
