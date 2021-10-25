import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"

interface UserState {
	userId: number
	charId: number
}

// Define the initial state using that type
const initialState: UserState = {
	userId: 0,
	charId: 0,
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
	},
})

export const { setUserId, setCharId } = userSlice.actions

export const selectUserId = (state: RootState) => state.user.userId
export const selectCharId = (state: RootState) => state.user.charId

export default userSlice.reducer
