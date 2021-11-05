export interface Stats {
	strength: number
	dexterity: number
	constitution: number
	intelligence: number
}

export interface Spells {
	spellName: string
	spellSchool: string
	effectType: string
	effectBase: number
	effectDuration: number
	cooldownTurns: number
}

export interface Items {
	itemName: string
	effectType: string
	effectBase: number
	inventoryQuantity: number
}

export interface Player {
	displayName: string
	spriteUrl: string
	items: Items[]
	spells: Spells[]
	baseStats: Stats
	tempStats: Stats
	baseHp: number
	tempHp: number
	weaponBonus: number
	baseDodgeChance: number
	tempDodgeChance: number
	xpReward: number
}
export interface CombatState {
	currentTurn: "party1" | "party2"
	combatLog: string
	party1: Player
	party2: Player
}
