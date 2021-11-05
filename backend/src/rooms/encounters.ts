import { Player, Stats, Spells, Items } from "./schema/CombatRoomState"

export const encountersList = [
	{
		id: "",
		displayName: "Charles",
		spriteUrl:
			"https://cdn2.scratch.mit.edu/get_image/gallery/25124327_170x100.png",
		items: [
			new Items({
				itemName: "Potion",
				effectType: "heal",
				effectBase: 10,
				inventoryQuantity: 2,
			}),
			new Items({
				itemName: "Super Potion",
				effectType: "heal",
				effectBase: 10,
				inventoryQuantity: 2,
			}),
		],
		spells: [
			new Spells({
				spellName: "Fireball",
				spellSchool: "fire",
				effectType: "damage",
				effectBase: 10,
				cooldownTurns: 2,
			}),
		],
		baseStats: new Stats({
			strength: 15,
			dexterity: 6,
			constitution: 5,
			intelligence: 8,
		}),
		tempStats: new Stats({
			strength: 15,
			dexterity: 6,
			constitution: 5,
			intelligence: 8,
		}),
		weaponBonus: 1,
		baseDodgeChance: 0,
		tempDodgeChance: 0,
	},
	{
		id: "",
		displayName: "Giant Rat",
		spriteUrl:
			"https://mir-s3-cdn-cf.behance.net/project_modules/disp/3c1fb523717421.56327b1b5db32.gif",
		items: [
			new Items({
				itemName: "Cheese",
				effectType: "heal",
				effectBase: 20,
				inventoryQuantity: 1,
			}),
			new Items({
				itemName: "Potion",
				effectType: "heal",
				effectBase: 10,
				inventoryQuantity: 3,
			}),
		],
		spells: [
			new Spells({
				spellName: "Scurry",
				spellSchool: "none",
				effectType: "buff-dex",
				effectBase: 2,
				effectDuration: 3,
				cooldownTurns: 7,
			}),
		],
		baseStats: new Stats({
			strength: 5,
			dexterity: 9,
			constitution: 3,
			intelligence: 3,
		}),
		tempStats: new Stats({
			strength: 5,
			dexterity: 9,
			constitution: 0,
			intelligence: 3,
		}),
		weaponBonus: 4,
		baseDodgeChance: 0.5,
		tempDodgeChance: 0,
	},
	{
		id: "",
		displayName: "Snorlax",
		spriteUrl:
			"https://thumbs.gfycat.com/LimitedHilariousFruitbat-size_restricted.gif",
		items: [
			new Items({
				itemName: "Cheese",
				effectType: "heal",
				effectBase: 20,
				inventoryQuantity: 1,
			}),
			new Items({
				itemName: "Potion",
				effectType: "heal",
				effectBase: 10,
				inventoryQuantity: 3,
			}),
		],
		spells: [
			new Spells({
				spellName: "Yawn",
				spellSchool: "none",
				effectType: "debuff-dex",
				effectBase: 3,
				effectDuration: 2,
				cooldownTurns: 5,
			}),
		],
		baseStats: new Stats({
			strength: 25,
			dexterity: 2,
			constitution: 15,
			intelligence: 5,
		}),
		tempStats: new Stats({
			strength: 25,
			dexterity: 2,
			constitution: 15,
			intelligence: 5,
		}),
		weaponBonus: 3,
		baseDodgeChance: 0,
		tempDodgeChance: 0,
	},
	{
		id: "",
		displayName: "Wizard",
		spriteUrl:
			"https://cdna.artstation.com/p/assets/images/images/024/414/460/original/ruben-van-zijst-wizard-idle-animation-1280x1280px.gif?1582326963",
		items: [
			new Items({
				itemName: "Magic Power",
				effectType: "buff-int",
				effectBase: 1,
				inventoryQuantity: 1,
			}),
			new Items({
				itemName: "Potion",
				effectType: "heal",
				effectBase: 10,
				inventoryQuantity: 3,
			}),
		],
		spells: [
			new Spells({
				spellName: "Fireball",
				spellSchool: "none",
				effectType: "buff-dex",
				effectBase: 2,
				effectDuration: 3,
				cooldownTurns: 7,
			}),
			new Spells({
				spellName: "Reviving Jolt",
				spellSchool: "lightning",
				effectType: "heal",
				effectBase: 20,
				effectDuration: 0,
				cooldownTurns: 3,
			}),
		],
		baseStats: new Stats({
			strength: 5,
			dexterity: 9,
			constitution: 4,
			intelligence: 15,
		}),
		tempStats: new Stats({
			strength: 5,
			dexterity: 9,
			constitution: 4,
			intelligence: 15,
		}),
		weaponBonus: 4,
		baseDodgeChance: 0.5,
		tempDodgeChance: 0,
	},
	{
		id: "",
		displayName: "Zombie Teen",
		spriteUrl:
			"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/84cdf098-db0b-422d-9048-92471e64ea7f/de8f10r-28e18490-cff5-411b-af39-51c583988101.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg0Y2RmMDk4LWRiMGItNDIyZC05MDQ4LTkyNDcxZTY0ZWE3ZlwvZGU4ZjEwci0yOGUxODQ5MC1jZmY1LTQxMWItYWYzOS01MWM1ODM5ODgxMDEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.yIRhqdRRDm4e14MxilCeQz1-4jipXe9kRPm6yUVEF9M",
		items: [
			new Items({
				itemName: "Chunk of Brain",
				effectType: "heal",
				effectBase: 50,
				inventoryQuantity: 1,
			}),
			new Items({
				itemName: "Potion",
				effectType: "heal",
				effectBase: 10,
				inventoryQuantity: 3,
			}),
		],
		spells: [
			new Spells({
				spellName: "Massive Chomp",
				spellSchool: "none",
				effectType: "damage",
				effectBase: 30,
				effectDuration: 0,
				cooldownTurns: 6,
			}),
		],
		baseStats: new Stats({
			strength: 5,
			dexterity: 9,
			constitution: 2,
			intelligence: 3,
		}),
		tempStats: new Stats({
			strength: 5,
			dexterity: 9,
			constitution: 2,
			intelligence: 3,
		}),
		weaponBonus: 4,
		baseDodgeChance: 0.5,
		tempDodgeChance: 0,
	},
]
