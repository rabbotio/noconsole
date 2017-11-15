const chalk = require('chalk')

// Config
const isLabel = false
const isEmo = true
const suffixes = ['']

// Target
const methods = ['log', 'info', 'warn', 'error']
const decorateEmo = {
  log: '✏️',
  info: '💡',
  warn: '⚠️',
  error: '💥'
}

const decorateText = {
  log: chalk.bgBlue(' LOG  '),
  info: chalk.bgCyan(' INFO '),
  warn: chalk.bgYellow(' WARN '),
  error: chalk.bgRed(' ERROR ')
}

const colorize = (method, args) => {
  switch (method) {
    case 'info':
      return args.map(i => chalk.blue(i))
    case 'warn':
      return args.map(i => chalk.yellow(i))
    case 'error':
      return args.map(i => chalk.red(i))
    default:
      return args
  }
}

// Keep old method
let _console = {}
methods.forEach(method => {
  _console[method] = console[method]
  console[method] = function () {
    _console.log.apply(
      _console,
      [chalk.gray(process.pid), '|', chalk.gray(`${(process.memoryUsage().rss / 1048576).toFixed(2)}MB`), '|']
        .concat(isLabel ? decorateText[method] : [])
        .concat(isEmo ? decorateEmo[method] : [])
        .concat(suffixes)
        .concat(colorize(method, [...arguments]))
    )
  }
})
