import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData(props) {


  const [state, setState] = useState({ 
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day })); 
  function findDay(day) {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return daysOfWeek[day]
  }


  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayOfWeek = findDay(state.day)

    let day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek]
    }

    if (!state.appointments[id].interview) {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots - 1
      }
    } else {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots
      }
    }

    let days = state.days
    days[dayOfWeek] = day;
    return axios
      .put(`/api/appointments/${id}`, {
        interview,
      }).then((res) => {
        setState({ ...state, appointments, days })
      })
  }

  function cancelInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };


    const dayOfWeek = findDay(state.day)

    const day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots + 1
    }

    let days = state.days
    days[dayOfWeek] = day;

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({ ...state, appointments }) //setting local state to null
    })
  }

  useEffect(() => { //fetching data from API 
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')])
      .then((all) => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;
        setState(prev => ({ ...prev, days, appointments, interviewers }));
      });

  }, []); 



  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}