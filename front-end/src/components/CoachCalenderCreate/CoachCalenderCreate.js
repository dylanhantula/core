import React, { useState, useContext } from 'react';
import { AuthContext } from "../App/App";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import { createRepeatingEvent } from '../../api/api';



const textFieldColor="green";
const textFieldColorNormal="lightslategray";
const useStyles = makeStyles((theme) => ({
    root: {
        width: 'max-content',
        display: 'flex',
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        minWidth: '20ch',
        
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
        margin: theme.spacing(1),
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

  const GreenCheckbox = withStyles({
    root: {
      color: 'lightslategray',
      '&$checked': {
        color: green[700],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);


const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday'];

const setDayOfWeek = (date, day) => {
    var currentDay = date.getDay();
    var distance = day - currentDay;
    date.setDate(date.getDate() + distance);
    return date;
}



const CoachCalenderCreate = props => {
    const {user} = useContext(AuthContext);

    //const [editMode, setEditMode] = useState(false);
    //const [timeUpdates, setTimeUpdates] = useState({});
    const [editStartTime, setEditStartTime] = useState(new Date());
    const [editEndTime, setEditEndTime] = useState(new Date());
    const [eventType, setEventType] = useState("Block Time Out");
    const [repeating, setRepeating] = useState(true);
    const [repeatsOnDay, setRepeatsOnDay] = useState("Sunday")

    const buttonClasses = buttonStyles();
    const styleClasses = useStyles();


    const submitRepeatingEventHandler = e => {
        e.preventDefault();
        let startTime = setDayOfWeek(editStartTime, daysOfWeek.indexOf(repeatsOnDay));
        startTime.setHours(editStartTime.getHours());
        startTime.setMinutes(editStartTime.getMinutes());
        let endTime = setDayOfWeek(editEndTime, daysOfWeek.indexOf(repeatsOnDay));
        endTime.setHours(editEndTime.getHours());
        endTime.setMinutes(editEndTime.getMinutes());
        let eventToSubmit = {
            'coach': user.firebaseUser.uid,
            'startTime': startTime.valueOf(),
            'endTime': endTime.valueOf(),
            'status': 'repeating',
            'dayOfWeek': daysOfWeek.indexOf(repeatsOnDay),
            'frequency': 'weekly',
            'notes': ''
        };
        submitRepeatingEvent(eventToSubmit);
    }

    const submitRepeatingEvent = event => {
        user.firebaseUser.getIdToken()
        .then(function(idToken) {
            createRepeatingEvent(idToken, event)
            .then(response => {
                console.log(response);
            })
            .catch(e => {
                console.log(e);
            });
        });
    }


    return (
        <div>   
            <form className={styleClasses.root} >
                <TextField
                    name="typeOfEvent"
                    variant="outlined"
                    select
                    label="Type of Event"
                    value={eventType}
                    onChange={(e)=>setEventType(e.target.value)} >
                    <MenuItem value={"Block Time Out"}>Block Time Out</MenuItem>
                    <MenuItem value={"Normal Event"}>Normal Event</MenuItem>
                </TextField>
                <FormControl component="fieldset" className={styleClasses.formControl}>
                    <FormControlLabel
                        control={<GreenCheckbox checked={repeating} onChange={(e)=>setRepeating(e.target.checked)} name="repeating" />}
                        label="Repeating" classes={{label: styleClasses.label}}
                    />
                 </FormControl>
                 <TextField
                    name="repeatsOnDay"
                    variant="outlined"
                    select
                    label="Repeats Weekly On"
                    value={repeatsOnDay}
                    onChange={(e)=>setRepeatsOnDay(e.target.value)} >
                    <MenuItem value={"Sunday"}>Sunday</MenuItem>
                    <MenuItem value={"Monday"}>Monday</MenuItem>
                    <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                    <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                    <MenuItem value={"Thursday"}>Thursday</MenuItem>
                    <MenuItem value={"Friday"}>Friday</MenuItem>
                    <MenuItem value={"Saturday"}>Saturday</MenuItem>
                </TextField>

                <Button variant="outlined" className={buttonClasses.green} onClick={e => submitRepeatingEventHandler(e)}>
                    Set
                </Button>
              </form>
            
            <Typography gutterBottom>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                            variant="inline"
                            value={editStartTime}
                            minutesStep={5}
                            inputVariant="outlined"
                            inputProps={{borderRadius: '0px', borderColor: 'lightslategray'}}
                            onChange={date => {
                                let newDate = editStartTime;
                                newDate.setHours(date.getHours());
                                newDate.setMinutes(date.getMinutes());
                                newDate.setSeconds(0);
                                newDate.setMilliseconds(0);
                                setEditStartTime(newDate);                                
                            }}
                        />
                    </MuiPickersUtilsProvider>
            </Typography>
            <Typography gutterBottom>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <TimePicker
                            variant="inline"
                            value={editEndTime}
                            minutesStep={5}
                            inputVariant="outlined"
                            inputProps={{borderRadius: '0px', borderColor: 'lightslategray'}}
                            onChange={date => {
                                let newDate = editEndTime;
                                newDate.setHours(date.getHours());
                                newDate.setMinutes(date.getMinutes());
                                newDate.setSeconds(0);
                                newDate.setMilliseconds(0);
                                setEditEndTime(newDate);                                
                            }}
                        />
                    </MuiPickersUtilsProvider>
            </Typography>
        </div>
    );
}

export default CoachCalenderCreate;