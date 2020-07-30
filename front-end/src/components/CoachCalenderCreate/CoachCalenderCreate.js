import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import 'date-fns';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
//import { createRepeatingEvent } from '../../api/api';
import DateAndTime from '../DateAndTime/DateAndTime';
import CloseIcon from '@material-ui/icons/Close';



const textFieldColor="green";
const textFieldColorNormal="lightslategray";
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '20ch',
        
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
        margin: theme.spacing(0),
        minWidth: '3ch',
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
        margin: '0rem 0.2rem'
    }
  });

  


// const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday'];

// const setDayOfWeek = (date, day) => {
//     var currentDay = date.getDay();
//     var distance = day - currentDay;
//     date.setDate(date.getDate() + distance);
//     return date;
// }



const CoachCalenderCreate = props => {
    
    // const [editStartTime, ] = useState(new Date());
    // const [editEndTime, ] = useState(new Date());
    // const [repeatsOnDay, ] = useState("Sunday")
    const buttonClasses = buttonStyles();
    const styleClasses = useStyles();


    // const submitRepeatingEventHandler = e => {
    //     e.preventDefault();
    //     let startTime = setDayOfWeek(editStartTime, daysOfWeek.indexOf(repeatsOnDay));
    //     startTime.setHours(editStartTime.getHours());
    //     startTime.setMinutes(editStartTime.getMinutes());
    //     let endTime = setDayOfWeek(editEndTime, daysOfWeek.indexOf(repeatsOnDay));
    //     endTime.setHours(editEndTime.getHours());
    //     endTime.setMinutes(editEndTime.getMinutes());
    //     let eventToSubmit = {
    //         'coach': user.firebaseUser.uid,
    //         'startTime': startTime.valueOf(),
    //         'endTime': endTime.valueOf(),
    //         'status': 'repeating',
    //         'dayOfWeek': daysOfWeek.indexOf(repeatsOnDay),
    //         'frequency': 'weekly',
    //         'notes': ''
    //     };
    //     submitRepeatingEvent(eventToSubmit);
    // }

    // const submitRepeatingEvent = event => {
    //     user.firebaseUser.getIdToken()
    //     .then(function(idToken) {
    //         createRepeatingEvent(idToken, event)
    //         .then(response => {
    //             console.log(response);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    //     });
    // }


    return (
        <div style={{margin: '0rem 1rem 1rem 0rem'}}>   
            <div style={{display: 'flex', justifyContent: 'flex-end', margin: '0rem 0rem 2rem', textAlign: 'right'}}>
                <CloseIcon className="CalendarCloseButton" onClick={e => props.closeTab(false)}/>
            </div>
            <form className={styleClasses.root} >
                <TextField
                    style={{marginLeft: '0px'}}
                    name="typeOfEvent"
                    variant="outlined"
                    select
                    label="Type of Event"
                    value={props.eventType}
                    onChange={(e)=>props.setEventType(e.target.value)} >
                    <MenuItem value={"Normal Session"}>Normal Session</MenuItem>
                    <MenuItem value={"Personal"}>Personal</MenuItem>
                </TextField>

                {props.eventType === "Normal Session" ? 
                <TextField
                    style={{marginLeft: '0px'}}
                    name="listOfClients"
                    variant="outlined"
                    select
                    label="Invite Athlete"
                    value={props.clientToInvite}
                    onChange={(e)=>props.setClientToInvite(e.target.value)} >
                    {props.clients.map((client, index) => {
                        return <MenuItem value={client}>{client}</MenuItem>;
                    })}
                </TextField>:null}

                {props.eventType === "Personal" ? 
                <TextField
                    style={{marginLeft: '0px'}}
                    name="eventTitle"
                    variant="outlined"
                    label="Event Title"
                    value={props.eventTitle}
                    onChange={(e)=>props.setEventTitle(e.target.value)} >
                    
                </TextField>:null}
                
                

                <DateAndTime 
                    slot={props.slot} 
                    min={props.min} 
                    max={props.max} 
                    currentTimes={props.currentTimes}
                    updates={props.updates}
                    setUpdates={props.setUpdates}
                    showDatePicker={props.showDatePicker}
                />

                <div style={{textAlign: 'center', margin: '30px 0rem'}}>
                <Button variant="outlined" className={buttonClasses.green} onClick={e => props.createEvent(e)}>
                    Create
                </Button>
                </div>
              </form>
            
        </div>
    );
}

export default CoachCalenderCreate;