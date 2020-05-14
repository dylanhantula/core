import React, { useState } from "react";
import * as firebase from 'firebase/app'
import { withRouter } from 'react-router-dom';
import {createUser} from '../../api/api'

const Join = ({history}) => {

  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setErrors] = useState("");
  const [athleteView, setAthleteView] = useState(true);
  
  // General function for submitting both new coaches and new athletes to backend
  const submit = (vals) => {
      
      // Put the loading screen up
      setIsLoaded(false)

      // Create the user then sign in with Firebase as the newly created user
      createUser(vals).then(res => {
          return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      })
      .then(() => {
          return firebase.auth().signInWithEmailAndPassword(vals.email, vals.password)
      })
      .then(res => {
          // Sign up and login successful - do any additional sign up logic here

          // Note: we don't need to manually change the URL path here because onAuthStateChange
          // in App.js will get triggered asynchronously by Firebase as the user just logged in. 
          // When it does, the App component will re-render and display the athlete or coach screens
      })
      .catch(e => {
        setErrors(e);

        // Only set isLoaded if there is an error to display. Otherwise, keep the loading 
        // screen up until App.js switches the page
        setIsLoaded(true);
      })
  };

  // Switch between coach and athlete view
  const switchView = () => {
    setAthleteView(!athleteView)
  }

  if (isLoaded) {

    if (athleteView) {
      return (
        <div>
          <button onClick={switchView}>Not an athlete? Become a coach</button>
          <AthleteJoin submit={submit} />
          <span>{error}</span>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={switchView}>Not a coach? Become an athlete</button>
          <CoachJoin submit={submit} />
          <span>{error}</span>
        </div>
      );
    }
    
  } else {
    // This can be changed to a blank screen, spinner, etc..
    return <div>Loading...</div>
  }
};

const AthleteJoin = (props) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sport, setSport] = useState("");
  const [yearsExp, setYearsExp] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [currentTeam, setCurrentTeam] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const vals = {
    "firstName":firstName,
    "lastName":lastName,
    "sport":sport,
    "yearsExp":yearsExp,
    "currentTeam": currentTeam,
    "zipCode":zipCode,
    "email": email,
    "password": password,
    "profileType": "athlete",
  }

  const submitAthlete = e => {

    // Make sure that form runs our logic and not whatever default logic exists for forms
    // in HTML/JavaScript
    e.preventDefault();

    //TODO: do client-side validation on user's input (i.e. ensure all required fields are present)
    
    // Submit the coach using the submit function passed in the props
    props.submit(vals);
  }

  return (
    <div>
      <h1>Become an Athlete</h1>
      <form onSubmit={e => submitAthlete(e)}>
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
          key="f"
        />
        <input
          value={currentTeam}
          onChange={e => setCurrentTeam(e.target.value)}
          name="currentTeam"
          type="currentTeam"
          placeholder="Current Team"
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
      </form>
    </div>
  );
}

const CoachJoin = (props) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sport, setSport] = useState("");
  const [yearsExp, setYearsExp] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [whyCoach, setWhyCoach] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const vals = {
    "firstName":firstName,
    "lastName":lastName,
    "sport":sport,
    "yearsExp":yearsExp,
    "zipCode":zipCode,
    "whyCoach":whyCoach,
    "email": email,
    "password": password,
    "profileType": "coach",
  }

  const submitCoach = e => {

    // Make sure that form runs our logic and not whatever default logic exists for forms
    // in HTML/JavaScript
    e.preventDefault();

    //TODO: do client-side validation on user's input (i.e. ensure all required fields are present)
    
    // Submit the coach using the submit function passed in the props
    props.submit(vals);
  }

  return (
    <div>
      <h1>Become a Coach</h1>
      <form onSubmit={e => submitCoach(e)}>
      <input
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          name="firstName"
          type="firstName"
          placeholder="First Name"
          key="b"
        />
        <input
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          name="lastName"
          type="lastName"
          placeholder="Last Name"
          key="c"
        />
        <input
          value={sport}
          onChange={e => setSport(e.target.value)}
          name="sport"
          type="sport"
          placeholder="Sport"
          key="d"
        />
        <input
          value={yearsExp}
          onChange={e => setYearsExp(e.target.value)}
          name="yearsExp"
          type="yearsExp"
          placeholder="Years of Experience"
          key="e"
        />
        <input
          value={zipCode}
          onChange={e => setZipCode(e.target.value)}
          name="zipCode"
          type="zipCode"
          placeholder="Zip Code"
          key="f"
        />
        <input
          value={whyCoach}
          onChange={e => setWhyCoach(e.target.value)}
          name="whyCoach"
          type="whyCoach"
          placeholder="Why do you want to coach?"
          key="g"
        />
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="email"
          key="h"
        />
        <input
          onChange={e => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="password"
          key="i"
        />
        <hr />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default withRouter(Join);
