import React from "react";
import { withRouter } from 'react-router-dom';
import './Signup.css';
import logo from './Athletes-Untapped-Logo-Rectangle.png';



const Signup = (props) => {

    const takeToBecomeCoach = (e) => {
        props.close();
        e.preventDefault();
        props.history.push({
        pathname: '/join',
        state: {forAthlete: false}
        });
    };

    const takeToBecomeAthlete = (e) => {
        props.close();
        e.preventDefault();
        props.history.push({
        pathname: '/join',
        state: {forAthlete: true}
        });
    };

  return (

      <div className="signupControl">

        <div style={{textAlign: 'center', marginTop:'1.5rem'}}>
          <img src={logo} alt="Athletes Untapped" className="AULogoSignup"/>
          <p className="signupText">Sign Up</p>
          <hr style={{width: '35%', border: '1px solid lightslategray', marginBottom: '1.5rem'}}/>
        </div>
        <div style={{textAlign: 'center'}}>
            <p className="becomeAnAU">Become an AU</p>
        </div>
        <div className="signupButton">
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '2rem'}}>
                <button onClick={(e)=> takeToBecomeCoach(e)}>Coach</button>
                <button onClick={(e)=> takeToBecomeAthlete(e)}>Athlete or Parent</button>
            </div>
          <p>Already in the AU Community?</p>
          <p className="pSwitchToLogin" onClick={props.switch}>Log in here</p>
        </div>
      </div>
  );
};

export default withRouter(Signup);
