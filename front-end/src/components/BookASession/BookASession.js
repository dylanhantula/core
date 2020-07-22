import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../App/App";
import { createEvent, getEvents } from '../../api/api';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker} from '@material-ui/pickers';
import { createMuiTheme, Button } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import './BookASession.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AULogo from '../HomeNav/Athletes-Untapped-Logo-Rectangle.png';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { green } from '@material-ui/core/colors';



const localizer = momentLocalizer(moment);


function Alert(props) {
    return <MuiAlert elevation={10} variant="filled" {...props} />;
}

const buttonStyles = makeStyles({
    red: {
      color: 'red',
      borderColor: 'red',
      margin: '0rem 0.2rem'
    },
    blue: {
        color: '#0080ff',
        borderColor: '#0080ff',
        margin: '0rem 0.2rem'
    },
    yellow: {
        color: '#ffcc00',
        borderColor: '#ffcc00',
        margin: '0rem 0.2rem'
    },
    green: {
        color: 'green',
        borderColor: 'green',
        margin: '0rem 0.2rem',
        borderRadius: '0px',
        border: '1px solid green'
    }
  });

const useStyles = makeStyles((theme) => ({
    root: {
    
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana sans-serif',
      color: 'gray'
    },
    details: {
        color: 'black',
        fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana sans-serif',
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    }
  }));


const materialTheme = createMuiTheme({
    palette: {
      primary: {
          main: '#000'
      }
    }
});


