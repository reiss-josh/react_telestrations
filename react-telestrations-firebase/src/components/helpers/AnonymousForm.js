import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../services/Firebase';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  username: '',
  error: null,
};

class AnonymousFormBase extends Component {
  constructor(props) {
    super();

    this.state = {...INITIAL_STATE}
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { username } = this.state;

    this.props.firebase
      .doSignInAnonymous()
      .then((authUser) => {
        authUser.user.updateProfile({displayName: username})
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  render() {
    const { username,error, } = this.state;

    return(
      <div>
      <form onSubmit = {this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Username"
        />
        <button type="submit">
          Create Guest Account
        </button>
        {error && <p>{error.message}</p>}
      </form>
      </div>
    );
  }
}

const AnonymousForm = compose(
  withRouter,
  withFirebase,
)(AnonymousFormBase);

export default AnonymousForm;