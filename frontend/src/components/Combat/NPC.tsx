import * as Colyseus from "colyseus.js"
import React, { ReactElement, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import {
	selectCharId,
	selectCharInfo,
	selectUserId,
} from "../../redux/userSlice"
import "./styles/combat.css"

interface Props {}

interface Props {}

export default function NPC(props: Props): ReactElement {
	const [turnCount, setTurnCount] = useState(0)
	const [currentTurn, setCurrentTurn] = useState("party1")
	const [combatLog, setCombatLog] = useState("")
	const [ready, setReady] = useState(false)
	const [myParty, setMyParty] = useState("")
	const [result, setResult] = useState<
		"party1" | "party2" | "dc" | undefined
	>()
	const [room, setRoom] = useState<any>()
	const [state, setState] = useState<any>()
	const [selectOpen, setSelectOpen] = useState<boolean>(false)
	const [selectType, setSelectType] = useState<"spell" | "item">("spell")
	const [activeSFX, setActiveSFX] = useState("")
	const userId = useAppSelector(selectUserId)
	const charId = useAppSelector(selectCharId)
	const charInfo = useAppSelector(selectCharInfo)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (currentTurn === "party1" || result !== undefined) {
			return
		}

		setTimeout(() => handleAction("attack", ""), 1500)
	}, [currentTurn])

	useEffect(() => {
		const initRoom = async (client: Colyseus.Client) => {
			const firstRoom = await client.joinOrCreate("combat", {
				charInfo,
			})
			firstRoom.onMessage("ready", () => {
				setTimeout(() => {
					setReady(true)
				}, 500)
			})

			firstRoom.onMessage("assignment", (message: any) => {
				if (message === "party1") {
					setMyParty("party1")
				} else {
					setMyParty("party2")
				}
			})

			firstRoom.onMessage("attack", (message: any) => {
				// console.log("attack")
				setCombatLog(`${message[0]} attacks for ${message[1]} damage!`)
				if (activeSFX) {
					return
				} else {
					setActiveSFX("audio/sfx/sfx-combat-hit.wav")
				}
			})

			firstRoom.onMessage("spell", (message: any) => {
				setCombatLog(message)
				if (activeSFX) {
					return
				} else {
					setActiveSFX("audio/sfx/sfx-shop-buy.wav")
				}
			})

			firstRoom.onMessage("item", (message: any) => {
				setCombatLog(`${message[0]} ${message[1]}`)
				if (activeSFX) {
					return
				} else {
					setActiveSFX("audio/sfx/sfx-combat-heal.wav")
				}
			})

			firstRoom.onMessage("evade", (message: any) => {
				setCombatLog(`${message} prepares to evade!`)
				if (activeSFX) {
					return
				} else {
					setActiveSFX("audio/sfx/sfx-shop-buy.wav")
				}
			})

			firstRoom.onMessage("miss", (message: any) => {
				if (message[0] === "attack") {
					setCombatLog(
						`${message[1]} attacked but ${message[2]} dodged it!`
					)
				} else {
					setCombatLog(
						`${message[1]} tried to cast ${message[0]} but ${message[2]} dodged it!`
					)
				}
				if (activeSFX) {
					return
				} else {
					setActiveSFX("audio/sfx/sfx-combat-evade.wav")
				}
			})

			firstRoom.onMessage("victory", (message: any) => {
				setResult(message)
				if (activeSFX) {
					return
				} else {
					setActiveSFX("audio/sfx/sfx-shop-buy.wav")
				}
			})
			// firstRoom?.listen("currentTurn", (val: string, prevVal: string) => {
			// 	console.log(val)
			// })

			firstRoom.onMessage("disconnect", () => {
				setResult("dc")
			})

			firstRoom.onStateChange((state: any) => {
				setState(state)
				setCurrentTurn(state.currentTurn)
			})
			setRoom(firstRoom)
		}

		initRoom(new Colyseus.Client("ws://localhost:3553"))
	}, [])

	const handleAction = (move: string, moveData: string) => {
		let message = {
			action: move,
			moveData: moveData,
		}
		if (room) {
			room.send("turn", message)
		}
	}

	const handleDebug = (party: string) => {
		if (room) {
			room.send("debug", party)
		}
	}

	// const getResultMessage = () => {
	// 	if (result !== undefined) {
	// 		if (result === "dc") {
	// 			return "Your opponent disconnected. You are victorious!"
	// 		} else {
	// 			if (myParty === "party1") {
	// 				if (result === myParty) {
	// 					return `You vanquished ${state.party2.displayName}!`
	// 				} else {
	// 					return `You were defeated by ${state.party1.displayName}!`
	// 				}
	// 			} else {
	// 				if (result === myParty) {
	// 					return `You vanquished ${state.party1.displayName}!`
	// 				} else {
	// 					return `You were defeated by ${state.party2.displayName}!`
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	// const controlSelectModal = (selectType?: "spell" | "item") => {
	// 	if (selectType) {
	// 		setSelectType(selectType)
	// 	}
	// 	setSelectOpen(!selectOpen)
	// }

	// console.log(currentTurn)
	return <></>
}
