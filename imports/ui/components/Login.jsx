import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Accounts} from 'meteor/accounts-base';

export class Login extends Component {
  state = {
    loading: false,
    email: '',
    password: '',
    error: null
  };
  onSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    this.props.handleLogin({email: this.state.email},this.state.password,err => {
      if(err) {
        this.setState({
          loading: false,
          error: null
        });
      }
      else {
        this.setState({
          loading: false
        });
      }
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="email"
            onChange={e => this.setState({email: e.target.value})}
            value={this.state.email}
          />
          <input
            type="password"
            onChange={e => this.setState({password: e.target.value})}
            value={this.state.password}
          />
          <button>Login</button>
        </form>
      </div>
    );
  }
}


export default withTracker(() => ({
  handleLogin: Accounts.loginWithPassword
}),Login);