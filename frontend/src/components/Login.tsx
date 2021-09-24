import React, { ReactElement } from 'react';
import CharacterCreation from './CharacterCreation';

interface Props {
  fname: 'string';
}

export default function Login(props: Props): ReactElement {
  return (
    <div>
      <h1>Login</h1>
      <CharacterCreation />
    </div>
  );
}
