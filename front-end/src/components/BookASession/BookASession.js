import React, { useState, useContext } from 'react';
import { AuthContext } from "../App/App";
import { createEvent } from '../../api/api';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker} from '@material-ui/pickers';
//import green from "@material-ui/core/colors/green";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import './BookASession.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={10} variant="filled" {...props} />;
}

const materialTheme = createMuiTheme({
    palette: {
      primary: {
          main: '#a5d6a7'
      }
    },
  });


const BookASession = props => {
    const {user} = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [openSnackbar, setOpenSnackBar] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const reserveHandler = e => {
        e.preventDefault();
        const startTime = selectedDate.valueOf(); //in milliseconds since Jan 1 1970
        const endTime = startTime + 3600000; // assuming 1 hr session times
        const eventToSubmit = {
            'startTime': startTime,
            'endTime': endTime,
            'athlete': user.firebaseUser.uid,
            'coach': props.coach.firebaseID
        };
        submitEvent(eventToSubmit);
    }

    const submitEvent = (vals) => {
        user.firebaseUser.getIdToken()
        .then(function(idToken) {
            createEvent(idToken, vals)
            .then(response => {
                setOpenSnackBar(true);
            })
            .catch(e => console.log(e));
        });
        
    }

    return (
        <div style={{margin: '3rem'}}>
            <ThemeProvider theme={materialTheme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        label="Date & Start Time"
                        value={selectedDate}
                        inputVariant="outlined"
                        showTodayButton
                        minutesStep={5}
                        disablePast
                        onChange={handleDateChange}
                        animateYearScrolling={false}
                    />
                </MuiPickersUtilsProvider>
            </ThemeProvider>
            <div>
                <button onClick={e => reserveHandler(e)}>Reserve</button>
            </div>
            <div>
                <button onClick={e => {props.setShowProfile(true); props.setShowBookSession(false);}}>Go Back</button>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={e => setOpenSnackBar(false)}>
                <Alert onClose={e => setOpenSnackBar(false)} severity="success">
                    Session Reserved!
                </Alert>
            </Snackbar>
        </div>
    );
}

export default BookASession;