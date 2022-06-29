const { minify } = require('html-minifier-terser')
const fs = require('fs')
const async = require('async')
const chalk = require('chalk')

module.exports = function compressHtmlPlugin () {
  return {
    async generated (pagePaths) {
      const tasks = pagePaths.map(page => {
        return async () => {
          const res = await minify(fs.readFileSync(page, 'utf8'), {
            collapseWhitespace: true,
            removeComments: true,
            removeTagWhitespace: true,
            removeEmptyElements: true
          })

          fs.writeFile(page, res, 'utf-8', () => {})
        }
      })

      async.parallel(tasks, error => {
        const message = 'Compressed html !!!'

        if (!error) {
          return console.log(chalk.green('success'), message)
        }

        console.log(chalk.red('fail'), message)
      })
    }
  }
}
