
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import React, { useState } from 'react';

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

   //Helper function to clear all fields
   const reset = () => {
    setStudent("")
    setInterviewer('null')
  }

  function cancel () {
    // props.onCancel;
    reset();
    props.onCancel()
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name={props.student}
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={(event) => setStudent(event.target.value)}
      />
    </form>
    <InterviewerList 
      interviewers={props.interviewers} 
      value={interviewer} 
      onChange={(event) => setInterviewer(event.target.value)}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onSubmit={event => event.preventDefault()} onClick={props.onSave}>Save</Button>
    </section>
  </section>
</main>
  )
}