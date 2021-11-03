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
exports.getCharacterInfo = exports.editCharacterInfo = exports.mochaTest = exports.createCharacter = void 0;
function createCharacter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = req.app.get("db");
        //
        const { charName = "", description = "", userKey = null, avatarKey = null, gold = 0, experience = 0, level = 1, } = req.body;
        const { strength, constitution, intelligence, dexterity } = req.body;
        const characterInfo = yield db.Characters.createCharacter([
            charName,
            description,
            userKey,
            avatarKey,
            gold,
            experience,
            level,
        ]);
        const { character_key: characterKey } = characterInfo[0];
        const characterStats = yield db.Characters.createCharacterStats([
            characterKey,
            strength,
            constitution,
            intelligence,
            dexterity,
        ]);
        res.status(200).json({ characterInfo, characterStats });
    });
}
exports.createCharacter = createCharacter;
function getCharacterInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = req.app.get("db");
        const { charKey } = req.params;
        let result = yield db.Characters.findCharacter([charKey]);
        const { char_name, gold, experience, level } = result[0];
        result = yield db.Characters.findCharacterStats([charKey]);
        const { strength, constitution, intelligence, dexterity } = result[0];
        res.status(200).json({
            char_name,
            gold,
            experience,
            level,
            strength,
            constitution,
            intelligence,
            dexterity,
        });
    });
}
exports.getCharacterInfo = getCharacterInfo;
function editCharacterInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = req.app.get("db");
        const { characterKey } = req.body;
        let result = yield db.Characters.findCharacter([characterKey]);
        const { description, gold, experience, level } = result[0];
        result = yield db.Characters.findCharacterStats([characterKey]);
        const { strength, constitution, intelligence, dexterity } = result[0];
        const { description: newDescription = description, gold: newGold = gold, experience: newExperience = experience, level: newLevel = level, strength: newStrength = strength, constitution: newConstitution = constitution, intelligence: newIntelligence = intelligence, dexterity: newDexterity = dexterity, } = req.body;
        const character = yield db.Characters.updateCharacter([
            characterKey,
            newDescription,
            newGold,
            newExperience,
            newLevel,
        ]);
        const stats = yield db.Characters.updateCharacterStats([
            characterKey,
            newStrength,
            newConstitution,
            newIntelligence,
            newDexterity,
        ]);
        res.status(200).json({ character: character[0], stats: stats[0] });
    });
}
exports.editCharacterInfo = editCharacterInfo;
// I was thinking about creating two functions and running both when the POST endpoint was called.  I could use res.local or res.data to send the data to the next middleware, and then just add a next()
// async function createCharacterStats(req: any, res: any) {
//   const db = req.app.get('db')
//   const {strength, constitution, intelligence, dexterity}: CharStats = req.body
// }
function mochaTest() {
    return "hello";
}
exports.mochaTest = mochaTest;
