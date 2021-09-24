import React, { useState } from 'react';

interface Props {}

export default function App(props: Props) {
  const [email, setEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  console.log(email, userName, password, passwordConfirm);

  return (
    <div>
      <form onSubmit={() => alert('Yeah you did it')}>
        <label>Email</label>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>User Name</label>
        <input
          type="text"
          value={userName}
          placeholder="User Name"
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Password</label>
        <input
          type="text"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password</label>
        <input
          type="text"
          value={passwordConfirm}
          placeholder="Confirm Password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
