import React from 'react';
import './App.css';

import LandingPage from './PageTemplate/LandingPage'
import { providers, firebaseAppAuth } from './config/Firebase'
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import SplashScreen from './config/components/SplashScreen/SplashScreen';
import LoginPage from './config/components/LoginPage/LoginPage';
import { MusicNote, MusicOff } from '@styled-icons/material-rounded';
import { Reset } from  '@styled-icons/boxicons-regular/Reset';
import { SignOutAlt } from '@styled-icons/fa-solid/SignOutAlt';
import StoryPage from './PageTemplate/StoryPage'
import History from './config/History'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import conf from './questions.json'
class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      stage: null,
      user: null,
      loaded: false,
      loading: false,
      music: false
    }
    this.signInWithGooglePop = this.signInWithGooglePop.bind(this);
    this.toggleMusic = this.toggleMusic.bind(this);
  }

  signInWithGooglePop() {
    console.log('asd');
    this.setState({ loading: true, music: true });
    var me = this;
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      me.setState({ loading: false });
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function (error) {
      me.setState({ loading: false });
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
  toggleMusic() {
    this.setState({ music: !this.state.music })
  }
  componentDidMount() {

  }
  render() {
    const {
      user,
      signOut,
    } = this.props;

    function SplashScreenComp(props) {
      return <SplashScreen />;
    }

    function SplashLoader(props) {
      const isLoggedIn = props.isLoggedIn;
      if (isLoggedIn) {
        return <SplashScreenComp />;
      }
      return <div></div>;
    }
    const routeGames = conf.contests.map((item) => {
      return (
        <div className="game-page">
          <Route exact path={"/games/" + item.gameName}>
            <div className={'top-bar-' + item.generalConfig.gameTheme}>
              {
                this.state.music ? <MusicNote onClick={() => { this.setState({ music: !this.state.music }) }} size="32" title="Music" />
                  : <MusicOff onClick={() => { this.setState({ music: !this.state.music }) }} size="32" title="Music" />
              }
              {item.generalConfig.canReset ? <Reset size="32" onClick={() => { this.reset(this.state.user.uid,this.props.gameName) }}/> : ''}
              <SignOutAlt onClick={()=>{signOut();History.push("/")}} size="32" title="Unlock account" />
              
            </div>
            <StoryPage music={this.state.music} questions={item.questions} user={user} gameTheme={item.generalConfig.gameTheme} gameName={item.gameName} />
          </Route>
        </div>
      )
    });
    return (
      <div>
      <Router history={History}>
        <Switch>
          <Route exact path="/">
            <div className="App">
              {
                user
                  ? <div>
                    <LandingPage user={user} />
                  </div>
                  : <div>
                    {
                      this.state.loading ? <SplashLoader isLoggedIn={this.state.loading} /> :
                        <div onClick={this.signInWithGooglePop}><LoginPage /></div>

                    }

                  </div>
              }

            </div>
          </Route>
        </Switch>
        {routeGames}
      </Router>
      </div >


    );
  }

}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);

