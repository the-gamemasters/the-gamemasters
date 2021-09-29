import http from 'http';
import express, { application } from 'express';
import cors from "cors";
import { Server } from 'colyseus';
import { CombatRoom } from "./rooms/CombatRoom"
import bcrypt from 'bcrypt';
import session from 'express-session';
import massive from 'massive';
import {createCharacter} from './controllers/characters'


const app = express();
const port = Number(process.env.PORT || 3553);

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const gameServer = new Server({
    server: server,
    express: app
});

gameServer.define('combat', CombatRoom);
gameServer.listen(port);

//Test GET Endpoint
app.get('/api/test', (req, res) => {
    console.log('Test GET endpoint hit.')
    res.status(200).send('Success')
})

//Test POST Endpoint
app.post('/api/test', (req, res) => {
    console.log('Test POST endpoint hit. req.body=', req.body);
    res.status(200).send('Success')
})

// Post endpoint to add character data to the DB
app.post(`/api/character`, createCharacter)


//Test PUT Endpoint
app.put('/api/test', (req, res) => {
    console.log('Test PUT endpoint hit. req.body=', req.body);
    res.status(200).send('Success')
})

//Test DELETE Endpoint
app.delete('/api/test', (req, res) => {
    console.log('Test DELETE endpoint hit.');
    res.status(200).send('Success')
})

app.use(express.static(__dirname + "/../frontend/public"));
console.log(`Listening on ws://localhost:${port}`);
