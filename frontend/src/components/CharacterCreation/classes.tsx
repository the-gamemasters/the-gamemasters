export interface classType extends Record<string, string | number> {
	class: string
	str: number
	dex: number
	con: number
	int: number
	passive: string
	img: string
}

const KNIGHT: classType = {
	class: "Knight",
	str: 15,
	dex: 6,
	con: 11,
	int: 8,
	passive: "Tempered Swing, Random crit (x2) chance for attacks",
	img: `https://cdna.artstation.com/p/assets/images/images/009/421/434/medium/john-cacatian-armorguyknight.jpg?1518902110`,
}
const ROGUE: classType = {
	class: "Rogue",
	str: 6,
	dex: 15,
	con: 8,
	int: 11,
	passive: "LightFoot, Random Dodge chance",
	img: "https://i.pinimg.com/originals/61/74/50/61745016c90d1a687dfd0c1e693c9e99.jpg",
}
const BARBARIAN: classType = {
	class: "Barbarian",
	str: 11,
	dex: 8,
	con: 15,
	int: 6,
	passive: "Sustaining Rage, Random chance to heal",
	img: "https://i.pinimg.com/564x/f2/56/db/f256db27f25ee6d99e930c21bece150b--group-art-character-ideas.jpg",
}

const MAGE: classType = {
	class: "Mage",
	str: 8,
	dex: 11,
	con: 6,
	int: 15,
	passive: "Arcane Mastery, Random crit (x2) chance for spells",
	img: "https://cdnb.artstation.com/p/assets/images/images/006/764/093/large/aleksandr-shapovalov-battle-mage.jpg?1501079600",
}

const NONE: classType = {
	class: "None",
	str: 0,
	dex: 0,
	con: 0,
	int: 0,
	passive: "",
	img: "",
}

const classList = { KNIGHT, ROGUE, BARBARIAN, MAGE, NONE }

export { classList }
