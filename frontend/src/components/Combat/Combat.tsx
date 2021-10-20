import React, { Component } from "react";
import * as Colyseus from "colyseus.js";
import "./styles/combat.css";
import MoveBox from "./MoveBox";
import ReactModal from "react-modal";
import SelectModal from "./SelectModal";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {}
interface State {
	roomInstance: Colyseus.Room;
	stateInstance: any;
	combatLog: string;
	loading: boolean;
	p1Ready: boolean;
	p2Ready: boolean;
	myParty: string;
	currentTurn: string;
	result: string | undefined;
	selectOpen: boolean;
	selectType?: "spell" | "item";
}

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
export default class Combat extends Component<Props, State> {
	componentWillMount() {
		this.setState({ combatLog: "", loading: true });
	}
	componentDidMount() {
		let client = new Colyseus.Client("ws://localhost:3553");
		client.joinOrCreate("combat").then((room) => {
			//* Function to handle handing out party1 or party2 status
			room.onMessage("assignment", (message) => {
				if (message === "party1") {
					this.setState({ myParty: "party1", p1Ready: true });
				} else {
					this.setState({ myParty: "party2", p2Ready: true });
				}
			});

			room.onMessage("ready", () => {
				this.setState({
					p1Ready: true,
					p2Ready: true,
				});
			});

			room.onMessage("attack", (message) => {
				this.setState({
					combatLog: `${message[0]} attacks for ${message[1]} damage!`,
				});
			});

			room.onMessage("spell", (message) => {
				this.setState({
					combatLog: message,
				});
			});

			room.onMessage("item", (message) => {
				this.setState({
					combatLog: `${message[0]} ${message[1]}`,
				});
			});

			room.onMessage("evade", (message) => {
				this.setState({
					combatLog: `${message} prepares to evade!`,
				});
			});

			room.onMessage("miss", (message) => {
				if (message[0] === "attack") {
					this.setState({
						combatLog: `${message[1]} attacked but ${message[2]} dodged it!`,
					});
				} else {
					this.setState({
						combatLog: `${message[1]} tried to cast ${message[0]} but ${message[2]} dodged it!`,
					});
				}
			});

			room.onMessage("victory", (message) => {
				this.setState({ result: message });
			});

			//* Function to grab state updates
			room.onStateChange((state) => {
				this.setState({ stateInstance: state });
				this.setState({
					currentTurn: this.state.stateInstance.currentTurn,
				});
			});
			this.setState({ roomInstance: room, loading: false });
		});
	}

	// This might have to be changed if we want to be able to have multiple items and spells -Nathan

	handleAction = (move: string, moveData: string) => {
		let room = this.state.roomInstance;
		let message = {
			action: move,
			moveData: moveData,
		};

		room.send("turn", message);
	};

	handleDebug = (party: string) => {
		let room = this.state.roomInstance;
		room.send("debug", party);
	};

	getResultMessage = () => {
		if (this.state.result !== undefined) {
			if (this.state.result === this.state.myParty) {
				return `You vanquished ${this.state.stateInstance.party2.displayName}!`;
			} else {
				return `You were defeated by ${this.state.stateInstance.party1.displayName}!`;
			}
		}
	};

	openSelectModal = (selectType: "spell" | "item") => {
		this.setState({ selectOpen: true, selectType: selectType });
	};

	closeSelectModal = () => {
		this.setState({ selectOpen: false });
	};

