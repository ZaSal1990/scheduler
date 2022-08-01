import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData(props) {
    

  const [state, setState] = useState({ //state.day, state.days,...
    day: "Monday",
    days: [],
    appointments: {},
    interviewers : {}
  });

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
   
    return axios
    .put(`/api/appointments/${id}`, {
      interview,
    }).then((res) => { setState({...state, appointments})
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

return axios.delete(`/api/appointments/${id}`).then(() => {
  setState({...state, appointments}) //setting local state to null
  })
}


  const setDay = day => setState(prev => ({ ...prev, day })); //now referring to state in the effect method, but we haven't declared it in the dependency list. we need to remove the dependency. We do that by passing a function to setState. prev => ({...prev, day}) enables dependancy on prev in the presence of [] as second argument of useEffect
  

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

  }, []); //see notes for reasoning for setDays

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
   } 

}