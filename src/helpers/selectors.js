//Go through a state array with a days object and an appointments object
//Match the appointments given in the days object to those in the appointments object
//helper fnc to convert data received form API into a format which can beaccepted as props by our app

function getAppointmentsForDay(state, day) {

  let appointmentArr = [];

  state.days.map(dayObject => {
    if (dayObject.name === day) {
      dayObject.appointments.forEach(apptId => appointmentArr.push(apptId))
    }
  })
  return appointmentArr;
}

module.exports = {getAppointmentsForDay}