	render() {
		if (this.state.loading === true) {
			return <div className="page-container">Loading...</div>;
		} else {
			return (
				<div className="page-container">
					<div className="combat-top">
						<h1 className="nes-text">Combat</h1>
						<h6>Room ID: {this.state.roomInstance.id}</h6>
					</div>
					<div className="combat-mid">
						{this.state.p1Ready ? (
							<div className="party1-sprite-box">
								<img
									src={
										this.state.stateInstance.party1
											.spriteUrl
									}
									alt={
										this.state.stateInstance.party1
											.displayName
									}
									className="party1-sprite"
								/>
							</div>
						) : undefined}

						<div className="mid-center">
							<ReactModal
								style={combatEndModalStyles}
								isOpen={this.state.result !== undefined}>
								<div
									className="nes-dialog is-dark is-rounded"
									id="dialog-dark-rounded">
									{this.state.result ===
									this.state.myParty ? (
										<p className="title nes-text is-success">
											Victory!
										</p>
									) : (
										<p className="title nes-text is-error">
											Defeat!
										</p>
									)}
									<p>{this.getResultMessage()}</p>
									<menu className="dialog-menu flex-dialog-menu">
										<Link to="/home">
											<button className="nes-btn dialog-btn">
												Return Home
											</button>
										</Link>
										{this.state.result ===
										this.state.myParty ? (
											<button className="nes-btn is-primary dialog-btn">
												Venture Forth
											</button>
										) : null}
									</menu>
								</div>
							</ReactModal>
							{this.state.p1Ready === true &&
							this.state.p2Ready === true ? (
								<SelectModal
									selectOpen={this.state.selectOpen}
									selectType={this.state.selectType}
									partyInstance={
										this.state.stateInstance[
											this.state.myParty
										]
									}
									closeModal={this.closeSelectModal}
									handleAction={this.handleAction}
								/>
							) : null}
						</div>

						<div className="party2-sprite-box">
							{this.state.p2Ready ? (
								<img
									src={
										this.state.stateInstance.party2
											.spriteUrl
									}
									alt={
										this.state.stateInstance.party2
											.displayName
									}
									className="party2-sprite"
								/>
							) : null}
						</div>
					</div>
					<div className="combat-bottom">
						{this.state.p1Ready ? (
							<div className="party-info-box party1-info">
								<span className="party-name">
									<span
										className={
											this.state.currentTurn === "party1"
												? "party-name-turn"
												: undefined
										}>
										{
											this.state.stateInstance.party1
												.displayName
										}
									</span>
									{this.state.myParty === "party1" ? (
										<PartyIndicator className="nes-icon is-medium star" />
									) : null}
								</span>
								<progress
									className="nes-progress is-error hp-bar"
									value={
										this.state.stateInstance.party1.tempHp
									}
									max={this.state.stateInstance.party1.baseHp}
								/>
								<span className="hp-text">
									{this.state.stateInstance.party1.tempHp} /{" "}
									{this.state.stateInstance.party1.baseHp}
								</span>
								<button
									type="button"
									className="nes-btn"
									onClick={() => this.handleDebug("party1")}>
									Debug P1
								</button>
							</div>
						) : (
							<div></div>
						)}
						{this.state.p1Ready === true &&
						this.state.p2Ready === true ? (
							<div className="bottom-center">
								<MoveBox
									handleAction={this.handleAction}
									currentTurn={this.state.currentTurn}
									myParty={this.state.myParty}
									loading={this.state.loading}
									openSelectModal={this.openSelectModal}
								/>
								<CombatLogContainer className="nes-container combat-log-container">
									<CombatLogText className="nes-text combat-log-text">
										{this.state.combatLog}
									</CombatLogText>
								</CombatLogContainer>
							</div>
						) : null}

						{this.state.p2Ready ? (
							<div className="party-info-box party2-info">
								<span className="party-name">
									{this.state.myParty === "party2" ? (
										<PartyIndicator className="nes-icon is-medium star" />
									) : null}

									<span
										className={
											this.state.currentTurn === "party2"
												? "party-name-turn"
												: undefined
										}>
										{
											this.state.stateInstance.party2
												.displayName
										}
									</span>
								</span>
								<progress
									className="nes-progress is-error hp-bar flipped-hp"
									value={
										this.state.stateInstance.party2.tempHp
									}
									max={this.state.stateInstance.party2.baseHp}
								/>
								<span className="hp-text">
									{this.state.stateInstance.party2.tempHp} /{" "}
									{this.state.stateInstance.party2.baseHp}
								</span>
								<button
									type="button"
									className="nes-btn"
									onClick={() => this.handleDebug("party2")}>
									Debug P2
								</button>
							</div>
						) : null}
					</div>
				</div>
			);
		}
	}
}
