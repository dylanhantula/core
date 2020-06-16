import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { green } from '@material-ui/core/colors';
import { Button } from '@material-ui/core'
import './Landing.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      width: '25ch',
    },
  },
  textField: {
    margin: '0px 0px 10px 2px',
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
    <div>
      <h1>Athletes Untapped</h1>
      <h2>We are a one stop shop for all of your sports training needs</h2>
      <h3>Ready to train?</h3>
      <form onSubmit={e => handleForm(e)} className={MUIclasses.root}>
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
        <button className="findCoachButton" type="submit">Find Your Coach</button>
      </form>
    </div>
  );
};

export default withRouter(Landing);