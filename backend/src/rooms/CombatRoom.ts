import { Room, Client } from "colyseus"
import CombatRoomState from "./schema/CombatRoomState"
import { encountersList } from "./encounters"

const testSpellList = [
	{
		spellName: "Fireball",
		spellSchool: "fire",
		effectType: "damage",
		effectBase: 10,
		effectDuration: 0,
		cooldownTurns: 2,
	},
	{
		spellName: "Frostbite",
		spellSchool: "ice",
		effectType: "damage",
		effectBase: 7,
		effectDuration: 0,
		cooldownTurns: 1,
	},
	{
		spellName: "Reviving Jolt",
		spellSchool: "lightning",
		effectType: "heal",
		effectBase: 20,
		effectDuration: 0,
		cooldownTurns: 3,
	},
	{
		spellName: "Flame On",
		spellSchool: "fire",
		effectType: "buff",
		effectStat: "con",
		effectBase: 3,
		effectDuration: 4,
		cooldownTurns: 7,
	},
	{
		spellName: "Draining Zap",
		spellSchool: "lightning",
		effectType: "debuff-dex",
		effectBase: 2,
		effectDuration: 2,
		cooldownTurns: 5,
	},
	{
		spellName: "Scurry",
		spellSchool: "none",
		effectType: "buff-dex",
		effectBase: 2,
		effectDuration: 3,
		cooldownTurns: 7,
	},
	{
		spellName: "Massive Chomp",
		spellSchool: "none",
		effectType: "damage",
		effectBase: 30,
		effectDuration: 0,
		cooldownTurns: 6,
	},
	{
		spellName: "Reviving Jolt",
		spellSchool: "lightning",
		effectType: "heal",
		effectBase: 20,
		effectDuration: 0,
		cooldownTurns: 3,
	},
	{
		spellName: "Yawn",
		spellSchool: "none",
		effectType: "debuff-dex",
		effectBase: 3,
		effectDuration: 2,
		cooldownTurns: 5,
	},
]

export type party = "party1" | "party2"
export class CombatRoom extends Room<CombatRoomState> {
	maxClients = 2
	onCreate(options: any) {
		this.setState(new CombatRoomState())

		this.onMessage("turn", (client, message) => {
			console.log(`${client.sessionId} used ${message.action}`)

			let forceA: party = this.state.currentTurn
			let forceZ: party = forceA === "party1" ? "party2" : "party1"
			let broadcastMessage = ""
			switch (message.action) {
				case "attack":
					let randomChanceDodge = Math.random()

					if (
						this.state[forceZ].tempDodgeChance >= randomChanceDodge
					) {
						this.broadcast("miss", [
							"attack",
							this.state[forceA].displayName,
							this.state[forceZ].displayName,
						])
					} else {
						let damageDealt = Math.floor(
							(this.state[forceA].tempStats.strength +
								this.state[forceA].weaponBonus) *
								(Math.random() * (1.2 - 0.8) + 0.8)
						)
						this.broadcast("attack", [
							this.state[forceA].displayName,
							damageDealt,
						])
						this.state[forceZ].tempHp -= damageDealt

						if (this.state[forceZ].tempHp <= 0) {
							this.state[forceZ].tempHp = 0
							this.broadcast("victory", forceA)
							this.disconnect()
						}
					}
					this.state[forceZ].tempDodgeChance =
						this.state[forceZ].baseDodgeChance
					this.state.currentTurn = forceZ

					break

				case "spell":
					let currentSpell = testSpellList.find(
						(ele) => ele.spellName === message.moveData
					)
					switch (currentSpell.effectType) {
						case "damage":
							let randomChanceDodge = Math.random()

							if (
								this.state[forceZ].tempDodgeChance >=
								randomChanceDodge
							) {
								this.broadcast("miss", [
									currentSpell.spellName,
									this.state[forceA].displayName,
									this.state[forceZ].displayName,
								])
							} else {
								let damageDealt = Math.floor(
									(this.state[forceA].tempStats.intelligence +
										currentSpell.effectBase) *
										(Math.random() * (1.3 - 0.7) + 0.7)
								)
								broadcastMessage = `${this.state[forceA].displayName} casts ${currentSpell.spellName} for ${damageDealt} damage!`

								this.state[forceZ].tempHp -= damageDealt

								if (this.state[forceZ].tempHp <= 0) {
									this.state[forceZ].tempHp = 0
									this.broadcast("victory", forceA)
									this.disconnect()
								}
							}

							break
						case "heal":
							let damageHealed = currentSpell.effectBase

							this.state[forceA].tempHp += damageHealed
							broadcastMessage = `${this.state[forceA].displayName} casts ${currentSpell.spellName} for ${damageHealed} damage!`
							break
						default:
					}
					this.broadcast("spell", broadcastMessage)
					this.state.currentTurn = forceZ

					break

				case "item":
					let itemIndexNumber: number

					// When a player picks an item from the front end, all of that item information is saved into playerItem

					const playerItem = this.state[forceA].items.find(
						(val, i) => {
							itemIndexNumber = i
							return val.itemName === message.moveData
						}
					)

					const {
						itemName,
						effectType,
						effectBase,
						inventoryQuantity,
					} = playerItem

					if (inventoryQuantity > 0) {
						// Will need to add more effect type but most will just be a similar to buff-int
						switch (effectType) {
							case "heal":
								this.state[forceA].tempHp += effectBase
								if (
									this.state[forceA].tempHp >
									this.state[forceA].baseHp
								) {
									this.state[forceA].tempHp =
										this.state[forceA].baseHp
								}

								broadcastMessage = `uses ${itemName} and healed for ${effectBase}`
								break
							case "buff-int":
								this.state[forceA].tempStats.intelligence +=
									effectBase
								broadcastMessage = `uses ${itemName} to increase their Intelligence by ${effectBase}`
								break
							case "buff-str":
								this.state[forceA].tempStats.strength +=
									effectBase
								broadcastMessage = `uses ${itemName} to increase their Strength by ${effectBase}`
								break
							case "buff-dex":
								this.state[forceA].tempStats.dexterity +=
									effectBase
								broadcastMessage = `uses ${itemName} to increase their Dexterity by ${effectBase}`
								break
							case "debuff-int":
								this.state[forceZ].tempStats.intelligence -=
									effectBase
								broadcastMessage = `uses ${itemName} to decrease ${this.state[forceZ].displayName}'s Intelligence by ${effectBase}`
								break
							case "debuff-str":
								this.state[forceZ].tempStats.intelligence -=
									effectBase
								broadcastMessage = `uses ${itemName} to decrease ${this.state[forceZ].displayName}'s Strength by ${effectBase}`
								break
							case "debuff-dex":
								this.state[forceZ].tempStats.intelligence -=
									effectBase
								broadcastMessage = `uses ${itemName} to decrease ${this.state[forceZ].displayName}'s Dexterity by ${effectBase}`
								break
						}

						// reduces the number of items by one
						this.state[forceA].items[
							itemIndexNumber
						].inventoryQuantity -= 1

						this.broadcast("item", [
							this.state[forceA].displayName,
							broadcastMessage,
						])
						this.state.currentTurn = forceZ
					} else {
						//If you have 0 items
						this.broadcast("item", [
							"",
							`You don't have enough of that item please try again`,
						])
					}

					break
				case "evade":
					this.state[forceA].tempDodgeChance =
						(this.state[forceA].tempStats.dexterity * 5 +
							this.state[forceA].baseDodgeChance) /
						100
					this.broadcast("evade", this.state[forceA].displayName)
					this.state.currentTurn = forceZ

					break
			}
		})

		this.onMessage("debug", (client, message) => {
			if (message === "party1") {
				console.log(JSON.stringify(this.state.party1))
			} else if (message === "party2") {
				console.log(JSON.stringify(this.state.party2))
			}
		})
	}

