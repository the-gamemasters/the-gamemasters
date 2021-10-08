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
  const db = req.app.get('db')


  // probably need to test that I can set default values like this.

  const {charName = '', description = '', userKey = 1, avatarKey = null, gold = 0, experience = 0, level = 0}: Character = req.body

  const {strength, constitution, intelligence, dexterity}: CharStats = req.body


  const characterInfo = await db.Characters.createCharacter([charName, description, userKey, avatarKey, gold, experience, level])
  const {characterKey = 1} = characterInfo



  const characterStats = await db.Characters.createCharacterStats([characterKey, strength, constitution, intelligence, dexterity])

  res.status(200).json({characterInfo, characterStats})
}

// I was thinking about creating two functions and running both when the POST endpoint was called.  I could use res.local or res.data to send the data to the next middleware, and then just add a next()
// async function createCharacterStats(req: any, res: any) {
//   const db = req.app.get('db')
//   const {strength, constitution, intelligence, dexterity}: CharStats = req.body


// }

function mochaTest() {
  return 'hello'
}

export {createCharacter, mochaTest}