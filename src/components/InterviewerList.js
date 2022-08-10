import React from "react";
import 'components/InterviewerList.scss';
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  /*Takes in Three props
 interviewers: array of objs containing info of each interviewer
 interviewer: id
 setInterviewer:function; accepts id of interviewer
 */

  InterviewerList.propTypes = { //testing, ensuring input data is type Array (React lib prop-type alternate)
    interviewers: PropTypes.array.isRequired
  }
  return (
    <ul className="interviewers__list">
      {props.interviewers.map(interviewer => <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />)}
    </ul>

  )
}
