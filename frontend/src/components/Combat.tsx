import React, { ReactElement, useState, useEffect } from 'react'
import * as Colyseus from 'colyseus.js';

interface Props {}


export default function Combat({}: Props): ReactElement {
    const [roomState, setRoomState] = useState<Colyseus.Room | undefined>(undefined)

    //TODO: Figure out how to get the correct 'room' object so that handleAction() can access it
    useEffect(() => {
        let client = new Colyseus.Client('ws://localhost:3553');
        client.joinOrCreate('combat')
        .then((room) => {
            setRoomState(room)
            console.log(roomState)
        })
    }, [])
    
    

    const handleAction = (move: string) => {
        console.log(move)
    }

    return (
        <div>
            <h1>Combat</h1>
            <button onClick={() => handleAction('attack')}>Attack</button>
            <button onClick={() => handleAction('spells')}>Spells</button>
            <button onClick={() => handleAction('')}>Attack</button>
            <button onClick={() => handleAction('attack')}>Attack</button>
        </div>
    )
}