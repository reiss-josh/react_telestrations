import React, {Component} from 'react';


import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';

 
const AccountPage = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <div>{authUser.displayName}</div> : <div>you_are_not_authenticated</div>
      }
    </AuthUserContext.Consumer>
    <UsernameUpdater/>
  </div>
);

class UsernameUpdaterBase extends Component{
  constructor(props){
    super();
  }

  onSubmit = event => {
    console.log("hey");
  }

  render(){
    console.log(this.props.firebase.getCurrentUser());
    return(
      <form onSubmit={this.onSubmit}>
        <button type = "submit">hey!!</button>
      </form>
    );
  }
}

const UsernameUpdater  = withFirebase(UsernameUpdaterBase);

export default AccountPage;