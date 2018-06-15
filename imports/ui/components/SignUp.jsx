import React, {Component} from 'react';
import {Accounts} from 'meteor/accounts-base';

export default class SingUp extends Component {
  state = {
    errors: [],
    email: '',
    password: ''
  };
  onSubmit = event => {
    event.preventDefault();
    this.setState({
      errors: []
    });
    if(!this.state.email) {
      this.setState({
        errors: this.state.errors.push('Provide email')
      });
      return false;
    }
    if(!this.state.password) {
      this.setState({
        errors: this.state.errors.push('Provide password')
      });
      return false;
    }
    Accounts.createUser({email: this.state.email,password: this.state.password},err =>  {
      console.log('User created');
    });
  };
  render() {
    console.log(Accounts);
    return (
      <div className="box-view">
        <div className="box-view__box">
          <form onSubmit={this.onSubmit}>
            <input
              type="email"
              value={this.state.email}
              onChange={e => this.setState({email: e.target.value})}
            />
            <input
              type="password"
              value={this.state.password}
              onChange={e => this.setState({password: e.target.value})}
            />
            <ul>
              {this.state.errors.map(msg => (
                <li>{msg}</li>
              ))}
            </ul>
            <button>Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}