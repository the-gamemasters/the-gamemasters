import React, { ReactElement, useState } from "react"
import * as Colyseus from "colyseus.js"
import { useLocation } from "react-router-dom"
import Combat from "./Combat"

interface Props {}

interface LocationState extends Location {
	state: {
		pvp: boolean
	}
}

export default function CombatLoader(props: Props): ReactElement {
	// const [combatLog, setCombatLog] = useState("");
	// const [loading, setLoading] = useState(true);
	// const [myParty, setMyParty] = useState("");
	// const [result, setResult] = useState();
	// const [roomInstance, setRoomInstance] = useState<Colyseus.Room>();
	// const [selectOpen, setSelectOpen] = useState<boolean>(false);
	// const [selectType, setSelectType] = useState<"spell" | "item">("spell");
	// const location = useLocation()
	// console.log(location.state)

	//     const client = new Colyseus.Client("ws://localhost:3553");
	// 	client.joinOrCreate("combat").then((room: Colyseus.Room<any>) => {
	// 		room.onMessage("assignment", (message) => {
	// 			if (message === "party1") {
	// 				setMyParty("party1");
	// 			} else {
	// 				setMyParty("party2");
	// 			}
	// 		});

	// 		room.onMessage("ready", () => {
	// 			setLoading(false);
	// 		});

	// 		room.onMessage("attack", (message) => {
	// 			setCombatLog(`${message[0]} attacks for ${message[1]} damage!`);
	// 		});

	// 		room.onMessage("spell", (message) => {
	// 			setCombatLog(message);
	// 		});

	// 		room.onMessage("item", (message) => {
	// 			setCombatLog(`${message[0]} ${message[1]}`);
	// 		});

	// 		room.onMessage("evade", (message) => {
	// 			setCombatLog(`${message} prepares to evade!`);
	// 		});

	// 		room.onMessage("miss", (message) => {
	// 			if (message[0] === "attack") {
	// 				setCombatLog(
	// 					`${message[1]} attacked but ${message[2]} dodged it!`
	// 				);
	// 			} else {
	// 				setCombatLog(
	// 					`${message[1]} tried to cast ${message[0]} but ${message[2]} dodged it!`
	// 				);
	// 			}
	// 		});

	// 		room.onMessage("victory", (message) => {
	// 			setResult(message);
	// 		});
	// }
	return <div></div>
}
