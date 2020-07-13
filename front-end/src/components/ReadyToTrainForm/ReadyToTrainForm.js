import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './ReadyToTrainForm.css'

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        width: '25ch',
      },
    },
    textField: {
      margin: '0px 0px 15px 0px',
      display: 'block',
      width: '100%'
    },
  
  }));

const SportZipCodeInput = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'green',
        fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif',
      },
      '& label': {
        fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif',

      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },
      '& .MuiOutlinedInput-root': {
        fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif',
        '& fieldset': {
          borderColor: 'lightslategray',
          borderRadius: '0px',
          borderWidth: '1px'
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

const ReadyToTrainForm = (props) => {
    
    const [sport, setSport] = useState("");
    const [zip, setZip] = useState("");

    const handleForm = e => {

        e.preventDefault();

        props.history.push({
        pathname: '/coaches',
        search: '?zip='+zip+'&sport='+sport+'&radius=5',
    });
    };

    const takeToBecomeCoach = (e) => {
      e.preventDefault();
      props.history.push({
      pathname: '/join',
      });
    };

    const MUIclasses = useStyles();
    let submitFunc = takeToBecomeCoach;
    if (props.buttonText === "Find Your Coach") {
      submitFunc = e => handleForm(e);
    }

    return (
        <form onSubmit={submitFunc} className="formControl">
          <label className="readyToTrain">{props.readyToTrain}</label>
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
            <div className="findCoachButton">
                <button type="submit">{props.buttonText}</button>
            </div>
        </form>
    );
}

export default withRouter(ReadyToTrainForm);