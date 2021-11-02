require("dotenv").config()

import http from "http"
import https from "https"
import express, { application } from "express"
import cors from "cors"
import { Server } from "colyseus"
import { CombatRoom } from "./rooms/CombatRoom"
import bcrypt from "bcrypt"
import session from "express-session"
import massive from "massive"
import { parse } from "pg-connection-string"
import { register, login, logout } from "./controllers/users"
import {
	createCharacter,
	editCharacterInfo,
	getCharacterInfo,
} from "./controllers/characters"
import {
	getEquipment,
	addEquipment,
	editEquipment,
} from "./controllers/equipment"
import { getItems, buyItem, getInventory, sellItem } from "./controllers/items"
import path from "path"

//require("./controllers/passport/passportConfig")

const {
	MASSIVE_HOST,
	MASSIVE_PORT,
	MASSIVE_DATABASE,
	MASSIVE_USER,
	MASSIVE_PASSWORD,
	MASSIVE_CONNECTION_STRING,
	SECRET,
	PORT,
} = process.env

const app = express()
const port = Number(PORT || 3553)

//----------Session setup----------\\
app.use(
	session({
		resave: false,
		saveUninitialized: true,
		secret: SECRET,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7, //1000 ms = 1 second, 60 sec = 1 min, 60 min = 1 hour, 24 hour = day, 7 days = week
		},
	})
)

//app.use(passport.initialize())
//app.use(passport.session())

const initMassive = async () => {
	let connector: any = parse(MASSIVE_CONNECTION_STRING)
	connector.ssl = { sslmode: "require", rejectUnauthorized: false }
	try {
		let db = await massive(connector)

		app.set("db", db)
		console.log(db.listTables())
	} catch (e) {
		console.log(e)
	}
}

initMassive()

// massive({
// 	host: MASSIVE_HOST,
// 	port: +MASSIVE_PORT,
// 	database: MASSIVE_DATABASE,
// 	user: MASSIVE_USER,
// 	password: MASSIVE_PASSWORD,
// 	ssl: true,
// })
// 	.then((dbInstance) => {
// 		app.set("db", dbInstance)
// 		console.log("Database running, cool game is coming!!!")
// 	})
// 	.catch((err) => console.log("Database error", err))

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "../react-ui/build")))

const server = https.createServer(app)
const gameServer = new Server({
	server: server,
})

gameServer.define("combat", CombatRoom)
gameServer.listen(3553)

//Test GET Endpoint
app.get("/api/test", (req, res) => {
	console.log("Test GET endpoint hit.")
	res.status(200).send("Success")
})

app.get("/api/character/:charKey", getCharacterInfo)

//Test POST Endpoint
app.post("/api/test", (req, res) => {
	console.log("Test POST endpoint hit. req.body=", req.body)
	res.status(200).send("Success")
})

// Post endpoint to add character data to the DB
app.post(`/api/character`, createCharacter)

//Test PUT Endpoint
app.put("/api/test", (req, res) => {
	console.log("Test PUT endpoint hit. req.body=", req.body)
	res.status(200).send("Success")
})

// edits character information, takes a body that has {characterKey, description?, gold?, experience?, level?, strength?, constitution?, intelligence?, dexterity?}
app.put("/api/character", editCharacterInfo)

//Test DELETE Endpoint
app.delete("/api/test", (req, res) => {
	console.log("Test DELETE endpoint hit.")
	res.status(200).send("Success")
})

app.get("/api/equipment/:charKey", getEquipment)

app.post("/api/equipment/:charKey", addEquipment)

app.put("/api/equipment/:charKey", editEquipment)

app.get("/api/items", getItems)

app.get("/api/items/:charKey", getInventory)

app.post("/api/items/:charKey", buyItem)

app.put("/api/items/:charKey", sellItem)

app.post("/api/register", register)
app.put("/api/login", login)
app.post("/api/logout", logout)

app.use(express.static(__dirname + "/../frontend/public"))
console.log(`Listening on ws://localhost:${port}`)
