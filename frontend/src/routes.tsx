import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Combat from './components/Combat';

interface Props {}

export default (
    <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/combat' component={Combat} />
    </Switch>
);
