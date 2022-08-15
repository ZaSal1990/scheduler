
function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find(d => d.name === day)
  if (!selectedDay) return [];

  const appointmentsForDay = selectedDay.appointments.map(appointmentId => state.appointments[appointmentId])
  return appointmentsForDay;
}


function getInterview(state, interview) {
  if (!interview) return null;

  const interviewerId = interview.interviewer;
  const result = {
    student: interview.student,
    interviewer: state.interviewers[interviewerId]
  };
  return result;
}

function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find(d => d.name === day)
  if (!selectedDay) return [];

  const interviewersForDay = selectedDay.interviewers.map(interviewerId => state.interviewers[interviewerId])
  return interviewersForDay;
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay }