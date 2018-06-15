import React, {Component} from 'react';
import {Accounts} from 'meteor/accounts-base';
import {withTracker} from 'meteor/react-meteor-data';

export const PrivateHeader = ({title,handleLogout}) => (
  <div>
    <h1>{title}</h1>
    <button onClick={handleLogout}>Logout</button>
  </div>
);

export default withTracker(() => ({
  handleLogout: () => Accounts.logout()
}), PrivateHeader);
