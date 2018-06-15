import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {withRouter} from 'react-router-dom';

export default (WrappedComponent) => {
  class Auth extends Component {
    componentDidMount() {
      if(!Meteor.userId()) {
        this.props.history.push('/login');
      }
    }
    render() {
      return <WrappedComponent {...this.props}/>
    }
  }
  return withRouter(Auth);
}