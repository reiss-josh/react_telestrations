import React from 'react';

import AnonymousForm from '../helpers/AnonymousForm.js'
import SignInForm from '../helpers/SignInForm.js'
import { SignUpLink } from './SignUp.js';

 
const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    Sign in to account:
    <SignInForm />
    Join as a guest:
    <AnonymousForm />
    <SignUpLink />
  </div>
);
 
export default SignInPage;