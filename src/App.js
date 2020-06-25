import React from 'react';
import './App.css';
import conf from './questions.json'
import StoryPage from './PageTemplate/StoryPage'
import { providers, firebaseAppAuth } from './config/Firebase'
import withFirebaseAuth from 'react-with-firebase-auth'
class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      stage : null,
      user: null,
      loaded : false
    }
  }

  render() {
    const {
      user,
      signOut,
      signInWithGoogle
    } = this.props;
    return (
      <div className="App">
        {
          user
            ? <div>
              <StoryPage questions={conf.questions}  user={user} />
              <button className="button" onClick={signOut}>Sign Out</button>
            </div>
            : <button className="button" onClick={signInWithGoogle}>Sign in with Google</button>
        }

      </div>
    );
  }

}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);

