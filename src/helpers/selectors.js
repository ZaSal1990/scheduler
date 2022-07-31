//Go through a state array with a days object and an appointments object
//Match the appointments given in the days object to those in the appointments object
//helper fnc to convert data received form API into a format which can beaccepted as props by our app

function getAppointmentsForDay(state, day) {

  let appointmentIds = []
  let results = [];
  console.log('reached inside of getAppointmnetsForDay');

  state.days.filter(dayObject => {
    if (dayObject.name === day) {
      dayObject.appointments.forEach(apptId => appointmentIds.push(apptId))
  }})

  for (let appointmentId of appointmentIds) {
   console.log('state.appointments[appointmentId] from selector', state.appointments[appointmentId])
  results.push(state.appointments[appointmentId]); 
  }

  return results;
}

// function getAppointmentsForDay(state, dayId) {
//   let appointmentIds;
//   let results = [];
  
//   state.days.map(dayName => 
//       {
//         if (dayName.id === dayId) {
//           appointmentIds = [...dayName.appointments]
//          for (let item of appointmentIds) {
//           results.push(state.appointments[item]);
//          }
//         }
//       })
  
//   return results;
//   }

function getInterview(state, interview) {  
  if (interview)
  {
    const interviewerId = interview.interviewer;
 let result = { 
        student : interview.student,
        interviewer : state.interviewers[interviewerId]
      };
      return result;
  }
  
  else if (!interview){
    return null;
  }
}

function getInterviewersForDay(state, day) {
  let appointmentIds = []
  let results = [];
  let interviewerExists = {};
  state.days.forEach(dayObject => {
    if (dayObject.name === day) {
      dayObject.appointments.forEach(apptId => appointmentIds.push(apptId))
    }
  })

  for (let appointmentId of appointmentIds){
    if(state.appointments[appointmentId].interview?.interviewer){
      
      //console.log(state.appointments[appointmentId].interview.interviewer)
      
      const interviewerId = state.appointments[appointmentId].interview.interviewer;
      //if (day === 'Tuesday') console.log('interviewerId',interviewerId, appointmentId)
      if (!(interviewerId in interviewerExists))
      {
      results.push(state.interviewers[interviewerId])
      }
      interviewerExists[interviewerId] = true;
    }
  }
  //console.log('Interviewers', results)
  return results;
 }

// function getInterviewersForDay(state, day) {
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
//  }

  module.exports = {  getAppointmentsForDay, getInterview, getInterviewersForDay }