import React from 'react';
import SignUpForm from '../helpers/SignUpForm.js'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
 
const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    Create new account:
    <SignUpForm />

    You can change your username at any time from the Account screen!
  </div>
);

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignUpPage;
export { SignUpLink };