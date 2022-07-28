//It is standard behaviour for module imports and address paths to pick index.js by default if no other file is specified. 

import React from "react";
import { useEffect } from 'react';
import './styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  // const SAVING = "SAVING";
  // const DELETING = "DELETING";
  // const CONFIRM = "CONFIRM";
  // const EDIT = "EDIT";
  // const ERROR_SAVE = "ERROR_SAVE";
  // const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  useEffect(() => {
    
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    
    if (!props.interview && mode === SHOW) {
      transition(EMPTY);
    }

  }, [mode, transition, props.interview])

  const save = function (student, interviewer) {
      const interview = {
        student: student, //was name before student, check form component
        interviewer
      };
      console.log(interview);
      props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
      />
      }
      {mode === CREATE &&
        <Form
          name={props.student}
          value={props.value}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      }
    </article>
  );
}