import { Schema, ArraySchema, type } from "@colyseus/schema";

class Stats extends Schema {
    @type("number") strength: number;
    @type("number") dexterity: number;
    @type("number") constitution: number;
    @type("number") intelligence: number;
}

class Spells extends Schema { }

class Items extends Schema { }

class Player extends Schema {
    @type("string") id: string;
    @type("string") displayName: string;
    @type("number") maxHp: number;
    @type("number") currentHp: number;
    @type("number") weaponBonus: number;
    @type([Items]) items = new ArraySchema<Items>();
    @type([Spells]) spells = new ArraySchema<Spells>();
    @type(Stats) stats = new Stats();
}
export class CombatRoomState extends Schema {
    @type("string") currentTurn: string = "party1";
    @type(Player) party1 = new Player();
    @type(Player) party2 = new Player();
}

/*
party1 = {
    id: '',
    displayName: '',
    hp: 30,
    items: [

    ],
    spells: [

    ]
    stats: {
        strength: number;
        dexterity: number;
        constitution: number;
        intelligence: number;
    }
}
*/
