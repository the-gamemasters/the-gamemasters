import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Combat from './components/Combat';
import CharacterCreation from './components/CharacterCreation';

interface Props {}

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/combat" component={Combat} />
    <Route path="/char" component={CharacterCreation} />
  </Switch>
);
