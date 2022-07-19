import React from "react";
import 'components/InterviewerList.scss';
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
   /*Takes in Three props
  interviewers: array of objs containing info of each interviewer
  interviewer: id
  setInterviewer:function; accepts id of interviewer
  */ 


return (
  <ul className="interviewers__list">
    {props.interviewers.map(interviewer =>  <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />)}
</ul>

)
}
