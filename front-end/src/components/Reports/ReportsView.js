import React, { useEffect, useContext,useState } from "react";

import { AuthContext } from "../App/App";

export default (props) => {
  const {user} = useContext(AuthContext);
  const [time, setTime] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  
  useEffect(() => {

    // React might load the component without loggedInUser set - ensure we 
    // don't execute the call without the user
    if (user) {
      
      // Get new token from Firebase
      user.firebaseUser.getIdToken(true)

      .then(function(idToken) {
        fetch("/time",{
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization":'Bearer ' + idToken
          }
        })
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true)
            setTime(result.time)
          },

          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true)
            alert(error)
          }
        )
      }).catch(function(error) {
        // Handle error
        alert(error)
      });
    } else {
        //TODO: handle this case
        console.log('No user found')
    }
  }, [user]);

  if (isLoaded) {
    return (
      <div>  
        The current time is: {time}
        <h1>{user.profile.sport}</h1>
      </div>
    )
  } else {
    // This can be changed to a blank screen, spinner, etc..
    return <div></div>
  }
  
}