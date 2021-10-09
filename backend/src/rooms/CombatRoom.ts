import { Room, Client } from "colyseus"
import { CombatRoomState } from "./schema/CombatRoomState"

interface mockBattle {
	party1: {
		id: string
		displayName: string
		hp: number
		stats: {
			strength: number
			dexterity: number
			constitution: number
			intelligence: number
		}
	}
	party2: {
		id: string
		displayName: string
		hp: number
		stats: {
			strength: number
			dexterity: number
			constitution: number
			intelligence: number
		}
	}
}

export type party = "party1" | "party2"
export class CombatRoom extends Room<CombatRoomState> {
	maxClients = 2
	onCreate(options: any) {
		this.setState(new CombatRoomState())

		this.onMessage("turn", (client, message) => {
			console.log(`${client.sessionId} used ${message.action}`)

			let forceA: party = this.state.currentTurn
			let forceZ: party = forceA === "party1" ? "party2" : "party1"

			console.log(forceA, "forceA", forceZ, "forceZ")
			console.log(this.state)

			switch (message.action) {
				case "attack":
					let randomChance = Math.random()

					if (this.state[forceZ].currentDodgeChance >= randomChance) {
						this.broadcast("miss", [
							this.state.party1.displayName,
							this.state[forceZ].displayName,
						])
					} else {
						let damageDealt = Math.floor(
							(this.state[forceA].stats.strength +
								this.state[forceA].weaponBonus) *
								(Math.random() * (1.2 - 0.8) + 0.8)
						)
						this.broadcast("attack", [
							this.state[forceA].displayName,
							damageDealt,
						])
						this.state[forceZ].currentHp -= damageDealt

						if (this.state[forceZ].currentHp <= 0) {
							this.state[forceZ].currentHp = 0
							this.broadcast("victory", forceA)
						}
					}
					this.state[forceZ].currentDodgeChance =
						this.state[forceZ].baseDodgeChance
					this.state.currentTurn = forceZ

					break

				case "spell":
					//TODO This spell list will be pulled from the DB
					let spellList = [
						{
							name: "Fireball",
							spellSchool: "fire",
							effectType: "damage",
							effectBase: 10,
						},
						{
							name: "Frostbite",
							spellSchool: "ice",
							effectType: "damage",
							effectBase: 8,
						},
						{
							name: "Reviving Jolt",
							spellSchool: "lightning",
							effectType: "heal",
							effectBase: 20,
						},
					]
					if (this.state.currentTurn === "party1") {
						// if (spellList.includes(ele => ele.effectType === 'damage')) {

						// }
						this.broadcast("spell", [message.spell])
						this.state.currentTurn = "party2"
					} else {
						this.broadcast("spell", [message.spell])
						this.state.currentTurn = "party1"
					}
					break

				case "item":
					let itemList = {
						name: "potion",
						effectType: "heal",
						effectBase: 20,
					}

					if (this.state.currentTurn === "party1") {
						if (itemList.effectType === "heal") {
                            let hp = this.state[forceA].currentHp + itemList.effectBase

							if (hp > this.state[forceA].maxHp) {
                                this.state[forceA].currentHp = this.state[forceA].maxHp
                            }
                            else {
                                this.state[forceA].currentHp = hp
                            }
                            this.broadcast("heal", [
                                this.state[forceA].displayName,
                                itemList.effectBase,
                            ])
						}
						this.state.currentTurn = "party2"
					} else {
                        if (itemList.effectType === "heal") {
							let hp = this.state[forceA].currentHp + itemList.effectBase

							if (hp > this.state[forceA].maxHp) {
                                this.state[forceA].currentHp = this.state[forceA].maxHp
                            }
                            else {
                                this.state[forceA].currentHp = hp
                            }
                            this.broadcast("heal", [
                                this.state[forceA].displayName,
                                itemList.effectBase,
                            ])
						}
						this.state.currentTurn = "party1"
					}
					break

				case "evade":
					if (this.state.currentTurn === "party1") {
						this.state.party1.currentDodgeChance =
							(this.state.party1.stats.dexterity * 5 +
								this.state.party1.baseDodgeChance) /
							100
						this.broadcast("evade", this.state.party1.displayName)
						this.state.currentTurn = "party2"
					} else {
						this.state.party2.currentDodgeChance =
							(this.state.party2.stats.dexterity * 5 +
								this.state.party2.baseDodgeChance) /
							100
						this.broadcast("evade", this.state.party2.displayName)
						this.state.currentTurn = "party1"
					}
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
		if (this.clients.length === 1) {
			console.log(client.sessionId, "joined as P1!")
			this.state.party1.id = client.sessionId
			client.send("assignment", 1)
			//TODO if class is rogue, add a dodge chance
			//Mock Party1 "Charles"
			this.state.party1.displayName = "Charles"
			this.state.party1.weaponBonus = 1
			this.state.party1.baseDodgeChance = 0
			this.state.party1.stats.strength = 15
			this.state.party1.stats.dexterity = 6
			this.state.party1.stats.constitution = 11
			this.state.party1.maxHp = this.state.party1.stats.constitution * 10
			this.state.party1.currentHp = this.state.party1.maxHp
			this.state.party1.stats.intelligence = 8
		} else if (this.clients.length === 2) {
			console.log(client.sessionId, "joined as P2!")
			this.state.party2.id = client.sessionId
			client.send("assignment", 2)
			//Mock Party2 "Giant Rat"
			this.state.party2.displayName = "Giant Rat"
			this.state.party2.weaponBonus = 4
			this.state.party2.baseDodgeChance = 0.5
			this.state.party2.stats.strength = 5
			this.state.party2.stats.dexterity = 9
			this.state.party2.stats.constitution = 13
			this.state.party2.maxHp = this.state.party2.stats.constitution * 10
			this.state.party2.currentHp = this.state.party2.maxHp
			this.state.party2.stats.intelligence = 0
			this.broadcast("ready")
		}

		//TODO Connect to backend, which connects to DB, to get player stats, items, and spells
	}

	onLeave(client: Client, consented: boolean) {
		console.log(client.sessionId, "left!")
	}

	onDispose() {
		console.log("room", this.roomId, "disposing...")
	}
}
