import * as Colyseus from "colyseus.js"
import React, { ReactElement, useState, useEffect } from "react"
import ReactModal from "react-modal"
import { Link } from "react-router-dom"
import styled from "styled-components"
import MoveBox from "./MoveBox"
import SelectModal from "./SelectModal"
import LoadingModal from "./LoadingModal"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import {
	selectCharId,
	selectUserId,
	selectCharInfo,
	setCharId,
	setUserId,
	setCharInfo,
} from "../../redux/userSlice"
import BackgroundMusic from "../General/BackgroundMusic"
import SFX from "../General/SFX"
import "./styles/combat.css"
import { CombatState, Player } from "./CombatState"
import { current } from "@reduxjs/toolkit"

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
		console.log("npm turn", currentTurn)
		if (currentTurn === "party1") return
		setTimeout(() => handleAction("attack", ""), 1500)
	}, [currentTurn])

	useEffect(() => {
		const initRoom = async (client: Colyseus.Client) => {
			setRoom(
				await client.joinOrCreate("combat", {
					charInfo,
				})
			)
		}

		initRoom(new Colyseus.Client("ws://localhost:3553"))
	}, [])

	room?.onMessage("ready", () => {
		setTimeout(() => {
			setReady(true)
		}, 500)
	})

	room?.onMessage("assignment", (message: any) => {
		if (message === "party1") {
			setMyParty("party1")
		} else {
			setMyParty("party2")
		}
	})

	room?.onMessage("attack", (message: any) => {
		setCombatLog(`${message[0]} attacks for ${message[1]} damage!`)
		if (activeSFX) {
			return
		} else {
			setActiveSFX("audio/sfx/sfx-combat-hit.wav")
		}
	})

	room?.onMessage("spell", (message: any) => {
		setCombatLog(message)
		if (activeSFX) {
			return
		} else {
			setActiveSFX("audio/sfx/sfx-shop-buy.wav")
		}
	})

	room?.onMessage("item", (message: any) => {
		setCombatLog(`${message[0]} ${message[1]}`)
		if (activeSFX) {
			return
		} else {
			setActiveSFX("audio/sfx/sfx-combat-heal.wav")
		}
	})

	room?.onMessage("evade", (message: any) => {
		setCombatLog(`${message} prepares to evade!`)
		if (activeSFX) {
			return
		} else {
			setActiveSFX("audio/sfx/sfx-shop-buy.wav")
		}
	})

	room?.onMessage("miss", (message: any) => {
		if (message[0] === "attack") {
			setCombatLog(`${message[1]} attacked but ${message[2]} dodged it!`)
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

	// room?.onMessage("victory", (message: any) => {
	// 	setResult(message)
	// 	if (activeSFX) {
	// 		return
	// 	} else {
	// 		setActiveSFX("audio/sfx/sfx-shop-buy.wav")
	// 	}
	// })

	room?.onMessage("disconnect", () => {
		setResult("dc")
	})

	// room?.onMessage("end", (message: any) => {
	// 	console.log("end")
	// })

	room?.onStateChange.once((state: any) => {
		setRoom(room)
		setState(state)
	})

	room?.onStateChange((state: any) => {
		// console.log(currentTurn, "currentTurn", state.currentTurn)
		// setState(state)
		setCurrentTurn(state.currentTurn)
		// setTurnCount(turnCount + 1)
	})

	const handleEndSFX = () => {
		setActiveSFX("")
	}

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
