import axios from "axios"
import * as Colyseus from "colyseus.js"
import React, { ReactElement, useEffect, useState } from "react"
import ReactModal from "react-modal"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import {
	selectArmor,
	selectCharId,
	selectCharInfo,
	selectInventory,
	selectUserId,
	selectWeapon,
	selectWorld,
} from "../../redux/userSlice"
import BackgroundMusic from "../General/BackgroundMusic"
import SFX from "../General/SFX"
import LoadingModal from "./LoadingModal"
import MoveBox from "./MoveBox"
import SelectModal from "./SelectModal"
import "./styles/combat.css"

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
	const [resultMessage, setResultMessage] = useState("")
	const [room, setRoom] = useState<any>()
	const [state, setState] = useState<any>()
	const [selectOpen, setSelectOpen] = useState<boolean>(false)
	const [selectType, setSelectType] = useState<"spell" | "item">("spell")
	const [activeSFX, setActiveSFX] = useState("")
	const userId = useAppSelector(selectUserId)
	const charId = useAppSelector(selectCharId)
	const charInfo = useAppSelector(selectCharInfo)
	const inventory = useAppSelector(selectInventory)
	const armor = useAppSelector(selectArmor)
	const weapon = useAppSelector(selectWeapon)
	const dispatch = useAppDispatch()
	const world = useAppSelector(selectWorld)

	useEffect(() => {
		const combatItems = inventory.map((val) => {
			const {
				item_name,
				item_effect,
				item_effect_stat,
				item_effect_value,
				quantity,
			} = val
			const effectName = ["-str", "-dex", "", "-int"]
			const item = {
				itemName: item_name,
				effectType: `${item_effect}${effectName[item_effect_stat - 1]}`,
				effectBase: item_effect_value,
				inventoryQuantity: quantity,
			}
			return item
		})
		let armorMod = {}
		let weaponMod = {}

		if (armor) {
			armorMod = {
				stat: armor.equipment_effect_stat,
				value: armor.equipment_effect_stat_value,
			}
		} else {
			armorMod = { stat: "con", value: 0 }
		}
		if (weapon) {
			weaponMod = {
				stat: weapon.equipment_effect_stat,
				value: weapon.equipment_effect_stat_value,
			}
		} else {
			weaponMod = { stat: "str", value: 0 }
		}

		const initRoom = async (client: Colyseus.Client) => {
			const firstRoom = await client.joinOrCreate("combat", {
				charInfo,
				combatItems,
				armorMod,
				weaponMod,
				world,
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
				console.log("victory message sent")
				if (result !== message) {
					setResult(message)
				}

				if (activeSFX) {
					return
				} else {
					setActiveSFX("audio/sfx/sfx-shop-buy.wav")
				}
			})

			firstRoom.onMessage("disconnect", () => {
				setResult("dc")
			})

			firstRoom.onStateChange.once((state: any) => {
				console.log(state)
				console.log("onstatechange once")
				setState(state)
			})
			setRoom(firstRoom)
		}

		initRoom(new Colyseus.Client("ws://localhost:3553"))
	}, [])

	useEffect(() => {
		getResultMessage()
		if (result) {
			handleCombatEnd()
		}
	}, [result])

	const getBackground = () => {
		switch (world) {
			case 1:
				return "https://64.media.tumblr.com/00ec803404f6e9d6583f92d8870b5fb8/tumblr_p7k8f3fMWS1wvbydeo1_1280.png"
			case 2:
				return "https://cdna.artstation.com/p/assets/images/images/008/322/658/large/helen-boyko-ruins2.jpg?1511995428"
			case 3:
				return "https://i.pinimg.com/originals/4b/b0/72/4bb07279630a9ea5601a5022dc461623.png"
			case 4:
				return "https://wallpapercave.com/wp/wp7991864.jpg"
			case 5:
				return "https://wi.wallpapertip.com/wsimgs/138-1384359_city-rain-pixel-art.jpg"
			default:
				return
		}
	}

	const getMusic = () => {
		switch (world) {
			case 1:
				return "track8-adventure.mp3"
			case 2:
				return "track10-egypt.mp3"
			case 3:
				return "track2-castle.mp3"
			case 4:
				return "track1-retro.mp3"
			case 5:
				return "track6-funk.mp3"
			default:
				return
		}
	}

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

	const getResultMessage = () => {
		if (result === undefined) {
			return
		} else {
			if (result === "dc") {
				setResultMessage(
					"Your opponent disconnected. You are victorious!"
				)
			} else {
				if (myParty === "party2") {
					if (result === myParty) {
						setResultMessage(
							`You vanquished ${state.party1.displayName}!`
						)
					} else {
						setResultMessage(
							`You were defeated by ${state.party2.displayName}!`
						)
					}
				} else {
					if (result === myParty) {
						setResultMessage(
							`You vanquished ${state.party2.displayName}!`
						)
					} else {
						setResultMessage(
							`You were defeated by ${state.party1.displayName}!`
						)
					}
				}
			}
		}
	}

	const handleCombatEnd = async () => {
		axios
			.put(`/api/combat/${charId}`, {
				xpReward: state.party2.xpReward,
				world: world,
			})
			.then((response) => {
				console.log(response)
			})
			.catch((error) => console.error(error))
	}

	const controlSelectModal = (selectType?: "spell" | "item") => {
		if (selectType) {
			setSelectType(selectType)
		}
		setSelectOpen(!selectOpen)
	}

	const leaveCombat = () => {
		if (room) {
			room.leave()
		}
	}

	if (room === undefined) {
		return <PageContainer></PageContainer>
	} else if (ready === false) {
		return (
			<PageContainer
				style={{
					background: `url(${getBackground()}) no-repeat fixed`,
					backgroundSize: "cover",
				}}>
				<LoadingModal ready={ready} />
			</PageContainer>
		)
	} else {
		return (
			<PageContainer
				style={{
					background: `url(${getBackground()}) no-repeat fixed`,
					backgroundSize: "cover",
				}}>
				<BackgroundMusic musicSrc={`audio/music/${getMusic()}`} />
				{activeSFX === "" ? (
					""
				) : (
					<SFX sfxSrc={activeSFX} handleEndSFX={handleEndSFX} />
				)}
				<div className="combat-top">
					<h1 className="nes-text">Combat</h1>
					<Link to="/home">
						<button onClick={() => leaveCombat()}>
							Go back to the home page
						</button>
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
								<p>{resultMessage}</p>

								<menu className="dialog-menu flex-dialog-menu">
									<Link to="/home">
										<button
											onClick={() => leaveCombat()}
											className="nes-btn dialog-btn">
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
					</div>
				</div>
			</PageContainer>
		)
	}
}
