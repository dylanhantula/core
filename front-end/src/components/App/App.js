import React, { useState, useEffect } from "react";
import "./App.css";

import * as firebase from "firebase/app";

import { config } from '../../firebase_config.json';
import Nav from "../Nav/Nav";

firebase.initializeApp(config);

// AuthContext to be used throughout components to get the currently logged
// in user
export const AuthContext = React.createContext(null);


function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);


  //TODO: uncomment/modify and use this function to speed up page load time. This
  // reads the user from the session storage but does not return the Firebase
  // auth object. Reading from local storage can be used in conjunction with
  // the current system of calling Firebase for each page load by holding both
  // the local storage object and the Firebase auth object when it is ready.
  // This way, you only need to make sure you have the Firebase auth object
  // when you need to use it, not when you load any page
  // This can be seen here: https://stackoverflow.com/a/51856627

  //  function readSession() {
  //   const user = window.sessionStorage.getItem(
	// 		`firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
  //   );
    
	// 	if (user) {
  //    // Handle successfully getting user from storage
  //   } else {
  //    // Handle no user found in storage
  //   }

  //   setLoading(false)
  // }

  useEffect(() => {

    // Show the loading screen for 300ms to give Firebase time to find
    // the current user 
    //TODO: remove this when the above commented out functionality works
    if (!loggedInUser) {
      setTimeout(() => {
        setLoading(false)
        setLoggedInUser(firebase.auth().currentUser)
        },
        300
      );
    } else {
      setLoading(false)
    }

    // For signing in/out per https://stackoverflow.com/a/61026772
    // TODO: potentially remove this as well when above commented functionality
    // works
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => { // detaching the listen
      if (user) {
          // ...your code to handle authenticated users. 
          setLoggedInUser(user)
      } else {
          // No user is signed in...code to handle unauthenticated users.
          setLoggedInUser(null) 
      }
    });

   return () => unsubscribe(); 
  }, [loggedInUser])

  if (loading) {
    // This can be changed to a blank screen, spinner, etc..
    return <div>Loading...</div>
  } else {
    return (
    
      <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        Is logged in? {loggedInUser && JSON.stringify(loggedInUser.email)}
        <div className="App">
            <Nav></Nav>
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;