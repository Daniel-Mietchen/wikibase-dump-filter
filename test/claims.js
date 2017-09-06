const should = require('should')
const fs = require('fs')

const wdFilter = require('../lib/wikidata_filter')
const parsedEntity = JSON.parse(fs.readFileSync('./test/fixtures/entity', { encoding: 'utf-8' }))

describe('claims', function () {
  describe('validation', function () {
    it('should reject an invalid claim', function (done) {
      should(() => wdFilter({ claim: 'P31z' })).throw()
      should(() => wdFilter({ claim: 'P31:Q141z' })).throw()
      done()
    })
  })
  describe('positive claim', function () {
    it('should return the entity if it has the specified claim', function (done) {
      const result = wdFilter({ claim: 'P31:Q3336843' })(parsedEntity)
      result.should.be.a.String()
      const result2 = wdFilter({ claim: 'P31' })(parsedEntity)
      result2.should.be.a.String()
      done()
    })

    it('should not return the entity if it miss the specified claim', function (done) {
      const result = wdFilter({ claim: 'P31:Q5' })(parsedEntity)
      should(result).not.be.ok()
      const result2 = wdFilter({ claim: 'P2002' })(parsedEntity)
      should(result2).not.be.ok()
      done()
    })
  })

  describe('negative claim', function () {
    it('should not return the entity if it has the specified claim', function (done) {
      const result = wdFilter({ claim: '~P31:Q3336843' })(parsedEntity)
      should(result).not.be.ok()
      const result2 = wdFilter({ claim: '~P31' })(parsedEntity)
      should(result2).not.be.ok()
      done()
    })

    it('should return the entity if it miss the specified claim', function (done) {
      const result = wdFilter({ claim: '~P31:Q5' })(parsedEntity)
      should(result).be.ok()
      const result2 = wdFilter({ claim: '~P2002' })(parsedEntity)
      should(result2).be.ok()
      done()
    })
  })
})
