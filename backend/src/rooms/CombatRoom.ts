import { Room, Client } from "colyseus";
import { CombatRoomState } from "./schema/CombatRoomState";

export class CombatRoom extends Room<CombatRoomState> {

    onCreate(options: any) {
        this.setState(new CombatRoomState());

        this.onMessage("turn", (client, message) => {
            console.log(client, message);
        });

    }

    onJoin(client: Client, options: any) {
        console.log(client.sessionId, "joined!");
    }

    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }

}
