import { Schema, ArraySchema, type } from "@colyseus/schema"
import { party } from "../CombatRoom"

export class Stats extends Schema {
	@type("number") strength: number
	@type("number") dexterity: number
	@type("number") constitution: number
	@type("number") intelligence: number
}

export class Spells extends Schema {
	@type("string") spellName: string
	@type("string") spellSchool: string
	@type("string") effectType: string
	@type("number") effectBase: number
	@type("number") effectDuration: number
	@type("number") cooldownTurns: number
}

export class Items extends Schema {
	@type("string") itemName: string
	@type("string") effectType: string
	@type("number") effectBase: number
	@type("number") inventoryQuantity: number
}

export class Player extends Schema {
	@type("string") id: string
	@type("string") displayName: string
	@type("string") role: string
	@type("string") spriteUrl: string
	@type([Items]) items = new ArraySchema<Items>()
	@type([Spells]) spells = new ArraySchema<Spells>()
	@type(Stats) baseStats = new Stats()
	@type(Stats) tempStats = new Stats()
	@type("number") baseHp: number
	@type("number") tempHp: number
	@type("number") weaponBonus: number
	@type("number") baseDodgeChance: number
	@type("number") tempDodgeChance: number
}
export default class CombatRoomState extends Schema {
	@type("string") currentTurn: party = "party1"
	@type("string") winner?: Player
	@type(Player) party1 = new Player()
	@type(Player) party2 = new Player()
}
