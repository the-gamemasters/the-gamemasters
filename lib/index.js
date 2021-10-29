"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const colyseus_1 = require("colyseus");
const CombatRoom_1 = require("./rooms/CombatRoom");
const express_session_1 = __importDefault(require("express-session"));
const massive_1 = __importDefault(require("massive"));
const users_1 = require("./controllers/users");
const characters_1 = require("./controllers/characters");
const equipment_1 = require("./controllers/equipment");
const items_1 = require("./controllers/items");
//require("./controllers/passport/passportConfig")
const { MASSIVE_HOST, MASSIVE_PORT, MASSIVE_DATABASE, MASSIVE_USER, MASSIVE_PASSWORD, SECRET, PORT, } = process.env;
// this prevents `Error: self signed certificate`, Will need to look into this when going to production.
// @ts-ignore
process.env[`NODE_TLS_REJECT_UNAUTHORIZED`] = 0;
const app = (0, express_1.default)();
const port = Number(PORT || 3553);
//----------Session setup----------\\
app.use((0, express_session_1.default)({
    resave: false,
    saveUninitialized: true,
    secret: SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, //1000 ms = 1 second, 60 sec = 1 min, 60 min = 1 hour, 24 hour = day, 7 days = week
    },
}));
//app.use(passport.initialize())
//app.use(passport.session())
(0, massive_1.default)({
    host: MASSIVE_HOST,
    port: +MASSIVE_PORT,
    database: MASSIVE_DATABASE,
    user: MASSIVE_USER,
    password: MASSIVE_PASSWORD,
    ssl: true,
})
    .then((dbInstance) => {
    app.set("db", dbInstance);
    console.log("Database running, cool game is coming!!!");
})
    .catch((err) => console.log("Database error", err));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const server = http_1.default.createServer(app);
const gameServer = new colyseus_1.Server({
    server: server,
    express: app,
});
gameServer.define("combat", CombatRoom_1.CombatRoom);
gameServer.listen(3553);
//Test GET Endpoint
app.get("/api/test", (req, res) => {
    console.log("Test GET endpoint hit.");
    res.status(200).send("Success");
});
app.get("/api/character/:charKey", characters_1.getCharacterInfo);
//Test POST Endpoint
app.post("/api/test", (req, res) => {
    console.log("Test POST endpoint hit. req.body=", req.body);
    res.status(200).send("Success");
});
// Post endpoint to add character data to the DB
app.post(`/api/character`, characters_1.createCharacter);
//Test PUT Endpoint
app.put("/api/test", (req, res) => {
    console.log("Test PUT endpoint hit. req.body=", req.body);
    res.status(200).send("Success");
});
// edits character information, takes a body that has {characterKey, description?, gold?, experience?, level?, strength?, constitution?, intelligence?, dexterity?}
app.put("/api/character", characters_1.editCharacterInfo);
//Test DELETE Endpoint
app.delete("/api/test", (req, res) => {
    console.log("Test DELETE endpoint hit.");
    res.status(200).send("Success");
});
app.get("/api/equipment/:charKey", equipment_1.getEquipment);
app.post("/api/equipment/:charKey", equipment_1.addEquipment);
app.put("/api/equipment/:charKey", equipment_1.editEquipment);
app.get("/api/items", items_1.getItems);
app.get("/api/items/:charKey", items_1.getInventory);
app.post("/api/items/:charKey", items_1.buyItem);
app.put("/api/items/:charKey", items_1.sellItem);
app.post("/api/register", users_1.register);
app.put("/api/login", users_1.login);
app.post("/api/logout", users_1.logout);
app.use(express_1.default.static(__dirname + "/../frontend/public"));
console.log(`Listening on ws://localhost:${port}`);
