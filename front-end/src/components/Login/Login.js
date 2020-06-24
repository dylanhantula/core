import React, { useState } from "react";
import * as firebase from 'firebase/app';
import { withRouter, Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './Login.css';
import logo from './Athletes-Untapped-Logo-Rectangle.png';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      border: '0',
      borderColor: 'white',
      borderRadius: '0'
    },
  },

  textField: {
    margin: '0px 0px 1.5rem 0px',
    display: 'block',
    textAlign: 'center'
  },

}));

const LoginInput = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'lightslategray',
        borderRadius: '0',
        borderWidth: '1.2px'
      },
      '&:hover fieldset': {
        borderColor: 'green',
        borderWidth: '2px'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
        borderWidth: '2px'
      },
    },
  },

})(TextField);

const Login = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const loginStyleClasses = useStyles();

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

      <form onSubmit={e => handleForm(e)} className="loginFormControl">

        <div style={{textAlign: 'center', marginTop:'1.5rem'}}>
          <img src={logo} alt="Athletes Untapped" className="AULogoLogin"/>
          <p className="loginText">Log In</p>
          <hr style={{width: '35%', border: '1px solid lightslategray', marginBottom: '1.5rem'}}/>
        </div>
        <LoginInput
          className={loginStyleClasses.textField}
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="Email"
          variant="outlined"
        />
        <LoginInput
          className={loginStyleClasses.textField}
          onChange={e => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          variant="outlined"
        />
        <div className="loginButton">
          <button type="submit">Login</button>
          <p >Forgot Password? <Link>Reset Here</Link></p>
          <p >Don't have an Account? <Link>Sign Up</Link></p>
        </div>
        <span>{error}</span>
      </form>
  );
};

export default withRouter(Login);
