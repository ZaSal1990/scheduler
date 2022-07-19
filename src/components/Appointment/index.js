//It is standard behaviour for module imports and address paths to pick index.js by default if no other file is specified. 

import React from "react";
import './styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";


export default function Appointment(props){

  return (
    <article className="appointment">
      <Header time={props.time} />
      { props.interview ? 
        <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> 
        : <Empty/> 
      }
    </article>
  );
}