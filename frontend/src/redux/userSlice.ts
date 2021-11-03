import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"

interface Info {
	charName?: string
	gold?: number
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
	},
})

export const { setUserId, setCharId, setCharInfo, setInventory } =
	userSlice.actions

export const selectUserId = (state: RootState) => state.user.userId
export const selectCharId = (state: RootState) => state.user.charId
export const selectCharInfo = (state: RootState) => state.user.charInfo
export const selectInventory = (state: RootState) => state.user.inventory

export default userSlice.reducer
