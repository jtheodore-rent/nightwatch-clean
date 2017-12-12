const leadFormContainerSelector = '[data-test-id=floorplan-modal]'
const nameLabelSelector = `${leadFormContainerSelector} label[for=name]`
const bedsLabelSelector = `${leadFormContainerSelector} label[for=beds]`
const bathsLabelSelector = `${leadFormContainerSelector} label[for=baths]`
const priceRangeLabelSelector = `${leadFormContainerSelector} label[for=priceRange]`
const moveReasonLabelSelector = `${leadFormContainerSelector} label[for=reasonForMove]`
const confirmEmailSelector = `${leadFormContainerSelector} label[for=confirmEmail]`

const leadFormCommands = {
  verifyHeading: leadFormContainer => {
    leadFormContainer.expect.element('@heading').to.be.visible.after(0)
    leadFormContainer.expect.element('@heading').text.to
      .match(/Available Today|Available [A-Z][a-z]{2} \d{2}|Contact for Availability|\d+ Units? Available/)
  },
  verifyNameInput: (browser, args) => {
    const leadForm = browser.page.large.emailLeadFormFloorplan()
    const leadFormContainer = leadForm.section.leadFormContainer
    browser.element('css selector', nameLabelSelector, result => {
      if (result.status !== -1) {
        leadFormContainer.expect.element('@nameLabel').to.be.visible.after(0)
        leadFormContainer.expect.element('@nameLabel').text.to.equal('Your Name')
        leadFormContainer.expect.element('@nameInput').to.be.visible.after(0)
        leadFormContainer.expect.element('@nameInput').attribute('value').to.equal(args.name)
      } else {
        leadForm.verifyFirstNameInput(leadFormContainer, args.firstName)
        leadForm.verifyLastNameInput(leadFormContainer, args.lastName)
      }
    })
  },
  verifyFirstNameInput: (leadFormContainer, name) => {
    leadFormContainer.expect.element('@firstNameLabel').to.be.visible.after(0)
    leadFormContainer.expect.element('@firstNameLabel').text.to.equal('First Name')
    leadFormContainer.expect.element('@firstNameInput').to.be.visible.after(0)
    leadFormContainer.expect.element('@firstNameInput').attribute('value').to.equal(name)
  },
  verifyLastNameInput: (leadFormContainer, name) => {
    leadFormContainer.expect.element('@lastNameLabel').to.be.visible.after(0)
    leadFormContainer.expect.element('@lastNameLabel').text.to.equal('Last Name')
    leadFormContainer.expect.element('@lastNameInput').to.be.visible.after(0)
    leadFormContainer.expect.element('@lastNameInput').attribute('value').to.equal(name)
  },
  verifyEmailInput: (leadFormContainer, email) => {
    leadFormContainer.expect.element('@emailLabel').to.be.visible.after(0)
    leadFormContainer.expect.element('@emailLabel').text.to.equal('Email Address')
    leadFormContainer.expect.element('@emailInput').to.be.visible.after(0)
    leadFormContainer.expect.element('@emailInput').attribute('value').to.equal(email)
  },
  verifyConfirmEmailInput: (leadFormContainer, email) => {
    leadFormContainer.expect.element('@confirmEmailLabel').to.be.visible.after(0)
    leadFormContainer.expect.element('@confirmEmailLabel').text.to.equal('Confirm Email')
    leadFormContainer.expect.element('@confirmEmailInput').to.be.visible.after(0)
    leadFormContainer.expect.element('@confirmEmailInput').attribute('value').to.equal(email)
  },
  verifyPhoneInput: (leadFormContainer, phone) => {
    leadFormContainer.expect.element('@phoneLabel').to.be.visible.after(0)
    leadFormContainer.expect.element('@phoneLabel').text.to.equal('Phone Number')
    leadFormContainer.expect.element('@phoneInput').to.be.visible.after(0)
    if (phone === '') {
      leadFormContainer.expect.element('@phoneInput').attribute('value').to.equal(phone)
    } else {
      const phoneFormatted = `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`
      leadFormContainer.expect.element('@phoneInput').attribute('value').to.equal(phoneFormatted)
    }
  },
  verifyBedsSelection: (leadFormContainer, bedsSelection) => {
    if (bedsSelection) {
      const unselectedBedOptions = ['Studio', '1', '2', '3', '4', '5Plus']

      if (unselectedBedOptions.indexOf(bedsSelection) !== -1) {
        unselectedBedOptions.splice(unselectedBedOptions.indexOf(bedsSelection), 1)
      }
      unselectedBedOptions.forEach(option => {
        leadFormContainer.expect.element(`@beds${option}Option`).to.not.have.attribute('selected')
      })
      if (bedsSelection !== '') {
        leadFormContainer.expect.element(`@beds${bedsSelection}Option`)
          .to.have.attribute('selected')
      }
    }
  },
  verifyBedsSection: (leadForm, bedsSelection) => {
    const leadFormContainer = leadForm.section.leadFormContainer
    leadFormContainer.expect.element('@bedsLabel').to.be.visible.after(0)
    leadFormContainer.expect.element('@bedsLabel').text.to.equal('Beds')
    leadFormContainer.expect.element('@bedsStudioOption').to.be.visible.after(0)
    leadFormContainer.expect.element('@beds1Option').to.be.visible.after(0)
    leadFormContainer.expect.element('@beds2Option').to.be.visible.after(0)
    leadFormContainer.expect.element('@beds3Option').to.be.visible.after(0)
    leadFormContainer.expect.element('@beds4Option').to.be.visible.after(0)
    leadFormContainer.expect.element('@beds5PlusOption').to.be.visible.after(0)
    leadForm.verifyBedsSelection(leadFormContainer, bedsSelection)
  },
  verifyBathsSelection: (leadFormContainer, bathsSelection) => {
    if (bathsSelection) {
      const unselectedBathOptions = ['1', '2', '3Plus']

      if (unselectedBathOptions.indexOf(bathsSelection) !== -1) {
        unselectedBathOptions.splice(unselectedBathOptions.indexOf(bathsSelection), 1)
      }
      unselectedBathOptions.forEach(option => {
        leadFormContainer.expect.element(`@baths${option}Option`).to.not.have.attribute('selected')
      })
      if (bathsSelection !== '') {
        leadFormContainer.expect.element(`@baths${bathsSelection}Option`)
          .to.have.attribute('selected')
      }
    }
  },
  verifyBathsSection: (leadForm, bathsSelection) => {
    const leadFormContainer = leadForm.section.leadFormContainer
    leadFormContainer.expect.element('@bathsLabel').to.be.visible.after(0)
    leadFormContainer.expect.element('@bathsLabel').text.to.equal('Baths')
    leadFormContainer.expect.element('@baths1Option').to.be.visible.after(0)
    leadFormContainer.expect.element('@baths2Option').to.be.visible.after(0)
    leadFormContainer.expect.element('@baths3PlusOption').to.be.visible.after(0)
    leadForm.verifyBathsSelection(leadFormContainer, bathsSelection)
  },
  verifyMessageTextArea: (leadFormContainer, message) => {
    leadFormContainer.expect.element('@messageLabel').to.be.visible.after(0)
    leadFormContainer.expect.element('@messageLabel').text.to.equal('Message')
    leadFormContainer.expect.element('@messageTextArea').to.be.visible.after(0)
    leadFormContainer.expect.element('@messageTextArea').attribute('value').to.equal(message)
  },
  verifyNewsLetterOptIn: (leadFormContainer, newsLetterOptIn) => {
    leadFormContainer.expect.element('@newsLetterCheckBox').to.be.visible.after(0)
    leadFormContainer.expect.element('@newsLetterCheckBox').attribute('value')
      .to.equal(newsLetterOptIn)
    leadFormContainer.expect.element('@newsLetterLabel').to.be.visible.after(0)
    leadFormContainer.expect.element('@newsLetterLabel').text.to
      .equal('Stay in-the-know with our e-newsletter and local community special offers.')
  },
  verifySendButton: leadFormContainer => {
    leadFormContainer.expect.element('@sendButton').to.be.visible.after(0)
    leadFormContainer.expect.element('@sendButton').attribute('value').to.equal('Send')
  },
  validateLeadForm: (browser, args) => {
    const leadForm = browser.page.large.emailLeadFormFloorplan()
    const leadFormContainer = leadForm.section.leadFormContainer
    leadForm.verifyHeading(leadFormContainer)
    if (args.listingName) {
      leadFormContainer.expect.element('@propertyName').text.to.equal(args.listingName)
    }
    leadFormContainer.expect.element('@closeModal').to.be.visible.after(0)
    leadForm.verifyNameInput(browser, args)
    leadForm.verifyEmailInput(leadFormContainer, args.email)
    leadForm.verifyPhoneInput(leadFormContainer, args.phone)
    browser.element('css selector', bedsLabelSelector, result => {
      if (result.status !== -1) {
        leadForm.verifyBedsSection(leadForm, args.beds)
      }
    })
    browser.element('css selector', bathsLabelSelector, result => {
      if (result.status !== -1) {
        leadForm.verifyBathsSection(leadForm, args.baths)
      }
    })
    leadForm.verifyMessageTextArea(leadFormContainer, args.message)
    leadForm.verifyNewsLetterOptIn(leadFormContainer, args.newsLetterOptIn)
    leadForm.verifySendButton(leadFormContainer)
  },
  enterName: (browser, name) => {
    const leadForm = browser.page.large.emailLeadFormFloorplan()
    const leadFormContainer = leadForm.section.leadFormContainer
    browser.element('css selector', nameLabelSelector, result => {
      if (result.status !== -1) {
        leadFormContainer.clearValue('@nameInput', () => {
          leadFormContainer.setValue('@nameInput', name)
        })
      } else {
        leadForm.enterFirstName(leadFormContainer, name.split(' ')[0])
        leadForm.enterLastName(leadFormContainer, name.split(' ')[1])
      }
    })
  },
  enterFirstName: (leadFormContainer, name) => {
    leadFormContainer.clearValue('@firstNameInput', () => {
      leadFormContainer.setValue('@firstNameInput', name)
    })
  },
  enterLastName: (leadFormContainer, name) => {
    leadFormContainer.clearValue('@lastNameInput', () => {
      leadFormContainer.setValue('@lastNameInput', name)
    })
  },
  enterEmail: (leadFormContainer, email) => {
    if (email) {
      leadFormContainer.clearValue('@emailInput', () => {
        leadFormContainer.setValue('@emailInput', email)
      })
    }
  },
  enterConfirmEmail: (leadFormContainer, email) => {
    leadFormContainer.clearValue('@confirmEmailInput', () => {
      leadFormContainer.setValue('@confirmEmailInput', email)
    })
  },
  enterMoveDate: (leadFormContainer, moveDate) => {
    if (moveDate) {
      leadFormContainer.clearValue('@moveDateInput', () => {
        leadFormContainer.setValue('@moveDateInput', moveDate)
      })
    }
  },
  enterPhone: (leadFormContainer, phone) => {
    if (phone) {
      leadFormContainer.clearValue('@phoneInput', () => {
        leadFormContainer.setValue('@phoneInput', phone)
      })
    }
  },
  selectBeds: (leadFormContainer, beds) => {
    leadFormContainer.click(`@beds${beds}Option`)
  },
  selectBaths: (leadFormContainer, baths) => {
    leadFormContainer.click(`@baths${baths}Option`)
  },
  selectMoveReason: (leadFormContainer, moveReason) => {
    leadFormContainer.click(`@moveReason${moveReason}Option`)
  },
  selectPriceRange: (leadFormContainer, priceRange) => {
    leadFormContainer.click(`@priceRange${priceRange}Option`)
  },
  enterMessage: (leadFormContainer, message) => {
    leadFormContainer.clearValue('@messageTextArea', () => {
      leadFormContainer.setValue('@messageTextArea', message)
    })
  },
  fillOutLeadForm: (browser, args) => {
    const leadForm = browser.page.large.emailLeadFormFloorplan()
    const leadFormContainer = leadForm.section.leadFormContainer
    leadForm.enterName(browser, args.name)
    leadForm.enterEmail(leadFormContainer, args.email)
    browser.element('css selector', confirmEmailSelector, result => {
      if (result.status !== -1) {
        leadForm.enterConfirmEmail(leadFormContainer, args.email)
      }
    })
    leadForm.enterPhone(leadFormContainer, args.phone)

    if (args.beds) {
      browser.element('css selector', bedsLabelSelector, result => {
        if (result.status !== -1) {
          leadForm.selectBeds(leadFormContainer, args.beds)
        }
      })
    }

    if (args.baths) {
      browser.element('css selector', bathsLabelSelector, result => {
        if (result.status !== -1) {
          leadForm.selectBaths(leadFormContainer, args.baths)
        }
      })
    }

    if (args.moveReason) {
      browser.element('css selector', moveReasonLabelSelector, result => {
        if (result.status !== -1) {
          leadForm.selectMoveReason(leadFormContainer, args.moveReason)
        }
      })
    }

    browser.element('css selector', priceRangeLabelSelector, result => {
      if (result.status !== -1) {
        leadForm.selectPriceRange(leadFormContainer, args.priceRange)
      }
    })

    if (args.message) {
      leadForm.enterMessage(leadFormContainer, args.message)
    }

    if (args.moveDate) {
      leadForm.enterMoveDate(leadFormContainer, args.moveDate)
    }
  },
  submitValidLeadForm: leadForm => {
    leadForm.section.leadFormContainer.click('@sendButton', () => {
      leadForm.waitForElementVisible('@leadSuccessModal')
    })
  },
  fillVerifyAndSubmitLeadForm: (browser, args) => {
    const leadForm = browser.page.large.emailLeadFormFloorplan()
    leadForm.fillOutLeadForm(browser, args)
    leadForm.validateLeadForm(browser, args)
    leadForm.submitValidLeadForm(leadForm)
  },
}
module.exports = {
  elements: {
    leadSuccessModal: '[data-test-id=lead-success-modal]',
  },
  sections: {
    leadFormContainer: {
      selector: leadFormContainerSelector,
      elements: {
        leadSuccessModal: '[data-test-id=lead-success-modal]',
        heading: 'h3[data-test-id=lead-form-heading]',
        closeModal: '[data-test-id=closeModal] use',
        propertyName: '[data-test-id=lead-form-propertyname]',
        inlinePhoneNumber: '[data-test-id=lead-form-sidebar] [data-test-id=phone]',
        nameLabel: nameLabelSelector,
        nameInput: 'input#name',
        firstNameLabel: 'label[for=firstName]',
        firstNameInput: 'input#firstName',
        lastNameLabel: 'label[for=lastName]',
        lastNameInput: 'input#lastName',
        emailLabel: 'label[for=email]',
        emailInput: 'input#email',
        confirmEmailLabel: 'label[for=confirmEmail]',
        confirmEmailInput: 'input#confirmEmail',
        moveDateLabel: 'label[for=moveDate]',
        moveDateInput: 'input[name=moveDate]',
        phoneLabel: 'label[for=phone]',
        phoneInput: 'input#phone',
        bedsLabel: bedsLabelSelector,
        bedsStudioOption: '[data-test-id=beds-option-Studio-select]',
        beds1Option: '[data-test-id=beds-option-1-select]',
        beds2Option: '[data-test-id=beds-option-2-select]',
        beds3Option: '[data-test-id=beds-option-3-select]',
        beds4Option: '[data-test-id=beds-option-4-select]',
        beds5PlusOption: '[data-test-id="beds-option-5+-select"]',
        bathsLabel: bathsLabelSelector,
        baths1Option: '[data-test-id=baths-option-1-select]',
        baths2Option: '[data-test-id=baths-option-2-select]',
        baths3PlusOption: '[data-test-id="baths-option-3+-select"]',
        priceRangeAnyTo500Option: '[data-test-id="priceRange-option-Any-$500-select"]',
        priceRange500To700Option: '[data-test-id="priceRange-option-$500-$700-select"]',
        priceRange700To900Option: '[data-test-id="priceRange-option-$700-$900-select"]',
        priceRange900To1100Option: '[data-test-id="priceRange-option-$900-$1100-select"]',
        priceRange1100To1300Option: '[data-test-id="priceRange-option-$1100-$1300-select"]',
        priceRange1300To1500Option: '[data-test-id="priceRange-option-$1300-$1500-select"]',
        priceRange1500To2000Option: '[data-test-id="priceRange-option-$1500-$2000-select"]',
        priceRange2000To2500Option: '[data-test-id="priceRange-option-$2000-$2500-select"]',
        priceRange2500To3000Option: '[data-test-id="priceRange-option-$2500-$3000-select"]',
        priceRange3000To4000Option: '[data-test-id="priceRange-option-$3000-$4000-select"]',
        priceRange4000To5000Option: '[data-test-id="priceRange-option-$4000-$5000-select"]',
        priceRange5000ToAnyOption: '[data-test-id="priceRange-option-$5000-Any-select"]',
        moveReasonLabel: moveReasonLabelSelector,
        moveReasonFinancialOption: '[data-test-id="reasonForMove-option-Financial-select"]',
        moveReasonRelocationOption: '[data-test-id="reasonForMove-option-Relocation-select"]',
        moveReasonFamilyEventOption: '[data-test-id="reasonForMove-option-Family Event-select"]',
        moveReasonJobChangeOption: '[data-test-id="reasonForMove-option-Job Change-select"]',
        moveReasonOtherOption: '[data-test-id="reasonForMove-option-Other-select"]',
        messageLabel: 'label[for=message]',
        messageTextArea: '[data-test-id=message]',
        newsLetterCheckBox: '[data-test-id=optInNewsletter]',
        newsLetterLabel: '[data-test-id=optInNewsletter-label]',
        sendButton: '[data-tag_item=send_button]',
        couponText: '[data-test-id=coupon-text]',
      },
    },
  },
  commands: [leadFormCommands],
}
