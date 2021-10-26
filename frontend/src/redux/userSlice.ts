import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"

interface Stats {
	strength: number
	constitution: number
	intelligence: number
	dexterity: number
}

interface UserState {
	userId: number
	charId: number
	charStats: Stats
}

// Define the initial state using that type
const initialState: UserState = {
	userId: 0,
	charId: 0,
	charStats: {
		strength: 0,
		constitution: 0,
		intelligence: 0,
		dexterity: 0,
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
		setCharStats: (state, action: PayloadAction<Stats>) => {
			state.charStats = action.payload
		},
	},
})

export const { setUserId, setCharId, setCharStats } = userSlice.actions

export const selectUserId = (state: RootState) => state.user.userId
export const selectCharId = (state: RootState) => state.user.charId
export const selectCharStats = (state: RootState) => state.user.charStats

export default userSlice.reducer
