import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Contacts from '../pages/Contacts';
import Login from '../pages/Login';
import NewContact from '../pages/NewContact';
import Route from './Route';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/contacts" exact component={Contacts} isPrivate />
        <Route path="/contacts/new" component={NewContact} isPrivate />
      </Switch>
    </BrowserRouter>
  );
}
