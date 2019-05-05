const should = require('should')
const fs = require('fs')

const wdFilter = require('../lib/wikidata_filter')
const parsedEntity = JSON.parse(fs.readFileSync('./test/fixtures/entity', { encoding: 'utf-8' }))

describe('type', () => {
  describe('validation', () => {
    it('should reject an invalid type', done => {
      should(() => wdFilter({ type: 'bulgroz' })).throw()
      done()
    })
  })
  it('should keep entities of the specified type', done => {
    const result = wdFilter({ type: 'item' })(parsedEntity)
    should(result).be.ok()
    const result2 = wdFilter({ type: 'property' })(parsedEntity)
    should(result2).not.be.ok()
    const result3 = wdFilter({ type: 'both' })(parsedEntity)
    should(result3).be.ok()
    done()
  })
})
