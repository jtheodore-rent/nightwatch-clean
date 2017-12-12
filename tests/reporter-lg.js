const HtmlReporter = require('nightwatch-html-reporter')
/* Same options as when using the built in nightwatch reporter option */
const reporter = new HtmlReporter({
  openBrowser: true,
  reportsDirectory: './reports/large',
})

module.exports = {
  write: (results, options, done) => {
    reporter.fn(results, done)
  },
}
