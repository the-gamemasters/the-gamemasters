interface Item {
	item_key: number
	item_name: string
	item_effect: string
	item_effect_stat: string
	item_effect_value: number
	item_effect_duration: number
	item_cost: number
	world: number
	item_icon: string
}

async function getItems(req: any, res: any) {
	const db = req.app.get("db")

	const shopItems: Item[] = await db.Items.get_items()

	res.status(200).json({ shopItems })
}

async function getInventory(req: any, res: any) {
	const db = req.app.get("db")

	const { charKey } = req.params

	const characterItems: Item[] = await db.Items.get_inventory(charKey)

	res.status(200).json({ characterItems })
}

async function buyItem(req: any, res: any) {
	const db = req.app.get("db")

	const { charKey } = req.params

	const { itemKey, cost } = req.body

	/* logic: 
	1. if gold >= item_cost where charKey, continue. Else, return "cannot purchase"
	2. if itemKey and charKey exist in inventory, UPDATE quantity +1. Else, INSERT INTO inventory. 
	3. return char's new Inventory and gold count
	*/

	const bought = await db.Items.buy_items(charKey, itemKey)
	console.log(bought)
	const newGold = await db.Items.set_gold(charKey, -cost)

	const characterItems: Item[] = await db.Items.get_inventory(charKey)

	res.status(200).json({ characterItems, newGold })
}

async function sellItem(req: any, res: any) {
	const db = req.app.get("db")

	const { charKey } = req.params

	const { invKey, value } = req.body

	/* logic: 
	1. if gold >= item_cost where charKey, continue. Else, return "cannot purchase"
	2. if itemKey and charKey exist in inventory, UPDATE quantity +1. Else, INSERT INTO inventory.
	3. return char's new Inventory
	*/

	const sold = await db.Items.sell_items(invKey)
	console.log(sold)
	const newGold = await db.Items.set_gold(charKey, value)

	const characterItems: Item[] = await db.Items.get_inventory(charKey)

	// let filteredCharacterItems = characterItems.filter(item => item.quantity > 0)

	res.status(200).json({ characterItems, newGold })
}

// async function editItem(req: any, res: any) {
// 	const db = req.app.get("db")
// 	const { charKey } = req.params
// 	const { unequip, equip } = req.body
// 	const updated = await db.Equipment.edit_equipment(unequip, equip)

// 	const newItem: Item[] = await db.Equipment.find_equipped_equipment(
// 		charKey,
// 		equip
// 	)
// 	res.status(200).json({ newItem })
// }

export { getItems, getInventory, buyItem, sellItem }
