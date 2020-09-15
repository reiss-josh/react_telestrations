import app from 'firebase/app';
import 'firebase/auth';
 
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};
 
class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  // *** AUTH API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInAnonymous = () =>
    this.auth.signInAnonymously();

  doConvertToEmail = (email, password) =>
  {
    var credential = this.auth.EmailAuthProvider.credential(email, password);
    this.auth.currentUser.linkWithCredential(credential)
      .then(function(usercred) {
        var user = usercred.user;
        console.log("Anonymous account successfully upgraded", user);
      }).catch(function(error) {
        console.log("Error upgrading anonymous account", error);
      });
  }
 
  doSignOut = () => this.auth.signOut();
 
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
  
  getCurrentUser = () => this.auth.currentUser;
} 
export default Firebase;