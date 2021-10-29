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
exports.sellItem = exports.buyItem = exports.getInventory = exports.getItems = void 0;
function getItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = req.app.get("db");
        const shopItems = yield db.Items.get_items();
        res.status(200).json({ shopItems });
    });
}
exports.getItems = getItems;
function getInventory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = req.app.get("db");
        const { charKey } = req.params;
        const characterItems = yield db.Items.get_inventory(charKey);
        res.status(200).json({ characterItems });
    });
}
exports.getInventory = getInventory;
function buyItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = req.app.get("db");
        const { charKey } = req.params;
        const { itemKey, cost } = req.body;
        /* logic:
        1. if gold >= item_cost where charKey, continue. Else, return "cannot purchase"
        2. if itemKey and charKey exist in inventory, UPDATE quantity +1. Else, INSERT INTO inventory.
        3. return char's new Inventory and gold count
        */
        const bought = yield db.Items.buy_items(charKey, itemKey);
        console.log(bought);
        const newGold = yield db.Items.set_gold(charKey, -cost);
        const characterItems = yield db.Items.get_inventory(charKey);
        res.status(200).json({ characterItems, newGold });
    });
}
exports.buyItem = buyItem;
function sellItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = req.app.get("db");
        const { charKey } = req.params;
        const { invKey, value } = req.body;
        /* logic:
        1. if gold >= item_cost where charKey, continue. Else, return "cannot purchase"
        2. if itemKey and charKey exist in inventory, UPDATE quantity +1. Else, INSERT INTO inventory.
        3. return char's new Inventory
        */
        const sold = yield db.Items.sell_items(invKey);
        console.log(sold);
        const newGold = yield db.Items.set_gold(charKey, value);
        const characterItems = yield db.Items.get_inventory(charKey);
        // let filteredCharacterItems = characterItems.filter(item => item.quantity > 0)
        res.status(200).json({ characterItems, newGold });
    });
}
exports.sellItem = sellItem;
