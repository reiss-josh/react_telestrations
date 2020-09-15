import React, {Component} from 'react';
import { withFirebase } from '../services/Firebase';

const INITIAL_STATE = {
  new_username: '',
  error: null,
};

class UsernameUpdaterBase extends Component{
  constructor(props){
    super();

    this.state = {...INITIAL_STATE};
  }

  onSubmit = event => {
    const { new_username, error } = this.state;

    this.props.firebase
      .getCurrentUser()
      .updateProfile({displayName: new_username})
      .then(() => {
        this.setState({...INITIAL_STATE});
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value});
  };

  render(){
    const {
      new_username,
      error,
    } = this.state;

    return(
      <div>
      Update your username:
      <form onSubmit={this.onSubmit}>
        <input
          name="new_username"
          value={new_username}
          onChange={this.onChange}
          type="text"
          placeholder="New Username"
        />
        <button type = "submit">
          {this.props.firebase.auth.currentUser.displayName}
        </button>
        {error && <p>{error.message}</p>}
      </form>
      </div>
    );
  }
}

const UsernameUpdater  = withFirebase(UsernameUpdaterBase);

export default UsernameUpdater;