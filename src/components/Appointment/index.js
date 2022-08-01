//It is standard behaviour for module imports and address paths to pick index.js by default if no other file is specified. 

import React from "react";
import { useEffect } from 'react';
import './styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";



import useVisualMode from "../../hooks/useVisualMode";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

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

    if (student && interviewer) {
      
      
      const interview = {
        student: student, 
        interviewer
      };
      
      transition(SAVING)
      props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
    }
  }

  const remove = function (student, interviewer) {
    const interview = {
      student: student,
      interviewer,
    };

    if (mode === CONFIRM) {
    transition(DELETING, true);
      props
      .cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true))
    }
    else 
    transition(CONFIRM)
     
  }

  const edit = function () {
  transition(EDIT)
  }

//console.log('props',props)
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show
        student={props.interview.student}
        interviewer={props?.interview?.interviewer?.name} 
        onDelete={remove}
        onEdit={edit}
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
      
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && 
        <Confirm 
          onCancel={back}
          onConfirm={remove}
          message="Are you sure you would like to delete?" 
        />}
        {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => transition(SHOW)}
          onSave={save}
        />
      )}
       {mode === ERROR_SAVE && 
        <Error 
          message="Could not create appointment"
          onClose={() => back()}
        />
      }
      {mode === ERROR_DELETE && 
        <Error 
          message="Could not cancel appointment"
          onClose={() => back()}
        />
      }
    </article>
  );
}