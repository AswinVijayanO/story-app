import React from 'react';
import './App.css';
import conf from './questions.json'
import StoryPage from './PageTemplate/StoryPage'
import { providers, firebaseAppAuth } from './config/Firebase'
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import SplashScreen from './config/components/SplashScreen/SplashScreen';
class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      stage : null,
      user: null,
      loaded : false,
      loading: false
    }
    this.signInWithGooglePop = this.signInWithGooglePop.bind(this);
  }
  
signInWithGooglePop() {
  console.log('asd');
  this.setState({loading: true});
  var me = this;
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    me.setState({loading: false});
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    me.setState({loading: false});
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}
  render() {
    
    function SplashScreenComp(props) {
      return <SplashScreen />;
    }
    function SplashLoader(props) {
      const isLoggedIn = props.isLoggedIn;
      if (isLoggedIn) {
        return <SplashScreenComp />;
      }
      return<div></div>;
    }
    const {
      user,
      signOut,
    } = this.props;
    return (
      <div className="App">
        {
          user
            ? <div>
              <StoryPage questions={conf.questions}  user={user} />
              <button className="button" onClick={signOut}>Sign Out</button>
            </div>
            : <div><SplashLoader isLoggedIn={this.state.loading} /><button className="button" onClick={this.signInWithGooglePop}>Sign In with Google</button></div>
        }

      </div>
    );
  }

}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);

