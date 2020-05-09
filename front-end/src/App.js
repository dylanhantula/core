import React, { useState, useEffect } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes.js";
import Header from "./Header";
import "./styles.css";

import protectedRoutes from './protectedRoutes'
import firebase from "firebase/app";

import ProtectedRouteHoc from './ProtectedRouteHoc'
import { config } from './firebase_config.json';

console.log(config)
firebase.initializeApp(config);

export const AuthContext = React.createContext(null);


function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  //TODO: uncomment and use this function to speed up page load time. This
  // reads the user from the session storage but does not return the Firebase
  // auth object. Reading from local storage can be used in conjunction with
  // the current system of calling Firebase for each page load by holding both
  // the local storage object and the Firebase auth object when it is ready.
  // This way, you only need to make sure you have the Firebase auth object
  // when you need to use it, not when you load any page

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

  const checkActiveUser = (sessionChecks) => {

    // Check for logged in user from Firebase
    const user = firebase.auth().currentUser;

    // If no user is found, try 3 times 100ms apart
    if ( !user && sessionChecks < 3 ) {
      setTimeout(
        () => {
          checkActiveUser(sessionChecks+1);
        },
        100
      );
    } else if ( user || sessionChecks >= 3){
      
      // Set this user after the max number of checks have completed or
      // if a user is found (no user found will set loggedInUser to null)
      setLoggedInUser(user)
      setLoading(false)
    } 
  };

  useEffect(() => {
    checkActiveUser(0) 

    // For signing in/out per https://stackoverflow.com/a/61026772
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
  }, [])

  if (loading) {
    // This can be changed to a blank screen, spinner, etc..
    return <div>Loading...</div>
  } else {
    return (
    
      <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        Is logged in? {loggedInUser && JSON.stringify(loggedInUser.email)}
        <div className="App">
          <Router>
            <Header loggedInUser={loggedInUser}/>
  
            <Switch>
              {protectedRoutes.map(route => (
                <ProtectedRouteHoc
                  key={route.path}
                  loggedInUser={loggedInUser}
                  path={route.path}
                  component={route.main}
                  exact={route.exact}
                  public={route.public}
                />
              ))}
  
              {routes.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
              ))}
            </Switch>
          </Router>
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;