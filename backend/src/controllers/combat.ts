interface Character {
	characterKey: number
	charName: string
	description: string
	userKey: number
	avatarKey: number
	gold: number
	experience: number
	level: number
	role: string
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

async function rewardWinner(req: any, res: any) {
	const db = req.app.get("db")

	const { xpReward, world } = req.body

	const { charKey } = req.params

	let goldReward = xpReward * 2

	const rewardedChar = await db.Combat.add_gold_and_xp(
		charKey,
		goldReward,
		xpReward
	)

	const prevCharacterEquipment: Equipment[] =
		await db.Equipment.find_equipment(charKey)

	let lootSlot = 0
	let lootChance = Math.floor(Math.random() * 100) + 1
	if (lootChance >= 1 && lootChance <= 50) {
		console.log("No loot")
		res.status(200).json("No loot this time!")
		return
	} else if (lootChance >= 51 && lootChance <= 75) {
		lootSlot = 1
	} else {
		lootSlot = 2
	}

	const possibleEquipment: Equipment[] =
		await db.Combat.get_possible_equipment(1, world)

	let lootTable = possibleEquipment.filter(
		(ele) => !prevCharacterEquipment.includes(ele)
	)

	if (lootTable.length > 0) {
		let loot = lootTable[Math.floor(Math.random() * lootTable.length)]
		const newEquipment = await db.Equipment.add_equipment(
			charKey,
			loot.equipment_key
		)
		res.status(200).json(newEquipment)
	} else {
		res.status(200).json("No more loot available!")
		return
	}
	// const { equipmentKey } = req.body.equipmentKey

	// const added = db.Equipment.add_equipment(charKey, equipmentKey)

	// const newCharacterEquipment: Equipment[] =
	// 	await db.Equipment.find_equipment(charKey)

	// res.status(200).json({ newCharacterEquipment })
	// res.status(200).json("success")
}

export { rewardWinner }
