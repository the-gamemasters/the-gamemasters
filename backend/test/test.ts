import { assert } from "chai"
import "mocha"
import { createCharacter, mochaTest } from "../src/controllers/characters"

describe("Test", function () {
	it("test to see if hello = hello", function () {
		assert.equal(mochaTest(), "hello")
	})
})
