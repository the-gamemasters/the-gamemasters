import React, { ReactElement, useState } from 'react';
import AccountCreation from './AccountCreation';

interface Props {}

export default function Login({}: Props): ReactElement {
  const [newUser, setNewUser] = useState<boolean>(false);

  console.log(newUser);

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => setNewUser(!newUser)}>Create a new User</button>
      {newUser ? <AccountCreation /> : null}
    </div>
  );
}
