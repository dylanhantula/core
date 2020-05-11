import React, { useState, useEffect } from "react";
import "./App.css";

import * as firebase from "firebase/app";

import { config } from '../../firebase_config.json';
import Nav from "../Nav/Nav";
import {getProfile} from '../../api/api'
import AthleteApp from "../AthleteApp/AthleteApp";

firebase.initializeApp(config);

// Used throughout components to get the currently logged in user and profile
export const AuthContext = React.createContext(null);

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  // In this context, "completeUser" means an object that has both the firebaseUser and profile
  const setCompleteUser = ((completeUser) => {
    setUser(completeUser)
  })

  // Inspired by: https://medium.com/@johnwcassidy/firebase-authentication-hooks-and-context-d0e47395f402
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setCompleteUser);
    return () => {
      unsubscribe();
    }
  }, []);

  function onAuthStateChange(callback) {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        
        firebaseUser.getIdToken()
        .then(function(idToken) {
            return getProfile(idToken, firebaseUser.uid)
        })
        .then(res => {
          const completeUser = {'firebaseUser':firebaseUser, 'profile':res}
          callback(completeUser);

          setLoading(false)
        })
        .catch(function(error) {
            console.log(error)
            callback(null);
            setLoading(false)

            // Make sure that the user is signed out if there is an issue at any point
            // in the login process
            firebase.auth().signOut()
        });
      } else {
        callback(firebaseUser);
        setLoading(false)
      }
    });
  }

  if (loading) {
    // This can be changed to a blank screen, spinner, etc..
    return <div>Loading...</div>
  } 
  
  if (user && user.profile && user.profile.profileType === 'athlete') {
    return (
      
      <AuthContext.Provider value={{ user, setUser }}>
        Is logged in? {user && user.firebaseUser && JSON.stringify(user.firebaseUser.email)}
        <div className="App">
            <AthleteApp></AthleteApp>
        </div>
      </AuthContext.Provider>
    );
  }
  else {
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        Is logged in? {user && user.firebaseUser && JSON.stringify(user.firebaseUser.email)}
        <div className="App">
            <Nav></Nav>
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;