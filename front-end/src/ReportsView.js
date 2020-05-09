import React, { useEffect, useContext,useState } from "react";

import { AuthContext } from "./App";

export default (props) => {
  const {loggedInUser} = useContext(AuthContext);
  const [time, setTime] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  
  useEffect(() => {

    // React might load the component without loggedInUser set - ensure we 
    // don't execute the call without the user
    if (loggedInUser) {
      
      // Get new token from Firebase
      loggedInUser.getIdToken(true)

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
            console.log(result)
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

      //loggedInUser.current
      //onsole.log('Bearer ' + loggedInUser.stsTokenManager.accessToken)

    }
  }, [loggedInUser]);

  if (isLoaded) {
    return (
      <div>  
        The current time is: {time}
      </div>
    )
  } else {
    return <div></div>
  }
  
}