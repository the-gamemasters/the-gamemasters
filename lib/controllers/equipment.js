"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editEquipment = exports.addEquipment = exports.getEquipment = void 0;
function getEquipment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = req.app.get("db");
        const { charKey } = req.params;
        const characterEquipment = yield db.Equipment.find_equipment(charKey);
        res.status(200).json({ characterEquipment });
    });
}
exports.getEquipment = getEquipment;
function addEquipment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = req.app.get("db");
        const { charKey } = req.params;
        const { equipmentKey } = req.body.equipmentKey;
        const added = db.Equipment.add_equipment(charKey, equipmentKey);
        const characterEquipment = yield db.Equipment.find_equipment(charKey);
        res.status(200).json({ characterEquipment });
    });
}
exports.addEquipment = addEquipment;
function editEquipment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = req.app.get("db");
        const { charKey } = req.params;
        const { unequip, equip } = req.body;
        const updated = yield db.Equipment.edit_equipment(unequip, equip);
        const newEquipment = yield db.Equipment.find_equipped_equipment(charKey, equip);
        res.status(200).json({ newEquipment });
    });
}
exports.editEquipment = editEquipment;
// I was thinking about creating two functions and running both when the POST endpoint was called.  I could use res.local or res.data to send the data to the next middleware, and then just add a next()
// async function createCharacterStats(req: any, res: any) {
//   const db = req.app.get('db')
//   const {strength, constitution, intelligence, dexterity}: CharStats = req.body
// }
function mochaTest() {
    return "hello";
}
