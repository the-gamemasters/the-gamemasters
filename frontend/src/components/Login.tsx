import React, { ReactElement } from 'react'
import CharacterCreation from './CharacterCreation'

interface Props {

}

export default function Login({}: Props): ReactElement {

    return (
        <div>
            <h1>Login</h1>
            <CharacterCreation />
        </div>
    )
}