const BookASession = props => {
    const {user} = useContext(AuthContext);

    const expansionPanelClasses = useStyles();
    const buttonClasses = buttonStyles();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [openSnackbar, setOpenSnackBar] = useState(false);
    const [numSessions, setNumSessions] = useState(0);
    const [numAthletes, setNumAthletes] = useState(0);
    const [pricePerSession, ] = useState(75);
    const [discount, ] = useState(0.2);
    const [events, setEvents] = useState([]);
    const [eventsBeingDisplayed, setEventsBeingDisplayed] = useState(events);

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    useEffect(() => {
        user.firebaseUser.getIdToken()
        .then(function(idToken) {
            getEvents(idToken, props.coach.firebaseID)
            .then(response => {
                setEvents(response['events'].concat(response['pendingEvents']));
                setEventsBeingDisplayed(response['events'].concat(response['pendingEvents']));
            })
            .catch(e => console.log(e));
        });
    }, [props.coach.firebaseID, user.firebaseUser]);

    const handleDateChange = (date) => {
        date.setSeconds(0);
        date.setMilliseconds(0);
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
            'coach': props.coach.firebaseID,
            'status': "pending",
        };
        submitEvent(eventToSubmit);
    }

    const submitEvent = (event) => {
        user.firebaseUser.getIdToken()
        .then(function(idToken) {
            createEvent(idToken, event, event['status'])
            .then(response => {
                setOpenSnackBar(true);
            })
            .catch(e => console.log(e));
        });
        
    }

    const createTempEvent = (date) => {
        date.setSeconds(0);
        date.setMilliseconds(0);
        let newEvent = {
            'startTime': date.valueOf(),
            'endTime': date.valueOf() + 3600000,
            'athlete': user.firebaseUser.uid,
            'coach': props.coach.firebaseID,
            'status': "temp",
            
        };
        setEventsBeingDisplayed(events.concat([newEvent]))
    }

    return (
        <div style={{margin: '3rem 7rem'}}>
            <div className="BookSessionGoBack">
                <KeyboardBackspaceIcon fontSize="small" style={{ color: green[900] }} onClick={e => {props.setShowProfile(true); props.setShowBookSession(false);}}/>
                <p onClick={e => {props.setShowProfile(true); props.setShowBookSession(false);}}> Go Back to Coach Profile</p>
            </div>
            <div className="BookSessionCoachMainInfo">
                <div className="BookSessionCoachInfoSummary">
                    <div style={{maxWidth: '400px'}}>
                        <img src={AULogo} alt="Athletes Untapped" className="BookSessionAULogo"/>
                    </div>
                    <p className="BookSessionCoachInfoSummaryHeader">Start Training with Coach {props.coach.firstName}</p>
                    <p className="BookSessionCoachInfoSummaryTitle">What To Expect</p>
                    <div >
                        <ExpansionPanel square={false}>
                            <ExpansionPanelSummary 
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className={expansionPanelClasses.root}>
                                    <Typography className={expansionPanelClasses.heading}>What will a typical training session look like?</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography className={expansionPanelClasses.details}>{props.coach.profileField6}</Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary 
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                    <Typography className={expansionPanelClasses.heading}>How can Coach {props.coach.firstName} help you improve your game?</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography className={expansionPanelClasses.details}>{props.coach.profileField5}</Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary 
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                    <Typography className={expansionPanelClasses.heading}>What Coach {props.coach.firstName} wants parents and athletes to know: </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography className={expansionPanelClasses.details}>{props.coach.profileField3}</Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                </div>
                <div className="BookASessionPaymentInfo">
                    <p className="BookSessionPaymentInfoTitle">Book Now</p>
                    <p className="BookSessionPaymentInfoText">${pricePerSession}/session</p>
                    <div style={{display: 'flex', alignItems: 'baseline', marginTop: '0.5rem'}}>
                        <input min="0" onInput="validity.valid||(value='')" type="number" value={numSessions} className="BookSessionPaymentInfoInput" onChange={e => setNumSessions(e.target.value)}/>
                        <p className="BookSessionPaymentInfoText">Sessions</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'baseline'}}>
                        <input min="0" onInput="validity.valid||(value='')" type="number" value={numAthletes} className="BookSessionPaymentInfoInput" onChange={e => setNumAthletes(e.target.value)}/>
                        <p className="BookSessionPaymentInfoText">Athletes</p>
                    </div>
                    <div className="BookSessionPaymentInfoTransactions" style={{marginTop: '1rem'}} >
                        <p className="BookSessionPaymentInfoText">${pricePerSession} x {numSessions} sessions</p>
                        <p className="BookSessionPaymentInfoText">${pricePerSession * numSessions}</p>
                    </div>
                    <div className="BookSessionPaymentInfoTransactions" style={{borderBottom: '2px solid lightgray', paddingBottom: '0.5rem'}}> 
                        <p className="BookSessionPaymentInfoText">{discount * 100}% discount</p>
                        <p className="BookSessionPaymentInfoText">${pricePerSession * numSessions * discount}</p>
                    </div>
                    <div className="BookSessionPaymentInfoTransactions" style={{paddingBottom: '0.5rem'}}> 
                        <p className="BookSessionPaymentInfoText">Total</p>
                        <p className="BookSessionPaymentInfoText">${pricePerSession * numSessions * (1 - discount)}</p>
                    </div>
                    <div className="BookSessionReserveButton">
                    <Button className={buttonClasses.green}>Reserve</Button>
                    </div>
                </div>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={e => setOpenSnackBar(false)}>
                <Alert onClose={e => setOpenSnackBar(false)} severity="success">
                    Session Reserved!
                </Alert>
            </Snackbar>


            <div className="BookSessionCalenderView">

                <div className="BookSessionScheduler">
                    <p className="BookSessionPaymentInfoText" style={{marginBottom: '2rem', textAlign: 'center'}}>Reserve Your 1 Hour Session</p>
                    <ThemeProvider theme={materialTheme}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                label="Date & Start Time"
                                value={selectedDate}
                                inputVariant="outlined"
                                InputProps={{
                                    style: {
                                        borderRadius: '0px',
                                        outline: 'none',
                                    }
                                }}
                                onAccept={date => createTempEvent(date)}
                                showTodayButton
                                minutesStep={5}
                                disablePast
                                onChange={handleDateChange}
                                animateYearScrolling={false}
                            />
                        </MuiPickersUtilsProvider>
                    </ThemeProvider>
                    <div className="BookSessionSchedulerButton">
                        <Button onClick={e => reserveHandler(e)} className={buttonClasses.green}>Reserve</Button>
                    </div>
                    
                </div>

                <div style={{ height: '500pt', flexGrow: '2'}}>
                    <Calendar
                        events={eventsBeingDisplayed}
                        titleAccessor={event => {
                            return ("1 hr session");
                            }
                        }
                        startAccessor={event => new Date(event['startTime'])}
                        endAccessor={event => new Date(event['endTime'])}
                        defaultDate={moment().toDate()}
                        localizer={localizer}
                        view="week"
                        
                        eventPropGetter={
                            (event, start, end, isSelected) => {
                            let newStyle = {
                                backgroundColor: "darkgreen",
                                color: 'white',
                                borderRadius: "0px",
                                border: "none",
                                fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana sans-serif',
                                outline: 'none',
                            
                            };
                            
                            if (event['status'] && event['status'] === "pending") {
                                newStyle.backgroundColor = 'lightyellow';
                                newStyle.border = '1px solid orange'
                                newStyle.color = 'black'
                            } else if (event['status'] && event['status'] === "canceled") {
                                newStyle.backgroundColor = 'lightpink';
                                newStyle.border = '1px solid crimson'
                                newStyle.color = 'black'
                            } else if (event['status'] && event['status'] === "temp") {
                                newStyle.backgroundColor = 'lightblue';
                                newStyle.border = '1px solid #0080ff'
                                newStyle.color = 'black'
                            }
                            return {
                                className: "",
                                style: newStyle
                            };
                            }
                        }
                    />
                </div>

            </div>

        </div>
    );
}

export default BookASession;