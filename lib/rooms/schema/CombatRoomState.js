"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = exports.Items = exports.Spells = exports.Stats = void 0;
const schema_1 = require("@colyseus/schema");
class Stats extends schema_1.Schema {
}
__decorate([
    (0, schema_1.type)("number")
], Stats.prototype, "strength", void 0);
__decorate([
    (0, schema_1.type)("number")
], Stats.prototype, "dexterity", void 0);
__decorate([
    (0, schema_1.type)("number")
], Stats.prototype, "constitution", void 0);
__decorate([
    (0, schema_1.type)("number")
], Stats.prototype, "intelligence", void 0);
exports.Stats = Stats;
class Spells extends schema_1.Schema {
}
__decorate([
    (0, schema_1.type)("string")
], Spells.prototype, "spellName", void 0);
__decorate([
    (0, schema_1.type)("string")
], Spells.prototype, "spellSchool", void 0);
__decorate([
    (0, schema_1.type)("string")
], Spells.prototype, "effectType", void 0);
__decorate([
    (0, schema_1.type)("number")
], Spells.prototype, "effectBase", void 0);
__decorate([
    (0, schema_1.type)("number")
], Spells.prototype, "effectDuration", void 0);
__decorate([
    (0, schema_1.type)("number")
], Spells.prototype, "cooldownTurns", void 0);
exports.Spells = Spells;
class Items extends schema_1.Schema {
}
__decorate([
    (0, schema_1.type)("string")
], Items.prototype, "itemName", void 0);
__decorate([
    (0, schema_1.type)("string")
], Items.prototype, "effectType", void 0);
__decorate([
    (0, schema_1.type)("number")
], Items.prototype, "effectBase", void 0);
__decorate([
    (0, schema_1.type)("number")
], Items.prototype, "inventoryQuantity", void 0);
exports.Items = Items;
class Player extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.items = new schema_1.ArraySchema();
        this.spells = new schema_1.ArraySchema();
        this.baseStats = new Stats();
        this.tempStats = new Stats();
    }
}
__decorate([
    (0, schema_1.type)("string")
], Player.prototype, "id", void 0);
__decorate([
    (0, schema_1.type)("string")
], Player.prototype, "displayName", void 0);
__decorate([
    (0, schema_1.type)("string")
], Player.prototype, "spriteUrl", void 0);
__decorate([
    (0, schema_1.type)([Items])
], Player.prototype, "items", void 0);
__decorate([
    (0, schema_1.type)([Spells])
], Player.prototype, "spells", void 0);
__decorate([
    (0, schema_1.type)(Stats)
], Player.prototype, "baseStats", void 0);
__decorate([
    (0, schema_1.type)(Stats)
], Player.prototype, "tempStats", void 0);
__decorate([
    (0, schema_1.type)("number")
], Player.prototype, "baseHp", void 0);
__decorate([
    (0, schema_1.type)("number")
], Player.prototype, "tempHp", void 0);
__decorate([
    (0, schema_1.type)("number")
], Player.prototype, "weaponBonus", void 0);
__decorate([
    (0, schema_1.type)("number")
], Player.prototype, "baseDodgeChance", void 0);
__decorate([
    (0, schema_1.type)("number")
], Player.prototype, "tempDodgeChance", void 0);
exports.Player = Player;
class CombatRoomState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.currentTurn = "party1";
        this.party1 = new Player();
        this.party2 = new Player();
    }
}
__decorate([
    (0, schema_1.type)("string")
], CombatRoomState.prototype, "currentTurn", void 0);
__decorate([
    (0, schema_1.type)(Player)
], CombatRoomState.prototype, "party1", void 0);
__decorate([
    (0, schema_1.type)(Player)
], CombatRoomState.prototype, "party2", void 0);
exports.default = CombatRoomState;
