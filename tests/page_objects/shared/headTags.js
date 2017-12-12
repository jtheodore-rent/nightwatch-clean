function Validator(pageObject) {
  this.validateCanonical = canonical => {
    if (canonical) {
      pageObject.section.head.expect
        .element('@canonical').attribute('href').to
          .equal(this.replaceDomain(canonical))
    } else {
      pageObject.section.head.expect.element('@canonical').not.to.be.present.after(0)
    }
  }

  this.replaceDomain = url => (
    url.replace(/(https?:\/\/).+\.r./, '$1www.qa.')
  )

  this.validateMeta = (key, value) => {
    if (value) {
      if (value instanceof RegExp) {
        pageObject.section.head.expect
          .element(`@${key}`).attribute('content').to.match(value)
      } else {
        pageObject.section.head.expect
          .element(`@${key}`).attribute('content').to.equal(value)
      }
    } else {
      pageObject.section.head.expect.element(`@${key}`).not.to.be.present.after(0)
    }
  }

  this.validateLink = (key, link) => {
    if (link) {
      pageObject.section.head.expect
        .element(`@${key}`).attribute('href').to.equal(link)
    } else {
      pageObject.section.head.expect.element(`@${key}`).not.to.be.present.after(0)
    }
  }
}

module.exports = {
  sections: {
    head: {
      selector: 'head',
      elements: {
        robots: 'meta[name=robots]',
        canonical: 'link[rel=canonical]',
        prev: 'link[rel=prev]',
        next: 'link[rel=next]',
        description: 'meta[name=description]',
        'google-site-verification': 'meta[name=google-site-verification]',
      },
    },
  },
  commands: [{
    validate(args) {
      const validator = new Validator(this)
      Object.keys(args.meta).forEach(key => {
        validator.validateMeta(key, args.meta[key])
      })
      if (args.canonical !== undefined) {
        validator.validateCanonical(args.canonical)
      }
      if (args.prev !== undefined) {
        validator.validateLink('prev', args.prev)
      }
      if (args.next !== undefined) {
        validator.validateLink('next', args.next)
      }
    },
  }],
}
