import React, { Component } from 'react';
import {withFirebase} from '../services/Firebase';

const INITIAL_STATE = {
  roomCode: '',
  error: null,
};

class HomePage extends Component{
  constructor (props) {
    super();

    this.state = {...INITIAL_STATE};
    
  }

  joinRoom = () => {
    const roomsRef = this.props.firebase.db.ref('rooms');
    const roomKey = this.state.roomCode; //roomname
    const user = this.props.firebase.getCurrentUser();
    const joinAttemptCount = 0;
    const setJoining = true;
    //console.log(user.currentUser);
    
    roomsRef.child(roomKey).child("users").child(user.uid).child('isActive').once('value').then(snapshot => {
      if(joinAttemptCount.current < 1 && snapshot.val()) {
        alert("You already have a window open in this room. Please only open each room once.\n\nIf you believe this message to be in error, you may attempt to join again to override. Please be careful: if you do actually have multiple windows open, game corruption may occur.");
        setJoining(false);
        joinAttemptCount.current = joinAttemptCount.current + 1;
      } else {
        roomsRef.child(roomKey).update({creator: user.uid})
      }
    });
    
  }

  onSubmit = event => {
    const { roomCode } = this.state;
    this.joinRoom();
    
    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value});
  };

  render(){
    const {
      roomCode,
      error,
    } = this.state;

    const isInvalid =
      roomCode === '';
    return(
      <div>Enter your room code:
        <form onSubmit = {this.onSubmit}>
        <input
          name="roomCode"
          value={roomCode}
          onChange={this.onChange}
          type="text"
          placeholder=""
        />
        <button disabled={isInvalid} type="submit">
          JOIN
        </button>
        </form>
        {error && <p>{error.message}</p>}
      </div>
    );
  }
};

export default withFirebase(HomePage);