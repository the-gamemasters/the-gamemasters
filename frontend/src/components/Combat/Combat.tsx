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

interface Props {}

const combatEndModalStyles = {
	overlay: {
		backgroundColor: "rgba(39, 39, 39, 0.6)",
	},
	content: {
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		border: "none",
		background: "none",
		outline: "none",
		padding: "20px",
		height: "50%",
		width: "30%",
	},
}

const PageContainer = styled.div`
	height: 100vh;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 2fr 3fr 2fr;
	grid-column-gap: 0px;
	grid-row-gap: 0px;
	background: url(https://64.media.tumblr.com/00ec803404f6e9d6583f92d8870b5fb8/tumblr_p7k8f3fMWS1wvbydeo1_1280.png)
		no-repeat fixed;
	background-size: cover;
	padding: 2em;
`

const PartyIndicator = styled.i`
	display: inline;
`

const CombatLogContainer = styled.div`
	background-color: white;
`

const CombatLogText = styled.span`
	color: black;
`

const HPBar = styled.progress`
	width: 60%;
`

ReactModal.setAppElement("#root")

interface Props {}

export default function Combat(props: Props): ReactElement {
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

	useEffect(() => {}, [])

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

	room?.onMessage("victory", (message: any) => {
		setResult(message)
		if (activeSFX) {
			return
		} else {
			setActiveSFX("audio/sfx/sfx-shop-buy.wav")
		}
	})

	room?.onMessage("disconnect", () => {
		setResult("dc")
	})

	room?.onStateChange.once((state: any) => {
		setRoom(room)
		setState(state)
	})

	room?.onStateChange((state: any) => {
		setState(state)
		setCurrentTurn(state.currentTurn)
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

	const getResultMessage = () => {
		if (result !== undefined) {
			console.log(result)
			if (result === "dc") {
				return "Your opponent disconnected. You are victorious!"
			} else {
				if (myParty === "party1") {
					if (result === myParty) {
						return `You vanquished ${state.party2.displayName}!`
					} else {
						return `You were defeated by ${state.party1.displayName}!`
					}
				} else {
					if (result === myParty) {
						return `You vanquished ${state.party1.displayName}!`
					} else {
						return `You were defeated by ${state.party2.displayName}!`
					}
				}
			}
		}
	}

	const controlSelectModal = (selectType?: "spell" | "item") => {
		if (selectType) {
			setSelectType(selectType)
		}
		setSelectOpen(!selectOpen)
	}

	if (room === undefined) {
		return <PageContainer></PageContainer>
	} else if (ready === false) {
		return (
			<PageContainer>
				<LoadingModal ready={ready} />
			</PageContainer>
		)
	} else {
		return (
			<PageContainer>
				<BackgroundMusic musicSrc={"audio/music/track3-time.mp3"} />
				{activeSFX === "" ? (
					""
				) : (
					<SFX sfxSrc={activeSFX} handleEndSFX={handleEndSFX} />
				)}
				<div className="combat-top">
					<h1 className="nes-text">Combat</h1>
					<h6>Room ID: {room.id}</h6>
					<Link to="/home">
						<button>Go back to the home page</button>
					</Link>
				</div>
				<div className="combat-mid">
					<div className="party1-sprite-box">
						<img
							src={state.party1.spriteUrl}
							alt={state.party1.displayName}
							className="party1-sprite"
						/>
					</div>

					<div className="mid-center">
						<ReactModal
							style={combatEndModalStyles}
							isOpen={result !== undefined}>
							<div
								className="nes-dialog is-dark is-rounded"
								id="dialog-dark-rounded">
								{result === myParty || result === "dc" ? (
									<p className="title nes-text is-success">
										Victory!
									</p>
								) : (
									<p className="title nes-text is-error">
										Defeat!
									</p>
								)}
								<p>{getResultMessage()}</p>
								<menu className="dialog-menu flex-dialog-menu">
									<Link to="/home">
										<button className="nes-btn dialog-btn">
											Return Home
										</button>
									</Link>
									{result === myParty ? (
										<button className="nes-btn is-primary dialog-btn">
											Venture Forth
										</button>
									) : null}
								</menu>
							</div>
						</ReactModal>

						<SelectModal
							selectOpen={selectOpen}
							selectType={selectType}
							partyInstance={
								myParty === "party1"
									? state.party1
									: state.party2
							}
							closeModal={controlSelectModal}
							handleAction={handleAction}
						/>
					</div>

					<div className="party2-sprite-box">
						<img
							src={state.party2.spriteUrl}
							alt={state.party2.displayName}
							className="party2-sprite"
						/>
					</div>
				</div>
				<div className="combat-bottom">
					<div className="party-info-box party1-info">
						<span className="party-name">
							<span
								className={
									state.currentTurn === "party1"
										? "party-name-turn"
										: undefined
								}>
								{state.party1.displayName}
							</span>
							{myParty === "party1" ? (
								<PartyIndicator className="nes-icon is-medium star" />
							) : null}
						</span>
						<HPBar
							className="nes-progress is-error"
							value={state.party1.tempHp}
							max={state.party1.baseHp}
						/>
						<span className="hp-text">
							{state.party1.tempHp} / {state.party1.baseHp}
						</span>
						<button
							type="button"
							className="nes-btn"
							onClick={() => handleDebug("party1")}>
							Debug P1
						</button>
					</div>

					<div className="bottom-center">
						<MoveBox
							handleAction={handleAction}
							myTurn={
								state.currentTurn === myParty ? true : false
							}
							openSelectModal={controlSelectModal}
						/>
						<CombatLogContainer className="nes-container combat-log-container">
							<CombatLogText className="nes-text combat-log-text">
								{combatLog}
							</CombatLogText>
						</CombatLogContainer>
					</div>

					<div className="party-info-box party2-info">
						<span className="party-name">
							{myParty === "party2" ? (
								<PartyIndicator className="nes-icon is-medium star" />
							) : null}

							<span
								className={
									state.currentTurn === "party2"
										? "party-name-turn"
										: ""
								}>
								{state.party2.displayName}
							</span>
						</span>
						<HPBar
							className="nes-progress is-error flipped-hp"
							value={state?.party2.tempHp}
							max={state?.party2.baseHp}
						/>
						<span className="hp-text">
							{state.party2.tempHp} / {state.party2.baseHp}
						</span>
						<button
							type="button"
							className="nes-btn"
							onClick={() => handleDebug("party2")}>
							Debug P2
						</button>
					</div>
				</div>
			</PageContainer>
		)
	}
}
