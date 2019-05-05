const should = require('should')
const fs = require('fs')

const wdFilter = require('../lib/wikidata_filter')
const parsedEntity = JSON.parse(fs.readFileSync('./test/fixtures/entity', { encoding: 'utf-8' }))

describe('sitelinks', () => {
  describe('validation', () => {
    it('should reject invalid sitelinks', done => {
      should(() => wdFilter({ sitelink: 'frwi-ki|enwiki&elficwiki' })).throw()
      done()
    })
  })
  it('should return the entity if it has the specified sitelink', done => {
    const result = wdFilter({ sitelink: 'frwiki' })(parsedEntity)
    result.should.be.a.Object()
    done()
  })
  it("should not return the entity if it doesn't have the sitelink", done => {
    const result = wdFilter({ sitelink: 'elficwiki' })(parsedEntity)
    should(result).not.be.ok()
    done()
  })
  it('should return the entity if it has one of the possible sitelink', done => {
    const result = wdFilter({ sitelink: 'elficwiki|frwiki' })(parsedEntity)
    result.should.be.a.Object()
    done()
  })
  it("should not return the entity if it donesn't have one of the required sitelinks", done => {
    const result = wdFilter({ sitelink: 'elficwiki&frwiki' })(parsedEntity)
    should(result).not.be.ok()
    done()
  })
  it('should return the entity if it matches all the required groups', done => {
    const result = wdFilter({ sitelink: 'elficwiki|frwiki&enwiki' })(parsedEntity)
    result.should.be.a.Object()
    done()
  })
  it("should not return the entity if it doesn't match all the required groups", done => {
    const result = wdFilter({ sitelink: 'frwiki|enwiki&elficwiki' })(parsedEntity)
    should(result).not.be.a.Object()
    done()
  })
})
