interface Character {
	characterKey: number
	charName: string
	description: string
	userKey: number
	avatarKey: number
	gold: number
	experience: number
	level: number
}

interface CharStats {
	charStatsKey: number
	strength: number
	constitution: number
	intelligence: number
	dexterity: number
}

async function createCharacter(req: any, res: any) {
	const db = req.app.get("db")

	//

	const {
		charName = "",
		description = "",
		userKey = null,
		avatarKey = null,
		gold = 0,
		experience = 0,
		level = 1,
	}: Character = req.body

	const { strength, constitution, intelligence, dexterity }: CharStats =
		req.body

	const characterInfo = await db.Characters.createCharacter([
		charName,
		description,
		userKey,
		avatarKey,
		gold,
		experience,
		level,
	])

	const { character_key: characterKey } = characterInfo[0]

	const characterStats = await db.Characters.createCharacterStats([
		characterKey,
		strength,
		constitution,
		intelligence,
		dexterity,
	])

	res.status(200).json({ characterInfo, characterStats })
}

async function getCharacterInfo(req: any, res: any) {
	const db = req.app.get("db")
	const { charKey } = req.params

	let result = await db.Characters.findCharacter([charKey])
	const { char_name, gold, experience, level } = result[0]

	result = await db.Characters.findCharacterStats([charKey])
	const { strength, constitution, intelligence, dexterity } = result[0]

	res.status(200).json({
		char_name,
		gold,
		experience,
		level,
		strength,
		constitution,
		intelligence,
		dexterity,
	})
}

async function editCharacterInfo(req: any, res: any) {
	const db = req.app.get("db")

	const { characterKey } = req.body

	let result = await db.Characters.findCharacter([characterKey])

	const { description, gold, experience, level } = result[0]

	result = await db.Characters.findCharacterStats([characterKey])

	const { strength, constitution, intelligence, dexterity } = result[0]

	const {
		description: newDescription = description,
		gold: newGold = gold,
		experience: newExperience = experience,
		level: newLevel = level,
		strength: newStrength = strength,
		constitution: newConstitution = constitution,
		intelligence: newIntelligence = intelligence,
		dexterity: newDexterity = dexterity,
	} = req.body

	const character = await db.Characters.updateCharacter([
		characterKey,
		newDescription,
		newGold,
		newExperience,
		newLevel,
	])

	const stats = await db.Characters.updateCharacterStats([
		characterKey,
		newStrength,
		newConstitution,
		newIntelligence,
		newDexterity,
	])

	res.status(200).json({ character: character[0], stats: stats[0] })
}

// I was thinking about creating two functions and running both when the POST endpoint was called.  I could use res.local or res.data to send the data to the next middleware, and then just add a next()
// async function createCharacterStats(req: any, res: any) {
//   const db = req.app.get('db')
//   const {strength, constitution, intelligence, dexterity}: CharStats = req.body

// }

function mochaTest() {
	return "hello"
}

export { createCharacter, mochaTest, editCharacterInfo, getCharacterInfo }
