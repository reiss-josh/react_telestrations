import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
 
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
 
const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <AnonymousForm />
    <SignUpLink />
  </div>
);
 
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
 
class AnonymousFormBase extends Component {
  constructor(props) {
    super();
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInAnonymous()
      .then((authUser) => {
        authUser.user.updateProfile({displayName: "hey"})
      })
      .then((authUser) => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  render() {
    const error = this.state;
    return(
      <form onSubmit = {this.onSubmit}>
        <button type="submit">
          Sign In Anonymously
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInFormBase extends Component {
  constructor(props) {
    super();
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { email, password } = this.state;
 
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((authUser) => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const { email, password, error } = this.state;
 
    const isInvalid = password === '' || email === '';
 
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

const AnonymousForm = compose(
  withRouter,
  withFirebase,
)(AnonymousFormBase);
 
export default SignInPage;
 
export { SignInForm, AnonymousForm };