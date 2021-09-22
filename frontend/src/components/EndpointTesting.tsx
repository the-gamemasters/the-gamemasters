import React, { ReactElement } from 'react'
import axios from 'axios';

interface Props {
    
}

export default function EndpointTesting({}: Props): ReactElement {

    const handleTestGet = () => {
        axios.get('/api/test')
        .then(response => console.log(response))
        .catch(err => console.error(err))
    }

    const handleTestPost = () => {
        axios.post('/api/test', {
            test: true,
        })
        .then(response => console.log(response))
        .catch(err => console.error(err))
    }

    const handleTestPut = () => {
        axios.put('/api/test', {
            test: "PUT",
        })
        .then(response => console.log(response))
        .catch(err => console.error(err))
    }

    const handleTestDelete = () => {
        axios.delete('/api/test')
        .then(response => console.log(response))
        .catch(err => console.error(err))
    }

    return (
        <div>
            <h1>Endpoint Testing</h1>
            <button onClick={handleTestGet}>GET</button>
            <br />
            <button onClick={handleTestPost}>POST</button>
            <br />
            <button onClick={handleTestPut}>PUT</button>
            <br />
            <button onClick={handleTestDelete}>DELETE</button>
        </div>
    )
}
