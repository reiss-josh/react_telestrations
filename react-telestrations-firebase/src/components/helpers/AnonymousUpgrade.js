import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {compose} from 'recompose';
 
import { withFirebase } from '../services/Firebase';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class AnonymousUpgraderBase extends Component {
  constructor(props) {
    super();

    this.state = {...INITIAL_STATE};
  }

  onSubmit = event => {
    const { email, passwordOne } = this.state;

    this.props.firebase
      .doConvertToEmail(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value});
  };
 
  render() {
    const {
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '';

    return (
      <div> You have an anonymous account. You can link it to a full account here:
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>
 
        {error && <p>{error.message}</p>}
      </form>
      </div>
    );
  }
}
 
const AnonymousUpgrader = compose(
  withRouter,
  withFirebase,
)(AnonymousUpgraderBase);


export default AnonymousUpgrader;