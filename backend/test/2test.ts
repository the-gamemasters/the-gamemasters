import {assert} from 'chai'
import 'mocha'
import {createCharacter, mochaTest} from '../src/controllers/characters'

describe('Test part 2', function() {
  it('test to see if hello = hello Part 2', function() {
    assert.equal(mochaTest(), 'hello')
  })
})
