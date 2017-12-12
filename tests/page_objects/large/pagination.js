const paginationCommands = {
  validatePage1: browser => {
    const pagination = browser.page.large.pagination()
    pagination.expect.element('@selectedPage').text.to.equal('1')
    pagination.expect.element('@prevBtn').to.not.have.attribute('href')
    pagination.expect.element('@nextBtn').to.have.attribute('href')
  },
  clickNext: (browser, listSearchPath, sortParameter) => {
    const pagination = browser.page.large.pagination()
    pagination.waitForElementVisible('@selectedPage')
    .getText('@selectedPage', selectedPagePackage => {
      const startingPageNumber = parseInt(selectedPagePackage.value, 10)
      // Pausing here seems to stabilize these tests
      browser.pause(1000).page.large.pagination()
      .getLocationInView('@nextBtn').click('@nextBtn', () => {
        const parameter = `?page=${startingPageNumber + 1}`
        const expectedPath = `${browser.launchUrl}${listSearchPath}${parameter}`

        if (sortParameter) {
          pagination.waitForURLEquals(`${expectedPath}&${sortParameter}`)
        } else {
          pagination.waitForURLEquals(`${expectedPath}`)
        }
      })
    })
  },
  validatePage2: browser => {
    const pagination = browser.page.large.pagination()
    pagination.expect.element('@selectedPage').text.to.equal('2')
    pagination.expect.element('@prevBtn').to.have.attribute('href')
    pagination.expect.element('@nextBtn').to.have.attribute('href')
  },
  clickPrevious: (browser, listSearchPath, sortParameter) => {
    const pagination = browser.page.large.pagination()
    pagination.getText('@selectedPage', selectedPagePackage => {
      const startingPageNumber = parseInt(selectedPagePackage.value, 10)
      const pageTwo = startingPageNumber === 2
      browser.pause(1000).page.large.pagination()
      .getLocationInView('@prevBtn').click('@prevBtn', () => {
        const parameter = pageTwo ? '' : `?page=${startingPageNumber - 1}`
        const sortOperater = pageTwo ? '?' : '&'
        const expectedPath = `${browser.launchUrl}${listSearchPath}${parameter}`

        if (sortParameter) {
          pagination.waitForURLEquals(`${expectedPath}${sortOperater}${sortParameter}`)
        } else {
          pagination.waitForURLEquals(`${expectedPath}`)
        }
      })
    })
  },
  clickPage5: (browser, listSearchPath) => {
    const pagination = browser.page.large.pagination()
    browser.pause(1000).page.large.pagination()
    .getLocationInView('@page5Btn').click('@page5Btn', () => {
      const parameter = '?page=5'
      pagination.waitForURLEquals(`${browser.launchUrl}${listSearchPath}${parameter}`)
    })
  },
  validatePage5: browser => {
    const pagination = browser.page.large.pagination()
    pagination.expect.element('@selectedPage').text.to.equal('5')
    pagination.expect.element('@prevBtn').to.have.attribute('href')
    pagination.expect.element('@nextBtn').to.have.attribute('href')
  },
  clickLastPage: (browser, listSearchPath) => {
    const pagination = browser.page.large.pagination()
    pagination.getText('@lastPageBtn', lastPage => {
      browser.pause(1000).page.large.pagination()
      .getLocationInView('@lastPageBtn').click('@lastPageBtn', () => {
        const parameter = `?page=${lastPage.value}`
        pagination.waitForURLEquals(`${browser.launchUrl}${listSearchPath}${parameter}`)
      })
    })
  },
  validateLastPage: browser => {
    const pagination = browser.page.large.pagination()
    pagination.expect.element('@prevBtn').to.have.attribute('href')
    pagination.expect.element('@nextBtn').to.not.have.attribute('href')
  },
}

module.exports = {
  commands: [paginationCommands],
  elements: {
    page1Btn: '[data-test-id=page-1-btn]',
    page5Btn: '[data-test-id=page-5-btn]',
    prevBtn: '[data-test-id=previous-page-btn]',
    nextBtn: '[data-test-id=next-page-btn]',
    lastPageBtn: '[data-test-id=last-page-btn]',
    selectedPage: '[data-test-id=selected-page]',
  },
}
