import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from "../App/App";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { getEvents, updateEvent, getRepeatingEvents, updateProfile, getProfile, createEvent } from '../../api/api';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import CoachCalenderDialog from '../CoachCalenderEvent/CoachCalenderEvent';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import './CoachCalendar.css';
import DateAndTime from '../DateAndTime/DateAndTime';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import CoachCalenderCreate from '../CoachCalenderCreate/CoachCalenderCreate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const MORNING_MIN = 6;
const MORNING_MAX = 11;
const DAYTIME_MIN = MORNING_MAX;
const DAYTIME_MAX = 17;
const EVENING_MIN = DAYTIME_MAX;
const EVENING_MAX = 23;
const WEEKEND_MIN = MORNING_MIN;
const WEEKEND_MAX = EVENING_MAX;


const generalStyles = makeStyles((theme) => ({
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
    
  }
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

const localizer = momentLocalizer(moment);

const CoachCalendar = props => {



  const {user} = useContext(AuthContext);

  const generalClasses = generalStyles();

  const [events, setEvents] = useState([]);
  const [clients, setClients] = useState({});
  const [eventType, setEventType] = useState("");
  const [clientsToDisplay, ] = useState([]);
  const [clientToInvite, setClientToInvite] = useState("");
  const [pendingClients, setPendingClients] = useState({});
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [snackbarTimeSuccess, setSnackbarTimeSuccess] = useState(false);
  const [snackbarTimeError, setSnackbarTimeError] = useState(false);
  const [newEventSnackbarError, setNewEventSnackbarError] = useState(false);
  const [current, setCurrent] = useState(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const [earliestStartDate, setEarliestStartDate] = useState(moment(new Date()).startOf('month').toDate());
  const [, setRepeatingEvents] = useState([]);
  const [generalAvailability, setGeneralAvailability] = useState({
    'daytime': user.profile.generalAvailability.daytime,
    'mornings': user.profile.generalAvailability.mornings,
    'evenings': user.profile.generalAvailability.evenings,
    'weekends': user.profile.generalAvailability.weekends
  });
  const [generalTimes, setGeneralTimes] = useState({
    'daytime': 
      user.profile.generalAvailability.daytime ? 
      {'From': new Date(user.profile.daytime.From), 'To': new Date(user.profile.daytime.To)}:
      {'From': new Date(), 'To': new Date()},
    'mornings': 
      user.profile.generalAvailability.mornings ? 
      {'From': new Date(user.profile.mornings.From), 'To': new Date(user.profile.mornings.To)}:
      {'From': new Date(), 'To': new Date()},
    'evenings': 
      user.profile.generalAvailability.evenings ? 
      {'From': new Date(user.profile.evenings.From), 'To': new Date(user.profile.evenings.To)}:
      {'From': new Date(), 'To': new Date()},
    'weekends': 
      user.profile.generalAvailability.weekends ? 
      {'From': new Date(user.profile.weekends.From), 'To': new Date(user.profile.weekends.To)}:
      {'From': new Date(), 'To': new Date()},
  });
  const [profileTimeUpdates, setProfileTimeUpdates] = useState({});
  const [newEventTimes, setNewEventTimes] = useState({
    'newEvent': {
      'From': new Date(),
      'To': new Date()
    }
  });



  useEffect(() => {
    user.firebaseUser.getIdToken()
    .then(function(idToken) {
      getEvents(idToken, user.firebaseUser.uid, earliestStartDate.valueOf())
      .then(response => {
        setEvents(response['events'].concat(response['pendingEvents'].concat(response['personalEvents'])));
        setClients(response['clients']);
        setPendingClients(response['pending_clients']);
      })
      .catch(e => console.log(e));
    });
  }, [earliestStartDate, user.firebaseUser]);

  useEffect(() => {
    user.firebaseUser.getIdToken()
    .then(function(idToken) {
      getRepeatingEvents(idToken, user.firebaseUser.uid, 'coach')
      .then(response => {
        console.log(response);
        setRepeatingEvents(response['repeating_events']);
        
      })
      .catch(e => console.log(e));
    });
  }, [user.firebaseUser]);

  useEffect(() => {
    user.firebaseUser.getIdToken()
    .then(function(idToken) {
      getProfile(idToken, user.firebaseUser.uid)
      .then(response => {
        setGeneralAvailability({
          'daytime': response.generalAvailability.daytime,
          'mornings': response.generalAvailability.mornings,
          'evenings': response.generalAvailability.evenings,
          'weekends': response.generalAvailability.weekends
        });
        setGeneralTimes({
          'daytime': 
            response.generalAvailability.daytime ? 
            {'From': new Date(response.daytime.From), 'To': new Date(response.daytime.To)}:
            {'From': new Date(), 'To': new Date()},
          'mornings': 
            response.generalAvailability.mornings ? 
            {'From': new Date(response.mornings.From), 'To': new Date(response.mornings.To)}:
            {'From': new Date(), 'To': new Date()},
          'evenings': 
            response.generalAvailability.evenings ? 
            {'From': new Date(response.evenings.From), 'To': new Date(response.evenings.To)}:
            {'From': new Date(), 'To': new Date()},
          'weekends': 
            response.generalAvailability.weekends ? 
            {'From': new Date(response.weekends.From), 'To': new Date(response.weekends.To)}:
            {'From': new Date(), 'To': new Date()},
        });
      })
      .catch(e => console.log(e));
    });
  }, [user.firebaseUser]);
  

  const updateAvailability = e => {
    e.preventDefault();
    const allUpdates = {
      generalAvailability: {...generalAvailability},
    };
    for (var slot in generalAvailability) {
      if (profileTimeUpdates[slot]) {
        if (profileTimeUpdates[slot]['From'].valueOf() > profileTimeUpdates[slot]['To'].valueOf()){
          setSnackbarTimeError(true);
          return;
        }
        allUpdates[slot] = profileTimeUpdates[slot];
        allUpdates[slot]['From'] = profileTimeUpdates[slot]['From'].valueOf();
        allUpdates[slot]['To'] = profileTimeUpdates[slot]['To'].valueOf();
      }
      allUpdates[slot] = generalTimes[slot];
      allUpdates[slot]['From'] = generalTimes[slot]['From'].valueOf();
      allUpdates[slot]['To'] = generalTimes[slot]['To'].valueOf();
    }
    user.firebaseUser.getIdToken()
    .then(function(idToken) {
      updateProfile(idToken, allUpdates, user.firebaseUser.uid)
      .then(response => {
        setSnackbarTimeSuccess(true);
      })
      .catch(e => console.log(e));
    });
  }

  const submitNewEvent = e => {
    e.preventDefault();
    let eventToSubmit = {};
    let eventStatus = "";
    if (eventType === "") {
      setNewEventSnackbarError(true);
      return;
    }
    if (eventType === "Normal Session" && clientToInvite === "") {
      setNewEventSnackbarError(true);
      return;
    }
    if (newEventTimes['newEvent']['From'].valueOf() > newEventTimes['newEvent']['To'].valueOf()) {
      setNewEventSnackbarError(true);
      return;
    }
    if (eventType === "Personal") {
      eventStatus = "personal";
      eventToSubmit = {
        'startTime': newEventTimes['newEvent']['From'].valueOf(),
        'endTime': newEventTimes['newEvent']['To'].valueOf(),
        'user': user.firebaseUser.uid,
        'status': eventStatus,
        'title': eventTitle
      }
    } else if (eventType === "Normal Session") {
      eventStatus = "pending";
      eventToSubmit = {
        'startTime': newEventTimes['newEvent']['From'].valueOf(),
        'endTime': newEventTimes['newEvent']['To'].valueOf(),
        'coach': user.firebaseUser.uid,
        'athlete': null,
        'status': eventStatus,
      }
    }
    user.firebaseUser.getIdToken()
    .then(function(idToken) {
      createEvent(idToken, eventToSubmit, eventStatus)
      .then(response => {
        window.location.reload(false);
      })
      .catch(e => console.log(e));
    });

    }
    
  

  const calenderRangeChangeHandler = (date, view) => {
    let start, end;
    if (view === 'day') {
      start = moment(date).startOf('day').toDate();
      end = moment(date).endOf('day').toDate();
    } else if (view === 'month') {
      start = moment(date).startOf('month').toDate();
      end = moment(date).endOf('month').toDate();
    } else if (view === 'week') {
      start = moment(date).startOf('week').toDate();
      end = moment(date).endOf('week').toDate();
    } else if (view === 'agenda') {
      start = moment(date).startOf('day').toDate();
      end = moment(date).endOf('day').add(1, 'month').toDate();
    }
    console.log(start, end)
    if (start.valueOf() < earliestStartDate.valueOf()) {
      setEarliestStartDate(start);
    }
  }
 
  const eventActionHandler = (eventID, updates) => {
    user.firebaseUser.getIdToken()
    .then(function(idToken) {
      updateEvent(idToken, eventID, updates)
      .then(response => {
        window.location.reload(false);
      })
      .catch(e => {
        setOpenSnackBar(true);
      });
    });
  }

  return (
    <div>
      {showEventDialog ? 
        <CoachCalenderDialog 
          open={showEventDialog}
          setOpen={setShowEventDialog}
          selectedEvent={selectedEvent}
          updateEvent={eventActionHandler}
          name={clients[selectedEvent['athlete']]['firstName'] + ' ' + clients[selectedEvent['athlete']]['lastName']}
        />
      :null}
      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={e => setOpenSnackBar(false)}>
        <Alert variant="filled" onClose={e => setOpenSnackBar(false)} severity="error">
            Someone has already reserved/booked this time slot.
        </Alert>
      </Snackbar>

        
      <div className="CoachCalenderGeneralAvailability">
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <p style={{marginRight: '0.5rem'}}>Edit General Availability  </p>
          {showAvailability ? <ExpandLessIcon className="CalendarShowAvailabilityButton" onClick={e => setShowAvailability(false)}/>:
            <ExpandMoreIcon className="CalendarShowAvailabilityButton" onClick={e => setShowAvailability(true)}/>}
        </div>
        
        {showAvailability ? 
        <div className="CoachCalenderGeneralAvailabilityMain">
          <div>
            <FormControl component="fieldset" className={generalClasses.formControl}>
              <FormControlLabel
                  control={<GreenCheckbox checked={generalAvailability['daytime']} 
                  onChange={(e)=>{
                    setGeneralAvailability({
                      ...generalAvailability,
                      'daytime': e.target.checked
                    })
                  }} 
                  name="Daytime" />}
                  label="Daytime" classes={{label: generalClasses.label}}
              />
            </FormControl>
            {generalAvailability['daytime'] ? 
              <DateAndTime 
                slot='daytime' 
                min={DAYTIME_MIN} 
                max={DAYTIME_MAX} 
                currentTimes={generalTimes['daytime']}
                updates={profileTimeUpdates}
                setUpdates={setProfileTimeUpdates}
                showDatePicker={false}
              />:null}
          </div>
          <div>
          <FormControl component="fieldset" className={generalClasses.formControl}>
              <FormControlLabel
                  control={<GreenCheckbox checked={generalAvailability['evenings']} 
                  onChange={(e)=>{
                    setGeneralAvailability({
                      ...generalAvailability,
                      'evenings': e.target.checked
                    })
                  }} 
                  name="Evenings" />}
                  label="Evenings" classes={{label: generalClasses.label}}
              />
            </FormControl>
            {generalAvailability['evenings'] ? 
              <DateAndTime 
                slot='evenings' 
                min={EVENING_MIN} 
                max={EVENING_MAX} 
                currentTimes={generalTimes['evenings']}
                updates={profileTimeUpdates}
                setUpdates={setProfileTimeUpdates}
                showDatePicker={false}
              />:null}
          </div>
          <div>
          <FormControl component="fieldset" className={generalClasses.formControl}>
              <FormControlLabel
                  control={<GreenCheckbox checked={generalAvailability['mornings']} 
                  onChange={(e)=>{
                    setGeneralAvailability({
                      ...generalAvailability,
                      'mornings': e.target.checked
                    })
                  }} 
                  name="Mornings" />}
                  label="Mornings" classes={{label: generalClasses.label}}
              />
            </FormControl>
            {generalAvailability['mornings'] ? 
              <DateAndTime 
                slot='mornings' 
                min={MORNING_MIN} 
                max={MORNING_MAX} 
                currentTimes={generalTimes['mornings']} 
                updates={profileTimeUpdates}
                setUpdates={setProfileTimeUpdates}
                showDatePicker={false}
              />:null}
          </div>
          <div>
          <FormControl component="fieldset" className={generalClasses.formControl}>
              <FormControlLabel
                  control={<GreenCheckbox checked={generalAvailability['weekends']} 
                  onChange={(e)=>{
                    setGeneralAvailability({
                      ...generalAvailability,
                      'weekends': e.target.checked
                    })
                  }} 
                  name="Weekends" />}
                  label="Weekends" classes={{label: generalClasses.label}}
              />
            </FormControl>
            {generalAvailability['weekends'] ? 
              <DateAndTime 
                slot='weekends' 
                min={WEEKEND_MIN} 
                max={WEEKEND_MAX} 
                currentTimes={generalTimes['weekends']}
                updates={profileTimeUpdates}
                setUpdates={setProfileTimeUpdates}
                showDatePicker={false}
              />:null}
          </div>
        </div>:null}
        {showAvailability ? 
        <div className="CoachCalenderSaveAndUndo">
          {!generalAvailability['daytime'] && 
          !generalAvailability['weekends'] && 
          !generalAvailability['mornings'] && 
          !generalAvailability['evenings'] ? null:<button className="CoachCalenderSaveButton" onClick={e => updateAvailability(e)}>Save</button>}
          {!generalAvailability['daytime'] && 
          !generalAvailability['weekends'] && 
          !generalAvailability['mornings'] && 
          !generalAvailability['evenings'] ? null:<button className="CoachCalenderRefreshButton">Refresh</button>}
        </div>:null}
      </div>

      <Snackbar open={snackbarTimeSuccess} autoHideDuration={5000} onClose={e => setSnackbarTimeSuccess(false)}>
        <Alert variant="filled" elevation={10} onClose={e => setSnackbarTimeSuccess(false)} severity="success">
            Availability Updated Successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={snackbarTimeError} autoHideDuration={5000} onClose={e => setSnackbarTimeError(false)}>
        <Alert variant="filled" elevation={10} onClose={e => setSnackbarTimeError(false)} severity="error">
            Available times must be chronological and within reasonable limits.
        </Alert>
      </Snackbar>
      <Snackbar open={newEventSnackbarError} autoHideDuration={5000} onClose={e => setNewEventSnackbarError(false)}>
        <Alert variant="filled" elevation={10} onClose={e => setNewEventSnackbarError(false)} severity="error">
            All fields must be filled and times must be chronological.
        </Alert>
      </Snackbar>
      
      
      <div>
        <button 
          style={{margin: '1rem'}}
          className="CoachCalenderRefreshButton" 
          onClick={e => setShowCreateEvent(true)}>+ Create</button>
      </div>
      <div className="CoachCalendarView">
        {showCreateEvent ? 
          <CoachCalenderCreate
            slot='newEvent' 
            min={0.01} 
            max={23.99} 
            currentTimes={newEventTimes['newEvent']}
            updates={newEventTimes}
            setUpdates={setNewEventTimes}
            createEvent={submitNewEvent}
            clients={clientsToDisplay}
            clientToInvite={clientToInvite}
            setClientToInvite={setClientToInvite}
            eventType={eventType}
            setEventType={setEventType}
            eventTitle={eventTitle}
            setEventTitle={setEventTitle}
            closeTab={setShowCreateEvent}
            showDatePicker={true}
          />
        :null}        
        <div style={{ height: '500pt', flexGrow: 2}}>
          <Calendar
            events={events}
            titleAccessor={event => {
              if (event['user']) {
                return ("Personal: " + event['title']);
              }
              if (clients[event['athlete']]) {
                return ("1 hr session w/ " + clients[event['athlete']]['firstName'] + ' ' + clients[event['athlete']]['lastName']);
              } else if (pendingClients[event['athlete']]) {
                return ("1 hr session w/ " + pendingClients[event['athlete']]['firstName'] + ' ' + pendingClients[event['athlete']]['lastName']);
              } else {
                return ("1 hr session");
              }
            }}
            startAccessor={event => new Date(event['startTime'])}
            endAccessor={event => new Date(event['endTime'])}
            defaultDate={moment().toDate()}
            localizer={localizer}
            onSelectEvent={(event) => {
              if (event['user']) {
                return;
              }
              setShowEventDialog(true);
              setSelectedEvent(event);
            }}
            onView={(view) => {
              calenderRangeChangeHandler(current, view);
            }}
            onNavigate={(date, view) => {
              setCurrent(date);
              calenderRangeChangeHandler(date, view);
              
            }}
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

export default CoachCalendar;