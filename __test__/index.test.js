/* eslint-env jest */

describe('noconsole', () => {
  it('should able to print color', async done => {
    // TODO : check via stdout ;p
    require('../')
    console.log('This is a console.log message', 'lol')
    console.info('This is a console.info message')
    console.warn('This is a console.warn message')
    console.error('This is a console.error message')
    console.dir({ bar: 'This is a console.dir message' })
    done()
  })
})
