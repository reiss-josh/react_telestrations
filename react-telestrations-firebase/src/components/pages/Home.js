import React, { Component } from 'react';

const HomePage = () => (
  <div>
    <h1>Home</h1>
    <Home/>
  </div>
);

class Home extends Component{
  constructor (props) {
    super();
  }

  render(){
    return(
      <div></div>
    );
  }
}

export default HomePage;