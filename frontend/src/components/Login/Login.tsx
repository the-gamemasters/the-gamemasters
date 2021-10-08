import { ReactElement, useState } from 'react';
import AccountCreation from './AccountCreation';
import Music from './Music';
import { Link } from 'react-router-dom';
import '../../css/Login.css';
import 'nes.css/css/nes.min.css';

interface Props {}

export default function Login(props: Props): ReactElement {
  const [newUser, setNewUser] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div className="">
      <h1>Welcome To The Best Game Ever!!!</h1>
      <section className="login">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="nes-input"
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="nes-input"
        />
        <Link to="/char">
          <button className="nes-btn">
            Login (This goes to the character creation page right now)
          </button>
        </Link>
      </section>
      <button className="nes-btn" onClick={() => setNewUser(!newUser)}>
        Create a new User
      </button>

      {newUser ? (
        <div className="modal nes-container">
          <AccountCreation closeModal={() => setNewUser(false)} />
        </div>
      ) : null}
      <Music />
    </div>
  );
}
