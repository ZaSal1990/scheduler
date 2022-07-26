//Go through a state array with a days object and an appointments object
//Match the appointments given in the days object to those in the appointments object
//helper fnc to convert data received form API into a format which can beaccepted as props by our app

// function getAppointmentsForDay(state, day) {

//   let appointmentIds = []
//   let results = [];

//   state.days.forEach(dayObject => {
//     if (dayObject.name === day) {
//       dayObject.appointments.forEach(apptId => appointmentIds.push(apptId))
//     }
//   })

//   for (let appointmentId of appointmentIds){
//   results.push(state.appointments[appointmentId]); 
//   }

//   return results;
// }


// function getInterview(state, interview) {  
//   if (interview)
//   {
//     const interviewerId = interview.interviewer;
//  let result = { 
//         student : interview.student,
//         interviewer : state.interviewers[interviewerId]
//       };
//       return result;
//   }
  
//   else if (!interview){
//     return null;
//   }
// }

export const getAppointmentsForDay = (state, dayId) => {
  try {
    return state.days
      .find((stateDay) => stateDay.id === dayId)
      .appointments.map((appointmentId) => state.appointments[appointmentId]);
  } catch (err) {
    return [];
  }
};

// getInterviewersForDay returns an array of interviewer objects for the given day.

export const getInterviewersForDay = (state, dayId) => {
  try {
    return state.days
      .find((stateDay) => stateDay.id === dayId)
      .interviewers.map((interviewerId) => state.interviewers[interviewerId]);
  } catch (err) {
    return [];
  }
};

// getInterview returns a full interview object for an interview
//    object coming from the appointments API.

export const getInterview = (state, interview) => {
  try {
    return {
      student:     interview.student,
      interviewer: { ...state.interviewers[interview.interviewer] }
    };
  } catch (err) {
    return null;
  }
};



module.exports = {  getAppointmentsForDay, getInterview, getInterviewersForDay }