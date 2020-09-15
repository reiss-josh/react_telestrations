import React from 'react';


import { AuthUserContext } from '../services/Session';
import UsernameUpdater from '../helpers/UsernameUpdate.js';
import UpgradeAnonymousAccount from '../helpers/AnonymousUpgrade.js';


const AccountPage = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser
        ? <div>
            <UsernameUpdater/>
            {authUser.isAnonymous && <UpgradeAnonymousAccount/>}
          </div>
        : <div>You are not signed in!!</div>
      }
    </AuthUserContext.Consumer>
  </div>
);

export default AccountPage;