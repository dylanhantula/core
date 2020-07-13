import React, { useState } from "react";
import * as firebase from 'firebase/app'
import { withRouter } from 'react-router-dom';
import {createUser} from '../../api/api';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import './Join.css';
import logo from '../HomeNav/Athletes-Untapped-Logo-Rectangle.png';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import BottomNav from "../BottomNav/BottomNav";


const textFieldColor="green";
  const textFieldColorNormal="lightslategray";
  const useStyles = makeStyles((theme) => ({
    root: {
      width: 'max-content',
      display: 'flex',
      '& .MuiTextField-root': {
        margin: theme.spacing(3),
        minWidth: '40ch',
        
        '& label.Mui-focused': {
          color: textFieldColor,
          fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif',
  
        },
        '& label': {
          fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif',
  
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: textFieldColor,
        },
        '& .MuiOutlinedInput-root': {
          fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif',
          '& fieldset': {
            borderColor: textFieldColorNormal,
            borderRadius: '0',
            borderWidth: '1.2px'
          },
          '&:hover fieldset': {
            borderColor: textFieldColor,
            borderWidth: '2px'
          },
          '&.Mui-focused fieldset': {
            borderColor: textFieldColor,
            borderWidth: '2px'
          },
        },
      },
    },

    formControl: {
      margin: theme.spacing(3),
      minWidth: '30ch',
    },
    p: {
      margin: theme.spacing(3),
      paddingTop: theme.spacing(1),
      fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'
    },
    label: {
      fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif',
      
    },
  }));

  const GreenCheckbox = withStyles({
    root: {
      color: 'lightslategray',
      '&$checked': {
        color: green[700],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);



const Join = (props) => {

  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setErrors] = useState("");
  let whetherAthlete = false;
  if (typeof props.location.state !== "undefined") {
    whetherAthlete = props.location.state.forAthlete;
  }

  const [athleteView, setAthleteView] = useState(whetherAthlete);
  
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
        <div className="greenBoxSignup">
          <button onClick={switchView} className="joinButton">Become an AU Coach Instead</button>
          <AthleteJoin submit={submit} />
          <span>{error}</span>
          
        </div>
        <BottomNav/>
        </div>
      );
    } else {
      return (
        <div>
        <div className="greenBoxSignup">
          <button onClick={switchView} className="joinButton">Become an Athlete Instead</button>
          <CoachJoin submit={submit} />
          <span>{error}</span>
        </div>
        <BottomNav/>
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
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [password2, setPassword2] = useState("");
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [parentFirstName, setParentFirstName] = useState("");
  const [parentLastName, setParentLastName] = useState("");
  const [parent, setParent] = useState(true);
  const [athlete, setAthlete] = useState(false);



  const vals = {
    "firstName":firstName,
    "lastName":lastName,
    "sport":sport,
    "zipCode":zipCode,
    "email": email,
    "password": password,
    "profileType": "athlete",
    "referralCode": referralCode,
    "password2": password2,
    "terms": terms,
    "privacy": privacy,
    "ageGroup": ageGroup
  }
  

  const submitAthlete = e => {

    // Make sure that form runs our logic and not whatever default logic exists for forms
    // in HTML/JavaScript
    e.preventDefault();

    //TODO: do client-side validation on user's input (i.e. ensure all required fields are present)
    
    // Submit the coach using the submit function passed in the props
    props.submit(vals);
  }

  const styleClasses = useStyles();

  const parentNameFields = <div>
  <TextField
    value={parentFirstName}
    onChange={e => setParentFirstName(e.target.value)}
    name="parentFirstName"
    type="parentFirstName"
    label="Parent First Name"
    variant="outlined"
  />
  <TextField
    value={parentLastName}
    onChange={e => setParentLastName(e.target.value)}
    name="parentLastName"
    type="parentLastName"
    label="Parent Last Name"
    variant="outlined"
  />
</div>


  return (
    <div >
      <div style={{textAlign: 'center'}}>
        <img src={logo} className="AULogoSignUp" alt="Athletes Untapped"/>
        <p className="pSignUpHeader" >Sign Up to Train with an AU Coach!</p>
        <hr style={{width: '45%', border: '1px solid lightslategray', marginBottom: '1.5rem'}}/>
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <form className={styleClasses.root} onSubmit={e => submitAthlete(e)}>
          <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <FormControl component="fieldset" >
                <FormControlLabel
                    control={<GreenCheckbox checked={parent} onChange={(e)=>{setParent(e.target.checked); setAthlete(!e.target.checked)}} name="parent" />}
                    label="I'm the Parent" classes={{label: styleClasses.label}}
                />
            </FormControl>
            <FormControl component="fieldset" >
                <FormControlLabel
                    control={<GreenCheckbox checked={athlete} onChange={(e)=>{setAthlete(e.target.checked); setParent(!e.target.checked)}} name="athlete" />}
                    label="I'm the Athlete" classes={{label: styleClasses.label}}
                />
            </FormControl>
          </div>
          {parent ? parentNameFields:null}
          <div>
            <TextField
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              name="firstName"
              type="firstName"
              label="First Name"
              variant="outlined"
            />
            <TextField
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              name="lastName"
              type="lastName"
              label="Last Name"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              value={email}
              onChange={e => setEmail(e.target.value)}
              name="email"
              type="email"
              label="Email"
              variant="outlined"
              inputProps={{style: {minWidth: '72.5ch', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'}}}
            />
          </div>
          <div>
            <TextField
              value={sport}
              onChange={e => setSport(e.target.value)}
              name="sport"
              type="sport"
              label="Sport(s)"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              value={zipCode}
              onChange={e => setZipCode(e.target.value)}
              name="zipCode"
              type="zipCode"
              label="Zip Code"
              key="f"
              variant="outlined"
            />
          </div>
          <div>
              <TextField
              name="ageGroup"
              variant="outlined"
              select
              label="Age Group"
              value={ageGroup}
              onChange={(e)=>setAgeGroup(e.target.value)}
              >
                <MenuItem value={"5-8"}>5-8</MenuItem>
                    <MenuItem value={"9-13"}>9-13</MenuItem>
                    <MenuItem value={"14-17"}>14-17</MenuItem>
                    <MenuItem value={"18+"}>18+</MenuItem>

              </TextField>
                

          </div>
          <div>
            <TextField
              onChange={e => setPassword(e.target.value)}
              name="password"
              value={password}
              type="password"
              label="Create Password"
              variant="outlined"
              inputProps={{style: {minWidth: '72.5ch', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'}}}
            />
          </div>
          <div>
            <TextField
                onChange={e => setPassword2(e.target.value)}
                name="password2"
                value={password2}
                type="password"
                label="Re-Enter Password"
                variant="outlined"
                inputProps={{style: {minWidth: '72.5ch', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'}}}
                />
          </div>
          <div>
            <TextField
              value={referralCode}
              onChange={e => setReferralCode(e.target.value)}
              name="referralCode"
              type="referralCode"
              label="Referral Code"
              variant="outlined"
              inputProps={{style: {minWidth: '72.5ch', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'}}}
              
            />
          </div>
          <div>
            <FormControl component="fieldset" className={styleClasses.formControl}>
              <FormControlLabel
                  control={<GreenCheckbox checked={terms} classes={{checked: styleClasses.checkbox}} onChange={(e)=>setTerms(e.target.checked)} name="terms" />}
                  label="I agree to Athletes Untapped's Terms of Service." classes={{label: styleClasses.label}}
              /> 
            </FormControl>
          </div> 
          <div>
            <FormControl component="fieldset" className={styleClasses.formControl}>
              <FormControlLabel
                  control={<GreenCheckbox checked={privacy} onChange={(e)=>setPrivacy(e.target.checked)} name="privacy" />}
                  label="I agree to Athletes Untapped's Privacy Policy." classes={{label: styleClasses.label}}
              />
            </FormControl>
          </div>
        
          
          
          <div className="joinButtonDiv"> 
          <button type="submit" className="joinButton">Start Training</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const CoachJoin = (props) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sport, setSport] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [ages, setAges] = useState({
    group1: false,
    group2: false,
    group3: false,
    group4: false
  });
  const [distance, setDistance] = useState("");
  const [playExp, setPlayExp] = useState("");
  const [coachExp, setCoachExp] = useState("");
  const [password2, setPassword2] = useState("");
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);


  const vals = {
    "firstName":firstName,
    "lastName":lastName,
    "sport":sport,
    "zipCode":zipCode,
    "email": email,
    "password": password,
    "profileType": "coach",
    "referralCode": referralCode,
    "distance": distance,
    "playingExp": playExp,
    "coachingExp": coachExp,
    "password2": password2,
    "terms": terms,
    "privacy": privacy,
    "ages": ages
  }

  const submitCoach = e => {

    // Make sure that form runs our logic and not whatever default logic exists for forms
    // in HTML/JavaScript
    e.preventDefault();

    //TODO: do client-side validation on user's input (i.e. ensure all required fields are present)
    
    // Submit the coach using the submit function passed in the props
    props.submit(vals);
  }

  const styleClasses = useStyles();

  const ageHandler = (e) => {
    setAges({ ...ages, [e.target.name]: e.target.checked });

  }

  return (
    <div >
      <div style={{textAlign: 'center'}}>
        <img src={logo} className="AULogoSignUp" alt="Athletes Untapped"/>
        <p className="pSignUpHeader" >Become a Private Coach with AU!</p>
        <hr style={{width: '45%', border: '1px solid lightslategray', marginBottom: '1.5rem'}}/>
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <form className={styleClasses.root} onSubmit={e => submitCoach(e)}>
          <div>
            <TextField
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              name="firstName"
              type="firstName"
              label="First Name"
              variant="outlined"
            />
            <TextField
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              name="lastName"
              type="lastName"
              label="Last Name"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              value={email}
              onChange={e => setEmail(e.target.value)}
              name="email"
              type="email"
              label="Email"
              variant="outlined"
              inputProps={{style: {minWidth: '72.5ch', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'}}}
            />
          </div>
          <div>
            <TextField
              value={sport}
              onChange={e => setSport(e.target.value)}
              name="sport"
              type="sport"
              label="Sport(s)"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              value={zipCode}
              onChange={e => setZipCode(e.target.value)}
              name="zipCode"
              type="zipCode"
              label="Zip Code"
              key="f"
              variant="outlined"
            />
          </div>
          
          <div>
            <TextField
              onChange={e => setPassword(e.target.value)}
              name="password"
              value={password}
              type="password"
              label="Create Password"
              variant="outlined"
              inputProps={{style: {minWidth: '72.5ch', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'}}}
            />
          </div>
          <div>
            <TextField
                onChange={e => setPassword2(e.target.value)}
                name="password2"
                value={password2}
                type="password"
                label="Re-Enter Password"
                variant="outlined"
                inputProps={{style: {minWidth: '72.5ch', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'}}}
                />
          </div>
          <div>
            <TextField
              value={referralCode}
              onChange={e => setReferralCode(e.target.value)}
              name="referralCode"
              type="referralCode"
              label="Referral Code"
              variant="outlined"
              inputProps={{style: {minWidth: '72.5ch', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'}}}
              
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p className={styleClasses.p}>Willing To Travel:</p>
              <TextField
              name="distance"
              label="Max. Distance (mi)"
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              variant="outlined"
              InputProps={{
                inputProps: { 
                    max: 70, min: 0 
                }
            }}
              
              />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p className={styleClasses.p}>Playing Experience:</p>
              <TextField
              name="playingExp"
              variant="outlined"
              select
              label="Level"
              value={playExp}
              onChange={(e)=>setPlayExp(e.target.value)}
              >
                <MenuItem value={"High School"}>High School</MenuItem>
                    <MenuItem value={"College"}>College</MenuItem>
                    <MenuItem value={"Professional"}>Professional</MenuItem>
              </TextField>
                

          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <p className={styleClasses.p}>Coaching Experience: </p>
            <TextField
                name="coachingExp"
                label="Years"
                type="number"
                value={coachExp}
                onChange={(e) => setCoachExp(e.target.value)}
                variant="outlined"
                InputProps={{
                  inputProps: { 
                      max: 70, min: 0 
                  }
              }}
                
                />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <p className={styleClasses.p}>Preferred Ages to Coach: </p>
              <FormControl style={{display: 'flex'}} component="fieldset" className={styleClasses.formControl}>
                <FormGroup >
                  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                  <FormControlLabel
                    control={<GreenCheckbox checked={ages.group1} onChange={ageHandler} name="group1" />}
                    label="5-8" classes={{label: styleClasses.label}}
                  />
                  <FormControlLabel
                    control={<GreenCheckbox checked={ages.group2} onChange={ageHandler} name="group2" />}
                    label="9-13" classes={{label: styleClasses.label}}
                  />
                  <FormControlLabel
                    control={<GreenCheckbox checked={ages.group3} onChange={ageHandler} name="group3" />}
                    label="14-17" classes={{label: styleClasses.label}}
                  />
                  <FormControlLabel
                    control={<GreenCheckbox checked={ages.group4} onChange={ageHandler} name="group4" />}
                    label="18+" classes={{label: styleClasses.label}}
                  />
                  </div>
                </FormGroup>
              </FormControl>
          </div>
          <div>
            <FormControl component="fieldset" className={styleClasses.formControl}>
              <FormControlLabel
                  control={<GreenCheckbox checked={terms} classes={{checked: styleClasses.checkbox}} onChange={(e)=>setTerms(e.target.checked)} name="terms" />}
                  label="I agree to Athletes Untapped's Terms of Service." classes={{label: styleClasses.label}}
              /> 
            </FormControl>
          </div> 
          <div>
            <FormControl component="fieldset" className={styleClasses.formControl}>
              <FormControlLabel
                  control={<GreenCheckbox checked={privacy} onChange={(e)=>setPrivacy(e.target.checked)} name="privacy" />}
                  label="I agree to Athletes Untapped's Privacy Policy." classes={{label: styleClasses.label}}
              />
            </FormControl>
          </div>
          
          
         
          
          
          <div className="joinButtonDiv"> 
          <button type="submit" className="joinButton">Start Coaching</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Join);
