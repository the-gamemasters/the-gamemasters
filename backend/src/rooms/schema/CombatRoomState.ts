import { Schema, Context, type } from "@colyseus/schema";

export class CombatRoomState extends Schema {

    @type("string") mySynchronizedProperty: string = "Hello world";

}
