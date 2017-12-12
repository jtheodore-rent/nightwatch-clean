const unselectedTextRGBA = 'rgba(102, 102, 102, 1)'
const unselectedBackgroundRGBA = 'rgba(0, 0, 0, 0)'
const selectedTextRGBA = 'rgba(255, 255, 255, 1)'
const selectedBackgroundRGBA = 'rgba(74, 74, 74, 1)'

const nameLabelSelector = 'label[for=name]'
const bedsLabelSelector = 'label[for=beds]'
const bathsLabelSelector = 'label[for=baths]'

const leadFormCommands = {
  verifyHeading: leadForm => {
    leadForm.expect.element('@heading').to.be.visible.after(0)
    leadForm.expect.element('@heading').text.to.equal('Check Availability')
  },
  verifyNameInput: (browser, args) => {
    const leadForm = browser.page.small.emailLeadForm()
    browser.element('css selector', nameLabelSelector, result => {
      if (result.status !== -1) {
        leadForm.expect.element('@nameLabel').to.be.visible.after(0)
        leadForm.expect.element('@nameLabel').text.to.equal('Name')
        leadForm.expect.element('@nameInput').to.be.visible.after(0)
        leadForm.expect.element('@nameInput').attribute('value').to.equal(args.name)
      } else {
        leadForm.verifyFirstNameInput(leadForm, args.firstName)
        leadForm.verifyLastNameInput(leadForm, args.lastName)
      }
    })
  },
  verifyFirstNameInput: (leadForm, name) => {
    leadForm.expect.element('@firstNameLabel').to.be.visible.after(0)
    leadForm.expect.element('@firstNameLabel').text.to.equal('First Name')
    leadForm.expect.element('@firstNameInput').to.be.visible.after(0)
    leadForm.expect.element('@firstNameInput').attribute('value').to.equal(name)
  },
  verifyLastNameInput: (leadForm, name) => {
    leadForm.expect.element('@lastNameLabel').to.be.visible.after(0)
    leadForm.expect.element('@lastNameLabel').text.to.equal('Last Name')
    leadForm.expect.element('@lastNameInput').to.be.visible.after(0)
    leadForm.expect.element('@lastNameInput').attribute('value').to.equal(name)
  },
  verifyEmailInput: (leadForm, email) => {
    leadForm.expect.element('@emailLabel').to.be.visible.after(0)
    leadForm.expect.element('@emailLabel').text.to.equal('Email')
    leadForm.expect.element('@emailInput').to.be.visible.after(0)
    leadForm.expect.element('@emailInput').attribute('value').to.equal(email)
  },
  verifyPhoneInput: (leadForm, phone) => {
    leadForm.expect.element('@phoneLabel').to.be.visible.after(0)
    leadForm.expect.element('@phoneLabel').text.to.equal('Phone')
    leadForm.expect.element('@phoneInput').to.be.visible.after(0)
    if (phone === '') {
      leadForm.expect.element('@phoneInput').attribute('value').to.equal(phone)
    } else {
      const phoneFormatted = `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`
      leadForm.expect.element('@phoneInput').attribute('value').to.equal(phoneFormatted)
    }
  },
  verifyBedsSelection: (leadForm, bedsSelection) => {
    const unselectedBedOptions = ['St', '1', '2', '3', '4', '5Plus']

    if (unselectedBedOptions.indexOf(bedsSelection) !== -1) {
      unselectedBedOptions.splice(unselectedBedOptions.indexOf(bedsSelection), 1)
    }
    unselectedBedOptions.forEach(option => {
      leadForm.expect.element(`@beds${option}Button`).to.have.css('color')
        .which.equals(unselectedTextRGBA)
      leadForm.expect.element(`@beds${option}Button`).to.have.css('background-color')
        .which.equals(unselectedBackgroundRGBA)
    })
    if (bedsSelection !== '') {
      leadForm.expect.element(`@beds${bedsSelection}Button`).to.have.css('color')
        .which.equals(selectedTextRGBA)
      leadForm.expect.element(`@beds${bedsSelection}Button`).to.have.css('background-color')
        .which.equals(selectedBackgroundRGBA)
    }
  },
  verifyBedsSection: (leadForm, bedsSelection) => {
    leadForm.expect.element('@bedsLabel').to.be.visible.after(0)
    leadForm.expect.element('@bedsLabel').text.to.equal('Beds')
    leadForm.expect.element('@bedsStButton').to.be.visible.after(0)
    leadForm.expect.element('@beds1Button').to.be.visible.after(0)
    leadForm.expect.element('@beds2Button').to.be.visible.after(0)
    leadForm.expect.element('@beds3Button').to.be.visible.after(0)
    leadForm.expect.element('@beds4Button').to.be.visible.after(0)
    leadForm.expect.element('@beds5PlusButton').to.be.visible.after(0)
    leadForm.verifyBedsSelection(leadForm, bedsSelection)
  },
  verifyBathsSelection: (leadForm, bathsSelection) => {
    const unselectedBathOptions = ['1', '2', '3Plus']

    if (unselectedBathOptions.indexOf(bathsSelection) !== -1) {
      unselectedBathOptions.splice(unselectedBathOptions.indexOf(bathsSelection), 1)
    }
    unselectedBathOptions.forEach(option => {
      leadForm.expect.element(`@baths${option}Button`).to.have.css('color')
        .which.equals(unselectedTextRGBA)
      leadForm.expect.element(`@baths${option}Button`).to.have.css('background-color')
        .which.equals(unselectedBackgroundRGBA)
    })
    if (bathsSelection !== '') {
      leadForm.expect.element(`@baths${bathsSelection}Button`).to.have.css('color')
        .which.equals(selectedTextRGBA)
      leadForm.expect.element(`@baths${bathsSelection}Button`).to.have.css('background-color')
        .which.equals(selectedBackgroundRGBA)
    }
  },
  verifyBathsSection: (leadForm, bathsSelection) => {
    leadForm.expect.element('@bathsLabel').to.be.visible.after(0)
    leadForm.expect.element('@bathsLabel').text.to.equal('Baths')
    leadForm.expect.element('@baths1Button').to.be.visible.after(0)
    leadForm.expect.element('@baths2Button').to.be.visible.after(0)
    leadForm.expect.element('@baths3PlusButton').to.be.visible.after(0)
    leadForm.verifyBathsSelection(leadForm, bathsSelection)
  },
  verifyMessageTextArea: (leadForm, message) => {
    leadForm.expect.element('@messageLabel').to.be.visible.after(0)
    leadForm.expect.element('@messageLabel').text.to.equal('Message')
    leadForm.expect.element('@messageTextArea').to.be.visible.after(0)
    leadForm.expect.element('@messageTextArea').attribute('value').to.equal(message)
  },
  verifyNewsLetterOptIn: (leadForm, newsLetterOptIn) => {
    leadForm.expect.element('@newsLetterCheckBox').to.be.visible.after(0)
    leadForm.expect.element('@newsLetterCheckBox').attribute('value').to.equal(newsLetterOptIn)
    leadForm.expect.element('@newsLetterLabel').to.be.visible.after(0)
    leadForm.expect.element('@newsLetterLabel').text.to
      .equal('Stay in-the-know with our e-newsletter and local community special offers.')
  },
  verifySendButton: leadForm => {
    leadForm.expect.element('@sendButton').to.be.visible.after(0)
    leadForm.expect.element('@sendButton').attribute('value').to.equal('Send')
  },
  validateLeadForm: (browser, args) => {
    const leadForm = browser.page.small.emailLeadForm()
    leadForm.verifyHeading(leadForm)
    leadForm.expect.element('@closeLeadModal').to.be.visible.after(0)
    leadForm.verifyNameInput(browser, args)
    leadForm.verifyEmailInput(leadForm, args.email)
    leadForm.verifyPhoneInput(leadForm, args.phone)
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
    leadForm.verifyMessageTextArea(leadForm, args.message)
    leadForm.verifyNewsLetterOptIn(leadForm, args.newsLetterOptIn)
    leadForm.verifySendButton(leadForm)
  },
  enterName: (browser, name) => {
    const leadForm = browser.page.small.emailLeadForm()
    browser.element('css selector', nameLabelSelector, result => {
      if (result.status !== -1) {
        leadForm.clearValue('@nameInput', () => {
          leadForm.setValue('@nameInput', name)
        })
      } else {
        leadForm.enterFirstName(leadForm, name.split(' ')[0])
        leadForm.enterLastName(leadForm, name.split(' ')[1])
      }
    })
  },
  enterFirstName: (leadForm, name) => {
    leadForm.clearValue('@firstNameInput', () => {
      leadForm.setValue('@firstNameInput', name)
    })
  },
  enterLastName: (leadForm, name) => {
    leadForm.clearValue('@lastNameInput', () => {
      leadForm.setValue('@lastNameInput', name)
    })
  },
  enterEmail: (leadForm, email) => {
    leadForm.clearValue('@emailInput', () => {
      leadForm.setValue('@emailInput', email)
    })
  },
  enterPhone: (leadForm, phone) => {
    leadForm.clearValue('@phoneInput', () => {
      leadForm.setValue('@phoneInput', phone)
    })
  },
  selectBeds: (leadForm, beds) => {
    leadForm.click(`@beds${beds}Button`)
  },
  selectBaths: (leadForm, baths) => {
    leadForm.click(`@baths${baths}Button`)
  },
  enterMessage: (leadForm, message) => {
    leadForm.clearValue('@messageTextArea', () => {
      leadForm.setValue('@messageTextArea', message)
    })
  },
  fillOutLeadForm: (browser, args) => {
    const leadForm = browser.page.small.emailLeadForm()
    leadForm.enterName(browser, args.name)
    leadForm.enterEmail(leadForm, args.email)
    leadForm.enterPhone(leadForm, args.phone)
    browser.element('css selector', bedsLabelSelector, result => {
      if (result.status !== -1) {
        leadForm.selectBeds(leadForm, args.beds)
      }
    })
    browser.element('css selector', bathsLabelSelector, result => {
      if (result.status !== -1) {
        leadForm.selectBaths(leadForm, args.baths)
      }
    })
    leadForm.enterMessage(leadForm, args.message)
  },
  submitValidLeadForm: leadForm => {
    leadForm.click('@sendButton').waitForElementVisible('@leadSuccessModal')
  },
  fillVerifyAndSubmitLeadForm: (browser, args) => {
    const leadForm = browser.page.small.emailLeadForm()
    leadForm.fillOutLeadForm(browser, args)
    leadForm.validateLeadForm(browser, args)
    leadForm.submitValidLeadForm(leadForm)
  },
}
module.exports = {
  elements: {
    leadSuccessModal: '[data-test-id=lead-success-modal]',
    heading: 'h3[data-test-id=lead-form-heading]',
    closeLeadModal: '[data-test-id=lead-modal] [data-test-id=closeModal]',
    closeLeadSuccessModal: '[data-test-id=lead-success-modal] [data-test-id=closeModal]',
    nameLabel: nameLabelSelector,
    nameInput: 'input#name',
    firstNameLabel: 'label[for=firstName]',
    firstNameInput: 'input#firstName',
    lastNameLabel: 'label[for=lastName]',
    lastNameInput: 'input#lastName',
    emailLabel: 'label[for=email]',
    emailInput: 'input#email',
    phoneLabel: 'label[for=phone]',
    phoneInput: 'input#phone',
    bedsLabel: bedsLabelSelector,
    bedsStButton: '[data-test-id=beds-option-St-radio-button]',
    beds1Button: '[data-test-id=beds-option-1-radio-button]',
    beds2Button: '[data-test-id=beds-option-2-radio-button]',
    beds3Button: '[data-test-id=beds-option-3-radio-button]',
    beds4Button: '[data-test-id=beds-option-4-radio-button]',
    beds5PlusButton: '[data-test-id="beds-option-5+-radio-button"]',
    bathsLabel: bathsLabelSelector,
    baths1Button: '[data-test-id=baths-option-1-radio-button]',
    baths2Button: '[data-test-id=baths-option-2-radio-button]',
    baths3PlusButton: '[data-test-id="baths-option-3+-radio-button"]',
    messageLabel: 'label[for=message]',
    messageTextArea: 'textarea#message',
    newsLetterCheckBox: 'input#optInNewsletter',
    newsLetterLabel: 'label[for=optInNewsletter]',
    sendButton: '[data-tag_item=send_button]',
    confirmButton: '[data-test-id=confirm-button]',
  },
  commands: [leadFormCommands],
}
