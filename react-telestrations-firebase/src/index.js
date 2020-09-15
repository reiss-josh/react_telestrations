import React from 'react';
import ReactDOM from 'react-dom';
 
import './index.css';
import * as serviceWorker from './serviceWorker';
 
import App from './components/helpers/App.js';
import Firebase, { FirebaseContext } from './components/services/Firebase';
 
ReactDOM.render(
  <div>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </div>,
  document.getElementById('root'),
);

serviceWorker.unregister();