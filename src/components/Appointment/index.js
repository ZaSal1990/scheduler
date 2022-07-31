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
import useVisualMode from "../../hooks/useVisualMode";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";


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
        student: student, //was name before student, check form component
        interviewer
      };
      console.log(interview);
      transition(SAVING)
      props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
    }
  }
  

  const remove = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    if (mode === CONFIRM) {
    transition(DELETING, true);

      props.cancelInterview(props.id, interview).then(() =>{
      console.log('after removing data remotely, from inside bookinterview from index.js');
      transition(EMPTY)
      });
    }
    else 
    transition(CONFIRM)
     
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
    </article>
  );
}