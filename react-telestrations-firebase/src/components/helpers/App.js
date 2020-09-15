import React from 'react';
import { BrowserRouter as Router, Route,} from 'react-router-dom';
 
import Navigation from './Navigation.js';
import LandingPage from '../pages/Landing.js';
import SignUpPage from '../pages/SignUp.js';
import SignInPage from '../pages/SignIn.js';
import PasswordForgetPage from '../pages/PasswordForget.js';
import HomePage from '../pages/Home.js';
import AccountPage from '../pages/Account.js';
import AdminPage from '../pages/Admin.js';

import * as ROUTES from '../../constants/routes.js';
import { withAuthentication } from '../services/Session';
 
const App = () => (
  <Router>
    <div>
      <Navigation />
 
      <hr />
 
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </div>
  </Router>
);
 
export default withAuthentication(App);