import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from "../App/App";
import { makeStyles } from '@material-ui/core/styles';
import { getEvents, updateEvent, getRepeatingEvents } from '../../api/api';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import CoachCalenderDialog from '../CoachCalenderEvent/CoachCalenderEvent';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import './CoachCalender.css';
import CoachCalenderCreate from '../CoachCalenderCreate/CoachCalenderCreate';



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
      border: '1px solid green'
  }
});

const localizer = momentLocalizer(moment);

const CoachCalendar = props => {



  const {user} = useContext(AuthContext);

  const buttonClasses = buttonStyles();

  const [events, setEvents] = useState([]);
  const [clients, setClients] = useState({});
  const [pendingClients, setPendingClients] = useState({});
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [current, setCurrent] = useState(new Date());
  const [earliestStartDate, setEarliestStartDate] = useState(moment(new Date()).startOf('month').toDate());
  const [repeatingEvents, setRepeatingEvents] = useState([]);
  const [eventsBeingDisplayed, setEventsBeingDisplayed] = useState(events);



  useEffect(() => {
    user.firebaseUser.getIdToken()
    .then(function(idToken) {
      getEvents(idToken, user.firebaseUser.uid, earliestStartDate.valueOf())
      .then(response => {
        setEvents(response['events'].concat(response['pendingEvents']));
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

  
  

  const addRepeatingEventsInRange = (start, end, view) => {
    let toAdd = [];
    for (var i = 0; i < repeatingEvents.length; i++) {
      if (repeatingEvents[i]['startTime'] > start && repeatingEvents[i]['endTime'] < end) {

      }
    }
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


      <div>
        <Button variant="filled" className={buttonClasses.green}>
            + Create
        </Button>
        <CoachCalenderCreate/>
      </div>

      <div style={{ height: '500pt'}}>
        <Calendar
          events={events}
          titleAccessor={event => {
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
            setShowEventDialog(true);
            setSelectedEvent(event);
          }}
          onView={(view) => {
            console.log('#### onView');
            console.log('#### view=', view);
            console.log(current)
            calenderRangeChangeHandler(current, view);
          }}
          onNavigate={(date, view) => {
            console.log('#### onNavigate');
            console.log('#### date=', moment(date).startOf('day').toDate());
            console.log('#### view=', view);
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
  );
}

export default CoachCalendar;