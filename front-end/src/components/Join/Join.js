import React, { useState } from "react";
import * as firebase from 'firebase/app'
import { withRouter } from 'react-router-dom';
import {createUser} from '../../api/api'

const Join = ({history}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sport, setSport] = useState("");
  const [yearsExp, setYearsExp] = useState(0);
  const [zipCode, setZipCode] = useState(0);
  const [whyCoach, setWhyCoach] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);
  const [profileType, setProfileType] = useState("");
  
  const handleForm = e => {
    e.preventDefault();

      const vals = {
        "firstName":firstName,
        "lastName":lastName,
        "sport":sport,
        "yearsExp":yearsExp,
        "zipCode":zipCode,
        "whyCoach":whyCoach,
        "email": email,
        "password": password,
        "profileType": profileType,
      }
      
      // Put the loading screen up
      setIsLoaded(false)

      // Create the user then sign in with Firebase as the newly created user
      createUser(vals).then(res => {
          return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      })
      .then(() => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
      })
      .then(res => {
          // Sign up and login successful - do any additional sign up logic here

          // Note: we don't need to manually change the URL path here because onAuthStateChange
          // in App.js will get triggered asynchronously by Firebase as the user just logged in. 
          // When it does, the App component will re-render and display the athlete or coach app
      })
      .catch(e => {
        setErrors(e.message);

        // Only set isLoaded if there is an error to display. Otherwise, keep the loading 
        // screen up until App.js switches the page
        setIsLoaded(true);
      })
  };

  if (isLoaded) {
    return (
      <div>
        <h1>Join</h1>
        <form onSubmit={e => handleForm(e)}>
        <input
            value={profileType}
            onChange={e => setProfileType(e.target.value)}
            name="profileType"
            type="profileType"
            placeholder="Profile Type"
          />
        <input
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            name="firstName"
            type="firstName"
            placeholder="First Name"
          />
          <input
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            name="lastName"
            type="lastName"
            placeholder="Last Name"
          />
          <input
            value={sport}
            onChange={e => setSport(e.target.value)}
            name="sport"
            type="sport"
            placeholder="Sport"
          />
          <input
            value={yearsExp}
            onChange={e => setYearsExp(e.target.value)}
            name="yearsExp"
            type="yearsExp"
            placeholder="Years of Experience"
          />
          <input
            value={zipCode}
            onChange={e => setZipCode(e.target.value)}
            name="zipCode"
            type="zipCode"
            placeholder="Zip Code"
          />
          <input
            value={whyCoach}
            onChange={e => setWhyCoach(e.target.value)}
            name="whyCoach"
            type="whyCoach"
            placeholder="Why do you want to coach?"
          />
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="email"
          />
          <input
            onChange={e => setPassword(e.target.value)}
            name="password"
            value={password}
            type="password"
            placeholder="password"
          />
          <hr />
          <button type="submit">Login</button>
          <span>{error}</span>
        </form>
      </div>
    );
  } else {
    // This can be changed to a blank screen, spinner, etc..
    return <div>Loading...</div>
  }
  
};

export default withRouter(Join);
