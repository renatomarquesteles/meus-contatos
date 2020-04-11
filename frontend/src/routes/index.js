import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Contacts from '../pages/Contacts';
import Login from '../pages/Login';
import NewContact from '../pages/NewContact';

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
