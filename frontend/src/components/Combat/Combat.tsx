import React, { Component } from "react";
import * as Colyseus from "colyseus.js";
import "./styles/combat.css";
import MoveBox from "./MoveBox";

interface Props {}
interface State {
    roomInstance: Colyseus.Room;
    stateInstance: any;
    lastMove: string | undefined;
    loading: boolean;
    p1Ready: boolean;
    p2Ready: boolean;
    myParty: string;
    currentTurn: string;
}

export default class Combat extends Component<Props, State> {
    componentWillMount() {
        this.setState({ lastMove: "", loading: true });
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

            room.onMessage("victory", (message) => {
                console.log(message);
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

        this.setState({ lastMove: move });
    };

    // partyHp() {
    //     if (roominstance)
    // }

    handleDebug = (party: string) => {
        let room = this.state.roomInstance;
        room.send("debug", party);
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

                        <div className="mid-center"></div>
                        <div className="party2-sprite-box">
                            <img
                                src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/3c1fb523717421.56327b1b5db32.gif"
                                alt="giant rat"
                                className="party2-sprite"
                            />
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
                        <MoveBox
                            handleAction={this.handleAction}
                            currentTurn={this.state.currentTurn}
                            myParty={this.state.myParty}
                            loading={this.state.loading}
                        />

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
