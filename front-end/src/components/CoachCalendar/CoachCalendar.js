import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from "../App/App";
import { getEvents } from '../../api/api';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";


const localizer = momentLocalizer(moment);

const CoachCalendar = props => {
  const {user} = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [clients, setClients] = useState({});

  useEffect(() => {
    user.firebaseUser.getIdToken()
    .then(function(idToken) {
      getEvents(idToken, user.firebaseUser.uid)
      .then(response => {
        console.log(response);
        setEvents(response['events']);
        setClients(response['clients']);
      })
      .catch(e => console.log(e));
    });
  }, [user.firebaseUser]);

  return (
    <div>
      <div style={{ height: '500pt'}}>
        <Calendar
          popup
          events={events}
          
          titleAccessor={event => {
            if (clients[event['athlete']]) {
              return ("1 hr session w/ " + clients[event['athlete']]['firstName'] + ' ' + clients[event['athlete']]['lastName']);
            } else {
              return ("1 hr session")
            }
          }}
          startAccessor={event => new Date(event['startTime'])}
          endAccessor={event => new Date(event['endTime'])}
          defaultDate={moment().toDate()}
          localizer={localizer}
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
              if (isSelected) {
                newStyle.backgroundColor = "green"
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