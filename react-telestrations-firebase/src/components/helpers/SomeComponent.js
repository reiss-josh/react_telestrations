import React from 'react';
 
import  { FirebaseContext } from '../services/Firebase';
 
const SomeComponent = () => (
  <FirebaseContext.Consumer>
    {firebase => {
      return <div>I've access to Firebase and render something.</div>;
    }}
  </FirebaseContext.Consumer>
);
 
export default SomeComponent;