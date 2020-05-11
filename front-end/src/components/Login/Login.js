import React, { useState } from "react";
import * as firebase from 'firebase/app'
import { withRouter } from 'react-router-dom'

const Login = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const handleForm = e => {

    e.preventDefault();

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
    })
    .then(res => {
      // Login successful - do any login logic here

      // Note: we don't need to manually change the URL path here because onAuthStateChange
      // in App.js will get triggered asynchronously by Firebase as the user just logged in. 
      // When it does, the App component will re-render and display the athlete or coach app
    })
    .catch(e => {
      setErrors(e.message);
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={e => handleForm(e)}>
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
};

export default withRouter(Login);
