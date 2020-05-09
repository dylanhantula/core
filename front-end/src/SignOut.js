import React, { useContext } from "react";
import { AuthContext } from "./App";
import * as firebase from 'firebase'
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
    // <div>
    //   <h1>Join</h1>
    //   <form onSubmit={e => handleForm(e)}>
    //     <input
    //       value={email}
    //       onChange={e => setEmail(e.target.value)}
    //       name="email"
    //       type="email"
    //       placeholder="email"
    //     />
    //     <input
    //       onChange={e => setPassword(e.target.value)}
    //       name="password"
    //       value={password}
    //       type="password"
    //       placeholder="password"
    //     />
    //     <hr />
    //     <button onClick={() => handleGoogleLogin()} className="googleBtn" type="button">
    //       <img
    //         src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
    //         alt="logo"
    //       />
    //       Join With Google
    //     </button>

    //     <button type="submit">Login</button>

    //     <span>{error}</span>
    //   </form>
    // </div>


    <button type="button" onClick={handleSignOut()}>
        Sign Out
    </button>
  );
};

export default withRouter(SignOut);