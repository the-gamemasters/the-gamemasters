import { Room, Client } from 'colyseus';
import { CombatRoomState } from './schema/CombatRoomState';

export class CombatRoom extends Room<CombatRoomState> {
    maxClients = 2;
    onCreate(options: any) {
        this.setState(new CombatRoomState());

        this.onMessage('turn', (client, message) => {
            console.log(`${client.sessionId} used ${message.action}`);
            switch (message.action) {
                case 'attack':
                    if (this.state.currentTurn === 'party1') {
                        this.state.party2.hp -= this.state.party1.stats.strength;
                        if (this.state.party2.hp <= 0) {
                            //TODO add death logic for party 2 death
                        }
                    } else {
                        this.state.party1.hp -= this.state.party2.stats.strength;
                        if (this.state.party1.hp <= 0) {
                            //TODO add death logic for party 1 death
                        }
                    }
            }
        });
    }

    onJoin(client: Client, options: any) {
        console.log(client.sessionId, 'joined!');
        if (this.clients.length === 0) {
            this.state.party1.id = client.sessionId;
            client.send('assignment', 1)
        } else {
            this.state.party2.id = client.sessionId;
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
