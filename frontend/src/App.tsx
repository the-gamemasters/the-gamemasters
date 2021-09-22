import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import EndpointTesting from './components/EndpointTesting';
import Combat from './components/Combat';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/testing' component={EndpointTesting} />
        <Route path='/combat' component={Combat} />
      </Switch>
    </div>
  );
}

export default App;
