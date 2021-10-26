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

interface Equipment {
	equipment_key: number
	equipment_name: string
	slot: number
	equipment_description: string
	equipment_effect_stat: string
	equipment_effect_stat_value: number
	equipped: boolean
}

async function getEquipment(req: any, res: any) {
	const db = req.app.get("db")

	const { charKey } = req.params

	const characterEquipment: Equipment[] = await db.Equipment.find_equipment(
		charKey
	)

	res.status(200).json({ characterEquipment })
}

async function addEquipment(req: any, res: any) {
	const db = req.app.get("db")

	const { charKey } = req.params

	const { equipmentKey } = req.body.equipmentKey

	const added = db.Equipment.add_equipment(charKey, equipmentKey)

	const characterEquipment: Equipment[] = await db.Equipment.find_equipment(
		charKey
	)

	res.status(200).json({ characterEquipment })
}

async function editEquipment(req: any, res: any) {
	const db = req.app.get("db")
	const { charKey } = req.params
	const { unequip, equip } = req.body
	const updated = await db.Equipment.edit_equipment(unequip, equip)

	const newEquipment: Equipment[] =
		await db.Equipment.find_equipped_equipment(charKey, equip)
	res.status(200).json({ newEquipment })
}

// I was thinking about creating two functions and running both when the POST endpoint was called.  I could use res.local or res.data to send the data to the next middleware, and then just add a next()
// async function createCharacterStats(req: any, res: any) {
//   const db = req.app.get('db')
//   const {strength, constitution, intelligence, dexterity}: CharStats = req.body

// }

function mochaTest() {
	return "hello"
}

export { getEquipment, addEquipment, editEquipment }
