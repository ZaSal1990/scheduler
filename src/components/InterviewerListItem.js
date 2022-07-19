import React from "react";
import 'components/InterviewerListItem.scss'
import classNames from "classnames";


export default function InterviewerListItem(props) {


  const InterviewerClass = classNames("interviewers__item", { 
    "interviewers__item--selected": props.selected, 
    "interviewers__item-image": !props.selected
  });


  return (
  <li className={InterviewerClass} onClick={()=> props.setInterviewer} selected={props.selected}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>
  )}




   
 