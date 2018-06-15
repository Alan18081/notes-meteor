import React from 'react';
import {Route} from 'react-router-dom';

import NotesList from './components/NotesList';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Auth from './hoc/Auth';

export default () => (
  <div>
    <Route exact path="/" component={Auth(NotesList)}/>
    <Route path="/login" component={Login}/>
    <Route path="/signup" component={SignUp}/>
  </div>
);