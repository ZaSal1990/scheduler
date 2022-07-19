//It is standard behaviour for module imports and address paths to pick index.js by default if no other file is specified. 

import React from "react";
import './styles.scss';


export default function Appointment(props){

  return (
    <article className="appointment">
      {props.time}
    </article>
  );
}