import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { Equipment } from "../components/Home/Inventory/InventoryModal"

interface Info {
	charName?: string
	gold: number
	experience?: number
	level?: number
	strength?: number
	constitution?: number
	intelligence?: number
	dexterity?: number
}

interface UserState {
	userId: number
	charId: number
	charInfo: Info
	inventory: []
	armor: Equipment
	weapon: Equipment
}

// Define the initial state using that type
const initialState: UserState = {
	userId: 0,
	charId: 0,
	charInfo: {
		charName: "",
		gold: 0,
		experience: 0,
		level: 0,
		strength: 0,
		constitution: 0,
		intelligence: 0,
		dexterity: 0,
	},
	inventory: [],
	weapon: {
		charactersequipment_key: 0,
		equipment_key: 0,
		slot: 0,
		equipment_name: "",
		equipment_description: "",
		equipment_effect_stat: "",
		equipment_effect_stat_value: 0,
		equipped: false,
		equipment_icon: "",
	},
	armor: {
		charactersequipment_key: 0,
		equipment_key: 0,
		slot: 0,
		equipment_name: "",
		equipment_description: "",
		equipment_effect_stat: "",
		equipment_effect_stat_value: 0,
		equipped: false,
		equipment_icon: "",
	},
}

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserId: (state, action: PayloadAction<number>) => {
			state.userId = action.payload
		},
		setCharId: (state, action: PayloadAction<number>) => {
			state.charId = action.payload
		},
		setCharInfo: (state, action: PayloadAction<Info>) => {
			state.charInfo = action.payload
		},
		setInventory: (state, action: PayloadAction<[]>) => {
			state.inventory = [...action.payload]
		},
		setCharGold: (state, action: PayloadAction<number>) => {
			state.charInfo.gold = action.payload
		},

		setArmor: (state, action: PayloadAction<Equipment>) => {
			state.armor = action.payload
		},
		setWeapon: (state, action: PayloadAction<Equipment>) => {
			state.weapon = action.payload
		},
	},
})

export const {
	setUserId,
	setCharId,
	setCharInfo,
	setInventory,
	setCharGold,
	setArmor,
	setWeapon,
} = userSlice.actions

export const selectUserId = (state: RootState) => state.user.userId
export const selectCharId = (state: RootState) => state.user.charId
export const selectCharInfo = (state: RootState) => state.user.charInfo
export const selectInventory = (state: RootState) => state.user.inventory
export const selectCharGold = (state: RootState) => state.user.charInfo.gold
export const selectArmor = (state: RootState) => state.user.armor
export const selectWeapon = (state: RootState) => state.user.weapon

export default userSlice.reducer
