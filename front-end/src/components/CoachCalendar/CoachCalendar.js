import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from "../App/App";
import { getEvents } from '../../api/api';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import CoachCalenderDialog from '../CoachCalenderEvent/CoachCalenderEvent';


const localizer = momentLocalizer(moment);

const CoachCalendar = props => {
  const {user} = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [clients, setClients] = useState({});
  const [pendingClients, setPendingClients] = useState({});
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

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

  return (
    <div>

      {showEventDialog ? <CoachCalenderDialog 
        open={showEventDialog}
        setOpen={setShowEventDialog}
        selectedEvent={selectedEvent}
        name={clients[selectedEvent['athlete']]['firstName'] + ' ' + clients[selectedEvent['athlete']]['lastName']} />:null}

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