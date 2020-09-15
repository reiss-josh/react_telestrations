import React from 'react';


import { AuthUserContext } from '../Session';
import UsernameUpdater from '../UsernameUpdate';
import UpgradeAnonymousAccount from '../AnonymousUpgrade';


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