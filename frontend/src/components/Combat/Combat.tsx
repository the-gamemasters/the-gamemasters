import React, { Component } from 'react';
import * as Colyseus from 'colyseus.js';

interface Props {}
interface State {
    roomInstance: Colyseus.Room;
    lastMove: string | undefined;
    loading: boolean;
}

export default class Combat extends Component<Props, State> {
    componentWillMount() {
        this.setState({ lastMove: '', loading: true });
    }
    componentDidMount() {
        let client = new Colyseus.Client('ws://localhost:3553');
        client.joinOrCreate('combat').then((room) => {
            this.setState({ roomInstance: room, loading: false });
            room.onMessage('assignment', (message) => {
                // if (message) {

                // }
                console.log(message);
            });
        });
    }

    handleAction = (move: string) => {
        let room = this.state.roomInstance;
        let message = {
            action: move,
            moveData: {
                item: null,
                spell: 'fireball',
            },
        };

        room.send('turn', message);

        this.setState({ lastMove: move });
    };

    // partyHp() {
    //     if (roominstance)
    // }

    render() {
        if (this.state.loading === true) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <h1>Combat</h1>
                    <div>
                        <button onClick={() => this.handleAction('attack')}>
                            Attack
                        </button>
                        <button onClick={() => this.handleAction('spell')}>
                            Spells
                        </button>
                        <button onClick={() => this.handleAction('item')}>
                            Items
                        </button>
                        <button onClick={() => this.handleAction('evade')}>
                            Evade
                        </button>
                    </div>
                    <br />
                    <span>{this.state.lastMove}</span>
                    <br />
                    {console.log(this.state.roomInstance)}
                    <span>
                        Enemy HP: {this.state.roomInstance.state.party2.hp}
                    </span>
                </div>
            );
        }
    }
}
