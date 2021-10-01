import React, { Component } from "react";
import * as Colyseus from "colyseus.js";
import "./styles/combat.css";
import MoveBox from "./MoveBox";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";

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
}

const modalStyles = {
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
                if (message === 1) {
                    this.setState({ myParty: "party1", p1Ready: true });
                } else {
                    this.setState({ myParty: "party2", p2Ready: true });
                }
                console.log(message);
            });

            room.onMessage("ready", () => {
                this.setState({
                    p1Ready: true,
                    p2Ready: true,
                });
            });

            room.onMessage("attack", (message) => {
                this.setState({
                    combatLog: `${message[0]} attacked for ${message[1]} damage!`,
                });
            });

            room.onMessage("evade", (message) => {
                this.setState({
                    combatLog: `${message} prepared to evade!`,
                });
            });

            room.onMessage("miss", (message) => {
                this.setState({
                    combatLog: `${message[0]} attacked but ${message[1]} dodged it!`,
                });
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

    handleAction = (move: string) => {
        let room = this.state.roomInstance;
        let message = {
            action: move,
            moveData: {
                item: null,
                spell: "fireball",
            },
        };

        room.send("turn", message);

        this.setState({ combatLog: move });
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
                        <div className="party1-sprite-box">
                            <img
                                src="https://cdn2.scratch.mit.edu/get_image/gallery/25124327_170x100.png"
                                alt="donkey-kong-6065405-640"
                                className="party1-sprite"
                            />
                        </div>

                        <div className="mid-center">
                            <ReactModal
                                style={modalStyles}
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
                            <span>{this.state.combatLog}</span>
                        </div>

                        <div className="party2-sprite-box">
                            {this.state.p2Ready ? (
                                <img
                                    src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/3c1fb523717421.56327b1b5db32.gif"
                                    alt="giant rat"
                                    className="party2-sprite"
                                />
                            ) : null}
                        </div>
                    </div>
                    <div className="combat-bottom">
                        {this.state.p1Ready ? (
                            <div className="party-info-box party1-info">
                                <span className="party-name">
                                    {
                                        this.state.stateInstance.party1
                                            .displayName
                                    }
                                </span>
                                <progress
                                    className="nes-progress is-error hp-bar"
                                    value={
                                        this.state.stateInstance.party1
                                            .currentHp
                                    }
                                    max={this.state.stateInstance.party1.maxHp}
                                />
                                <span className="hp-text">
                                    {this.state.stateInstance.party1.currentHp}{" "}
                                    / {this.state.stateInstance.party1.maxHp}
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
                            <MoveBox
                                handleAction={this.handleAction}
                                currentTurn={this.state.currentTurn}
                                myParty={this.state.myParty}
                                loading={this.state.loading}
                            />
                        ) : null}

                        {this.state.p2Ready ? (
                            <div className="party-info-box party2-info">
                                <span className="party-name">
                                    {
                                        this.state.stateInstance.party2
                                            .displayName
                                    }
                                </span>
                                <progress
                                    className="nes-progress is-error hp-bar flipped-hp"
                                    value={
                                        this.state.stateInstance.party2
                                            .currentHp
                                    }
                                    max={this.state.stateInstance.party2.maxHp}
                                />
                                <span className="hp-text">
                                    {this.state.stateInstance.party2.currentHp}{" "}
                                    / {this.state.stateInstance.party2.maxHp}
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
