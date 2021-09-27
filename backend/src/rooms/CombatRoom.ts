import { Room, Client } from 'colyseus';
import { CombatRoomState } from './schema/CombatRoomState';

interface mockBattle {
    party1: {
        id: string,
        displayName: string,
        hp: number,
        stats: {
            strength: number;
            dexterity: number;
            constitution: number;
            intelligence: number;
        }
    },
    party2: {
        id: string,
        displayName: string,
        hp: number,
        stats: {
            strength: number;
            dexterity: number;
            constitution: number;
            intelligence: number;
        }
    }
}
export class CombatRoom extends Room<CombatRoomState> {
    maxClients = 2;
    onCreate(options: any) {
        this.setState(new CombatRoomState());

        this.onMessage('turn', (client, message) => {
            console.log(`${client.sessionId} used ${message.action}`);

            switch (message.action) {
                case 'attack':
                    if (this.state.currentTurn === 'party1') {
                        let damageDealt = Math.floor(((this.state.party1.stats.strength + this.state.party1.weaponBonus) * (Math.random() * (1.2 - .8) + .8)))
                        console.log('P1 Attack:', damageDealt)
                        this.state.party2.currentHp -= damageDealt;

                        if (this.state.party2.currentHp <= 0) {
                            this.state.party2.currentHp = 0;
                            this.broadcast('victory', 'party1')
                        }
                        this.state.currentTurn = 'party2'
                    } else {
                        let damageDealt = Math.floor(((this.state.party2.stats.strength + this.state.party2.weaponBonus) * (Math.random() * (1.2 - .8) + .8)))
                        console.log('P2 Attack:', damageDealt)
                        this.state.party1.currentHp -= damageDealt;

                        if (this.state.party1.currentHp <= 0) {
                            this.state.party1.currentHp = 0;
                            this.broadcast('victory', 'party2')
                        }
                        this.state.currentTurn = 'party1'
                    }
                    break;

                case 'spell':
                    if (this.state.currentTurn === 'party1') {
                        this.state.currentTurn = 'party2'
                    } else {
                        this.state.currentTurn = 'party1'
                    }
                    break;

                case 'item':
                    if (this.state.currentTurn === 'party1') {

                    } else {

                    }
                    break;

                case 'evade':
                    if (this.state.currentTurn === 'party1') {

                    } else {

                    }
                    break;
            }

        });

        this.onMessage('debug', (client, message) => {
            if (message === 'party1') {
                console.log(JSON.stringify(this.state.party1))
            } else if (message === 'party2') {
                console.log(JSON.stringify(this.state.party2))
            }

        })
    }

    onJoin(client: Client, options: any) {
        if (this.clients.length === 1) {
            console.log(client.sessionId, 'joined as P1!');
            this.state.party1.id = client.sessionId;
            client.send('assignment', 1);

            //Mock Party1 "Charles"
            this.state.party1.displayName = "Charles";
            this.state.party1.weaponBonus = 1;
            this.state.party1.stats.strength = 15;
            this.state.party1.stats.dexterity = 6;
            this.state.party1.stats.constitution = 11;
            this.state.party1.maxHp = this.state.party1.stats.constitution * 10;
            this.state.party1.currentHp = this.state.party1.maxHp;
            this.state.party1.stats.intelligence = 8;

        } else if (this.clients.length === 2) {
            console.log(client.sessionId, 'joined as P2!');
            this.state.party2.id = client.sessionId;
            client.send('assignment', 2);
            //Mock Party2 "Giant Rat"
            this.state.party2.displayName = "Giant Rat";
            this.state.party2.weaponBonus = 4;
            this.state.party2.stats.strength = 5;
            this.state.party2.stats.dexterity = 9;
            this.state.party2.stats.constitution = 13;
            this.state.party2.maxHp = this.state.party2.stats.constitution * 10;
            this.state.party2.currentHp = this.state.party2.maxHp;
            this.state.party2.stats.intelligence = 0;
            this.broadcast("ready")
        }


        //TODO Connect to backend, which connects to DB, to get player stats, items, and spells
    }

    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, 'left!');
    }

    onDispose() {
        console.log('room', this.roomId, 'disposing...');
    }
}


