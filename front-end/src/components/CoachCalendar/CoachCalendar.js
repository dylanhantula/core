import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";


const localizer = momentLocalizer(moment);

const myEventsList = [{}] //empty object for now



const CoachCalendar = props => {
    return (
        <div>
          
          <div style={{ height: '500pt'}}>
          <Calendar
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
          />
        </div>
          
        </div>
    );
}

export default CoachCalendar;