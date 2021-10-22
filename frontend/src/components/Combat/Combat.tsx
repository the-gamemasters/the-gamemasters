import * as Colyseus from "colyseus.js";
import React, { ReactElement, useState, useEffect } from "react";

import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MoveBox from "./MoveBox";
import SelectModal from "./SelectModal";
import "./styles/combat.css";
import { useAppSelector, useAppDispatch } from "../../redux/reduxHooks";
import {
	setUserId,
	setCharId,
	selectUserId,
	selectCharId,
} from "../../redux/userSlice";

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
};

const PartyIndicator = styled.i`
	display: inline;
`;

const CombatLogContainer = styled.div`
	background-color: white;
`;

const CombatLogText = styled.span`
	color: black;
`;

ReactModal.setAppElement("#root");

interface Props {}

export default function Combat(props: Props): ReactElement {
	const [combatLog, setCombatLog] = useState("");
	const [loading, setLoading] = useState(true);
	const [myParty, setMyParty] = useState("");
	const [p1Ready, setP1Ready] = useState(false);
	const [p2Ready, setP2Ready] = useState(false);
	const [currentTurn, setCurrentTurn] = useState<
		"party1" | "party2" | undefined
	>();
	const [result, setResult] = useState();
	const [roomInstance, setRoomInstance] = useState<
		Colyseus.Room | undefined
	>();
	const [stateInstance, setStateInstance] = useState<any>();

	const [selectOpen, setSelectOpen] = useState<boolean>(false);
	const [selectType, setSelectType] = useState<"spell" | "item">("spell");
	const userId = useAppSelector(selectUserId);
	const charId = useAppSelector(selectCharId);
	const dispatch = useAppDispatch();

	useEffect(() => {
		//TODO
		dispatch(setUserId(12345));
		dispatch(setCharId(67890));
	});

	useEffect(() => {
		const client = new Colyseus.Client("ws://localhost:3553");
		client.joinOrCreate("combat").then((room) => {
			setRoomInstance(room);
			room.onMessage("assignment", (message) => {
				if (message === "party1") {
					setMyParty("party1");

					setP1Ready(true);
				} else {
					setMyParty("party2");

					setP2Ready(true);
				}
			});

			room.onMessage("ready", () => {
				setP1Ready(true);
				setP2Ready(true);
			});

			room.onMessage("attack", (message) => {
				setCombatLog(`${message[0]} attacks for ${message[1]} damage!`);
			});

			room.onMessage("spell", (message) => {
				setCombatLog(message);
			});

			room.onMessage("item", (message) => {
				setCombatLog(`${message[0]} ${message[1]}`);
			});

			room.onMessage("evade", (message) => {
				setCombatLog(`${message} prepares to evade!`);
			});

			room.onMessage("miss", (message) => {
				if (message[0] === "attack") {
					setCombatLog(
						`${message[1]} attacked but ${message[2]} dodged it!`
					);
				} else {
					setCombatLog(
						`${message[1]} tried to cast ${message[0]} but ${message[2]} dodged it!`
					);
				}
			});

			room.onMessage("victory", (message) => {
				setResult(message);
			});

			room.onStateChange((state) => {
				console.log(state);
				setStateInstance(state);
			});

			setLoading(false);
		});
	}, []);

	const handleAction = (move: string, moveData: string) => {
		let room: any = roomInstance;
		let message = {
			action: move,
			moveData: moveData,
		};

		room.send("turn", message);
	};

	const handleDebug = (party: string) => {
		let room: any = roomInstance;
		room.send("debug", party);
	};

	const getResultMessage = () => {
		if (result !== undefined) {
			if (result === myParty) {
				return `You vanquished ${stateInstance?.party2.displayName}!`;
			} else {
				return `You were defeated by ${stateInstance?.party1.displayName}!`;
			}
		}
	};

	const controlSelectModal = (selectType?: "spell" | "item") => {
		if (selectType) {
			setSelectType(selectType);
		}
		setSelectOpen(!selectType);
	};

	if (loading === true) {
		return <div className="page-container">Loading...</div>;
	} else {
		return (
			<div className="page-container">
				<div className="combat-top">
					<h1 className="nes-text">Combat</h1>
					<h6>Room ID: {roomInstance?.id}</h6>
				</div>
				<div className="combat-mid">
					{p1Ready ? (
						<div className="party1-sprite-box">
							<img
								src={stateInstance.party1.spriteUrl}
								alt={stateInstance.party1.displayName}
								className="party1-sprite"
							/>
						</div>
					) : undefined}

					<div className="mid-center">
						<ReactModal
							style={combatEndModalStyles}
							isOpen={result !== undefined}>
							<div
								className="nes-dialog is-dark is-rounded"
								id="dialog-dark-rounded">
								{result === myParty ? (
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
						{p1Ready === true && p2Ready === true ? (
							<SelectModal
								selectOpen={selectOpen}
								selectType={selectType}
								partyInstance={stateInstance[myParty]}
								closeModal={controlSelectModal}
								handleAction={handleAction}
							/>
						) : null}
					</div>

					<div className="party2-sprite-box">
						{p2Ready ? (
							<img
								src={stateInstance.party2.spriteUrl}
								alt={stateInstance.party2.displayName}
								className="party2-sprite"
							/>
						) : null}
					</div>
				</div>
				<div className="combat-bottom">
					{p1Ready ? (
						<div className="party-info-box party1-info">
							<span className="party-name">
								<span
									className={
										stateInstance.currentTurn === "party1"
											? "party-name-turn"
											: undefined
									}>
									{stateInstance.party1.displayName}
								</span>
								{myParty === "party1" ? (
									<PartyIndicator className="nes-icon is-medium star" />
								) : null}
							</span>
							<progress
								className="nes-progress is-error hp-bar"
								value={stateInstance.party1.tempHp}
								max={stateInstance.party1.baseHp}
							/>
							<span className="hp-text">
								{stateInstance.party1.tempHp} /{" "}
								{stateInstance.party1.baseHp}
							</span>
							<button
								type="button"
								className="nes-btn"
								onClick={() => handleDebug("party1")}>
								Debug P1
							</button>
						</div>
					) : (
						<div></div>
					)}
					{p1Ready === true && p2Ready === true ? (
						<div className="bottom-center">
							<MoveBox
								handleAction={handleAction}
								currentTurn={stateInstance.currentTurn}
								myParty={myParty}
								loading={loading}
								openSelectModal={controlSelectModal}
							/>
							<CombatLogContainer className="nes-container combat-log-container">
								<CombatLogText className="nes-text combat-log-text">
									{combatLog}
								</CombatLogText>
							</CombatLogContainer>
						</div>
					) : null}

					{p2Ready ? (
						<div className="party-info-box party2-info">
							<span className="party-name">
								{myParty === "party2" ? (
									<PartyIndicator className="nes-icon is-medium star" />
								) : null}

								<span
									className={
										stateInstance.currentTurn === "party2"
											? "party-name-turn"
											: undefined
									}>
									{stateInstance.party2.displayName}
								</span>
							</span>
							<progress
								className="nes-progress is-error hp-bar flipped-hp"
								value={stateInstance.party2.tempHp}
								max={stateInstance.party2.baseHp}
							/>
							<span className="hp-text">
								{stateInstance.party2.tempHp} /{" "}
								{stateInstance.party2.baseHp}
							</span>
							<button
								type="button"
								className="nes-btn"
								onClick={() => handleDebug("party2")}>
								Debug P2
							</button>
						</div>
					) : null}
				</div>
			</div>
		);
	}
}
