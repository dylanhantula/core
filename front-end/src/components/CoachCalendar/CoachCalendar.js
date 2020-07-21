import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from "../App/App";
import { getEvents, updateEvent } from '../../api/api';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import CoachCalenderDialog from '../CoachCalenderEvent/CoachCalenderEvent';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const localizer = momentLocalizer(moment);

const CoachCalendar = props => {
  const {user} = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [clients, setClients] = useState({});
  const [pendingClients, setPendingClients] = useState({});
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [openSnackbar, setOpenSnackBar] = useState(false);


  useEffect(() => {
    user.firebaseUser.getIdToken()
    .then(function(idToken) {
      getEvents(idToken, user.firebaseUser.uid)
      .then(response => {
        setEvents(response['events'].concat(response['pendingEvents']));
        setClients(response['clients']);
        setPendingClients(response['pending_clients']);
      })
      .catch(e => console.log(e));
    });
  }, [user.firebaseUser]);


 
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