	onJoin(client: Client, options: any) {
		let force: party = this.clients.length > 1 ? "party2" : "party1"
		let randomEncounter = Math.floor((Math.random() / 2) * 10)

		let encounter = encountersList[randomEncounter]
		let party = this.state[force]
		console.log(
			`${client.sessionId} joined as ${force} as a ${encounter.displayName}`
		)

		party.id = client.sessionId
		party.displayName = encounter.displayName
		party.spriteUrl = encounter.spriteUrl
		party.items.push(...encounter.items)
		party.spells.push(...encounter.spells)
		party.baseStats = encounter.baseStats
		party.tempStats = encounter.tempStats
		party.baseHp = party.baseStats.constitution * 10
		party.tempHp = party.baseHp
		party.weaponBonus = encounter.weaponBonus
		party.baseDodgeChance = encounter.baseDodgeChance
		party.tempDodgeChance = party.baseDodgeChance

		client.send("assignment", force)
		if (this.clients.length > 1) {
			if (this.state.party1.tempStats >= this.state.party2.tempStats) {
				this.state.currentTurn = "party1"
			} else {
				this.state.currentTurn = "party2"
			}
			this.broadcast("ready")

			this.lock()
		}
		//TODO Connect to backend, which connects to DB, to get player stats, items, and spells
	}

	onLeave(client: Client, consented: boolean) {
		this.broadcast("disconnect")
	}

	onDispose() {
		// return new Promise((resolve, reject) => {
		//     // doDatabaseOperation((err, data) => {
		//     //     if (err) {
		//     //         reject(err);
		//     //     } else {
		//     //         resolve(data);
		//     //     }
		//     // });
		// });
		console.log("room", this.roomId, "disposing...")
	}
}

// {
//     id: "",
//     displayName: "Giant Rat",
//     items: [
//         {
//             itemName: "Cheese",
//             effectType: "heal",
//             effectBase: 20,
//             inventoryQuantity: 1,
//         },
//     ],
//     spells: [
//         {
//             spellName: "Scurry",
//             spellSchool: "none",
//             effectType: "buff-dex",
//             effectBase: 2,
//             effectDuration: 3,
//             cooldownTurns: 7,
//         },
//     ],
//     baseStats: {
//         strength: 5,
//         dexterity: 9,
//         constitution: 13,
//         intelligence: 3,
//     },
//     tempStats: {
//         strength: 5,
//         dexterity: 9,
//         constitution: 13,
//         intelligence: 3,
//     },
//     weaponBonus: 4,
//     baseDodgeChance: 0.5,
//     tempDodgeChance: 0,
// }
