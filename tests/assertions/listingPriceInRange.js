exports.assertion = function(listingSection, minPrice, maxPrice, listingName) {
  this.message = `Testing if ${listingName} price in range`
  this.expected = true
  this.pass = value => (value === this.expected)
  this.value = result => {
    if (result.from) {
      return result.from <= maxPrice
    } else if (result.to) {
      return result.to >= minPrice
    }
    return result.priceLow <= maxPrice && result.priceHigh >= minPrice
  }
  this.command = callback => {
    listingSection.getText('@price', listingDetails => {
      const priceComponent = listingDetails.value
      if (priceComponent.includes('From')) {
        const fromPrice = parseInt(priceComponent.split('$')[1], 10)
        const fromPriceResult = {
          from: fromPrice,
        }
        callback(fromPriceResult)
      } else if (priceComponent.includes('To')) {
        const toPrice = parseInt(priceComponent.split('$')[1], 10)
        const toPriceResult = {
          to: toPrice,
        }
        callback(toPriceResult)
      } else {
        const priceLowerBound = parseInt(priceComponent.split('$')[1].split('–')[0], 10)
        const priceUpperBound = parseInt(priceComponent.split('$')[2], 10)
        const prices = {
          priceLow: priceLowerBound,
          priceHigh: priceUpperBound,
        }
        callback(prices)
      }
    })
  }
}
