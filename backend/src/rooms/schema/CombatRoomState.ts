import { Schema, ArraySchema, type } from "@colyseus/schema";

class Stats extends Schema {
    @type("number") strength: number = 5;
    @type("number") constitution: number;
    @type("number") intelligence: number;
    @type("number") dexterity: number;
}
class Spells extends Schema {

}
class Items extends Schema {
}
class Player extends Schema {
    @type("string") id: string;
    @type("string") displayName: string;
    @type("number") hp: number = 30;
    @type([Items]) items = new ArraySchema<Items>();
    @type([Spells]) spells = new ArraySchema<Spells>();
    @type(Stats) stats = new Stats();
}
export class CombatRoomState extends Schema {

    @type("string") mySynchronizedProperty: string = "Hello world";
    @type("string") currentTurn: string = 'party1'
    @type(Player) party1 = new Player();
    @type(Player) party2 = new Player();
}
