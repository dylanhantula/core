import React, { useContext } from "react";
import { AuthContext } from "../App/App";
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { withRouter } from 'react-router-dom';

const SignOut = ({history}) => {

  const Auth = useContext(AuthContext);
  const handleSignOut = () => {

    firebase.auth().signOut()
    .then(res => {
      Auth.setLoggedInUser(null);
      history.push('/')
    })
    .catch(e => {
        alert(e.message);
    });

  };

  return (
    <button type="button" onClick={handleSignOut()}>
        Sign Out
    </button>
  );
};

export default withRouter(SignOut);