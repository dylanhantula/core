import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import {
  withStyles,
  makeStyles
} from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

import './Landing.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      width: '25ch',
    },
  },
  textField: {
    margin: '0px 0px 10px 0px',
    display: 'block',
    width: '100%',
  },

}));

const SportZipCodeInput = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'green',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);


const Landing = ({history}) => {

  const [sport, setSport] = useState("");
  const [zip, setZip] = useState("");

  const handleForm = e => {

    e.preventDefault();

    history.push({
      pathname: '/coaches',
      search: '?zip='+zip+'&sport='+sport+'&radius=5',
  });
  };

  const MUIclasses = useStyles();


  return (
    <ul className="panelList">    
          <li>
            <div>
              Find a top-level private coach and take your game to the next level.
            </div>
          </li>
          <li>
            <div className="formControl">
            <label className="readyToTrain">Ready to Train?</label>
              <SportZipCodeInput
                className={MUIclasses.textField}
                value={sport}
                onChange={e => setSport(e.target.value)}
                name="sport"
                type="sport"
                label="Sport"
                variant="outlined"
              />
              <SportZipCodeInput
                className={MUIclasses.textField}
                onChange={e => setZip(e.target.value)}
                name="zip"
                value={zip}
                type="zip"
                label="Zip Code"
                variant="outlined"
              />
              <button className="findCoachButton" onClick={e => handleForm(e)}>Find Your Coach</button>
            </div>
          </li>
        </ul>
  );
};

export default withRouter(Landing);