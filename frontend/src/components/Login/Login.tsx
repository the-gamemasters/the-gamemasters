import { ReactElement, useState } from 'react';
import AccountCreation from './AccountCreation';
import Music from './Music';
import { Link } from 'react-router-dom';
import '../../css/Login.css';
import 'nes.css/css/nes.min.css';
import axios from 'axios';

interface Props {}

export default function Login(props: Props): ReactElement {
  const [newUser, setNewUser] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function submitLogin(){
    if(email.length === 0){
      alert('Please enter email and password, or create a new user');
    } else {
      axios.put('/api/login', {email, password})
        .then(res => {
          if (typeof res.data === "string"){
              alert(res.data)
          }else{
              console.log(res.data);
              window.location.hash = "#Char";
            }
        })
        .catch( e => {
          console.log(e);
        })
    }
  }

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

        <button className="nes-btn" onClick={() => submitLogin()} >
          Login
        </button>

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
