
import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from '../helpers/selectors'

// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };


// const interviewers = [
//   { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
//   { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
//   { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
//   { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
//   { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
// ];

export default function Application(props) {

  // const [day, setDay] = useState('Monday')
  // const [days, setDays] = useState([]);


  const [state, setState] = useState({ //state.day, state.days,...
    day: "Monday",
    days: [],
    appointments: {},
    interviewers : {}
  });

  

  const setDay = day => setState(prev => ({ ...prev, day })); //now referring to state in the effect method, but we haven't declared it in the dependency list. we need to remove the dependency. We do that by passing a function to setState. prev => ({...prev, day}) enables dependancy on prev in the presence of [] as second argument of useEffect
  
  //line 64 - 71 is the alternate code after line 60 & 61 is commented

  useEffect(() => { //fetching dataa from API 
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')])
      .then((all) => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;
        setState(prev => ({ ...prev, days, appointments, interviewers }));

        console.log('state', state.interviewers)
        //console.log('response', all[0].data)
      });

  }, []); //see notes for reasoning for setDays

  const appoinments = getAppointmentsForDay(state, state.day);
  //const interview = getInterview(state, appointment.interview);
  const schedule = appoinments.map(appointment => {
    return (
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      //interview={interview}
      />)
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}


/*<InterviewerList
interviewers={interviewers}
value={interviewer}
onChange={setInterviewer}
/>
*/


